import { cp, mkdir, rm } from "node:fs/promises";

const outputDirectory = "dist";
const publicEntries = [
  "index.html",
  "404.html",
  "_headers",
  "robots.txt",
  "assets",
  "portfolio"
];

await rm(outputDirectory, { force: true, recursive: true });
await mkdir(outputDirectory, { recursive: true });

for (const entry of publicEntries) {
  await cp(entry, `${outputDirectory}/${entry}`, { recursive: true });
}

console.log(`Build statis selesai: ${publicEntries.length} entri disalin ke ${outputDirectory}/.`);
