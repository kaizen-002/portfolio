import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Share images in the channel-banner style: dark grid, big Anton title, lavender progress bar.
// Satori can't read CSS variables or oklch(), so these are the sRGB values of the tokens in tokens.css.
const C = {
  paper: "#0a090f",
  grid: "#16141c",
  ink: "#efedf3",
  muted: "#9895a9",
  accent: "#ae9cf0",
  track: "#1d1b26",
};

export const ogSize = { width: 1200, height: 630 };

export async function ogImage({ title, subtitle, progress }: { title: string; subtitle: string; progress: number }) {
  const [anton, avatar] = await Promise.all([
    readFile(join(process.cwd(), "assets/Anton-Regular.ttf")),
    readFile(join(process.cwd(), "public/img/avatar.png"), "base64"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 96px",
          background: C.paper,
          backgroundImage: `linear-gradient(to right, ${C.grid} 1px, transparent 1px), linear-gradient(to bottom, ${C.grid} 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          color: C.ink,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 40 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse needs a plain img */}
          <img src={`data:image/png;base64,${avatar}`} width={150} height={150} style={{ borderRadius: 4 }} alt="" />
          <div style={{ display: "flex", fontFamily: "Anton", fontSize: 150, lineHeight: 1, textTransform: "uppercase" }}>{title}</div>
        </div>
        <div style={{ display: "flex", marginTop: 36, fontSize: 38, color: C.muted, fontFamily: "Anton", letterSpacing: 1 }}>
          {subtitle}
        </div>
        <div style={{ display: "flex", marginTop: 40, width: "100%", height: 14, background: C.track }}>
          <div style={{ width: `${progress}%`, height: "100%", background: C.accent }} />
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Anton", data: anton, style: "normal", weight: 400 }],
    },
  );
}
