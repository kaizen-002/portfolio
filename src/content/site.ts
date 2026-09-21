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

// The public address. Share images, canonical links and the sitemap all point here.
// Change it when the domain changes (e.g. a custom domain later), then push.
export const productionUrl = "https://aryamulya-portfolio.vercel.app";

export const siteUrl = process.env.VERCEL ? productionUrl : "http://localhost:3000";
