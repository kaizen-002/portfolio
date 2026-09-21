import { site } from "@/content/site";
import { ExternalLink } from "./ExternalLink";
import styles from "./SiteFooter.module.css";

// Ft5 statement: the page closes on one sentence, not a sitemap.
export function SiteFooter() {
  return (
    <footer className={`page ${styles.foot}`}>
      <p className={styles.line}>Hand the boring part to the machines. Keep the voice.</p>
      <div className={styles.meta}>
        <span className={styles.name}>
          {site.name} · {site.handle}
        </span>
        <nav aria-label="Elsewhere" className={styles.links}>
          <ExternalLink href={site.links.github} className="link">
            GitHub
          </ExternalLink>
          <ExternalLink href={site.links.youtube} className="link">
            YouTube
          </ExternalLink>
        </nav>
        <span className={styles.year}>© 2026</span>
      </div>
    </footer>
  );
}
