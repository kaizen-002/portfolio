"use client";

import Image from "next/image";
import { useState } from "react";
import type { CSSProperties } from "react";
import styles from "./BeforeAfter.module.css";

type Side = { src: string; label: string; caption: string };

// Drag (or use arrow keys) to wipe between the first render and a published one.
export function BeforeAfter({ before, after }: { before: Side; after: Side }) {
  const [pos, setPos] = useState(50);

  return (
    <figure className={styles.figure}>
      <div className={styles.stage} style={{ "--pos": `${pos}%` } as CSSProperties}>
        <Image src={before.src} alt={before.caption} width={720} height={1280} sizes="(min-width: 64rem) 24rem, 90vw" className={styles.img} />
        <div className={styles.afterLayer}>
          <Image src={after.src} alt={after.caption} width={720} height={1280} sizes="(min-width: 64rem) 24rem, 90vw" className={styles.img} />
        </div>
        <span className={`${styles.tag} ${styles.tagBefore}`}>{before.label}</span>
        <span className={`${styles.tag} ${styles.tagAfter}`}>{after.label}</span>
        <span className={styles.handle} aria-hidden="true" />
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          className={styles.range}
          aria-label="Wipe between the first render and the published video"
        />
      </div>
      <figcaption className={styles.caption}>
        <span>
          <strong>{before.label}:</strong> {before.caption}
        </span>
        <span>
          <strong>{after.label}:</strong> {after.caption}
        </span>
      </figcaption>
    </figure>
  );
}
