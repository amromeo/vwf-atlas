# Task 1: source-backed rendered draft

Ticket: [#2](https://github.com/amromeo/vwf-atlas/issues/2). Parent specification: [#1](https://github.com/amromeo/vwf-atlas/issues/1).

Implementation review baseline: `4d0b469ed4f315702b213ae18c377ef2943cfb89` (approved design, skills, source inventory, and extraction). First implementation commit: `235f62f6f12ba8c9a175d120df3664dba834c427`. Review date: 2026-10-19.

## Standards

Independent review found no hard violations and no material blocker. It identified one minor possible duplication: MIME-type selection repeated between the media endpoint and the standalone exporter. Resolved by selecting the validated image MIME type once in the content module and passing it to both consumers.

Result: 0 hard violations; 1 minor maintainability finding, resolved.

## Spec

Independent review found no missing, partial, incorrect, or unrequested behavior for ticket #2. The implementation retains all 11 patient-linked laboratory results, source-image bytes, assay and patient-history limitations, source attribution, and pending scientific review. Enlarging/annotating images, gallery filters, and deployment remain in tickets #3–#5.

The reviewer noted that screenshots predated final wording/layout adjustments. Final screenshots were regenerated from the updated self-contained export and checked, including image-first mobile ordering.

Result: 0 Spec findings; screenshot-refresh follow-up completed.

## Validation

- Five content/build checks: real draft review versus production exclusion; revision-bound approval and invalidation; required citation and duplicate-ID rejection; image-change invalidation; a real static build with approved and draft-only fixtures, including source-image output checks.
- One browser journey: actual gel loads at its expected natural width, with draft status, patient-linked VWF antigen and PFA values, the variant, and CC BY 4.0 attribution.
- Astro type checking: zero errors, warnings, or hints.
- Both production and review builds complete. Production currently emits no unapproved example or source-image route.
- The standalone export embeds its image and styling. Browser inspection checks no external asset requests, no page script errors, and no horizontal overflow at 390px, with desktop/mobile screenshots captured.

Scientific approval is pending. These are software and presentation checks; they do not approve the medical interpretation. No GitHub Pages deployment has occurred.

## Reproduce review artifacts

Run `npm run export:review`. The self-contained HTML is written under `artifacts/review/`. Screenshots are local review artifacts and remain outside production output. Review the original gel, patient identification, laboratory transcription, interpretive commentary, caveats, and figure attribution before recording scientific approval for the displayed revision.
