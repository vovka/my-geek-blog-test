# Pinned Workspace

## Overview

The test consumer uses the same exact canonical engine and command path in development and GitHub Actions.

## Key Files And Structure

- `scripts/geek-blog.js`: public exact-revision launcher.
- `geek-blog.lock.json`: canonical engine and optional enhancer pins.
- `package.json`: stable Yalc dependency and command surface.
- `.github/workflows/deploy.yml`: test-environment build and Pages deployment.
- `.github/workflows/enhance-posts.yml`: optional entitled authoring workflow.
- `blog.config.js`: instance-only comments and consent settings.

## Testing Strategy

Run `npm test` under Node 20, followed by `npm run doctor`. Verify `robots.txt` remains noindex for the test
environment and the sitemap/canonical URLs use `test.blog.shcherbyna.me`. Browser validation checks consent,
revocation, GA4 DebugView, Clarity activity, and historical Giscus discussions.

## Important Patterns And Pitfalls

- Do not restore `BLOG_ENGINE_REF` or a Git dependency rewrite.
- Do not add `blog-enhancer` to root dependencies.
- Do not reuse production analytics IDs or enable indexing.
- Keep Giscus repository and category IDs stable.

---
Last updated: 2026-07-23
