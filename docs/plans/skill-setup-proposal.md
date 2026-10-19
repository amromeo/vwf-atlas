# Proposed Matt Pocock skill configuration

Status: approved and activated using `AGENTS.md`. GitHub Issues and the five default triage labels were selected by the project owner. GitHub label creation remains blocked by API access.

This document preserves the reviewed configuration. The active files are `AGENTS.md` and the three files in `docs/agents/`; edit those files for future configuration changes. The engineering workflow is in [engineering-workflow.md](engineering-workflow.md).

## Root instructions: AGENTS.md or CLAUDE.md

```markdown
# VWF atlas

Before planning, implementing, reviewing, or publishing atlas changes, read `docs/plans/engineering-workflow.md`. It defines the engineering sequence and the evidence, figure provenance, scientific review, and release requirements.

Use the existing isolated checkout; create a Git worktree only when the user requests one.

## Agent skills

### Issue tracker

Specs and implementation tickets live in GitHub Issues for `amromeo/vwf-atlas`. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default triage labels. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context: root `GLOSSARY.md` and `docs/adr/`. See `docs/agents/domain.md`.
```

## docs/agents/issue-tracker.md

```markdown
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

API read attempts during setup returned Forbidden. Git read access works independently. Recheck API access before any tracker operation. If still blocked, retain an explicitly unpublished local draft and report the blocked operation; do not claim the issue or labels were created.
```

## docs/agents/triage-labels.md

```markdown
# Triage labels

| Role | GitHub label | Meaning |
| --- | --- | --- |
| needs-triage | needs-triage | Maintainer evaluation needed |
| needs-info | needs-info | More information needed |
| ready-for-agent | ready-for-agent | Specified and ready for agent implementation |
| ready-for-human | ready-for-human | Human implementation needed |
| wontfix | wontfix | Will not be actioned |

Use these exact labels when a skill refers to the corresponding role. Check existing labels and create only missing ones. Label creation has not been verified because GitHub API access returned Forbidden during setup.
```

## docs/agents/domain.md

```markdown
# Domain documentation

This is a single-context project. Before exploring an affected area, read root `GLOSSARY.md` and relevant decisions in `docs/adr/`, when present.

Use the glossary's terminology in content, issues, code, and tests. Surface conflicts with an existing decision explicitly.

Create glossary entries and architecture decisions as terminology and durable decisions are resolved through `grill-with-docs` and `domain-modeling`. Missing files do not block exploration.
```
