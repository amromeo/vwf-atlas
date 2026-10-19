import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";
import { loadAtlas } from "../src/lib/content";

if (process.env.GITHUB_ACTIONS === "true")
  throw new Error(
    "Review exports are local artifacts, not deployment artifacts.",
  );
const entries = await loadAtlas({ review: true });
const base = "/vwf-atlas";
const output = "artifacts/review";
await mkdir(output, { recursive: true });
for (const entry of entries) {
  let html = await readFile(
    join("dist-review", "examples", entry.id, "index.html"),
    "utf8",
  );
  for (const tag of html.matchAll(/<link\b[^>]*href="([^"]+\.css)"[^>]*>/g)) {
    const cssPath = tag[1].replace(`${base}/`, "");
    if (!cssPath.startsWith("_astro/"))
      throw new Error("Unexpected stylesheet in review export.");
    const css = await readFile(join("dist-review", cssPath), "utf8");
    html = html.replace(tag[0], `<style>${css}</style>`);
  }
  const type = entry.imageName.endsWith(".png")
    ? "image/png"
    : entry.imageName.endsWith(".webp")
      ? "image/webp"
      : "image/jpeg";
  const image = `data:${type};base64,${entry.imageBytes.toString("base64")}`;
  html = html.replaceAll(`${base}/media/${entry.imageName}`, image);
  html = html.replaceAll(`href="${base}/"`, 'href="#main"');
  html = html.replace(
    'target="_blank" rel="noopener">Open original image',
    'download="source-figure.jpg">Download original image',
  );
  const path = join(output, `${entry.id}.html`);
  await writeFile(path, html);
  console.log(`Self-contained review copy: ${path}`);
}
