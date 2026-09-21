// Everything the Lorenesia case study says, in one place.
// Every number here comes from the project's own files (MEMORY.md, checker reports, the renders).

export const lorenesia = {
  title: "Lorenesia",
  summary:
    "An agent pipeline that makes Indonesian YouTube Shorts about hidden game stories. I record the voice and press upload. Agents do everything else.",
  period: "11–21 Sept 2026",
  role: "Solo: system design, code, voice",
  stack: "Node 24 · ffmpeg · Gemini · Groq · Discord · Supabase · Vercel",
  output: "27 videos rendered · 2 published",
};

export const caseStats = [
  {
    figure: "2.45",
    unit: "words per second",
    note: "Script pace, measured from my own reading. The judge sizes every script to it.",
  },
  {
    figure: "27 → 2",
    unit: "rendered → published",
    note: "Twenty-seven videos rendered in ten days, most of them while the pipeline was still being built. Two published so far.",
  },
  {
    figure: "90 s → 1 s",
    unit: "per scene",
    note: "Render time after swapping ffmpeg's zoompan for an animated crop.",
  },
  {
    figure: "0.92 / 0.11",
    unit: "voice match",
    note: "Share of a script's words heard in its own voice note, against another video's.",
  },
];

export type Lane = "you" | "agent" | "always";

export type Stage = {
  id: string;
  label: string;
  sub: string;
  lane: Lane;
  title: string;
  points: string[];
};

// Row 1 makes the draft. Row 2 finishes it once my voice is in. Row 3 never stops.
export const draftRow: Stage[] = [
  {
    id: "scout-cmd",
    label: "!scout",
    sub: "from my phone",
    lane: "you",
    title: "One command starts everything",
    points: [
      "I type `!scout` in Discord, usually from my phone. Kurator, the orchestrator bot, runs the whole chain hands-off and tags me only when it needs me.",
      "Heavy jobs run one at a time, 40 minutes at most each. Before the queue, two jobs both grabbed “the newest file” and mixed two videos together.",
    ],
  },
  {
    id: "lore-scout",
    label: "lore-scout",
    sub: "finds the story",
    lane: "agent",
    title: "Find a story people don’t know",
    points: [
      "Reads Wikipedia (articles cached for 12 hours) and picks ten topics.",
      "Rules: a game from 1998 to 2026, genuinely well known, with a genuinely obscure story. The surprise must be an event (cancelled, banned, delisted, bankrupt, sued, leaked, a record), never a description of the game.",
      "Scores the Steam footage for each topic. If fewer than two have a trailer, it gathers new articles with Steam-leaning queries and picks again.",
      "Published games are remembered for good, so a game never comes back.",
    ],
  },
  {
    id: "script-writer",
    label: "script-writer",
    sub: "writes + judges",
    lane: "agent",
    title: "Write it like a story, then measure it",
    points: [
      "Works from the whole Wikipedia article, not the cached intro.",
      "Spine: hook (the surprise, 12 words or fewer) → what everyone thinks → what really happened → proof → consequence → one closing question.",
      "`judgeScript` checks it mechanically: 30–60 s at 2.45 words/sec, sentences of 5–14 words, a connective ratio of at least 40% (tapi, padahal, soalnya…), at most two question marks, a surprise in the first sentence, and every number must appear in the source.",
      "Up to two rewrites, then a polish pass that is kept only if it scores better.",
    ],
  },
  {
    id: "asset-lister",
    label: "asset-lister",
    sub: "shot per phrase",
    lane: "agent",
    title: "Plan one shot per spoken phrase",
    points: [
      "The shot list is built in code, one shot per phrase, so the picture changes with the words.",
      "The model only fills in four fields per phrase: type | search | search2 | sfx. Type is gameplay, logo, source, person, place, object or mood.",
      "If the game has no Steam page, footage is forbidden and it plans source cards, logos and real photos instead.",
    ],
  },
  {
    id: "fetcher",
    label: "fetcher",
    sub: "footage, logos",
    lane: "agent",
    title: "Turn the list into files",
    points: [
      "Steam trailers and full-HD screenshots, company logos from the Wikipedia infobox, pictures from Commons, Openverse, Pexels and Pixabay, CC0 music from Freesound.",
      "A vision model vets images four at a time. For a person, the whole name must match: “Richard Garfield” once matched a statue of James A. Garfield.",
      "Licences: public domain, CC0 and plain CC BY with on-screen credit. Never ShareAlike, which would push its licence onto the whole video.",
    ],
  },
  {
    id: "editor-draft",
    label: "editor",
    sub: "draft render",
    lane: "agent",
    title: "Render the draft with ffmpeg",
    points: [
      "1080×1920 composition, delivered at 1440×2560, H.264 CRF 17. Two to three minutes per video.",
      "Kinetic subtitles burnt in with libass, logo cards, source cards, the game’s title logo and a purple progress bar.",
      "No voice yet. The draft lets me read the script against the pictures before I record.",
    ],
  },
  {
    id: "checker-draft",
    label: "checker",
    sub: "pass or fail",
    lane: "agent",
    title: "The checker decides",
    points: [
      "Checks size, codec, loudness, black stretches, repeated pictures and seconds per picture, plus a vision pass over nine frames.",
      "The mechanical checks decide. The vision model’s verdict is printed as advice. The report ends with one line: PUTUSAN AKHIR: LULUS / GAGAL (final verdict: pass / fail).",
      "On a fail: a fresh asset search and a re-render. Still failing: safe mode (game footage, screenshots, logos and source cards only). After that, a new topic from scratch, at most three.",
    ],
  },
];

export const finishRow: Stage[] = [
  {
    id: "voice-note",
    label: "voice note",
    sub: "me, reading",
    lane: "you",
    title: "My voice, matched to its script",
    points: [
      "I record the script as a voice note in #editor.",
      "Groq Whisper transcribes it. The transcript is matched against every prepared script by the share of that script’s words actually heard: about 0.92 for its own script, about 0.11 for another video’s. The best match above 0.6 gets the voice.",
    ],
  },
  {
    id: "editor-final",
    label: "editor",
    sub: "final render",
    lane: "agent",
    title: "Final render",
    points: [
      "The editor refuses a voice that does not read its script.",
      "Subtitles are re-timed to the real word timings from the transcript.",
    ],
  },
  {
    id: "checker-final",
    label: "checker",
    sub: "checks my voice",
    lane: "agent",
    title: "Checked again, with the voice",
    points: [
      "Same report as the draft, plus voice-to-script match. A voiced video under 60% fails.",
    ],
  },
  {
    id: "credits-thumbnail",
    label: "credits",
    sub: "thumbnail prompt",
    lane: "agent",
    title: "Credits and a thumbnail prompt",
    points: [
      "Every asset is logged in a credits file. CC BY lines are posted to #hasil, ready to paste into the description.",
      "Kurator posts a ready prompt for ChatGPT in #thumbnail. I send the image back and the real Steam title logo is stamped on at 13.5% from the top, because YouTube crops the top and bottom 10% of a Shorts thumbnail.",
    ],
  },
  {
    id: "upload",
    label: "upload",
    sub: "me, by hand",
    lane: "you",
    title: "Upload, by hand",
    points: [
      "I upload to YouTube myself. There is no API link; the reason is under “What’s still weak”.",
    ],
  },
];

export const alwaysRow: Stage[] = [
  {
    id: "penjaga",
    label: "Penjaga",
    sub: "keeps bots alive",
    lane: "always",
    title: "Penjaga keeps it running",
    points: [
      "The one process that stays up. It starts and restarts Kurator, Descriptor (a second bot that breaks down reference videos I drop in #watcher) and the dashboard, hidden, with no terminal windows.",
      "I control it from #kontrol on my phone: !mesin, !restart, !stop, !start, !log. Commands only run while the laptop is on, awake and online.",
    ],
  },
  {
    id: "supabase",
    label: "Supabase",
    sub: "shared state",
    lane: "always",
    title: "State, every ten seconds",
    points: ["Kurator pushes its state to Supabase every 10 seconds, so the dashboard never talks to the laptop directly."],
  },
  {
    id: "dashboard",
    label: "dashboard",
    sub: "Vercel, live",
    lane: "always",
    title: "The live dashboard",
    points: [
      "A Vercel site reads that state and draws a station of eight painted rooms. Agents walk between rooms as jobs move. Owner-only login.",
    ],
  },
];

export const allStages = [...draftRow, ...finishRow, ...alwaysRow];

export const format = [
  "1080×1920 composition, delivered at 1440×2560. Vertical video above 1080 gets YouTube’s better codec, which is most of the gain on phones.",
  "About 80% full-screen game footage, cut from the publisher’s own muted Steam trailers, 2–4 s per shot. Dark and blown-out moments are skipped.",
  "A logo card the moment a company is named, a news-style source card when a fact is cited, the game’s title logo over the opening shot.",
  "Kinetic subtitles: one or two words at a time, on one fixed line at 75% of the height, popping 55% → 118% → 100% in 0.14 s. Numbers and story words in yellow.",
  "Music picked by the script’s mood (CC0), with the last 12 tracks remembered so videos never sound the same twice.",
];

export const shorts = [
  {
    id: "8X3wPAMY_R0",
    title: "ASHLEY BUKAN BEBAN",
    gloss: "“Ashley is not a burden”, on Resident Evil 4 (2023)",
    poster: "/img/lorenesia/thumb-re4.jpg",
  },
  {
    id: "iq18KXvGAW0",
    title: "MERAJAI STEAM GLOBAL",
    gloss: "“Ruling Steam worldwide”, on Phasmophobia",
    poster: "/img/lorenesia/thumb-phasmophobia.jpg",
  },
];

export const frames = [
  { src: "/img/lorenesia/re4-logo.jpg", caption: "Logo card, the moment Capcom is named" },
  { src: "/img/lorenesia/re4-source.jpg", caption: "Source card for a cited fact, with the number in yellow" },
  { src: "/img/lorenesia/re4-footage.jpg", caption: "Official trailer footage under a one-word caption" },
];

export const beforeAfter = {
  before: {
    src: "/img/lorenesia/witcher-husky.jpg",
    label: "Before",
    caption: "First render, 11 Sept. “Rise of the White Wolf” over a stock photo of a husky.",
  },
  after: {
    src: "/img/lorenesia/re4-footage.jpg",
    label: "After",
    caption: "Published Short, rendered 20 Sept. Capcom’s own trailer footage, one word at a time.",
  },
};

export const scriptCompare = {
  before: {
    heading: "The Witcher, 11 Sept",
    lines: [
      {
        id: "Proyek Rise of the White Wolf batal akibat konflik pembayaran.",
        en: "The Rise of the White Wolf project was cancelled due to a payment conflict.",
      },
      {
        id: "Pengembang Widescreen Games menghentikan produksi karena masalah uang dengan CD Projekt.",
        en: "Developer Widescreen Games halted production because of money problems with CD Projekt.",
      },
    ],
    verdict: "Dictionary sentences. Each line is a fact; nothing pulls you to the next one.",
  },
  after: {
    heading: "Resident Evil 4, 20 Sept",
    lines: [
      {
        id: "Kalian mungkin ngira Capcom cuma pamer kecanggihan mesin RE Engine.",
        en: "You probably think Capcom was just showing off the RE Engine.",
      },
      {
        id: "Padahal pas rilis 24 Maret 2023, fokus pengembang justru beda.",
        en: "But when it launched on 24 March 2023, the team’s focus was somewhere else.",
      },
    ],
    verdict: "Spoken rhythm. “Padahal” (but actually) turns the story. The judge scores that on purpose.",
  },
};

// Left: the first render and its checker report. Right: the published RE4 video and its report.
export const checkerRows: { label: string; before: string; after: string }[] = [
  { label: "Resolution", before: "1080×1920", after: "1440×2560" },
  { label: "Bitrate", before: "1.7 Mbps", after: "13.2 Mbps" },
  { label: "Pictures", before: "6 in 30 s, 5 s each", after: "22 in 49.5 s, about 2.2 s each" },
  {
    label: "Picture source",
    before: "Stock photos: a knight costume, a husky, a wanted poster",
    after: "Capcom’s own trailers, logo cards, Wikipedia source cards",
  },
  { label: "Captions", before: "Whole sentences in a grey box", after: "One or two words, kinetic, story words in yellow" },
  { label: "Voice", before: "None", after: "Mine, 94% of the script’s words heard" },
  { label: "Vision check", before: "Skipped, quota ran out", after: "9 frames reviewed, 3 flagged" },
  { label: "Checker verdict", before: "LULUS (pass)", after: "LULUS (pass)" },
];

export type Decision = {
  title: string;
  problem: string;
  choice: string;
  cost: string;
};

export const decisions: Decision[] = [
  {
    title: "Use the game’s own footage, not stock video",
    problem:
      "Stock libraries match mood words, not game history. The first render illustrated The Witcher with a man in a knight costume and “White Wolf” with a husky.",
    choice:
      "Short, muted cuts from the publisher’s own Steam trailers carry about 80% of the screen, with screenshots, logos and source cards for the rest. The asset lister searches for the exact named thing, never a mood.",
    cost:
      "A publisher could still file a Content ID claim on a Short; the fix is replacing that clip. Games without a Steam page need a different plan. Never game music, never other creators’ gameplay, never full trailers.",
  },
  {
    title: "One shot per spoken phrase, built in code",
    problem: "When the model planned the shots itself, captions ended up sitting under unrelated pictures.",
    choice:
      "Code splits the script into phrases and makes one shot per phrase. The model only fills four fields for each: type, search, backup search, sound effect.",
    cost: "Less creative freedom for the model, and more, shorter shots to fetch: about 2.2 s per picture.",
  },
  {
    title: "Measure the script instead of trusting the prompt",
    problem: "Model-written Indonesian read like a dictionary: stiff, list-like, and the length drifted.",
    choice:
      "A judge counts what a listener feels: length at my 2.45 words/sec, 5–14 words per sentence, connectives, question marks, a surprise up front, and no number that isn’t in the source. Two rewrites at most, then a polish pass that is kept only if it scores better.",
    cost: "More model calls per script on a free-tier quota.",
  },
  {
    title: "Mechanical checks decide; the vision model advises",
    problem:
      "A vision model alone rejects good frames and passes bad ones. One “generic” frame out of nine used to fail a whole video.",
    choice:
      "Size, codec, loudness, black stretches, repeats, seconds per picture and voice match decide. The vision pass is printed as advice, and the report ends in one unambiguous line.",
    cost:
      "Small misses can ship. On RE4 the vision pass flagged 3 of 9 frames (Ada Wong on screen while the line is about Ashley). The mechanical checks passed, the video shipped, and the flags reached me as notes.",
  },
  {
    title: "ffmpeg does the whole edit",
    problem:
      "CapCut has no public API; the MCP package for it calls domains that don’t resolve. And ffmpeg’s zoompan cost about 90 s per scene.",
    choice:
      "Everything is an ffmpeg filter graph. An animated crop gives the same slow drift in about a second. Because crop and drawbox evaluate their size only once, the progress bar is drawn as 45 timed segments.",
    cost: "Every visual effect is hand-written filter code, which is harder to read than a timeline.",
  },
  {
    title: "Free tiers, with a fallback chain",
    problem: "No budget, and free quotas run out in the middle of a job.",
    choice:
      "The model layer tries gemini-3.6-flash → 3.5-flash → 3.8-flash → 3.5-flash-lite → Groq gpt-oss-120b. A model that answers 429 or times out is benched for 10–15 minutes.",
    cost:
      "Quality depends on whichever model has quota that hour. Gemini image generation isn’t on the free key, so thumbnails go through ChatGPT by hand.",
  },
  {
    title: "My own voice, not a synthetic one",
    problem:
      "YouTube’s inauthentic-content and reused-content rules are the main risk for a faceless channel that wants the Partner Programme.",
    choice:
      "I record every voiceover. Each voice note is matched to its own script, the editor refuses a voice that doesn’t read its script, and subtitles re-time to my real word timings.",
    cost: "The one manual step besides the upload. The channel cannot publish without me.",
  },
  {
    title: "One heavy job at a time",
    problem: "Two jobs running at once both grabbed “the newest file” and mixed two videos together.",
    choice:
      "A queue: scout, script, assets, fetch, edit, check, thumbnail and voice notes run one at a time, each with a 40-minute ceiling. Output files are picked by modification time, never alphabetically.",
    cost: "Slower throughput, and a stuck job holds the queue until its ceiling.",
  },
];

export const weaknesses = [
  {
    title: "No YouTube API link",
    body: "Publishing an app with sensitive scopes needs Google’s verification, and verification needs a domain I own. The Vercel subdomain was rejected, and I chose not to buy a domain or re-authorise every week. So uploads are manual, and channel numbers don’t reach the dashboard. Next step: a plain API key can read public stats (views, likes, comments) with no consent screen.",
  },
  {
    title: "One laptop, one disk, no backup",
    body: "Outputs and configuration live on a single machine. That is the only failure I can’t recover from.",
  },
  {
    title: "It only works while the laptop is awake",
    body: "Commands from the phone run only while the laptop is on and online. Anything typed while it is off is not run later.",
  },
  {
    title: "Hard-coded model names",
    body: "When Google or Groq retires a model, quality quietly drops to the lite fallback instead of failing loudly.",
  },
  {
    title: "Upstream sources without versions",
    body: "Steam and Wikipedia are unversioned APIs. A change on their side breaks scouting or fetching without warning.",
  },
  {
    title: "A judge that changes with the quota",
    body: "The vision pass uses whichever Gemini model has quota that hour, so its advice isn’t consistent from one video to the next.",
  },
];
