# VWF Atlas

A literature-based visual atlas of von Willebrand factor multimer patterns, with the patient, laboratory, assay, and source context retained alongside each published example.

The first source-backed example is implemented as a **draft for scientific review**. It has not been approved or deployed. Image enlargement/annotation controls, gallery filters, and Pages deployment are subsequent tickets #3–#5.

## Development

Use Node.js 22.22 or newer (Node 24 is verified), and the existing checkout. Install the pinned dependencies with `npm ci`. If a restricted cloud home directory prevents npm cache writes, set `npm_config_cache=/tmp/vwf-atlas-npm-cache` for installation.

```sh
npm run dev
```

Development explicitly enables draft review. Astro prints the development address. The `--ignore-lock` flag keeps this server in the foreground, including in environments where Astro detects an agent and would otherwise start a daemon.

```sh
npm test
npm run check
npm run test:browser
npm run build
```

Browser checks use system Chromium when present. Otherwise install Playwright's Chromium with `npx playwright install chromium`, or set `CHROMIUM_EXECUTABLE_PATH` to an existing installation. Browser tests launch their own review server when one is not already running.

## Review a rendered example

```sh
npm run export:review
```

Open `artifacts/review/casonato-2017-patient-10.html` in a browser. It is a self-contained review copy with embedded styling and the original image, usable without the dev server. It contains draft material and is not a deployment artifact. Review exports and build outputs are ignored by Git. Regenerate the copy after content or presentation changes.

`npm run build:review` creates the complete draft-inclusive site in `dist-review`. `npm run preview:review` serves that build locally. Review builds/exports are refused in GitHub Actions. `npm run build` always uses the production configuration unless an explicit local `ATLAS_REVIEW=1` is set; deployment must use production output only. A production build currently contains the landing page and no unapproved example images.

## Content and scientific approval

Edit the Markdown/frontmatter records in `content/examples/`. The first example comes from the checked extraction in `docs/research/examples/`; the source inventory and figure-specific provenance records remain under `docs/research/`.

Frontmatter contains patient context, source locators, assay information, the source image, reuse terms, and laboratory values. Preserve result strings such as `>300` and source-specific reference intervals. Keep authors' findings separate from the atlas teaching commentary in the Markdown body. Use “not reported” only after the relevant source has actually been inspected; otherwise use “not reviewed.”

An example with `approval: null` is a draft. The review page's **Content and image revision** section identifies the revision being reviewed. After the project owner explicitly approves that content and image, record their reviewer name, ISO review date, and the displayed revision under `approval`. The assistant must not infer scientific approval from permission to build, a successful test, or a request for a visual change. Scientific metadata, prose, source-image, or reuse-information changes require a matching renewed approval; an outdated approval stops the build.

Source images are kept outside automatic public-copy directories. Only images referenced by eligible records receive production routes. Tests exercise approved and draft records together and scan generated files for draft-only text and imagery. This controls deployed-site visibility; files committed to a public repository are still public.

## Licenses

Original project code and text use the repository's CC0 grant. **Third-party figures are excluded from that grant.** The retained Casonato figures are under CC BY 4.0, with full attribution and checksums in `docs/research/assets/casonato-2017/README.md`. The rendered page displays the figure's source, terms, and modifications. Other source figures require their own documented reuse basis.
