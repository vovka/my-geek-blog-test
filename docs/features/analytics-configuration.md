# Analytics Configuration

## Overview

The shared content history supplies consent-gated GA4 and Microsoft Clarity settings to `blog-engine`. Production
and test builds use independent GitHub repositories and `github-pages` environments. Analytics is disabled by
default and only receives values through `VITE_ANALYTICS_*` build variables.

## Key Files And Structure

- `blog.config.js`: retains instance-owned consent policy and Giscus comments.
- `.env.example`: local test template; copy it to ignored `.env.local` and add test-only IDs.
- `.github/workflows/deploy.yml`: passes the site profile, robots policy, and analytics variables from the current
  repository's GitHub Pages environment into the pinned workspace build.
- `geek-blog.lock.json`: pins the exact canonical public engine revision.
- `content/pages/privacy.md`: explains analytics and records policy blockers.
- `content/pages/contact.md`: avoids publishing invented contact details.

## How It Works

1. The engine loads whitelisted variables from the content repository and resolves them above the thin instance
   config.
2. The engine checks `enabled`, the current hostname, ID formats, and stored consent before loading either SDK.
3. The engine derives canonical and sitemap URLs from `VITE_SITE_URL` and applies the configured robots policy.
4. Local testing uses the test GA4/Clarity IDs and permits only `localhost,127.0.0.1` in `.env.local`.
5. Each deployed site permits only its exact hostname and receives only that environment's provider IDs.

## Configuration

Set the variables listed in `.env.example`. GA4 measurement IDs and Clarity project IDs are browser-visible
identifiers, but populated local files are still ignored to prevent accidental environment mixing.

Configure the two `github-pages` environments as follows:

| Repository | Site URL | Profile | Robots | Analytics |
| --- | --- | --- | --- | --- |
| `vovka/my-geek-blog` | `https://blog.shcherbyna.me` | `production` | indexable | production IDs and host |
| `vovka/my-geek-blog-test` | `https://test.blog.shcherbyna.me` | `test` | noindex | test IDs and host |

Keep `VITE_SITE_PROFILE=test` and `VITE_ROBOTS_INDEX=false` in local test environments. The values are mutable
GitHub environment variables so repository setup must treat the profile, robots policy, URL, allowed host, and
provider IDs as one atomic environment configuration.

The exact reviewed commit lives in `geek-blog.lock.json` and must belong to `geek-blog/blog-engine`. Deployment,
local builds, and development all use that canonical pin through the same Yalc workspace.

## Testing Strategy

Run `npm test` for content processing plus a production build. With `.env.local` populated, verify disabled,
reject, accept, saved-consent, and SPA page-view scenarios in browser developer tools, then confirm events in the
test GA4 DebugView/Realtime and Clarity dashboard before enabling either deployed environment.

Before deployment, build both profiles and compare normalized sitemap paths. Test must emit `noindex,nofollow` and
`Disallow: /`; production must emit indexable metadata and allow crawling. In both artifacts, verify canonical and
sitemap URLs contain only the intended hostname and provider configuration contains only the intended IDs.

## Important Patterns And Pitfalls

- Do not add production IDs or production hosts to `.env.local`.
- Keep environment parsing in the engine rather than duplicating it in `blog.config.js`.
- Keep GA4 automatic history page views disabled because the engine sends SPA page views explicitly.
- Copy no enhancement/API secrets to the independent test repository.
- Never attach a production ID or indexable profile to `vovka/my-geek-blog-test`.
- Keep `blog.config.js` Giscus canonical backlinks on the production hostname.

## Known Issues Or Future Improvements

- GitHub Pages deep links initially return the existing SPA `404.html` redirect response before client-side routing;
  true HTTP `200` deep links are outside this cutover.

---
Last updated: 2026-07-24
