# VWF atlas: first reviewable example and publication foundation

## Problem Statement

Pathology trainees, laboratory professionals, and hematologists need an inspectable visual reference for VWF multimer patterns. Published gels are scattered across literature, and a gel without its patient, laboratory, assay, and source context can be misleading. The scientific editor also needs to review a rendered example rather than approve raw Markdown alone.

## Solution

Build an Astro static atlas with one complete, locally reviewable published example first. Show the authentic figure alongside its source-linked case context, laboratory results, and teaching commentary. Keep the example in draft until the scientific editor approves the actual content and image revision. Establish gallery navigation, image interaction, and a GitHub Pages release path that excludes unapproved material. Expand toward the agreed 6–10 examples after validating this first experience.

## User Stories

1. As a scientific editor, I want to review a rendered draft with its image and case details, so that I can judge its scientific meaning and presentation before publication.
2. As a reader, I want to browse a visual gallery, so that I can find relevant multimer appearances.
3. As a reader, I want filters for multimer pattern and associated condition, so that I can discover examples by either route.
4. As a reader, I want pattern pages with linked examples, so that I can understand that one pattern may have multiple associations.
5. As a reader, I want a stable link to a specific published example, so that I can share its gel and context directly.
6. As a reader, I want to enlarge a gel without losing lane labels or its reference control, so that I can inspect the bands meaningfully.
7. As a reader, I want optional teaching annotations and access to the source image, so that I can distinguish added explanations from the original figure.
8. As a reader, I want a short explanation of what to notice followed by deeper context, so that I can orient myself quickly and investigate further.
9. As a reader, I want patient history, reported diagnosis, and relevant laboratory results attached to their specific example, so that I do not mistake group-level findings for that patient's data.
10. As a reader, I want reported units, reference intervals, inequalities, and time points preserved, so that the results retain their source meaning.
11. As a reader, I want assay, specimen, lane, and control information, so that I can understand method-dependent interpretation and comparison limitations.
12. As a reader, I want absent information and ambiguous source linkage identified explicitly, so that incomplete evidence is visible.
13. As a reader, I want the authors' findings distinguished from atlas teaching commentary, so that I can inspect the basis for each interpretation.
14. As a reader, I want citations and exact figure, panel, table, or passage identifiers, so that I can check the evidence.
15. As a reader, I want figure attribution, license terms, and modification disclosures, so that I can identify the origin and reuse conditions.
16. As a reader, I want mobile layouts, keyboard-operable controls, descriptive image text, and annotations understandable without color alone, so that the atlas is usable in different circumstances.
17. As a scientific editor, I want editable Markdown and structured metadata, so that I can maintain content through GitHub or request assistant edits.
18. As a scientific editor, I want approval associated with a specific content and image revision, so that meaningful changes require renewed review.
19. As a scientific editor, I want unapproved pages, text, images, and downloads excluded from the production artifact, so that a merge cannot expose a draft accidentally.
20. As a maintainer, I want pull-request checks, automatic Pages deployment after merge, and a deployed-site smoke check, so that changes are verifiable and releases can be restored through Git history.

## Implementation Decisions

- Use Astro, readable Markdown, structured metadata, and TypeScript for browser interactions. Generate a static GitHub Pages project site; no application server, database, login, or separate editing application is required.
- Separate multimer pattern descriptions from published examples. Associate conditions with the appropriate pattern/example without assuming a one-to-one relationship. Keep case, control, source, and review records distinct.
- Start with Casonato et al. (2017), DOI 10.1371/journal.pone.0179566, Figure 1, patient 10. Use the verified extraction as a draft, preserving the unmodified source figure, the patient-number linkage, and the Table 1 values. Scientific approval is pending.
- Preserve exact reported laboratory values, units, reference ranges, qualifiers, and time points. Keep source-reported ratios rather than recomputing them from rounded values. Distinguish not reported, not reviewed, not applicable, and ambiguous linkage.
- Retain the entire source figure so its numbered lanes, NP references, and embedded metadata remain accessible. Any focused view must retain access to that original. Store teaching annotations as separate, image-relative overlays that remain aligned at different sizes.
- Support an enlarged-image view with keyboard-operable close and annotation controls, appropriate focus handling, readable labels, and descriptive image text. Default to a restrained, image-first design with clearly separated case details.
- Use explicit local review mode to render drafts with a visible draft indicator. Production generation uses only eligible content and its referenced assets. Draft-only text, images, original downloads, search/filter records, and other generated outputs must remain absent from the production artifact. Local review output must not be deployed.
- The editor's approval records reviewer, review date, and the approved content/image revision. Validate that the recorded approval still applies; changes affecting scientific content, image, source interpretation, or reuse basis invalidate eligibility until reviewed again. The assistant never supplies scientific approval on the editor's behalf.
- Store research assets outside unconditional public-copy directories. Resolve production images from eligible records so excluded content cannot emit assets through broad imports or shared bundles. Shared images are public only when referenced by an approved record with a supported reuse basis.
- Retain CC0 for original code and text, with an explicit third-party exclusion. Attribute Casonato figures under their source-stated CC BY 4.0 terms, link the license and source, and disclose changes. Treat NC-ND candidates as link-only unless a supported reproduction route is separately established.
- Pull requests run content checks, relevant browser checks, type checking, and a production build. Deployment uses a production build after merge and verifies the repository-specific base path, stable direct links, and asset URLs. A local review build cannot become the deployment artifact.
- Rendered draft review may precede scientific approval; public release may not. Capture screenshots and test evidence for review. A public GitHub repository may contain research drafts; exclusion from the deployed site does not make repository contents confidential.

## Testing Decisions

The scientific editor confirmed these three public boundaries during design. There is no existing application or test suite to reuse. Test externally observable behavior and build outputs rather than private component structure or copied implementation calculations.

### Content intake and production generation

- Reject missing required citations, figure provenance, invalid metadata, duplicate stable identifiers, invalid references, and purported approvals that do not match the content/image revision.
- Validate one source-backed example against independently transcribed source values and visible lane mapping. Automated validation establishes structure and consistency, not scientific correctness or legal permission.
- Use distinctive draft-only text and an exclusively draft-owned image in negative fixtures. Verify neither appears anywhere in production pages, generated indexes, copied originals, image derivatives, or bundles. Confirm a local review build includes the draft while production does not.
- Verify a valid approved fixture can render and reference its assets; removing draft content must not break legitimate shared approved assets.

### Rendered reader and editor journey

- Exercise gallery → pattern → stable example navigation, combined filters, clear/reset behavior, and empty results with small documented fixtures. Fixtures supplement testing without pretending additional clinical examples have been reviewed.
- Exercise enlargement, closing by keyboard, focus restoration, and annotation toggling; source imagery and case details remain available. Check that overlays remain aligned at desktop and mobile widths.
- Verify the first draft renders its actual patient data, reported missing information, citation, figure attribution, and review status correctly. Preserve literal inequality signs and units. Inspect screenshots for figure legibility and annotation placement.
- Use keyboard and mobile checks for relevant controls and links. Automated checks complement human accessibility and visual review.

### Production artifact and deployed site

- Build under the GitHub Pages project base path. Check gallery, pattern and example direct links, assets, license/source links, and production draft exclusion.
- Smoke-test the actual deployment after a successful release. Report a successful build separately from successful deployment and public behavior.
- Keep external citation-destination availability separate from deterministic functional CI, so publisher outages do not masquerade as application regressions.

Human scientific review verifies source fidelity, interpretation, caveats, and the content/image revision. Human visual review verifies figure readability and presentation. Automated checks cannot replace either.

## Acceptance Criteria

- [ ] The editor can inspect the first authentic gel example as a rendered draft with all extracted case, assay, laboratory, citation, provenance, and limitation information.
- [ ] The first example preserves the unmodified source image, explicit lane mapping, source-reported values, and a separately toggleable annotation layer.
- [ ] Gallery, pattern navigation, condition/pattern filtering, stable example links, enlargement, and annotation controls work at the agreed reader boundary.
- [ ] Mobile and keyboard review are documented, with screenshots of the rendered example.
- [ ] Content/review validation and production draft exclusion pass both positive and meaningful negative tests.
- [ ] Scientific approval remains pending until the project owner supplies it for the reviewed revision.
- [ ] Third-party image terms and attribution are visible and distinct from project CC0 terms.
- [ ] Pull-request checks and a GitHub Pages project-path production build pass.
- [ ] After scientific approval and merge, the actual deployment passes a public smoke check without exposing drafts or their exclusive assets.

## Out of Scope

- Building all 6–10 initial examples before validating the first one.
- Quizzes, user uploads, automated gel interpretation, patient-specific diagnostic advice, or treatment recommendations.
- Accounts, a backend, a database, an administration interface, or a custom domain.
- Public draft-preview hosting or an assumption that research files in a public repository are private.
- Reproducing restricted figures merely because the article is freely accessible.
- Exhaustive genotypes, a comprehensive systematic review, or rewriting historical source terminology as current consensus without supporting research.

## Further Notes

The product design was confirmed by the project owner on 2026-10-19. Literature API access is working. Six source records are inventoried; the first candidate's actual gel was visually inspected, patient 10's source row checked, and unmodified images retained with provenance and checksums. This spec authorizes building the review experience; it does not mark the scientific content approved or authorize publication of a draft.
