# Public review hosting: live and verified

The owner requested deployed review pages. The generated public review artifact has been uploaded to the `review-site` branch at commit `a01e1445629232c0ae16eff012bf2515f59f3006`.

The branch contains only `index.html`, five self-contained patient HTML files, `.nojekyll`, and `robots.txt`. Draft/scientific-review labels and figure attribution remain visible. The homepage and patient documents discourage indexing. All scientific approvals remain null, and the source implementation PR remains unmerged.

Independent Standards and Spec review found no material issues in the public-review exception, navigation change, or draft-label/indexing additions. Local export generation completed, and all six documents were checked for internal link targets, draft labels, and indexing metadata.

## Deployment verification

The owner enabled GitHub Pages using **Deploy from a branch**, branch **review-site**, folder **/(root)**. The earlier integration HTTP 403 prevented automated settings changes; the owner action resolved that blocker.

Live review site: https://amromeo.github.io/vwf-atlas/

GitHub Pages reports `status: built` for commit `a01e1445629232c0ae16eff012bf2515f59f3006`, with branch-root deployment from `review-site`. Live HTTP checks returned 200 for the homepage and all five patient pages. Each document contains its draft label, noindex metadata, and patient navigation. All five patient pages include three valid embedded JPEG images, the complete source figure, and CC BY 4.0 attribution. This deployment is the owner-requested public draft review version; scientific approval remains pending.

The additional live Chromium check was blocked by this cloud browser’s certificate trust (`ERR_CERT_AUTHORITY_INVALID`); no browser trust settings were changed. Live availability and embedded-image checks above used the successful HTTP checks. Local browser journeys had already passed before publishing.

## Updating review content later

Regenerate using `npm run export:review`. Keep publication confined to the explicit review branch and retain its prior commit as the parent of subsequent updates so history remains recoverable. Do not force-push, merge the source PR, or approve scientific content merely to update the review site. The normal application production build continues to exclude unapproved records and images.

## Homepage style exploration update

The three owner-requested design concepts were published as review commit `882c84635efb097f6221ebf4d6361dac4141e58e`, retaining the previous review deployment as its parent. Source: `codex/style-exploration`; review evidence: `docs/reviews/style-exploration.md`. The homepage switcher uses `?variant=A` (Clinical reference), `?variant=B` (Visual gallery), and `?variant=C` (Editorial atlas). The owner has not selected a final design. Scientific approvals remain null.

## Selected clinical homepage

The owner selected **A — Clinical reference**. Review commit `bcf21e5da143d0320c7a3a0223a68cfddde7f306` publishes the selected homepage and shared patient-lane rendering. It retains the prior review deployment as parent. The comparison switcher and losing concepts are removed from this implementation and preserved on `codex/style-exploration` at `9559d78`. See `docs/reviews/clinical-homepage.md` for tests and independent reviews. All scientific approvals remain null; the source PR remains unmerged.
