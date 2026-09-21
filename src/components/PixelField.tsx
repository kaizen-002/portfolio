import type { CSSProperties } from "react";
import styles from "./PixelField.module.css";

// The channel banner's background: a faint grid with scattered pixels snapped to it.
// Positions come from a seeded generator so server and client always agree.

const COLORS = ["lavender", "amber", "mint", "rose"] as const;

function seeded(seed: number) {
  let t = seed;
  return () => {
    t = (t + 0x6d2b79f5) | 0;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = seeded(2026);
const PIXELS = Array.from({ length: 46 }, () => ({
  col: Math.floor(rand() * 46),
  row: Math.floor(rand() * 18),
  color: COLORS[Math.floor(rand() * COLORS.length)],
}));

export function PixelField() {
  return (
    <div className={styles.field} aria-hidden="true">
      {PIXELS.map((p, i) => (
        <span
          key={i}
          className={`${styles.px} ${styles[p.color]}`}
          style={{ "--col": p.col, "--row": p.row } as CSSProperties}
        />
      ))}
    </div>
  );
}
