# Individual patient pages and source-image crop views

Task: [#8](https://github.com/amromeo/vwf-atlas/issues/8). Separate requested visual-style exploration: [#7](https://github.com/amromeo/vwf-atlas/issues/7).

Review baseline: `976fd78`. Implementation: `71454be706904b3097f9de09a45ae76efbac3d63`. Source: Casonato et al. (2017), Figure 1 and Table 1. Review date: 2026-10-19.

## Standards

Independent review found 0 documented-standard violations and 0 actionable heuristic findings. The patient records were compared directly with the original Table 1 XML. CSS crop windows preserve original source pixels, one vertical scale, lane labels, and full-figure access. Figure attribution, modification disclosures, draft exclusion, and revision-bound approval follow the approved project policies.

## Spec

Independent review found 0 findings for task #8. All five pictured patients have stable independent pages, their own case and laboratory data, labeled NP references, source-image crop windows, complete-figure access, sibling links, and self-contained HTML review copies. Source NA labels are retained as not assessed. Patient 19's source-reported ratio discrepancy is preserved and flagged. The visual-style comparison remains a separate queued task.

## Verification

- All 55 laboratory result strings were compared against the five original Table 1 rows. Demographics, family identifiers, and variants were checked.
- Seven content/build tests pass, including bounds rejection and invalidation of an approval when crop metadata changes.
- Two browser journeys pass, including all five pages, their patient-specific results, focused lanes, sibling links, and full-figure access.
- Astro check reports no errors, warnings, or hints. Production and draft-review builds pass. Production emits no unapproved patient pages or source-image routes.
- Source-image screenshots for all five patients were inspected; original lane labels and matching vertical scale are retained. Patient 10 desktop/mobile views were refreshed, with no horizontal mobile overflow.
- The source JPEG SHA-256 remains `d974da60161b50738a1198252f6f8aa449d1502cf98887054f4f6ede76771a2c`. No cropped raster replacements or synthetic bands were created.
- A local ZIP review bundle contains five self-contained patient pages plus an index and instructions. Extract the complete folder and open `index.html` to keep navigation working.

All scientific approvals remain null. These checks establish source transcription and software behavior, not scientific approval. No deployment has occurred.
