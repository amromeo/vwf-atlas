# Homepage style exploration review

Issue: #7. Source branch: `codex/style-exploration`. Starting point: `e6daf66f6f3d3da73ed17806891064a9ca73629c`. Independent review diff: `git diff e6daf66...HEAD`, implementation commits `2424162` and `1be2a98`.

## Standards

No material findings.

The changes follow the documented prototype workflow: three structurally different concepts share the existing homepage route, the switcher exposes and preserves the selected variant, editable controls are protected from keyboard interception, and the prototype is gated behind review mode.

The scientific safeguards remain intact: patient records and source images are unchanged, draft status remains visible, crop windows retain matched scaling and lane labels, and original figures and licensing remain accessible.

No actionable baseline smells identified under the explicit throwaway-prototype constraints.

## Spec

No material findings. The implementation provides three structurally distinct homepage concepts using the existing source-backed records, a URL-driven floating switcher, patient context and laboratory findings, attribution, labeled patient/reference lanes, and access to the original figure.

The prototype remains review-only on the exploration branch, and the owner's preference is explicitly pending. Existing patient pages remain accessible. The code does not add scientific approval, new clinical claims, or unrelated functionality.

Standards: 0 findings; no blocking issue. Spec: 0 findings; no missing or incorrectly implemented requirements identified.

## Verification

- `npm run check`: zero errors, warnings, or hints.
- `npm test`: all seven content/build tests passed.
- `npm run test:browser`: both existing patient review journeys passed.
- `npm run export:review` and `npm run build`: succeeded.
- Inspected the production artifact: no prototype markup, switcher, or draft patient data.
- Chromium checks of exported HTML at 1440px and 390px: all three variants displayed individually, no viewport overflow, all images loaded, complete source figure expanded, switcher cycled and wrapped, URL selection survived reload and browser back, arrow-key cycling worked, patient navigation and home return succeeded, no browser script errors.
- Visually inspected screenshots of desktop Clinical reference and Editorial atlas and mobile Visual gallery. Screenshots for all six variant/width combinations are local artifacts under `artifacts/review/concept-*.png`.

No new permanent tests were added for the throwaway UI, following the prototype skill. Owner preference and scientific approval remain pending.
