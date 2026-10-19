---
id: casonato-2017-patient-17
title: Loss of large multimers
summary: >-
  Patient 17 from Casonato et al. (2017): a source-classified type 2B VWD
  example, with an individual lane view, normal-plasma reference, and
  patient-specific laboratory context.
pattern:
  id: loss-of-large-multimers
  label: Loss of large multimers
conditions:
  - Type 2B VWD (as classified in the source)
patient:
  label: Patient 17
  age: 24 years
  sex: Female
  bloodGroup: O
  diagnosis: 'Type 2B VWD with an abnormal multimer pattern, as reported by the authors'
  variant: p.V1316M
  history: >-
    Patient-specific bleeding sites, presenting event, treatment at the time of
    the gel, and exact specimen date are not reported in the inspected
    patient-linked material.
  bleedingScore: '13 (source reference: 0–5 for females / 0–3 for males)'
  family: E
source:
  shortCitation: Casonato et al. · 2017
  citation: >-
    Casonato A, Daidone V, Galletta E, Bertomoro A. Type 2B von Willebrand
    disease with or without large multimers: A distinction of the two sides of
    the disorder is long overdue. PLoS ONE. 2017;12(6):e0179566.
  doi: 10.1371/journal.pone.0179566
  pmid: '28640903'
  url: 'https://doi.org/10.1371/journal.pone.0179566'
  figure: 'Figure 1, patient 17 (lane 2 of 8, counting from the left)'
  table: 'Table 1, patient 17, normal-range row and footnotes'
  accessed: '2026-10-19'
image:
  width: 745
  height: 432
  focus: >-
    The left window shows NP lane 1; the right window shows patient 17, lane 2.
    Both come from the same source figure and retain the same vertical scale.
    These are separately displayed crop windows, not a new experimental gel.
  file: docs/research/assets/casonato-2017/pone.0179566.g001.jpg
  alt: >-
    Published multimer gel with lanes NP, 17, 18, NP, 10, 9, NP, 19. Patient 10
    is immediately right of the middle NP reference. The source table beneath
    the lanes gives variants and VWF antigen and collagen-binding results.
  caption: >-
    Focused display of patient 17 beside NP. Original source lane labels remain
    visible. The complete source Figure 1, including all lanes and its embedded
    metadata table, is available below.
  crop:
    patient:
      x: 195
      'y': 0
      width: 65
      height: 332
    control:
      x: 121
      'y': 0
      width: 68
      height: 332
    patientLane: 2
    controlLane: 1
rights:
  label: CC BY 4.0
  url: 'https://creativecommons.org/licenses/by/4.0/'
  attribution: >-
    Figure 1 from Casonato et al., PLoS ONE (2017),
    doi:10.1371/journal.pone.0179566. Copyright © 2017 Casonato et al.
  holder: Casonato et al. (2017)
  modifications: >-
    Display crops select the patient and an NP reference from the original
    Figure 1. No source pixels, band intensities, or aspect ratios were changed;
    the complete unmodified figure is retained.
  evidence: >-
    Article permissions state CC BY 4.0. No separate credit or exclusion was
    found in the inspected Figure 1 caption, article XML, or image. Retrieved
    through Europe PMC's supplementary-files API.
labs:
  - test: Platelet count
    result: '65'
    units: ×10³/µL
    reference: 150–350
  - test: PFA 100
    result: '>300'
    units: seconds
    reference: 94–193
  - test: Spontaneous platelet aggregation
    result: '22.5'
    units: '%'
    reference: '0'
  - test: Minimal aggregating dose of ristocetin
    result: '0.15'
    units: mg/mL
    reference: ≥1.0
  - test: 'VWF:Ag'
    result: '35.9'
    units: U/dL
    reference: 60–160
  - test: 'VWF:CB'
    result: '15.6'
    units: U/dL
    reference: 65–150
  - test: 'VWF:CB/VWF:Ag'
    result: '0.44'
    units: ratio
    reference: ≥0.75
  - test: 'VWF:RCo'
    result: '14.4'
    units: U/dL
    reference: 60–130
  - test: 'VWF:RCo/VWF:Ag'
    result: '0.40'
    units: ratio
    reference: ≥0.75
  - test: Platelet VWF
    result: '140.3'
    units: U/dL (source label)
    reference: 70–140
  - test: FVIII
    result: '35.9'
    units: U/dL
    reference: 60–160
assay:
  method: >-
    Plasma multimer electrophoresis in 1.8% agarose, using ¹²⁵I-labelled
    anti-VWF antibody (Figure 1 caption).
  specimen: >-
    Blood collected with 3.8% sodium citrate (1/10 vol/vol). Additional
    inhibitors described for platelet VWF sampling are not assumed to apply to
    this plasma gel.
  control: >-
    NP reference lanes are present in the source figure. Exact normal-pool
    composition and donor identities are not specified in the inspected caption.
  lanes: >-
    Full Figure 1, left to right: NP, 17, 18, NP, 10, 9, NP, 19. This page
    selects patient 17 (lane 2) and NP lane 1.
  limitations: >-
    Additional assay protocol details are referred to an earlier method paper
    that has not yet been reviewed. The exact draw linkage between gel and
    laboratory values is not established. A PFA cartridge type is not assigned
    in this record.
approval: null
sourceIssues: []
---

## What to notice

Compare patient 17 with the separately labeled NP reference. The authors place this patient in the group with abnormal multimer patterns and loss of large multimers. Band intensity and the degree of visible loss vary between the pictured patients; interpret this lane with its own laboratory results and assay context.

This is proposed atlas teaching commentary, awaiting scientific review. The gel appearance alone does not establish type 2B VWD.

## What the authors report

Figure 1 depicts selected patients from Table 1. Patient 17 belongs to family E and has the reported p.V1316M variant. The source image's embedded antigen and collagen-binding values are linked to the same numbered patient.

## Interpretation and limitations

The paper also illustrates source-classified type 2B patients with preserved multimer patterns in Figure 2. Those are different patients; their metadata must not be assigned to this example.

Patient-specific bleeding sites, presentation, treatment at the time of the gel, and the exact sample date are not reported in the inspected case-linked material. A shared family identifier does not establish an individual clinical history. Source NA means not assessed and is retained explicitly.

The study enrolled patients during annual haemostatic-center check-ups. It describes DDAVP experiments, but the timing of this particular gel is not established as post-DDAVP. The exact gel-to-laboratory draw linkage and patient-specific PT/aPTT are not reported in the inspected material.

Source-reported ratios and reference intervals are retained without recalculation. The paper's intervals are not universal diagnostic thresholds; interpretation requires attention to the patient's age and assay. Historical subgroup or treatment proposals are not adopted as current consensus or treatment advice.
