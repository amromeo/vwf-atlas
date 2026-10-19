# Published example extraction template

This is a research worksheet, not an approved atlas entry or a final application schema. Copy it into `docs/research/examples/<example-id>.md` for an actual candidate. Replace placeholders only with verified information. Scientific approval is supplied by the project owner, never inferred by the assistant.

## Record and review

- Example ID: [stable descriptive identifier]
- Candidate pattern entry: [pattern name; proposed until reviewed]
- Status: draft
- Extracted by / extraction date: [name / YYYY-MM-DD]
- Scientific approval: pending
- Scientific reviewer / review date: [pending]
- Reviewed revision: [record revision or content digest; pending]
- Open questions: [unresolved source, interpretation, or reuse issues]

Use **not reviewed** for material that has not been checked or could not be accessed. Use **not reported** only after checking the relevant source material. Use **not applicable** when a field does not apply. A proposed association is not a confirmed patient diagnosis.

## Publication and exact evidence

- Full citation: [authors, title, journal, year, volume/pages or article number]
- DOI / PMID / PMCID: [verified identifiers, where available]
- Source URL: [stable article URL]
- Publication type: [original research / case report / review / other]
- Figure / panel / lane identifiers: [exact identifiers]
- Relevant table / section / supplementary file: [exact locations]
- Prior source of reproduced figure, if any: [citation and provenance]
- Source access and verification date: [what was actually inspected / YYYY-MM-DD]

## Patient and specimen context

- Case or patient identifier used in the publication: [source label]
- Link between this patient, image lanes, and laboratory values: [explicit source evidence; note ambiguity]
- Age and sex, if relevant and reported: [source value and location]
- History, presentation, and bleeding phenotype: [source-supported summary]
- Diagnosis or classification as reported: [source wording and location]
- Associated conditions: [source-supported findings]
- Treatment and sample timing: [reported context, including relation to laboratory testing]
- Specimen type and handling: [reported details]

When a figure depicts multiple patients, controls, or time points, keep their records distinct. Article-level cohort statistics are not patient-specific results.

## Laboratory results

Add rows only for tests actually reported for this case or explicitly label group-level results. Preserve source units, assay names, qualifiers such as `<`, and reference intervals. Identify the specimen or time point when applicable.

| Test as reported | Result | Units | Reference interval | Patient/specimen/time point | Exact source location |
| --- | --- | --- | --- | --- | --- |
| [test] | [source result] | [source units] | [source interval or not reported] | [linkage] | [table, row, passage] |

## Multimer assay and lanes

- Assay / platform / manufacturer: [reported details]
- Gel method, concentration, resolution, and detection: [reported details]
- Lane map: [each relevant lane and its source identity]
- Image orientation and size direction: [verified source description]
- Normal control: [same experiment / separate reference / not reported; exact identity]
- Other controls, standards, or repeat runs: [reported details]
- Method limitations affecting interpretation: [source-supported details]

## Interpretation

### Authors' reported findings

[Faithful paraphrase with exact source locations. Retain uncertainty and disagreement.]

### Proposed atlas teaching commentary — awaiting scientific review

[What to notice, proposed pattern description, associations, and pitfalls. Cite support for each substantive claim; distinguish visual observations from reported interpretation.]

## Image provenance and reuse

- Figure source URL / original file URL: [verified locations]
- Local research copy, if retained: [path outside public site assets]
- Rights holder and credit line: [as stated]
- Applicable license or permission: [exact terms and link, or unresolved]
- Figure-specific exclusions or third-party credits: [checked evidence]
- Adaptation conditions and attribution text: [requirements]
- Planned presentation: [reproduce with supported reuse basis / link only / unresolved]
- Source version retained: [unaltered research asset, if obtained]
- Crops, modifications, and source history: [explicit record]
- Proposed annotation overlay: [labels separate from the source image]
- Figure-specific terms for publication: [exclude third-party figure from project CC0 grant]

Free access, PMC inclusion, or appearance in a review is not itself a reproduction license. Resolve the figure's actual terms or use the agreed link-only fallback.

## Reader presentation

- Proposed caption: [draft]
- Descriptive image text: [draft; conveys relevant visual information]
- Visible uncertainties and missing context: [draft]
- Stable example link: [to assign during implementation]

## Review checklist

- [ ] Patient, lane, specimen, and laboratory-result linkage verified.
- [ ] Case-specific findings separated from cohort results and general discussion.
- [ ] Source findings distinguished from atlas commentary.
- [ ] Missing information correctly marked as not reviewed, not reported, or not applicable.
- [ ] Figure license, exclusions, attribution, and display route verified.
- [ ] Source image, modifications, and separate annotations documented.
- [ ] Scientific editor approves this specific content and image revision.
- [ ] Draft content and assets remain excluded from the published site until approval and release.
