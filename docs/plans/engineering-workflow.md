# VWF atlas engineering workflow

Status: approved engineering workflow. The confirmed product scope, Astro foundation, test boundaries, and publication policy are recorded in `docs/plans/atlas-definition.md`. Live GitHub Pages configuration remains to be verified during implementation.

## Purpose

Build an online atlas of von Willebrand factor (VWF) multimers from published literature and other documented sources, hosted on GitHub Pages. Keep the implementation small and make the scientific evidence inspectable.

## Start with a bounded definition

Use `grill-with-docs` to settle the audience, the learning or reference task, the first set of patterns, and the meaning of an atlas entry. Record agreed terminology in `GLOSSARY.md` and durable decisions in `docs/adr/` as they emerge.

Resolve these before the initial spec:

- Who uses the atlas, and what should they be able to understand or compare?
- Does an entry represent a multimer pattern, a disease association, an individual published example, or a combination with explicit relationships?
- What constitutes enough evidence to publish an entry, and who performs scientific review?
- Which material can be reproduced, and when should we use a link or a clearly identified original schematic instead?
- What is the smallest useful first release?

Completion: a short agreed scope, a candidate entry structure, a source and image policy, and an explicit list of deferred features.

## Research before filling the atlas

Use `research` for bounded questions against primary sources, saving cited findings in `docs/research/`. For example: which papers provide representative patterns and usable figures for the agreed first release? Research feeds the design conversation and specification.

For each candidate entry, capture:

- Stable source identifier or URL, full citation, and exact supporting figure, panel, table, or passage.
- What the source actually reports, separately from our explanatory synthesis.
- Relevant assay and specimen context, controls, image orientation, and limitations when reported; mark missing information explicitly.
- Figure provenance, reuse basis, attribution, and any cropping or modification. Access to a paper alone does not establish permission to reproduce its figures.
- Review status and review date; unresolved claims remain drafts.

Keep published gel images distinct from original educational schematics. Preserve lane labels and source context. Treat apparent size distributions as method dependent; do not imply images from different methods form a calibrated comparison without supporting evidence.

Completion: at least one entry can be traced back to its evidence and has a documented way to display its visual material. Scientific claims in research notes still require scientific review before publication.

## Specify the first release once

Use `to-spec` after the design and evidence questions are resolved. Agree on the test boundaries before publishing the spec to GitHub Issues. State measurable acceptance criteria for both content and software.

The agreed technical direction is Astro, Markdown entries, structured metadata, and TypeScript controls, deployed as a static site with GitHub Actions to GitHub Pages. The first release requires no application server or database.

The repository currently has a CC0 license. Before adding third-party material, define the license boundaries for code, original text, and externally sourced figures. Preserve figure-specific terms and attribution in the published site.

Completion: one issue describes the agreed user behavior, content model, source policy, test boundaries, and first-release exclusions.

## Build small, complete increments

Use `to-tickets` to propose and agree a short sequence of independently verifiable slices. A candidate sequence, to refine after the spec:

1. Publish one scientifically reviewed, source-linked entry through the actual GitHub Pages deployment path.
2. Add the agreed representative entries and navigation, using the same validated entry structure.
3. Add the highest-value discovery or comparison interaction established during design, with accessibility and mobile validation.

Each ticket delivers working user behavior, tests where useful, and appropriate content. Record only dependencies that actually block another ticket.

Use `implement` for one ticket at a time. Its `tdd` step exercises agreed public behavior through one failing test and minimal implementation per cycle. Reuse those agreed test boundaries for later tickets; reopen them when requirements change. Editorial changes receive source and rendering checks appropriate to their impact.

Completion: the ticket's acceptance criteria are demonstrably met and the change has been reviewed.

## Validate at three boundaries

These test boundaries were confirmed during the design interview. Their checks have not yet been implemented:

| Boundary | What to verify | What it cannot establish |
| --- | --- | --- |
| Content intake and build | Required source and provenance fields, unique IDs, valid references, available assets, publication status | Scientific correctness or legal permission merely because a field is filled |
| Rendered user journey | Browse to an entry, read its explanation and citation, follow internal links, operate agreed controls by keyboard and at mobile widths | Whether the source supports the scientific interpretation |
| Published static artifact | Production build, project-path asset URLs, direct entry navigation, and a smoke check after Pages deployment | Human visual quality or scientific review |

CI should catch structural content errors and functional regressions. A human scientific review checks whether claims, labels, caveats, and figures faithfully represent their sources. Visual review checks figure legibility and page layout. Citation-destination checks can run separately from deterministic CI so external outages are distinguishable from site defects.

## Review and release

Use `code-review` against the recorded starting commit for each implementation. It independently checks documented standards and fidelity to the spec. Keep scientific content review explicit alongside those software reviews; code review alone does not establish clinical accuracy.

Use `pr` to present the change with screenshots or functional evidence and its practical merge risk. For the first release, verify GitHub Pages configuration, deployment success, and the public site itself. Later releases use the same checks. Keep the prior deployment recoverable through Git history and redeployment.

Completion: required automated checks pass, scientific content and visual review are recorded, and the public deployment passes its smoke check. Distinguish a successful build from a successful deployment.

## Routine work

- New entry: gather evidence and provenance, write a draft, obtain scientific review, validate the content and rendering, publish through the normal PR process.
- Small well-defined change: use `implement` against the issue's acceptance criteria; expand the spec only when the behavior or content model changes.
- Difficult reproducible bug: use `diagnosing-bugs` to establish a failing reproduction before changing code.
- Incoming reports: use `triage`; implementation tickets already produced by `to-tickets` are ready for work.

Skill names refer to the project-local installation under `.agents/skills/`. Read a skill's full instructions before invoking it. Design is confirmed, the source-backed first example is extracted, and the initial specification is GitHub issue #1. The current step is review of the proposed `to-tickets` breakdown, followed by implementation of a locally rendered draft for scientific review. Public release still requires scientific approval of the reviewed revision.
