"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { alwaysRow, allStages, draftRow, finishRow, type Stage } from "@/content/lorenesia";
import { Rich } from "./Rich";
import styles from "./PipelineMap.module.css";

// Wide screens get a spatial map: SVG draws the rows, edges and loops, and every stage is a real <button>
// positioned on top of it. Narrow screens get the same stages as a vertical list that expands in place.

const VB_W = 1160;
const VB_H = 600;
const NODE_W = 136;
const NODE_H = 66;
const colX = (i: number) => 38 + i * 158;
const centerX = (i: number) => colX(i) + NODE_W / 2;

const ROW_DRAFT = 96;
const ROW_FINISH = 318;
const ROW_ALWAYS = 506;

type Placed = { stage: Stage; col: number; y: number };

const placed: Placed[] = [
  ...draftRow.map((stage, i) => ({ stage, col: i, y: ROW_DRAFT })),
  ...finishRow.map((stage, i) => ({ stage, col: i, y: ROW_FINISH })),
  { stage: alwaysRow[0], col: 0, y: ROW_ALWAYS },
  { stage: alwaysRow[1], col: 3, y: ROW_ALWAYS },
  { stage: alwaysRow[2], col: 5, y: ROW_ALWAYS },
];

const pct = (v: number, of: number) => `${(v / of) * 100}%`;

function arrowRow(y: number, count: number) {
  return Array.from({ length: count - 1 }, (_, i) => {
    const x1 = colX(i) + NODE_W;
    const x2 = colX(i + 1) - 4;
    return <line key={`${y}-${i}`} x1={x1} y1={y + NODE_H / 2} x2={x2} y2={y + NODE_H / 2} className={styles.edge} markerEnd="url(#arrow)" />;
  });
}

const groups = [
  { title: "Make the draft", stages: draftRow },
  { title: "Finish with my voice", stages: finishRow },
  { title: "Always on", stages: alwaysRow },
];

export function PipelineMap() {
  const [active, setActive] = useState<string | null>(draftRow[0].id);
  const current = allStages.find((s) => s.id === active) ?? draftRow[0];

  return (
    <div className={styles.root}>
      {/* Wide layout */}
      <div className={styles.wide}>
        <div className={styles.canvas} style={{ aspectRatio: `${VB_W} / ${VB_H}` }}>
          <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className={styles.svg} aria-hidden="true">
            <defs>
              <marker id="arrow" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 z" className={styles.arrowHead} />
              </marker>
              <marker id="arrow-accent" viewBox="0 0 8 8" refX="7" refY="4" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                <path d="M0 0 L8 4 L0 8 z" className={styles.arrowHeadAccent} />
              </marker>
            </defs>

            <text x={colX(0)} y={ROW_DRAFT - 22} className={styles.rowLabel}>1 · Make the draft</text>
            <text x={colX(0)} y={ROW_FINISH - 22} className={styles.rowLabel}>2 · Finish with my voice</text>

            {arrowRow(ROW_DRAFT, draftRow.length)}
            {arrowRow(ROW_FINISH, finishRow.length)}

            {/* Repair loop: checker back to fetcher */}
            <path
              d={`M ${centerX(6)} ${ROW_DRAFT} V 50 H ${centerX(4)} V ${ROW_DRAFT - 4}`}
              className={styles.loop}
              markerEnd="url(#arrow-accent)"
            />
            <text x={centerX(5)} y={40} textAnchor="middle" className={styles.loopLabel}>
              FAIL → new assets → safe mode → new topic
            </text>

            {/* Carriage return: the draft passes, I get tagged */}
            <path
              d={`M ${centerX(6)} ${ROW_DRAFT + NODE_H} V 238 H ${centerX(0)} V ${ROW_FINISH - 4}`}
              className={styles.edge}
              markerEnd="url(#arrow)"
            />
            <text x={(centerX(0) + centerX(6)) / 2} y={228} textAnchor="middle" className={styles.edgeLabel}>
              draft passes → Kurator tags me on Discord
            </text>

            {/* After upload */}
            <line
              x1={colX(4) + NODE_W}
              y1={ROW_FINISH + NODE_H / 2}
              x2={colX(5) - 4}
              y2={ROW_FINISH + NODE_H / 2}
              className={styles.edge}
              markerEnd="url(#arrow)"
            />
            <text x={colX(5) + 4} y={ROW_FINISH + NODE_H / 2 + 5} className={styles.endLabel}>
              YouTube
            </text>

            {/* Always-on band */}
            <rect x={colX(0) - 16} y={ROW_ALWAYS - 46} width={colX(6) + NODE_W - colX(0) + 32} height={NODE_H + 66} className={styles.band} />
            <text x={colX(0)} y={ROW_ALWAYS - 20} className={styles.rowLabel}>3 · Always on</text>
            <path d={`M ${centerX(3)} ${ROW_FINISH + NODE_H + 4} V ${ROW_ALWAYS - 4}`} className={styles.sync} markerEnd="url(#arrow)" />
            <text x={centerX(3) + 10} y={(ROW_FINISH + NODE_H + ROW_ALWAYS) / 2 - 18} className={styles.edgeLabel}>
              state every 10 s
            </text>
            <line
              x1={colX(3) + NODE_W}
              y1={ROW_ALWAYS + NODE_H / 2}
              x2={colX(5) - 4}
              y2={ROW_ALWAYS + NODE_H / 2}
              className={styles.edge}
              markerEnd="url(#arrow)"
            />
          </svg>

          {placed.map(({ stage, col, y }) => (
            <button
              key={stage.id}
              type="button"
              className={`${styles.node} ${styles[stage.lane]}`}
              style={
                {
                  left: pct(colX(col), VB_W),
                  top: pct(y, VB_H),
                  width: pct(NODE_W, VB_W),
                  height: pct(NODE_H, VB_H),
                } as CSSProperties
              }
              aria-pressed={current.id === stage.id}
              aria-controls="stage-detail"
              onClick={() => setActive(stage.id)}
            >
              <span className={styles.nodeLabel}>{stage.label}</span>
              <span className={styles.nodeSub}>{stage.sub}</span>
            </button>
          ))}
        </div>

        <div id="stage-detail" className={styles.detail} aria-live="polite">
          <h3 className={styles.detailTitle}>{current.title}</h3>
          <ul className={styles.points}>
            {current.points.map((p) => (
              <li key={p}>
                <Rich text={p} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Narrow layout */}
      <div className={styles.narrow}>
        {groups.map((g, gi) => (
          <div key={g.title} className={styles.group}>
            <h3 className={styles.groupTitle}>
              {gi + 1} · {g.title}
            </h3>
            <ol className={styles.list}>
              {g.stages.map((stage) => {
                const open = active === stage.id;
                return (
                  <li key={stage.id} className={styles.item}>
                    <button
                      type="button"
                      className={`${styles.row} ${styles[stage.lane]}`}
                      aria-expanded={open}
                      aria-controls={`m-${stage.id}`}
                      onClick={() => setActive(open ? null : stage.id)}
                    >
                      <span className={styles.nodeLabel}>{stage.label}</span>
                      <span className={styles.nodeSub}>{stage.sub}</span>
                    </button>
                    <div id={`m-${stage.id}`} className={styles.rowDetail} hidden={!open}>
                      <p className={styles.rowTitle}>{stage.title}</p>
                      <ul className={styles.points}>
                        {stage.points.map((p) => (
                          <li key={p}>
                            <Rich text={p} />
                          </li>
                        ))}
                      </ul>
                    </div>
                    {stage.id === "checker-draft" && (
                      <p className={styles.loopNote}>FAIL → new assets → safe mode → new topic, at most three</p>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        ))}
      </div>

      <ul className={styles.legend} aria-label="Legend">
        <li>
          <span className={`${styles.swatch} ${styles.you}`} /> Me
        </li>
        <li>
          <span className={`${styles.swatch} ${styles.agent}`} /> Agent
        </li>
        <li>
          <span className={`${styles.swatch} ${styles.always}`} /> Always on
        </li>
      </ul>
    </div>
  );
}
