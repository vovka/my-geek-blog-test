# Analytics Configuration

## Overview

The content repository supplies consent-gated GA4 and Microsoft Clarity settings to `blog-engine`. Analytics is
disabled by default and only receives values through `VITE_ANALYTICS_*` build variables.

## Key Files And Structure

- `blog.config.js`: maps build variables into the engine analytics contract while retaining Giscus comments.
- `.env.example`: local test template; copy it to ignored `.env.local` and add test-only IDs.
- `.github/workflows/deploy.yml`: passes GitHub environment variables into the build and pins the engine ref.
- `public/robots.txt`: blocks crawler access for every local and deployed test build.
- `content/pages/privacy.md`: explains analytics and records policy blockers.
- `content/pages/contact.md`: avoids publishing invented contact details.

## How It Works

1. Vite loads variables from the content repository and bundles the public analytics IDs into the site config.
2. The engine checks `enabled`, the current hostname, ID formats, and stored consent before loading either SDK.
3. The engine applies `noindex,nofollow` metadata, while this repository serves a blocking `robots.txt`.
4. Local testing uses the test GA4/Clarity IDs and permits only `localhost,127.0.0.1` in `.env.local`.
5. The deployed test site uses GitHub `github-pages` environment variables and permits only
   `test.blog.shcherbyna.me`.

## Configuration

Set the variables listed in `.env.example`. GA4 measurement IDs and Clarity project IDs are browser-visible
identifiers, but populated local files are still ignored to prevent accidental environment mixing.

Set `VITE_SITE_URL=https://test.blog.shcherbyna.me` in the GitHub environment so content processing emits the
absolute test sitemap. It may remain empty locally; `public/sitemap.xml` is generated and ignored.

Keep `VITE_SITE_PROFILE=test` and `VITE_ROBOTS_INDEX=false` in local test environments. The GitHub test workflow
pins both values rather than accepting mutable repository variables, so the test hostname cannot publish an
indexable crawler profile.

Set `BLOG_ENGINE_REF` to the exact reviewed commit SHA in `vovka/blog-engine`. Deployment fails early when this
variable is absent, preventing a fallback to the analytics-incompatible upstream engine.

## Testing Strategy

Run `npm test` for content processing plus a production build. With `.env.local` populated, verify disabled,
reject, accept, saved-consent, and SPA page-view scenarios in browser developer tools, then confirm events in the
test GA4 DebugView/Realtime and Clarity dashboard before enabling either deployed environment.

Inspect the built root page for `noindex,nofollow` and verify `/robots.txt` contains `Disallow: /` before every test
deployment. The generated `/sitemap.xml` is for Search Console diagnostics, not permission to index the test site.

## Important Patterns And Pitfalls

- Do not add production IDs or production hosts to `.env.local`.
- The engine Vite config must use the content repository as `envDir`; otherwise `.env.local` is not loaded.
- Keep GA4 automatic history page views disabled because the engine sends SPA page views explicitly.
- Analytics activation is blocked until the privacy page's owner-supplied fields are finalized.
- Never set `VITE_ROBOTS_INDEX=true` for this test-only repository.

## Known Issues Or Future Improvements

- Replace legal placeholders before enabling analytics.
- Submit the generated sitemap to the test Search Console property after deployment and DNS verification.

---
Last updated: 2026-07-23
