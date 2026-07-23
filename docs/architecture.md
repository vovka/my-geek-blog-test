# Test Blog Architecture

The test blog consumes the public canonical engine at an exact commit through the engine-owned Yalc workspace.
The fallback mirror is not a dependency. The optional private enhancer installs only into ignored tooling after
GitHub entitlement succeeds.

`blog.config.js` owns brand text, base path, the stable Giscus repository/category IDs, canonical comment backlink,
and consent policy. The GitHub Pages environment owns the test canonical URL, non-indexing robots policy, test-only
analytics hosts, and test GA4/Clarity IDs.

`npm run build` is shared by local validation and deployment. It hydrates `.yalc/blog-engine`, verifies the tracked
npm lock, processes Markdown, writes test-safe `robots.txt` and `sitemap.xml`, and builds the site. Workflows never
rewrite manifests or delete locks.

Comments are stored in `vovka/my-geek-blog-comments`. The repository and category IDs remain unchanged across the
rename so historical Giscus discussions keep their mapping.

---
Last updated: 2026-07-23
