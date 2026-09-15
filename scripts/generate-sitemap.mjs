import { writeFile } from "node:fs/promises";

const siteUrl = process.env.SITE_URL;

if (!siteUrl || !/^https:\/\/[^/]+/.test(siteUrl)) {
  console.error("Set SITE_URL ke domain HTTPS produksi sebelum membuat sitemap.");
  process.exit(1);
}

const base = siteUrl.replace(/\/+$/, "");
const routes = [
  "/",
  "/portfolio/restaurant-modern/",
  "/portfolio/restaurant-editorial/",
  "/portfolio/law-firm/",
  "/portfolio/company-profile/",
  "/portfolio/business-system/"
];

const urls = routes
  .map((route) => "  <url><loc>" + base + route + "</loc></url>")
  .join("\n");

const sitemap =
  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n" +
  "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">\n" +
  urls +
  "\n</urlset>\n";

await writeFile("sitemap.xml", sitemap, "utf8");
console.log("sitemap.xml dibuat untuk " + base);
