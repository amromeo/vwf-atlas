import assert from "node:assert/strict";
import {
  mkdtemp,
  mkdir,
  writeFile,
  readFile,
  copyFile,
  rm,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { test } from "node:test";
import matter from "gray-matter";
import { loadAtlas } from "../src/lib/content.ts";

test("a source-backed draft is available for review but excluded from production", async () => {
  const review = await loadAtlas({ review: true });
  const example = review.find(
    (entry) => entry.id === "casonato-2017-patient-10",
  );
  assert.ok(example, "The actual patient-linked example should be reviewable.");
  assert.equal(example.source.doi, "10.1371/journal.pone.0179566");
  assert.equal(example.patient.label, "Patient 10");
  assert.ok(
    example.labs.some(
      (row) =>
        row.test === "VWF:Ag" && row.result === "44.6" && row.units === "U/dL",
    ),
  );
  assert.equal(example.approval, null);
  assert.deepEqual(await loadAtlas({ review: false }), []);
});

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "atlas-content-"));
  const assets = join(root, "docs/research/assets");
  const directory = join(root, "content/examples");
  await mkdir(assets, { recursive: true });
  await mkdir(directory, { recursive: true });
  const parsed = matter(
    await readFile("content/examples/casonato-2017-patient-10.md", "utf8"),
  );
  const { content } = parsed;
  const data = structuredClone(parsed.data);
  data.id = "test-example";
  data.image.file = "docs/research/assets/figure.jpg";
  await copyFile(
    "docs/research/assets/casonato-2017/pone.0179566.g001.jpg",
    join(assets, "figure.jpg"),
  );
  const write = () =>
    writeFile(join(directory, "example.md"), matter.stringify(content, data));
  await write();
  return { root, data, content, directory, write };
}

test("only an approval for the reviewed revision makes an example eligible; later changes invalidate it", async () => {
  const f = await fixture();
  try {
    const [draft] = await loadAtlas({ root: f.root, review: true });
    f.data.approval = {
      reviewer: "Test fixture reviewer",
      date: "2026-10-19",
      revision: draft.revision,
    };
    await f.write();
    assert.equal((await loadAtlas({ root: f.root }))[0]?.id, "test-example");
    f.data.labs[4].result = "99.9";
    await f.write();
    await assert.rejects(loadAtlas({ root: f.root }), /approval.*revision/i);
  } finally {
    await rm(f.root, { recursive: true, force: true });
  }
});

test("missing source citations and duplicate example identities stop content intake", async () => {
  const f = await fixture();
  try {
    const original = f.data.source.citation;
    f.data.source.citation = "";
    await f.write();
    await assert.rejects(loadAtlas({ root: f.root, review: true }), /citation/);
    f.data.source.citation = original;
    await f.write();
    await copyFile(
      join(f.directory, "example.md"),
      join(f.directory, "duplicate.md"),
    );
    await assert.rejects(
      loadAtlas({ root: f.root, review: true }),
      /Duplicate example ID/,
    );
  } finally {
    await rm(f.root, { recursive: true, force: true });
  }
});

test("changing the original image invalidates an existing review", async () => {
  const f = await fixture();
  try {
    const [draft] = await loadAtlas({ root: f.root, review: true });
    f.data.approval = {
      reviewer: "Test fixture reviewer",
      date: "2026-10-19",
      revision: draft.revision,
    };
    await f.write();
    await copyFile(
      "docs/research/assets/casonato-2017/pone.0179566.g002.jpg",
      join(f.root, f.data.image.file),
    );
    await assert.rejects(loadAtlas({ root: f.root }), /approval.*revision/i);
  } finally {
    await rm(f.root, { recursive: true, force: true });
  }
});

test("each pictured Figure 1 patient has their own source-linked case and bounded crop", async () => {
  const examples = await loadAtlas({ review: true });
  const expected = [
    {
      id: 17,
      age: "24 years",
      variant: "p.V1316M",
      antigen: "35.9",
      platelets: "65",
    },
    {
      id: 18,
      age: "1 year",
      variant: "p.V1316M",
      antigen: "142.9",
      platelets: "28",
    },
    {
      id: 10,
      age: "70 years",
      variant: "p.R1308C",
      antigen: "44.6",
      platelets: "168",
    },
    {
      id: 9,
      age: "71 years",
      variant: "p.R1308C",
      antigen: "81.2",
      platelets: "56",
    },
    {
      id: 19,
      age: "44 years",
      variant: "p.R1306W",
      antigen: "44.7",
      platelets: "116",
    },
  ];
  assert.equal(examples.length, 5);
  for (const patient of expected) {
    const entry = examples.find(
      (e) => e.id === `casonato-2017-patient-${patient.id}`,
    );
    assert.ok(entry);
    assert.equal(entry.patient.age, patient.age);
    assert.equal(entry.patient.variant, patient.variant);
    assert.equal(
      entry.labs.find((r) => r.test === "VWF:Ag")?.result,
      patient.antigen,
    );
    assert.equal(
      entry.labs.find((r) => r.test === "Platelet count")?.result,
      patient.platelets,
    );
    assert.equal(entry.approval, null);
    assert.ok(entry.image.crop.patient.x !== entry.image.crop.control.x);
    for (const rect of [entry.image.crop.patient, entry.image.crop.control]) {
      assert.ok(rect.x >= 0 && rect.y >= 0);
      assert.ok(rect.x + rect.width <= entry.image.width);
      assert.ok(rect.y + rect.height <= entry.image.height);
    }
  }
});

test("out-of-bounds crops are rejected and changing a valid crop invalidates approval", async () => {
  const f = await fixture();
  try {
    const [draft] = await loadAtlas({ root: f.root, review: true });
    const original = f.data.image.crop.patient.x;
    f.data.image.crop.patient.x = 744;
    await f.write();
    await assert.rejects(
      loadAtlas({ root: f.root, review: true }),
      /Crop rectangle exceeds/,
    );
    f.data.image.crop.patient.x = original;
    f.data.approval = {
      reviewer: "Test fixture reviewer",
      date: "2026-10-19",
      revision: draft.revision,
    };
    await f.write();
    assert.equal((await loadAtlas({ root: f.root })).length, 1);
    f.data.image.crop.patient.x += 1;
    await f.write();
    await assert.rejects(loadAtlas({ root: f.root }), /approval.*revision/i);
  } finally {
    await rm(f.root, { recursive: true, force: true });
  }
});
