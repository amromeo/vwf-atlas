# VWF atlas definition

Status: confirmed by the project owner on 2026-10-19. The first representative example is extracted; specification is recorded and the implementation ticket breakdown is awaiting review.

## Confirmed decisions

### Audience and purpose

The primary audience is pathology trainees, laboratory professionals, and hematologists. The atlas is a visual teaching and reference resource for recognizing multimer patterns and understanding their significance. Include assay context to explain why similar-looking patterns may have different interpretations.

### Visual material

Authentic published multimer gels are the core visual material, supplemented by explanatory diagrams. Prioritize cited examples with documented reuse permission. Clearly label original schematics. Link to source figures when reproduction is not permitted.

### Scientific ownership

The project owner is the scientific editor. The assistant helps locate sources, draft explanations, organize evidence, and implement the site. Entries remain drafts until the scientific editor approves their interpretation and supporting material.

### Entry organization

Organize entries around multimer patterns. Each entry describes a pattern, includes one or more published examples, and links to associated conditions. A pattern may occur in multiple conditions, and a condition may have varied appearances. Disease associations provide another route to finding entries.

### First-release coverage

Start with roughly 6–10 curated published examples covering normal appearances, major inherited VWD-associated patterns, and selected acquired abnormalities. This is an example count, not a requirement for 6–10 distinct pattern entries. Prioritize educational value and available evidence; expand coverage as suitable material becomes available.

### Primary experience

Users browse visual examples and open annotated explanations. Show the relevant normal control alongside an abnormal example when available, with useful labels and source details. Quizzes and user-uploaded gel interpretation are deferred beyond the first release.

### Entry explanations and example context

Each entry leads with a short explanation of what to notice, followed by associated conditions, interpretive pitfalls, assay context, and references. Include annotations on example images.

Each literature image also carries the important information reported for its specific example: patient history, other coagulation study results, the assay used, and other relevant publication metadata. Keep this example-specific context attached to the image rather than generalizing it across the pattern entry.

### Evidence and source selection

Prefer original publications for gel examples and reported findings. Images in review articles are eligible too. Use authoritative reviews and guidelines for broader explanations. One strong source may support an example; broader claims may require additional references. Identify supporting sources for each example and substantive claim. Figure reuse terms remain image-specific regardless of publication type.

### Incomplete context and controls

A valuable example with missing method details or no normal control may be included when its teaching point remains defensible and the scientific editor approves it. State missing information explicitly. Prefer controls from the same experiment; identify any separate reference image clearly so readers cannot mistake it for a matched control.

### Case metadata and extraction

For each example, capture patient history and presentation, diagnosis as reported, relevant laboratory results with units and reference ranges when available, assay details, lane identities, and the exact source figure and panel. Mark unavailable details as “not reported.” Distinguish the publication authors' interpretation from atlas teaching commentary. Do not infer patient-specific data from general descriptions elsewhere in a paper.

### Image interaction

Readers can enlarge images and toggle atlas annotations while retaining access to the source version. Preserve the source image, document crops and modifications, and keep teaching labels in a separate layer.

### Navigation and links

The homepage is a visual gallery with filters for multimer pattern and associated condition. Pattern pages contain individual published examples and their case details. Each published example has a stable direct link for sharing a particular gel and its context.

### Content editing

Entries live in readable Markdown files with structured metadata in the repository. The scientific editor can request assistant edits or edit through GitHub. Prose, case details, citations, and image records remain editable without a separate administration application.

### Visual style and accessibility

Use a restrained, image-first reference layout with readable typography, neutral backgrounds, large gels, and clearly separated case details. Support mobile screens, keyboard controls, descriptive image text, and annotations that remain understandable without relying on color alone.

### Approval records and draft visibility

Each example records the scientific editor's approval, review date, and image reuse basis. Scientific content, image, or source-interpretation changes require renewed review. Exclude drafts from the public site, including their images and downloadable content. This exclusion concerns the deployed site; it does not establish confidentiality for files committed to a public repository.

### Hosting and workflow

GitHub Pages is the intended deployment destination. The approved engineering workflow is in `docs/plans/engineering-workflow.md`.

### Publication and deployment

Changes go through pull requests with automated checks before merging. GitHub Pages deploys automatically after merge. Scientific approval makes content eligible for publication; merging releases it. Verify the deployed site after release.

### Agreed test boundaries

Test content validation, the rendered reader journey, and the deployed static site. Include missing citations, invalid metadata, draft exclusion (including draft assets and downloads), pattern and condition filters, image enlargement and annotation controls, and page and asset links. Scientific accuracy and figure legibility require human review alongside automated checks.

### Licensing

Retain CC0 for original project code and text. Explicitly separate third-party figures and their individual reuse terms from that grant. Display attribution and figure-specific terms beside each image, and clearly exclude third-party material from the blanket CC0 statement.

### Technical foundation

Use Astro to generate a static site for GitHub Pages, with Markdown entries, structured case metadata, and TypeScript for filters and image annotations. The first release requires no application server or database.

### First milestone

Find candidate literature examples and fully prepare one representative example, including its image, case metadata, citations, reuse basis, and scientific editor review. Build and deploy its complete reader experience to validate the content structure and image viewer before expanding toward the initial 6–10 examples.

## Design completion

The twenty interview questions and shared understanding were confirmed by the project owner. Begin the bounded literature inventory and representative-example preparation. Use those findings and this definition to produce the first-release specification and proposed implementation tickets through the approved engineering workflow.

Exact source selection, package versions, field encoding, and test commands are research and implementation details to resolve against the agreed requirements. Reopen the design if evidence or implementation constraints require changing those requirements.

## Current milestone evidence

Literature API access was restored on 2026-10-19. The bounded inventory is in `docs/research/literature-inventory.md`. The recommended first authentic-gel example is Casonato et al. (2017), Figure 1, patient 10; its case extraction and proposed teaching commentary are in `docs/research/examples/casonato-2017-patient-10.md`. Unmodified source figures and their separate CC BY 4.0 provenance record are retained as research assets. Scientific editor review is pending; no atlas content has been approved for publication or deployed.

The first implementation specification is `docs/plans/first-example-spec.md`, published as GitHub issue #1. The proposed four-task breakdown is `docs/plans/first-example-ticket-proposal.md`; child tickets await the owner's review under `to-tickets`. Scientific review will use the rendered local draft rather than require approval of raw Markdown before a review page exists. Production eligibility still requires scientific approval before release.
