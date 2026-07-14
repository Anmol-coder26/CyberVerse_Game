// src/constants/pillars.ts
import { COLORS } from "./theme";
import type { PillarInfo } from "../types";

export const PILLARS: PillarInfo[] = [
  {
    key: "trust",
    icon: "shield",
    color: COLORS.cyan,
    title: "Trust",
    desc: "Every right call raises Trust. Low Trust visibly darkens the whole city — the world reacts to how well you protect people.",
  },
  {
    key: "cyberIQ",
    icon: "brain",
    color: COLORS.purple,
    title: "Cyber IQ",
    desc: "Earned by outsmarting scams. Spend it any time to ask ARIA for an instant clue when you're stuck on a case.",
  },
  {
    key: "health",
    icon: "heartbeat",
    color: COLORS.emerald,
    title: "Health",
    desc: "Wrong calls cost Health. Hit zero and it's game over — the Puppeteer wins that round, and you retry.",
  },
  {
    key: "stress",
    icon: "fire",
    color: COLORS.saffron,
    title: "Stress",
    desc: "Every mistake raises Stress — and higher Stress means less time on your next case. Panic compounds, just like real life.",
  },
];
