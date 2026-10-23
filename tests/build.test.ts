import assert from "node:assert/strict";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  symlink,
  writeFile,
} from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import { createHash } from "node:crypto";
import matter from "gray-matter";
import { loadAtlas } from "../src/lib/content.ts";

const exec = promisify(execFile);

test(
  "production publishes an approved fixture while excluding every draft-only page and image",
  { timeout: 60000 },
  async () => {
    const root = await mkdtemp(join(tmpdir(), "atlas-build-"));
    try {
      for (const path of [
        "src",
        "astro.config.mjs",
        "package.json",
        "tsconfig.json",
        "content",
        "docs/research/assets",
      ]) {
        await mkdir(join(root, path, ".."), { recursive: true });
        await cp(path, join(root, path), { recursive: true });
      }
      await symlink(
        join(process.cwd(), "node_modules"),
        join(root, "node_modules"),
        "dir",
      );
      const filename = join(
        root,
        "content/examples/casonato-2017-patient-10.md",
      );
      const original = await readFile(filename, "utf8");
      const { content } = matter(original);
      const data = structuredClone(matter(original).data);
      data.id = "approved-fixture";
      data.title = "Approved test fixture";
      await writeFile(filename, matter.stringify(content, data));
      const [candidate] = await loadAtlas({ root, review: true });
      data.approval = {
        reviewer: "Test fixture reviewer",
        date: "2026-10-19",
        revision: candidate.revision,
      };
      await writeFile(filename, matter.stringify(content, data));
      const draft = structuredClone(matter(original).data);
      draft.id = "draft-exclusive-fixture";
      draft.title = "DRAFT_ONLY_TEXT_9f7ce8";
      draft.image.file =
        "docs/research/assets/casonato-2017/pone.0179566.g002.jpg";
      await writeFile(
        join(root, "content/examples/draft.md"),
        matter.stringify(content, draft),
      );
      const draftImage = await readFile(join(root, draft.image.file));
      const draftHash = createHash("sha256").update(draftImage).digest("hex");
      const env = {
        ...process.env,
        ASTRO_TELEMETRY_DISABLED: "1",
        ATLAS_REVIEW: "0",
      };
      await exec(join(process.cwd(), "node_modules/.bin/astro"), ["build"], {
        cwd: root,
        env,
        timeout: 40000,
      });
      const outputs: { path: string; bytes: Buffer }[] = [];
      async function collect(path: string) {
        for (const entry of await readdir(path, { withFileTypes: true })) {
          const full = join(path, entry.name);
          if (entry.isDirectory()) await collect(full);
          else outputs.push({ path: full, bytes: await readFile(full) });
        }
      }
      await collect(join(root, "dist"));
      const homepage = outputs.find(file => file.path === join(root, "dist/index.html"));
      assert.ok(homepage, "The atlas homepage must publish.");
      assert.match(homepage.bytes.toString(), /\/vwf-atlas\/examples\/approved-fixture\//);
      assert.match(homepage.bytes.toString(), /Scientifically reviewed/);
      assert.doesNotMatch(homepage.bytes.toString(), /Design concept switcher|data-variant/);
      assert.doesNotMatch(homepage.bytes.toString(), /\/examples\/casonato-2017-patient-/);
      const example = outputs.find((file) =>
        file.path.endsWith("/examples/approved-fixture/index.html"),
      );
      assert.ok(example, "An approved example must actually publish.");
      assert.match(example.bytes.toString(), /Approved test fixture/);
      assert.match(example.bytes.toString(), /\/vwf-atlas\/media\//);
      assert.ok(
        outputs.some((file) => file.bytes.equals(candidate.imageBytes)),
        "The approved original image must be emitted.",
      );
      for (const file of outputs) {
        assert.ok(!file.path.includes("draft-exclusive-fixture"));
        assert.ok(!file.bytes.includes(Buffer.from("DRAFT_ONLY_TEXT_9f7ce8")));
        assert.ok(!file.bytes.includes(Buffer.from(draftHash)));
        assert.ok(
          !file.bytes.equals(draftImage),
          "The exclusively draft-owned image must not be copied.",
        );
      }
      // Publication can allow a shared image only because an approved record references it.
      draft.image.file = data.image.file;
      await writeFile(
        join(root, "content/examples/draft.md"),
        matter.stringify(content, draft),
      );
      const selected = await loadAtlas({ root });
      assert.equal(selected.length, 1);
      assert.equal(selected[0].id, "approved-fixture");
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  },
);
