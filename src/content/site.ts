// Names and links used across the site. Change them here, not in the pages.

export const site = {
  name: "Arya Mulya",
  handle: "kaizen-002",
  tagline: "I build agent pipelines that do the boring work, so one person can run a whole YouTube channel from a phone.",
  description:
    "Arya Mulya builds agent pipelines. Main work: Lorenesia, a pipeline that makes Indonesian game-lore YouTube Shorts end to end.",
  links: {
    github: "https://github.com/kaizen-002",
    youtube: "https://www.youtube.com/@lorenesia",
    dashboard: "https://agents-dashboard-rho.vercel.app",
    dashboardRepo: "https://github.com/kaizen-002/agents-dashboard",
  },
} as const;

// Vercel sets VERCEL_PROJECT_PRODUCTION_URL at build time. No custom domain yet.
export const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";
