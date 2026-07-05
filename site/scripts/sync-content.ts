import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";

const SITE_DIR = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(SITE_DIR, "..");
const PUBLIC_CONTENT = path.join(SITE_DIR, "public", "content");
const RESUMES_DIR = path.join(REPO_ROOT, "resumes");
const PUBLIC_DIR = path.join(SITE_DIR, "public");
// Persistent encode cache (survives across runs, wiped by `npm ci`) so repeat
// dev/build runs skip re-encoding unchanged images.
const CACHE_DIR = path.join(SITE_DIR, "node_modules", ".cache", "content-images");

const MAX_WIDTH = 1100;
const WEBP_QUALITY = 74;
// Raster sources we convert to WebP; SKIP_IMAGE_OPT=1 keeps WebP output but
// skips the downscale (kept for a fast local escape hatch).
const RESIZE = process.env.SKIP_IMAGE_OPT !== "1";
const RASTER = new Set([".png", ".jpg", ".jpeg", ".webp"]);

/** Served filename for a source image: raster formats become .webp. */
function servedName(file: string): string {
  return file.replace(/\.(png|jpe?g)$/i, ".webp");
}

function rmrf(target: string) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function cachePathFor(src: string): string {
  const h = crypto
    .createHash("sha1")
    .update(`${path.resolve(src)}|w${MAX_WIDTH}|q${WEBP_QUALITY}|r${RESIZE ? 1 : 0}`)
    .digest("hex");
  return path.join(CACHE_DIR, `${h}.webp`);
}

/** Encode a raster image to WebP (cached by source path + params + mtime). */
async function optimizeToWebp(src: string): Promise<string> {
  const cache = cachePathFor(src);
  if (fs.existsSync(cache) && fs.statSync(cache).mtimeMs >= fs.statSync(src).mtimeMs) {
    return cache;
  }
  ensureDir(path.dirname(cache));
  const pipeline = sharp(src, { failOn: "none" }).rotate();
  if (RESIZE) {
    const meta = await pipeline.metadata();
    if (meta.width && meta.width > MAX_WIDTH) {
      pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }
  }
  await pipeline.webp({ quality: WEBP_QUALITY }).toFile(cache);
  return cache;
}

async function copyOrOptimizeFile(src: string, dest: string) {
  const ext = path.extname(src).toLowerCase();
  if (RASTER.has(ext)) {
    try {
      const cached = await optimizeToWebp(src);
      fs.copyFileSync(cached, dest);
      return;
    } catch (err) {
      console.warn(`[sync] sharp failed on ${src}, copying raw: ${(err as Error).message}`);
    }
  }
  fs.copyFileSync(src, dest);
}

async function copyDir(src: string, dest: string, predicate?: (file: string) => boolean) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    if (entry.isDirectory()) {
      await copyDir(s, path.join(dest, entry.name), predicate);
    } else if (entry.isFile()) {
      if (!predicate || predicate(entry.name)) {
        await copyOrOptimizeFile(s, path.join(dest, servedName(entry.name)));
      }
    }
  }
}

const isImage = (f: string) => /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(f);

async function syncProjects(kind: "client" | "personal", srcDirName: string) {
  const src = path.join(REPO_ROOT, srcDirName);
  const dest = path.join(PUBLIC_CONTENT, kind);
  rmrf(dest);
  if (!fs.existsSync(src)) {
    console.warn(`[sync] missing source: ${src}`);
    return;
  }
  for (const project of fs.readdirSync(src, { withFileTypes: true })) {
    if (!project.isDirectory()) continue;
    const imagesSrc = path.join(src, project.name, "images");
    const imagesDest = path.join(dest, project.name);
    if (fs.existsSync(imagesSrc)) {
      await copyDir(imagesSrc, imagesDest, isImage);
    }
  }
  console.log(
    `[sync] ${kind}: ${fs.existsSync(dest) ? fs.readdirSync(dest).length : 0} projects copied`,
  );
}

async function syncCertificates() {
  const src = path.join(REPO_ROOT, "certificates");
  const dest = path.join(PUBLIC_CONTENT, "certificates");
  rmrf(dest);
  if (!fs.existsSync(src)) {
    console.warn(`[sync] missing certificates source: ${src}`);
    return;
  }
  await copyDir(src, dest, isImage);
  console.log(`[sync] certificates copied`);
}

function syncResume() {
  if (!fs.existsSync(RESUMES_DIR)) return;
  const preferred = path.join(RESUMES_DIR, "resume.pdf");
  const files = fs.readdirSync(RESUMES_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
  if (files.length === 0) return;
  const src = fs.existsSync(preferred)
    ? preferred
    : path.join(RESUMES_DIR, files.find((f) => /flowcv/i.test(f)) ?? files[0]);
  const dest = path.join(PUBLIC_DIR, "resume.pdf");
  ensureDir(PUBLIC_DIR);
  fs.copyFileSync(src, dest);
  console.log(`[sync] resume: ${path.basename(src)} -> public/resume.pdf`);
}

async function main() {
  const t0 = Date.now();
  ensureDir(PUBLIC_CONTENT);
  await syncProjects("client", "client_projects");
  await syncProjects("personal", "projects");
  await syncCertificates();
  syncResume();
  console.log(
    `[sync] done in ${((Date.now() - t0) / 1000).toFixed(1)}s (webp q${WEBP_QUALITY}, resize=${RESIZE ? `${MAX_WIDTH}px` : "off"})`,
  );
}

main().catch((err) => {
  console.error("[sync] failed:", err);
  process.exit(1);
});
