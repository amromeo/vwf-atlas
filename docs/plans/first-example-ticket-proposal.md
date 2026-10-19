# First-example ticket proposal

Status: approved by the project owner on 2026-10-19 and published as GitHub issues #2–#5. The parent specification is issue #1 and `first-example-spec.md`. Native blocking relationships and parent/child links are recorded on GitHub.

## 1. Review one source-backed example as a rendered page

**Blocked by:** None.

**What it delivers:** The scientific editor can open a locally rendered Casonato patient 10 draft with its authentic figure, clinical context, reported laboratory values, method details, source evidence, license, and visible review status. Production generation excludes the unapproved example and its exclusive assets.

- [ ] Establish the minimal Astro/Markdown/metadata workflow needed to render this specific example.
- [ ] Preserve source labels, patient-number linkage, reported values, missing context, and original figure access.
- [ ] Display full attribution and figure-specific terms distinct from the project license.
- [ ] Separate local draft review from production eligibility, including assets and any original download.
- [ ] Validate source-required metadata and revision-bound approval without assigning scientific approval.
- [ ] Demonstrate the draft page at desktop and mobile widths with screenshots and relevant content/build checks.

## 2. Inspect and annotate the example accessibly

**Blocked by:** 1.

**What it delivers:** The reader/editor can enlarge the source figure, toggle independently stored teaching annotations, and inspect patient/control context using keyboard and mobile controls.

- [ ] Add image enlargement, keyboard close, focus handling, and return to the invoking control.
- [ ] Align the separate annotation overlay across image sizes; preserve unmodified source access.
- [ ] Use descriptive text and label shapes/text that do not rely only on color.
- [ ] Confirm imagery remains legible; proposed scientific labels remain draft until editor review.
- [ ] Exercise the actual interactions in browser checks and capture review screenshots.

## 3. Find examples through the visual atlas

**Blocked by:** 1. Can be developed independently of 2.

**What it delivers:** A visual gallery leads through pattern pages to stable example links, with pattern/condition filters and clear empty states. Local review can show drafts; production lists eligible content only.

- [ ] Keep multimer patterns, associated conditions, published examples, and case context distinct.
- [ ] Implement working combined filters, reset, and empty-results behavior.
- [ ] Provide stable example navigation and a restrained responsive layout.
- [ ] Use small test fixtures to exercise multiple patterns/conditions without claiming additional scientific approvals.
- [ ] Confirm draft records and exclusive thumbnails/index content remain absent from the production output.

## 4. Release the reviewed example through GitHub Pages

**Blocked by:** 2 and 3. Public release additionally requires scientific editor approval of the actual content/image revision.

**What it delivers:** Checked pull requests and a production-only deployment workflow publish the reviewed example under the repository's GitHub Pages path; the actual public site is smoke-tested.

- [ ] Run relevant content, browser, type, and production-build checks on pull requests.
- [ ] Keep local review output out of the deployment artifact; verify draft text and assets stay excluded.
- [ ] Validate scientific approval and image reuse metadata for the eligible revision before release.
- [ ] Configure the project base path and verify direct page and image links.
- [ ] Deploy after merge, inspect workflow results, and smoke-test the actual public site.
- [ ] Record screenshots, test evidence, deployment outcome, and a recoverable prior release.

## Review of this breakdown

The project owner approved the granularity and dependencies. Work one ticket at a time, beginning with issue #2. Scientific review remains pending until the rendered content and image revision is reviewed.

## Published tickets

- [Review one source-backed example as a rendered page](https://github.com/amromeo/vwf-atlas/issues/2)
- [Inspect and annotate the example accessibly](https://github.com/amromeo/vwf-atlas/issues/3)
- [Find examples through the visual atlas](https://github.com/amromeo/vwf-atlas/issues/4)
- [Release the reviewed example through GitHub Pages](https://github.com/amromeo/vwf-atlas/issues/5)
