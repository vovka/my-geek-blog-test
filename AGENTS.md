# Repository Guidance

This repository is the testing Geek Blog consumer.

- Depend only on `file:.yalc/blog-engine` at runtime.
- Pin the exact canonical `geek-blog/blog-engine` SHA in `geek-blog.lock.json`.
- Never depend on `vovka/blog-engine`; it is fallback-only.
- Keep `package-lock.json` tracked and `.yalc/`, `yalc.lock`, and `.geek-blog/` ignored.
- Use the same `npm run build` path locally and in Actions.
- Keep test analytics and canonical resources isolated from production.
- Keep Giscus repository/category IDs stable when changing the repository path.
- Use the private enhancer only through `npm run enhance` and `GEEK_BLOG_TOKEN`.
