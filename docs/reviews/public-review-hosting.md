# Public review hosting: prepared, awaiting Pages enablement

The owner requested deployed review pages. The generated public review artifact has been uploaded to the `review-site` branch at commit `a01e1445629232c0ae16eff012bf2515f59f3006`.

The branch contains only `index.html`, five self-contained patient HTML files, `.nojekyll`, and `robots.txt`. Draft/scientific-review labels and figure attribution remain visible. The homepage and patient documents discourage indexing. All scientific approvals remain null, and the source implementation PR remains unmerged.

Independent Standards and Spec review found no material issues in the public-review exception, navigation change, or draft-label/indexing additions. Local export generation completed, and all six documents were checked for internal link targets, draft labels, and indexing metadata.

## External blocker

Attempting `POST /repos/amromeo/vwf-atlas/pages` with a branch-root source failed with HTTP 403 and `Resource not accessible by integration`. The repository is public and the connection can push branches, but that does not establish permission to enable GitHub Pages. Requests to the expected public-site address reach GitHub and return 404; this is not the earlier proxy CONNECT failure. No live site or successful Pages build has been claimed.

## One-time owner action

Open [repository Pages settings](https://github.com/amromeo/vwf-atlas/settings/pages). Under Build and deployment, select **Deploy from a branch**, choose branch **review-site** and folder **/(root)**, and save. This publishes the explicitly requested public draft review version, not a scientifically approved atlas release.

After that setting is saved, inspect the actual Pages build and verify the live index, all five patient pages, navigation, images, source links, and draft status before reporting availability. Expected project address: `https://amromeo.github.io/vwf-atlas/`; treat it as pending until it responds with the correct review content.

## Updating review content later

Regenerate using `npm run export:review`. Keep publication confined to the explicit review branch and retain its prior commit as the parent of subsequent updates so history remains recoverable. Do not force-push, merge the source PR, or approve scientific content merely to update the review site. The normal application production build continues to exclude unapproved records and images.
