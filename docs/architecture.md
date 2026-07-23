# Blog Deployment Architecture

The same content history deploys independently from two public repositories. `vovka/my-geek-blog` serves
`blog.shcherbyna.me`; `vovka/my-geek-blog-test` serves `test.blog.shcherbyna.me`. Neither repository is a GitHub
fork of the other and no workflow synchronizes them automatically.

`blog.config.js` owns brand text, base path, the stable Giscus repository/category IDs, canonical comment backlink,
and consent policy. The canonical comment backlink always points to production so both deployments share the same
Giscus discussions.

Each repository's `github-pages` environment owns its site URL, site profile, robots policy, allowed analytics
hosts, and GA4/Clarity IDs. Production uses the production hostname, `production` profile, indexable robots policy,
and production analytics. Test uses the test hostname, `test` profile, noindex robots policy, and isolated test
analytics.

`npm run build` is shared by local validation and deployment. It hydrates the exact public canonical engine commit
through the engine-owned Yalc workspace, verifies the tracked npm lock, processes Markdown, writes profile-specific
`robots.txt` and `sitemap.xml`, and builds the site. Workflows never rewrite manifests or delete locks.

Comments are stored in `vovka/my-geek-blog-comments`. The repository and category IDs remain unchanged across the
deployment split so historical Giscus discussions keep their mapping. The seven migrated production article paths
remain stable in both deployments.

---
Last updated: 2026-07-24
