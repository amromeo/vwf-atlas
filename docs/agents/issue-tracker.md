# Issue tracker: GitHub

Specs and tickets live in GitHub Issues for `amromeo/vwf-atlas`. Run `gh` from this checkout or pass `--repo amromeo/vwf-atlas`.

- Read: `gh issue view <number> --json number,title,body,labels,comments`.
- List: `gh issue list --state open --json number,title,body,labels`.
- Create: write the exact multiline body to a temporary file, then run `gh issue create --title '<title>' --body-file <file>`.
- Comment: `gh issue comment <number> --body-file <file>`.
- Labels: `gh issue edit <number> --add-label '<label>'` or `--remove-label '<label>'`.
- Close: `gh issue close <number>` when its acceptance criteria are met.

When a skill says to publish to the tracker, create a GitHub issue. When it says to fetch a ticket, read the issue and comments. Follow each skill's draft and approval steps before publication.

For child tickets, use native GitHub sub-issues when supported. Fetch the child database ID with `gh api repos/amromeo/vwf-atlas/issues/<child> --jq .id`, then link with `gh api --method POST repos/amromeo/vwf-atlas/issues/<parent>/sub_issues -F sub_issue_id=<child-db-id>`. Otherwise record `Part of #<parent>` in the child and link children from the parent when authorized.

For dependencies, fetch the blocking issue's database ID, then run `gh api --method POST repos/amromeo/vwf-atlas/issues/<child>/dependencies/blocked_by -F issue_id=<blocker-db-id>`. If native dependencies are unavailable, record `Blocked by: #<number>` in the ticket. Work only tickets whose blockers are complete.

PRs as a request surface: no.

GitHub API access was restored on 2026-10-19. The initial specification is issue #1. If a future tracker operation is blocked, retain an explicitly unpublished local draft and report the blocked operation; do not claim the issue or labels were created.
