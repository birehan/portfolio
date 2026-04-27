import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SITE_DIR = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(SITE_DIR, "..");
const PUBLIC_CONTENT = path.join(SITE_DIR, "public", "content");
const RESUMES_DIR = path.join(REPO_ROOT, "resumes");
const PUBLIC_DIR = path.join(SITE_DIR, "public");

const MAX_WIDTH = 1600;
const WEBP_QUALITY = 82;
const OPTIMIZE = process.env.SKIP_IMAGE_OPT !== "1";

function rmrf(target: string) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

async function copyOrOptimizeFile(src: string, dest: string) {
  if (!OPTIMIZE) {
    fs.copyFileSync(src, dest);
    return;
  }
  const ext = path.extname(src).toLowerCase();
  if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".webp") {
    try {
      const pipeline = sharp(src, { failOn: "none" }).rotate();
      const meta = await pipeline.metadata();
      if (meta.width && meta.width > MAX_WIDTH) {
        pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      }
      if (ext === ".png") {
        await pipeline.png({ compressionLevel: 9 }).toFile(dest);
      } else if (ext === ".webp") {
        await pipeline.webp({ quality: WEBP_QUALITY }).toFile(dest);
      } else {
        await pipeline.jpeg({ quality: 86, mozjpeg: true }).toFile(dest);
      }
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
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await copyDir(s, d, predicate);
    } else if (entry.isFile()) {
      if (!predicate || predicate(entry.name)) {
        await copyOrOptimizeFile(s, d);
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
    `[sync] done in ${((Date.now() - t0) / 1000).toFixed(1)}s (optimize=${OPTIMIZE ? "on" : "off"})`,
  );
}

main().catch((err) => {
  console.error("[sync] failed:", err);
  process.exit(1);
});
