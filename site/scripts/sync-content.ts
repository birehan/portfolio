import fs from "node:fs";
import path from "node:path";

const SITE_DIR = path.resolve(__dirname, "..");
const REPO_ROOT = path.resolve(SITE_DIR, "..");
const PUBLIC_CONTENT = path.join(SITE_DIR, "public", "content");
const RESUMES_DIR = path.join(REPO_ROOT, "resumes");
const PUBLIC_DIR = path.join(SITE_DIR, "public");

function rmrf(target: string) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

function ensureDir(p: string) {
  fs.mkdirSync(p, { recursive: true });
}

function copyDir(src: string, dest: string, predicate?: (file: string) => boolean) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d, predicate);
    } else if (entry.isFile()) {
      if (!predicate || predicate(entry.name)) {
        fs.copyFileSync(s, d);
      }
    }
  }
}

const isImage = (f: string) => /\.(png|jpg|jpeg|webp|gif|svg)$/i.test(f);

function syncProjects(kind: "client" | "personal", srcDirName: string) {
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
      copyDir(imagesSrc, imagesDest, isImage);
    }
  }
  console.log(`[sync] ${kind}: ${fs.existsSync(dest) ? fs.readdirSync(dest).length : 0} projects copied`);
}

function syncCertificates() {
  const src = path.join(REPO_ROOT, "certificates");
  const dest = path.join(PUBLIC_CONTENT, "certificates");
  rmrf(dest);
  if (!fs.existsSync(src)) {
    console.warn(`[sync] missing certificates source: ${src}`);
    return;
  }
  copyDir(src, dest, isImage);
  console.log(`[sync] certificates copied`);
}

function syncResume() {
  if (!fs.existsSync(RESUMES_DIR)) return;
  const files = fs.readdirSync(RESUMES_DIR).filter((f) => f.toLowerCase().endsWith(".pdf"));
  if (files.length === 0) return;
  const flowcv = files.find((f) => /flowcv/i.test(f)) ?? files[0];
  const src = path.join(RESUMES_DIR, flowcv);
  const dest = path.join(PUBLIC_DIR, "resume.pdf");
  ensureDir(PUBLIC_DIR);
  fs.copyFileSync(src, dest);
  console.log(`[sync] resume: ${flowcv} -> public/resume.pdf`);
}

function main() {
  ensureDir(PUBLIC_CONTENT);
  syncProjects("client", "client_projects");
  syncProjects("personal", "projects");
  syncCertificates();
  syncResume();
  console.log("[sync] done");
}

main();
