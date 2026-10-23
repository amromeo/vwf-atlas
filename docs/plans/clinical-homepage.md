# Selected homepage — clinical reference

The owner selected option A from issue #7 with “I like A”. Adopt its clinical-reference hierarchy as the atlas homepage: a pattern sidebar, compact patient table, and featured pattern with patient and laboratory evidence. This is approval of the visual direction, not scientific approval of any patient record.

## Acceptance criteria

- Replace the temporary figure-review landing page with the selected clinical homepage, using the existing shared atlas header and footer.
- Derive pattern groups, patient rows, source counts, and featured evidence from the eligible records returned by `loadAtlas`. Do not invent additional patterns or hardcode five records into the final homepage.
- Retain patient-specific crop windows and the normal reference at matched scale, original lane labels, attribution, full original figure, source links, and case/laboratory context. Share the lane renderer with existing patient pages without changing their clinical content or crop coordinates.
- Every listed patient opens their individual record and can return to the atlas. Keep the table usable at phone widths without widening the viewport.
- Remove the losing variants, prototype styles, keyboard switching, variant URL handling, and comparison bar from the implementation. Preserve the full prototype on `codex/style-exploration` at `9559d78` as the primary design source. Old query links may still display the selected homepage, with no variant behavior.
- Render the selected layout in both review and production modes. Review mode retains draft labels and noindex metadata. Production uses only scientifically eligible records; no approved records means an honest empty state with no source image or draft patient links.
- Publish the selected homepage to the already authorized public `review-site` branch, preserving its previous deployment as parent. Do not merge the source PR or change scientific approval as part of the style choice.

## Verification boundaries

Reuse the already agreed boundaries: rendered reader journey and published static artifact. Add one homepage-to-patient browser journey at desktop and phone widths. Extend the existing approved/draft build fixture to check that the homepage actually lists the approved record and omits draft-only links and prototype UI. Run existing patient journeys, content validation, type checking, review export, and production build. Visually inspect the exported homepage at desktop and phone sizes before publication.

No new scientific metadata, literature research, filtering/search feature, or content approval is part of this change.
