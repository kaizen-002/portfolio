import type { ReactNode } from "react";

type Props = {
  href: string;
  className?: string;
  children: ReactNode;
};

// Outbound link: new tab, arrow glyph, and a hint for screen readers.
export function ExternalLink({ href, className, children }: Props) {
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      <span aria-hidden="true" className="ext-arrow">
        ↗
      </span>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
