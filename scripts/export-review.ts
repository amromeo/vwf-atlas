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
for (const document of [
  { source: "index.html", target: "index.html" },
  ...entries.map(entry => ({ source: join("examples", entry.id, "index.html"), target: `${entry.id}.html` })),
]) {
  let html = await readFile(join("dist-review", document.source), "utf8");
  for (const tag of html.matchAll(/<link\b[^>]*href="([^"]+\.css)"[^>]*>/g)) {
    const cssPath = tag[1].replace(`${base}/`, "");
    if (!cssPath.startsWith("_astro/"))
      throw new Error("Unexpected stylesheet in review export.");
    const css = await readFile(join("dist-review", cssPath), "utf8");
    html = html.replace(tag[0], `<style>${css}</style>`);
  }
  for (const entry of entries) {
    const image = `data:${entry.imageType};base64,${entry.imageBytes.toString("base64")}`;
    html = html.replaceAll(`${base}/media/${entry.imageName}`, image);
  }
  html = html.replaceAll(`href="${base}/"`, 'href="index.html"');
  html = html.replaceAll(`href="${base}/?variant=`, 'href="index.html?variant=');
  for (const sibling of entries) {
    html = html.replaceAll(
      `href="${base}/examples/${sibling.id}/"`,
      `href="${sibling.id}.html"`,
    );
  }
  html = html.replace(
    'target="_blank" rel="noopener">Open original image',
    'download="source-figure.jpg">Download original image',
  );
  const path = join(output, document.target);
  await writeFile(path, html);
  console.log(`Self-contained review copy: ${path}`);
}
