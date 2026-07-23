const env = import.meta.env || process.env || {};

const parseHosts = (value = "") => value
  .split(",")
  .map(host => host.trim())
  .filter(Boolean);

const parseOptionalBoolean = value => {
  if (value === undefined || value === "") return undefined;
  return value === "true";
};

export default {
  siteName: "My Blog",
  title: "My Blog",
  description: "A blog powered by blog-engine",
  author: "Blog Author",
  basePath: "/",
  siteUrl: env.VITE_SITE_URL || "",
  robots: {
    profile: env.VITE_SITE_PROFILE || env.VITE_ANALYTICS_ENVIRONMENT || "test",
    index: parseOptionalBoolean(env.VITE_ROBOTS_INDEX)
  },

  comments: {
    provider: "giscus",
    repo: "vovka/blog-comments",
    repoId: "R_kgDOTgmoUg",
    category: "Announcements",
    categoryId: "DIC_kwDOTgmoUs4DBwZb",
    canonicalBaseUrl: "https://test.blog.shcherbyna.me"
  },

  analytics: {
    enabled: env.VITE_ANALYTICS_ENABLED === "true",
    environment: env.VITE_ANALYTICS_ENVIRONMENT || "test",
    allowedHosts: parseHosts(env.VITE_ANALYTICS_ALLOWED_HOSTS),
    ga4MeasurementId: env.VITE_ANALYTICS_GA4_MEASUREMENT_ID || "",
    clarityProjectId: env.VITE_ANALYTICS_CLARITY_PROJECT_ID || "",
    consent: {
      required: env.VITE_ANALYTICS_CONSENT_REQUIRED !== "false",
      storageKey: env.VITE_ANALYTICS_STORAGE_KEY || "blog.analyticsConsent",
      policyVersion: env.VITE_ANALYTICS_CONSENT_POLICY_VERSION || "1",
      privacyPagePath: env.VITE_ANALYTICS_PRIVACY_PAGE_PATH || "/privacy"
    }
  }
};
