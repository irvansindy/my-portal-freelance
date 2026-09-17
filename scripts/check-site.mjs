import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const errors = [];

const requiredFiles = [
  "index.html",
  "404.html",
  "DESIGN.md",
  "docs/CONTENT.md",
  "docs/DEVELOPMENT.md",
  "ROADMAP.md",
  "CHANGELOG.md",
  "robots.txt",
  "_headers",
  "assets/css/style.css",
  "assets/css/portfolio.css",
  "assets/css/404.css",
  "assets/js/main.js",
  "assets/img/favicon.svg",
  "assets/img/social-card.svg"
];

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if ([".git", ".wrangler", "dist", "node_modules"].includes(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await collectFiles(absolute));
    else files.push(absolute);
  }

  return files;
}

function report(file, message) {
  errors.push(path.relative(root, file) + ": " + message);
}

function targetPath(htmlFile, reference) {
  const withoutFragment = reference.split("#")[0].split("?")[0];
  if (!withoutFragment) return htmlFile;

  const absolute = withoutFragment.startsWith("/")
    ? path.join(root, withoutFragment)
    : path.resolve(path.dirname(htmlFile), withoutFragment);

  if (withoutFragment.endsWith("/")) return path.join(absolute, "index.html");
  return absolute;
}

for (const file of requiredFiles) {
  try {
    await access(path.join(root, file));
  } catch {
    errors.push(file + ": file wajib tidak ditemukan");
  }
}

const files = await collectFiles(root);
const textExtensions = new Set([".html", ".css", ".js", ".mjs", ".md", ".json", ".txt", ".xml", ".svg"]);
const textFiles = files.filter((file) => textExtensions.has(path.extname(file)));

for (const file of textFiles) {
  const source = await readFile(file, "utf8");
  if (source.includes("\u2014")) report(file, "mengandung em dash");
  if (!file.endsWith("check-site.mjs") && /Ganti file ini|PORTFOLIO DEMO/.test(source)) {
    report(file, "mengandung placeholder portofolio lama");
  }
}

const htmlFiles = files.filter((file) => path.extname(file) === ".html");

for (const file of htmlFiles) {
  const source = await readFile(file, "utf8");
  const relative = path.relative(root, file);

  if (!/<html lang="id">/.test(source)) report(file, "atribut bahasa Indonesia tidak ditemukan");
  if (!/<meta name="viewport" content="width=device-width, initial-scale=1">/.test(source)) report(file, "viewport metadata tidak lengkap");
  if (!/<meta name="description" content="[^"]+">/.test(source)) report(file, "meta description tidak ditemukan");
  if (!/<meta name="theme-color" content="#[0-9a-fA-F]{6}">/.test(source)) report(file, "theme color tidak valid");
  if (!/<title>[^<]+<\/title>/.test(source)) report(file, "title tidak ditemukan");
  if (!/rel="icon"/.test(source)) report(file, "favicon tidak direferensikan");
  if (/href="#"/.test(source)) report(file, "tautan mati href=\"#\" ditemukan");

  const ids = [...source.matchAll(/\sid="([^"]+)"/g)].map((match) => match[1]);
  const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicates.length) report(file, "duplicate ID: " + [...new Set(duplicates)].join(", "));

  if (relative !== "404.html" && !/rel="canonical"/.test(source)) {
    report(file, "canonical link tidak ditemukan");
  }

  const references = [...source.matchAll(/(?:href|src)="([^"]+)"/g)].map((match) => match[1]);
  for (const reference of references) {
    if (/^(?:https?:|mailto:|tel:|data:)/.test(reference)) continue;

    if (reference.startsWith("#")) {
      const id = reference.slice(1);
      if (id && !ids.includes(id)) report(file, "anchor lokal tidak ditemukan: " + reference);
      continue;
    }

    const target = targetPath(file, reference);
    try {
      await access(target);
    } catch {
      report(file, "target lokal tidak ditemukan: " + reference);
    }

    const fragment = reference.includes("#") ? reference.split("#")[1] : "";
    if (fragment && target.endsWith(".html")) {
      const targetSource = await readFile(target, "utf8");
      if (!new RegExp("\\sid=\\\"" + fragment.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\\"").test(targetSource)) {
        report(file, "anchor target tidak ditemukan: " + reference);
      }
    }
  }

  for (const match of source.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch {
      report(file, "structured data bukan JSON yang valid");
    }
  }
}

const homepage = await readFile(path.join(root, "index.html"), "utf8");
if (!/id="wa-link" href="https:\/\/wa\.me\//.test(homepage)) errors.push("index.html: fallback WhatsApp tidak valid");
if (!/id="email-link" href="mailto:/.test(homepage)) errors.push("index.html: fallback email tidak valid");
if (!/web \+ mobile (?:developer|development)/i.test(homepage)) errors.push("index.html: positioning web dan mobile tidak ditemukan");
if (!/deployment/i.test(homepage) || !/maintenance server/i.test(homepage)) {
  errors.push("index.html: scope deployment dan maintenance server tidak ditemukan");
}

if (errors.length) {
  console.error("Pemeriksaan gagal:\n");
  errors.forEach((error) => console.error("- " + error));
  process.exitCode = 1;
} else {
  console.log("Pemeriksaan struktur situs lulus untuk " + htmlFiles.length + " halaman HTML.");
}
