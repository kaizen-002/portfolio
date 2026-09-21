import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { ExternalLink } from "./ExternalLink";
import styles from "./SiteNav.module.css";

type Props = {
  back?: boolean;
  cta: { href: string; label: string };
};

// N9 edge-aligned: wordmark hard left, one outbound link hard right, nothing in between.
export function SiteNav({ back = false, cta }: Props) {
  return (
    <header className={`page ${styles.nav}`}>
      <Link href="/" className={styles.wordmark}>
        {back ? (
          <span className={styles.back} aria-hidden="true">
            ←
          </span>
        ) : (
          <Image
            src="/img/avatar.png"
            alt=""
            width={28}
            height={28}
            className={styles.avatar}
            priority
          />
        )}
        <span>{site.name}</span>
        {back && <span className="sr-only">, back to all work</span>}
      </Link>
      <ExternalLink href={cta.href} className="btn">
        {cta.label}
      </ExternalLink>
    </header>
  );
}
