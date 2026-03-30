# Branch Protection Policy

The `main` branch is protected. All contributions must go through pull
requests — direct pushes are not allowed.

## Required checks before merge

| Requirement             | Setting                                                   |
| ----------------------- | --------------------------------------------------------- |
| Status checks           | **Lint, Build & Test** and **E2E Tests** must pass        |
| Up-to-date branches     | PR branch must be up-to-date with `main`                  |
| Linear history          | Merge commits are disabled — use **squash** or **rebase** |
| Force-pushes            | Disabled                                                  |
| Branch deletion         | Disabled                                                  |
| Conversation resolution | All PR comments must be resolved                          |
| Applies to admins       | Yes — admins are not exempt                               |

## Applying / re-applying the rules

The rules are enforced by the workflow at
`.github/workflows/protect-main.yml`. It runs automatically whenever that
file is merged to `main`, and can also be triggered manually.

### Automatic (recommended)

Merge any change to `.github/workflows/protect-main.yml` into `main`. The
workflow will fire and call the GitHub API to apply the current rules.

### Manual via GitHub UI

Go to **Actions → Apply Branch Protection → Run workflow**.

The workflow uses `GITHUB_TOKEN` (which must have `administration:write`
permission) or a personal access token stored in a repository secret named
`ADMIN_TOKEN`.

### Manual via script

```bash
# Requires a PAT with repo + administration scopes
export GITHUB_TOKEN=ghp_...

curl -X PUT \
  -H "Authorization: Bearer ${GITHUB_TOKEN}" \
  -H "Accept: application/vnd.github+json" \
  -H "X-GitHub-Api-Version: 2022-11-28" \
  "https://api.github.com/repos/farm-fe/harfai/branches/main/protection" \
  -d '{
    "required_status_checks": {
      "strict": true,
      "contexts": ["Lint, Build & Test", "E2E Tests"]
    },
    "enforce_admins": true,
    "required_pull_request_reviews": null,
    "restrictions": null,
    "required_linear_history": true,
    "allow_force_pushes": false,
    "allow_deletions": false,
    "block_creations": false,
    "required_conversation_resolution": true
  }'
```

## Why linear history?

Linear history (squash or rebase merges only) keeps `git log` clean and
readable — every commit on `main` corresponds to exactly one completed pull
request. This makes `git bisect`, `git log --oneline`, and automated
changelogs much easier to work with.
