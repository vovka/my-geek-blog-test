export default {
  siteName: "My Blog",
  title: "My Blog",
  description: "A blog powered by blog-engine",
  author: "Blog Author",
  basePath: "/",
  comments: {
    provider: "giscus",
    repo: "vovka/my-geek-blog-comments",
    repoId: "R_kgDOTgmoUg",
    category: "Announcements",
    categoryId: "DIC_kwDOTgmoUs4DBwZb",
    canonicalBaseUrl: "https://blog.shcherbyna.me"
  },
  analytics: {
    consent: {
      required: true,
      storageKey: "blog.analyticsConsent",
      policyVersion: "1",
      privacyPagePath: "/privacy"
    }
  }
};
