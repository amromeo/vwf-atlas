# Selected clinical homepage review

Owner decision: A — Clinical reference (“I like A”). Spec: `docs/plans/clinical-homepage.md`; issue #7. Implementation: `d12c5be`. Fixed point: `9559d7888870c5425ff94250158c076e696ab0dd`; independent review diff: `git diff 9559d78...HEAD`.

## Standards

No material findings.

The selected layout replaces the prototype cleanly: losing variants, query handling, keyboard switching, and comparison styles are removed. The implementation uses shared atlas framing and extracts the existing lane renderer without changing its crop geometry or patient-page labels.

Scientific publication controls remain intact. The homepage uses `loadAtlas` eligibility, preserves draft status during review, and retains attribution and access to the original figure. The archived exploration and recorded owner selection follow the prototype cleanup instructions.

No actionable baseline smells identified.

## Spec

No material findings. The selected clinical homepage uses the shared atlas layout, derives groups and counts from eligible records, preserves source-linked patient evidence, and provides an empty production state when no records are approved.

The shared lane renderer retains the existing crop coordinates, labels, and matched scale. Losing concepts and switcher behavior are removed; the complete exploration remains archived at `9559d78`. Required homepage/browser and production eligibility checks were added.

Publication remains the final pending operational step. Scientific approval and source-PR merge remain separate.

Standards: 0 findings; no blocking issue. Spec: 0 findings; no missing or incorrectly implemented requirements identified.

## Validation

The new homepage browser journey first failed because the prototype switcher was still present. After implementation, the journey passed at desktop and phone widths: browse the five records, open patient 10, inspect laboratory results, return home, expand the original figure, and view its license.

`npm run check` completed with zero errors, warnings, or hints. All seven content/build tests and all three browser journeys passed. The production fixture verifies that the homepage lists an approved record without listing draft patients or prototype controls. Review export and production build succeeded; the real production build contains the empty homepage and excludes all five unapproved records and the source image.

Browser smoke checks of the exported HTML at 1440px, 390px, and 320px confirmed images loaded, patient navigation and home return worked, the full source figure opened, no viewport overflow occurred, and no script errors or prototype switcher remained. An old `?variant=B` link displays the selected homepage with no variant behavior. Desktop and phone screenshots were visually inspected; local artifacts: `artifacts/review/clinical-home-*.png`.

Scientific metadata, laboratory values, source images, and crop coordinates are unchanged. No scientific approval was inferred from the style selection. The original concepts remain captured on `codex/style-exploration` at `9559d78`.
