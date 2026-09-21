import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ExternalLink } from "@/components/ExternalLink";
import { PixelField } from "@/components/PixelField";
import { Rich } from "@/components/Rich";
import { ProgressRule } from "@/components/ProgressRule";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import { lorenesia } from "@/content/lorenesia";
import { site } from "@/content/site";
import styles from "./home.module.css";

const featureFigures = [
  { figure: "1", unit: "command", note: "`!scout` from my phone runs the whole chain" },
  { figure: "27 → 2", unit: "rendered → published", note: "in the first ten days" },
  { figure: "90 s → 1 s", unit: "per scene", note: "after rewriting the slowest ffmpeg step" },
];

const principles = [
  {
    line: "Mechanical checks decide. Models advise.",
    body: "A model can write the script and judge the frames, but a pass or a fail comes from things I can measure: length, pacing, loudness, repeats, voice match.",
  },
  {
    line: "Free tiers, with a fallback for every call.",
    body: "Every model call has a chain behind it. A model that rate-limits is benched for a few minutes and the next one takes over.",
  },
  {
    line: "Everything runs from a phone.",
    body: "I’m often out with only my phone, so every command, report and restart lives in Discord.",
  },
];

const stack = [
  { term: "Runtime", detail: "Node 24, one supervisor process, Discord bots" },
  { term: "Video", detail: "ffmpeg filter graphs, libass subtitles" },
  { term: "Models", detail: "Gemini flash chain, Groq Whisper and gpt-oss-120b" },
  { term: "State", detail: "Supabase, read by a dashboard on Vercel" },
];

export default function Home() {
  return (
    <>
      <SiteNav cta={{ href: site.links.github, label: "GitHub" }} />

      <main>
        <section className={styles.hero} aria-labelledby="hero-name">
          <PixelField />
          <div className={`page ${styles.heroInner}`}>
            <h1 id="hero-name" className={`reveal ${styles.name}`}>
              {site.name}
            </h1>
            <div className={`reveal ${styles.intro}`} style={{ "--i": 1 } as CSSProperties}>
              <Image
                src="/img/avatar.png"
                alt="The Lorenesia channel's pixel avatar"
                width={512}
                height={512}
                sizes="7rem"
                className={styles.avatar}
                priority
              />
              <p className={styles.tagline}>{site.tagline}</p>
            </div>
          </div>
        </section>

        <ProgressRule value={62} />

        <section className={`page ${styles.work}`} aria-labelledby="work">
          <h2 id="work" className="sr-only">
            Work
          </h2>

          <article className={styles.feature}>
            <div className={styles.featureText}>
              <h3 className={styles.featureTitle}>
                <Link href="/work/lorenesia">{lorenesia.title}</Link>
              </h3>
              <p className={styles.lead}>{lorenesia.summary}</p>
              <dl className={styles.figures}>
                {featureFigures.map((f) => (
                  <div key={f.unit} className={styles.fig}>
                    <dt className={styles.figUnit}>{f.unit}</dt>
                    <dd className={styles.figValue}>{f.figure}</dd>
                    <dd className={styles.figNote}><Rich text={f.note} /></dd>
                  </div>
                ))}
              </dl>
              <div className="actions">
                <Link href="/work/lorenesia" className="btn btn--primary">
                  Read the case study
                </Link>
                <ExternalLink href={site.links.youtube} className="btn">
                  Watch the channel
                </ExternalLink>
              </div>
            </div>
            <figure className={styles.featureMedia}>
              <Image
                src="/img/lorenesia/re4-footage.jpg"
                alt="A frame from the published Resident Evil 4 Short: game footage with the caption SPANYOL in yellow"
                width={720}
                height={1280}
                sizes="(min-width: 60rem) 20rem, 70vw"
                className={styles.shot}
              />
              <figcaption className={styles.mediaCaption}>Resident Evil 4, published Short</figcaption>
            </figure>
          </article>

          <article className={styles.side}>
            <figure className={styles.sideMedia}>
              <Image
                src="/img/dashboard/station-map.jpg"
                alt="The dashboard's station map: eight painted pixel-art rooms in a four by two grid"
                width={1600}
                height={800}
                sizes="(min-width: 60rem) 44rem, 92vw"
                className={styles.station}
              />
            </figure>
            <div className={styles.sideText}>
              <h3 className={styles.sideTitle}>Kantor Kurator</h3>
              <p>
                The live dashboard for Lorenesia. Behind an owner-only login, a station of eight painted rooms where the agents
                walk between rooms as jobs move. State syncs from the laptop through Supabase every ten seconds.
              </p>
              <p className={styles.sideLinks}>
                <ExternalLink href={site.links.dashboard} className="link">
                  Open the dashboard
                </ExternalLink>
                <ExternalLink href={site.links.dashboardRepo} className="link">
                  Source on GitHub
                </ExternalLink>
              </p>
            </div>
          </article>
        </section>

        <section className={`page ${styles.how}`} aria-labelledby="how">
          <h2 id="how" className={styles.h2}>
            How I work
          </h2>
          <ul className={styles.principles}>
            {principles.map((p) => (
              <li key={p.line}>
                <p className={styles.principleLine}>{p.line}</p>
                <p className={styles.principleBody}>{p.body}</p>
              </li>
            ))}
          </ul>
          <dl className={styles.stack}>
            {stack.map((s) => (
              <div key={s.term}>
                <dt>{s.term}</dt>
                <dd>{s.detail}</dd>
              </div>
            ))}
          </dl>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
