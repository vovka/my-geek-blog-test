# Repository Guidance

This history is the shared Geek Blog content source for two independent deployments:
`vovka/my-geek-blog` serves production and `vovka/my-geek-blog-test` serves testing.

- Depend only on `file:.yalc/blog-engine` at runtime.
- Pin the exact canonical `geek-blog/blog-engine` SHA in `geek-blog.lock.json`.
- Never depend on `vovka/blog-engine`; it is fallback-only.
- Keep `package-lock.json` tracked and `.yalc/`, `yalc.lock`, and `.geek-blog/` ignored.
- Use the same `npm run build` path locally and in Actions.
- Read the site URL, profile, robots policy, and analytics identifiers from the GitHub Pages environment.
- Keep production analytics and indexable resources isolated from test analytics and noindex resources.
- Keep Giscus repository/category IDs stable when changing the repository path.
- Keep Giscus canonical backlinks on `https://blog.shcherbyna.me` in both deployments.
- Use the private enhancer only through `npm run enhance` and `GEEK_BLOG_TOKEN`.
