import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { BeforeAfter } from "@/components/BeforeAfter";
import { ExternalLink } from "@/components/ExternalLink";
import { PipelineMap } from "@/components/PipelineMap";
import { ProgressRule } from "@/components/ProgressRule";
import { ReadingBar } from "@/components/ReadingBar";
import { ShortEmbed } from "@/components/ShortEmbed";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteNav } from "@/components/SiteNav";
import {
  beforeAfter,
  caseStats,
  checkerRows,
  decisions,
  format,
  frames,
  lorenesia,
  scriptCompare,
  shorts,
  weaknesses,
} from "@/content/lorenesia";
import { site } from "@/content/site";
import styles from "./case.module.css";

export const metadata: Metadata = {
  title: "Lorenesia case study",
  description:
    "How one person runs an Indonesian game-lore YouTube Shorts channel with an agent pipeline: the system, before and after, real numbers and the hard decisions.",
};

export default function LorenesiaCase() {
  return (
    <>
      <ReadingBar />
      <SiteNav back cta={{ href: site.links.youtube, label: "YouTube" }} />

      <main>
        <header className={`page ${styles.head}`}>
          <p className={`reveal ${styles.kicker}`}>Case study · {lorenesia.period}</p>
          <h1 className={`reveal ${styles.title}`} style={{ "--i": 1 } as CSSProperties}>
            {lorenesia.title}
          </h1>
          <p className={`reveal ${styles.summary}`} style={{ "--i": 2 } as CSSProperties}>
            {lorenesia.summary}
          </p>
          <dl className={`reveal ${styles.facts}`} style={{ "--i": 3 } as CSSProperties}>
            <div>
              <dt>Role</dt>
              <dd>{lorenesia.role}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{lorenesia.stack}</dd>
            </div>
            <div>
              <dt>Output</dt>
              <dd>{lorenesia.output}</dd>
            </div>
          </dl>
          <div className="actions">
            <ExternalLink href={site.links.youtube} className="btn btn--primary">
              Watch the channel
            </ExternalLink>
            <ExternalLink href={site.links.dashboard} className="btn">
              Live dashboard
            </ExternalLink>
          </div>
        </header>

        <ProgressRule value={38} />

        <section className={`page ${styles.stats}`} aria-label="Numbers">
          {caseStats.map((s) => (
            <div key={s.unit} className={styles.stat}>
              <p className={styles.statFigure}>{s.figure}</p>
              <p className={styles.statUnit}>{s.unit}</p>
              <p className={styles.statNote}>{s.note}</p>
            </div>
          ))}
        </section>

        <section className={`page ${styles.section}`} aria-labelledby="problem">
          <h2 id="problem" className={styles.h2}>
            The problem
          </h2>
          <div className={styles.prose}>
            <p>
              I wanted income from YouTube without appearing on camera, and without a second job editing videos.
              Indonesian Shorts about the hidden stories behind well-known games are a good niche: the stories exist on
              Wikipedia, and the footage exists in the publishers&rsquo; own trailers.
            </p>
            <p>
              By hand, one Short means: find a story that is actually surprising, check the facts, write
              30&ndash;60 seconds that sound spoken rather than read, find a picture for every phrase, cut, caption, mix,
              credit every asset, make a thumbnail. Every day.
            </p>
            <p>
              So the constraint was simple, and I took it seriously: <strong>I record the voice and press upload.
              Everything else is the pipeline&rsquo;s job</strong>, and all of it has to work from my phone.
            </p>
          </div>
        </section>

        <section className={styles.system} aria-labelledby="system">
          <div className={`page ${styles.systemInner}`}>
            <div className={styles.sectionHead}>
              <h2 id="system" className={styles.h2}>
                The system
              </h2>
              <p className={styles.orient}>
                Discord → agents → ffmpeg → my voice → YouTube. Select a stage to see what it does.
              </p>
            </div>
            <PipelineMap />
          </div>
        </section>

        <section className={`page ${styles.section}`} aria-labelledby="output">
          <h2 id="output" className={styles.h2}>
            What comes out
          </h2>
          <div className={styles.outputGrid}>
            <div className={styles.shorts}>
              {shorts.map((s) => (
                <ShortEmbed key={s.id} {...s} />
              ))}
            </div>
            <ul className={styles.formatList}>
              {format.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </div>
          <div className={styles.frames}>
            {frames.map((f) => (
              <figure key={f.src} className={styles.frame}>
                <Image src={f.src} alt={f.caption} width={720} height={1280} sizes="(min-width: 60rem) 14rem, 30vw" className={styles.frameImg} />
                <figcaption>{f.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={`page ${styles.section}`} aria-labelledby="before-after">
          <h2 id="before-after" className={styles.h2}>
            Before and after
          </h2>
          <p className={styles.intro}>
            The first render and a published Short, nine days apart. Same pipeline shape; almost every stage inside it was
            rebuilt.
          </p>

          <div className={styles.baGrid}>
            <BeforeAfter before={beforeAfter.before} after={beforeAfter.after} />

            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <caption className={styles.tableCaption}>From the files and their checker reports</caption>
                <thead>
                  <tr>
                    <th scope="col">
                      <span className="sr-only">Measure</span>
                    </th>
                    <th scope="col">First render</th>
                    <th scope="col">Published</th>
                  </tr>
                </thead>
                <tbody>
                  {checkerRows.map((r) => (
                    <tr key={r.label}>
                      <th scope="row">{r.label}</th>
                      <td data-label="First render">{r.before}</td>
                      <td data-label="Published">{r.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className={styles.verdict}>
                Both passed. Only one should have. The first report even noted pictures that sat still too long, and
                still said pass. Today&rsquo;s checker measures seconds per picture and repeats, and a fail sends
                the video back through the repair loop.
              </p>
            </div>
          </div>

          <div className={styles.scripts}>
            {[scriptCompare.before, scriptCompare.after].map((side, i) => (
              <div key={side.heading} className={styles.script}>
                <h3 className={styles.scriptHead}>
                  <span className={i === 0 ? styles.tagBefore : styles.tagAfter}>{i === 0 ? "Before" : "After"}</span>
                  {side.heading}
                </h3>
                {side.lines.map((l) => (
                  <blockquote key={l.id} className={styles.quote} lang="id">
                    <p>{l.id}</p>
                    <p className={styles.gloss} lang="en">
                      {l.en}
                    </p>
                  </blockquote>
                ))}
                <p className={styles.scriptVerdict}>{side.verdict}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={`page ${styles.section}`} aria-labelledby="decisions">
          <h2 id="decisions" className={styles.h2}>
            Hard decisions
          </h2>
          <ol className={styles.decisions}>
            {decisions.map((d) => (
              <li key={d.title} className={styles.decision}>
                <h3 className={styles.decisionTitle}>{d.title}</h3>
                <dl className={styles.decisionBody}>
                  <div>
                    <dt>Problem</dt>
                    <dd>{d.problem}</dd>
                  </div>
                  <div>
                    <dt>Choice</dt>
                    <dd>{d.choice}</dd>
                  </div>
                  <div>
                    <dt>Cost</dt>
                    <dd>{d.cost}</dd>
                  </div>
                </dl>
              </li>
            ))}
          </ol>
        </section>

        <section className={`page ${styles.section}`} aria-labelledby="weak">
          <h2 id="weak" className={styles.h2}>
            What&rsquo;s still weak
          </h2>
          <ul className={styles.weak}>
            {weaknesses.map((w) => (
              <li key={w.title}>
                <h3 className={styles.weakTitle}>{w.title}</h3>
                <p>{w.body}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={`page ${styles.close}`} aria-labelledby="running">
          <h2 id="running" className={styles.h2}>
            See it running
          </h2>
          <p className={styles.intro}>
            The channel is where the output lives. The dashboard is where the agents live; it is owner-only, but the code
            is public.
          </p>
          <div className="actions">
            <ExternalLink href={site.links.youtube} className="btn btn--primary">
              Watch Lorenesia
            </ExternalLink>
            <ExternalLink href={site.links.dashboard} className="btn">
              Live dashboard
            </ExternalLink>
            <ExternalLink href={site.links.dashboardRepo} className="btn">
              Dashboard code
            </ExternalLink>
          </div>
          <p>
            <Link href="/" className="link">
              ← All work
            </Link>
          </p>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
