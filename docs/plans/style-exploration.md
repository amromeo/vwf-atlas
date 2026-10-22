# Homepage style exploration — issue #7

Question: which homepage hierarchy should guide the VWF atlas? The owner requested deployed options after confirming that the patient-review landing page was temporary.

This throwaway exploration uses the existing homepage in review mode, with three shareable `?variant=` values:

- A — Clinical reference: collection sidebar, compact patient table, featured pattern with evidence.
- B — Visual gallery: image-led patient cards, followed by a detailed featured record preview.
- C — Editorial atlas: prominent type, a large source-image plate, and a numbered collection index.

All three use the same five source-backed records and the same patient 10 featured context, selected laboratory results, assay information, attribution, and full original figure. Existing patient detail pages remain available from every concept. No new clinical claims, images, approvals, placeholder pattern groups, search, or comparison functionality are introduced.

Use the floating switcher or left/right keyboard arrows. Variant choice is reflected in the URL and survives reload; browser back/forward restores it. No preference is persisted or inferred. The owner may choose one or combine elements before any production design is implemented.

Run `npm run prototype` for local review. `npm run export:review` exports the homepage and existing patient pages as self-contained HTML. The normal production build renders neither the prototype nor its switcher. The source is captured on `codex/style-exploration`, not main; generated pages are published only on the already authorized `review-site` branch, retaining its prior commit as parent.

This is design exploration, so the installed prototype skill's instruction to skip new tests applies. Verification uses rendering, browser interaction, artifact inspection, and existing regression checks rather than adding permanent prototype tests. Scientific approval remains a separate step.

Preference: pending owner review. No concept has been selected or applied as the final atlas design.
