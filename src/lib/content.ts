import { createHash } from "node:crypto";
import { readFile, readdir, realpath } from "node:fs/promises";
import { join, relative, isAbsolute, extname } from "node:path";
import matter from "gray-matter";
import { marked } from "marked";
import { z } from "zod";

const text = z.string().trim().min(1);
const https = z.url({ protocol: /^https$/ });
const schema = z
  .object({
    id: text.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    title: text,
    summary: text,
    pattern: z.object({ id: text, label: text }),
    conditions: z.array(text).min(1),
    patient: z.object({
      label: text,
      age: text,
      sex: text,
      bloodGroup: text,
      diagnosis: text,
      variant: text,
      history: text,
      bleedingScore: text,
    }),
    source: z.object({
      citation: text,
    shortCitation: text,
      doi: text.regex(/^10\.\d{4,9}\/\S+$/),
      pmid: text.regex(/^\d+$/),
      url: https,
      figure: text,
      table: text,
      accessed: z.iso.date(),
    }),
    image: z.object({ file: text, width: z.number().int().positive(), height: z.number().int().positive(), focus: text, alt: text, caption: text }),
    rights: z.object({
      label: text,
      url: https,
      attribution: text,
      holder: text,
      modifications: text,
      evidence: text,
    }),
    labs: z
      .array(
        z.object({ test: text, result: text, units: text, reference: text }),
      )
      .min(1),
    assay: z.object({
      method: text,
      specimen: text,
      control: text,
      lanes: text,
      limitations: text,
    }),
    approval: z
      .object({
        reviewer: text,
        date: z.iso.date(),
        revision: text.regex(/^[a-f0-9]{64}$/),
      })
      .nullable(),
  })
  .strict();

/** The content/build interface: validate records, resolve their source image, and select publication eligibility. */
export async function loadAtlas({ root = process.cwd(), review = false } = {}) {
  const directory = join(root, "content/examples");
  const assets = await realpath(join(root, "docs/research/assets"));
  const names = (await readdir(directory))
    .filter((name) => name.endsWith(".md"))
    .sort();
  const entries = [];
  const ids = new Set<string>();
  for (const name of names) {
    const { data, content } = matter(
      await readFile(join(directory, name), "utf8"),
    );
    const meta = schema.parse(data);
    if (ids.has(meta.id)) throw new Error(`Duplicate example ID: ${meta.id}`);
    ids.add(meta.id);
    const imagePath = await realpath(join(root, meta.image.file));
    const assetRelative = relative(assets, imagePath);
    if (
      assetRelative.startsWith("..") ||
      isAbsolute(assetRelative) ||
      ![".jpg", ".png", ".webp"].includes(extname(imagePath))
    ) {
      throw new Error(
        `${name}: source images must be inside the research asset directory.`,
      );
    }
    const imageBytes = await readFile(imagePath);
    const imageDigest = createHash("sha256").update(imageBytes).digest("hex");
    const { approval, ...scientificContent } = meta;
    const revision = createHash("sha256")
      .update(JSON.stringify(scientificContent))
      .update(content)
      .update(imageBytes)
      .digest("hex");
    if (approval && approval.revision !== revision) {
      throw new Error(
        `${name}: scientific approval does not match this content/image revision.`,
      );
    }
    const html = await marked.parse(content);
    if (review || approval !== null)
      entries.push({
        ...meta,
        body: content,
        html,
        revision,
        imageDigest,
        imageName: imageDigest + extname(imagePath),
        imageBytes,
      });
  }
  return entries;
}

export type AtlasExample = Awaited<ReturnType<typeof loadAtlas>>[number];
