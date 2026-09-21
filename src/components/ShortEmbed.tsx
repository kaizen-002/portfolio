"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./ShortEmbed.module.css";

type Props = { id: string; title: string; gloss: string; poster: string };

// Shows the Short's own thumbnail first. YouTube only loads (from the no-cookie domain) after a click.
export function ShortEmbed({ id, title, gloss, poster }: Props) {
  const [playing, setPlaying] = useState(false);

  return (
    <figure className={styles.figure}>
      <div className={styles.frame}>
        {playing ? (
          <iframe
            className={styles.iframe}
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={`${title} (YouTube Short)`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        ) : (
          <button type="button" className={styles.poster} onClick={() => setPlaying(true)}>
            <Image src={poster} alt="" width={720} height={1280} sizes="(min-width: 64rem) 15rem, 45vw" className={styles.img} />
            <span className={styles.play} aria-hidden="true" />
            <span className="sr-only">Play “{title}”</span>
          </button>
        )}
      </div>
      <figcaption className={styles.caption}>
        <span className={styles.title}>{title}</span>
        <span className={styles.gloss}>{gloss}</span>
      </figcaption>
    </figure>
  );
}
