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
  const image = `data:${entry.imageType};base64,${entry.imageBytes.toString("base64")}`;
  html = html.replaceAll(`${base}/media/${entry.imageName}`, image);
  html = html.replaceAll(`href="${base}/"`, 'href="#main"');
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
  const path = join(output, `${entry.id}.html`);
  await writeFile(path, html);
  console.log(`Self-contained review copy: ${path}`);
}

const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
const ordered = [...entries].sort(
  (a, b) => a.image.crop.patient.x - b.image.crop.patient.x,
);
await writeFile(
  join(output, "index.html"),
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>VWF Atlas — patient review</title><style>body{max-width:850px;margin:60px auto;padding:0 24px;font-family:system-ui;color:#183442;background:#fbfcfb}h1{font-family:Georgia,serif;font-weight:400}li{padding:20px;border:1px solid #dce3e2;border-radius:6px;margin:15px 0;list-style:none;background:white}ul{padding:0}a{color:#176a68;font-size:1.15rem}p{line-height:1.6}small{color:#617078}</style></head><body><p>VWF ATLAS · DRAFT REVIEW</p><h1>One figure. Individual patient records.</h1><p>Each page shows the patient's own source lane beside a separately labeled normal-plasma reference. The complete unmodified figure is available on every page. All interpretations remain drafts.</p><ul>${ordered.map((e) => `<li><a href="${escape(e.id)}.html">${escape(e.patient.label)}</a><p>${escape(e.patient.age)} · ${escape(e.patient.sex)} · ${escape(e.patient.variant)}</p><small>${escape(e.source.shortCitation)} · ${escape(e.source.figure)}</small></li>`).join("")}</ul><p>Extract the complete review bundle into one folder to keep patient-to-patient links working. Source figures retain their own license and attribution.</p></body></html>`,
);
console.log(`Patient review index: ${output}/index.html`);
