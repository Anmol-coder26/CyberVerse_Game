# CyberVerse

**Every Click Has Consequences.**

An AI-powered cyber survival experience — a cinematic web game that teaches
players to recognize and survive real Indian cyber fraud (OTP scams, digital
arrest scams, phishing, vishing, QR/UPI fraud, and more) by investigating
evidence themselves under real time pressure, not by answering a quiz.

## Quick start

```bash
npm install
npm run dev      # starts the Vite dev server
npm run build    # type-checks and produces a production build in dist/
npm run preview  # serves the production build locally
```

Requires Node.js 18+.

## What's actually implemented

- 10 fully playable cases, each a real Indian scam pattern (see
  `src/constants/chapters.ts`)
- A Four Pillars stat system (Trust / Cyber IQ / Health / Stress) where every
  number has a real gameplay effect — see `src/engine/DecisionEngine.ts` and
  `src/engine/MissionEngine.ts`
- Three player roles with real starting-stat bonuses, not cosmetic labels —
  see `src/constants/avatars.ts`
- A generative ambient soundtrack (Tone.js) that changes mood per case and
  reacts to time pressure — see `src/services/audio/MusicEngine.ts`
- A Scene Clock, Evidence Tray, Hint system, AI Mentor debrief, and a
  "Spot the Fake" recognition exercise at the end of every case

For the full breakdown of every system and case, see
`docs/CyberVerse_Game_Manual.pdf` and
`docs/CyberVerse_Tech_Stack.pdf` for the technology rationale.

## What's scaffolded but not yet built

The folders below exist as intentional architecture, not fabricated
features — each has its own README explaining status:

- `src/pages/Settings`, `src/pages/Inventory`, `src/pages/Leaderboard` — UI
  placeholders
- `src/components/inventory`, `src/components/boss` — reserved, empty
- `src/services/firebase`, `src/services/gemini`, `src/services/api` —
  stub clients, not connected to real credentials
- `server/` — reserved backend structure (see `server/README.md`)

## Project structure

```
src/
  assets/          images, audio, video, icons, fonts
  components/
    ui/            GameIcon, Button, GlyphLabel, HoloPanel
    common/        ParticleField, PerspectiveFloor, Atmosphere, HUDBar, TrustRing
    animations/     Typewriter, IrisOverlay
    game/          ChapterCard, ChapterGrid (the case dashboard)
    phone/         PhoneShell, MessageApp, QRApp, SceneClock, EvidenceTray...
    mentor/        MentorSection, SpotTheFake
    missions/      InvestigationScene (the core gameplay loop)
    inventory/     reserved, not implemented
    boss/          reserved, not implemented
  pages/           one folder per route (Landing, Intro, Game, Mission, ...)
  layouts/         GameLayout - the persistent shell (background, HUD chrome)
  hooks/           useTilt, useIris, useMusic, useCountdown
  context/         GameContext (player/stats/progress), PresentationContext (audio/transitions)
  engine/          DecisionEngine, MissionEngine, StoryEngine, RewardEngine
  services/
    audio/         MusicEngine (Tone.js wrapper)
    firebase/       reserved
    gemini/         reserved
    api/            reserved
  routes/          AppRoutes - the route table
  types/           game.types.ts - the domain model
  constants/       theme, chapters, characters, avatars, pillars
  utils/           gameUtils
  styles/          global.css - keyframes and font import
server/            reserved backend structure, not implemented
```

## Roadmap

1. **Now** — 10 hand-crafted cases, fully playable, single-player, no backend.
2. **Next** — Gemini-generated missions (server-side only) so no two
   playthroughs repeat.
3. **Later** — Firebase auth + save sync, a real leaderboard, deepfake and
   crypto-fraud cases, school/college deployment as a PWA.

## Team

**Midnight Builders** — Anmol Singh (Team Lead), Harsh Bamer (Team Member).
