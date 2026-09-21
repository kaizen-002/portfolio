# Arya Mulya — portfolio

Two pages: the home page (`/`) and the Lorenesia case study (`/work/lorenesia`). Next.js 16, static, deployed on Vercel.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` checks everything the way Vercel will.

## Where things live

| What | File |
| --- | --- |
| Name, tagline, links | `src/content/site.ts` |
| Every word and number of the case study | `src/content/lorenesia.ts` |
| Colours, fonts, sizes, spacing | `tokens.css` (the only place raw colour values live) |
| Home page | `src/app/page.tsx` + `home.module.css` |
| Case study page | `src/app/work/lorenesia/page.tsx` + `case.module.css` |
| Pipeline diagram | `src/components/PipelineMap.tsx` |
| Images (frames, thumbnails, avatar, station map) | `public/img/` |

To change text, edit the two files in `src/content/`. The pages read from them.

## Images

Frames and thumbnails were cut from the real Lorenesia renders with ffmpeg (720×1280). The station map is the dashboard's
eight room paintings in its own 4×2 order. The avatar is the channel's profile picture.

## Deploy

Vercel, from the GitHub repo. No environment variables needed. `VERCEL_PROJECT_PRODUCTION_URL` (set by Vercel) becomes
the canonical URL for share images and the sitemap.
