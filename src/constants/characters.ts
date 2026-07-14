// src/constants/characters.ts
import { COLORS } from "./theme";
import type { Character, CinematicLine } from "../types";

export const CINEMATIC: CinematicLine[] = [
  { speaker: "SYSTEM", color: COLORS.crimson, text: "CYBER EMERGENCY DECLARED. MILLIONS TARGETED NATIONWIDE." },
  { speaker: "THE PUPPETEER", color: COLORS.purple, text: "You don't lose money because I'm smart. You lose it because you trust too easily." },
  { speaker: "ARIA // AI UNIT", color: COLORS.cyan, text: "Signal restored, Agent. Every light in this city is a person one click from losing everything." },
  { speaker: "ARIA // AI UNIT", color: COLORS.cyan, text: "You won't have long once a scam is live. Move fast, but look first." },
];

export const CHARACTERS: Character[] = [
  {
    key: "aria",
    name: "ARIA",
    role: "AI Cyber-Defense Unit",
    color: COLORS.cyan,
    icon: "robot",
    bio: "Built by India's Cyber Crime Cell to fight fraud at the speed it happens. ARIA analyzes every scam with you in real time and debriefs you after — she's the reason a wrong call isn't the end of the story.",
  },
  {
    key: "puppeteer",
    name: "The Puppeteer",
    role: "Unknown — mastermind behind the attack wave",
    color: COLORS.purple,
    icon: "skull",
    bio: "Nobody has seen his face. He doesn't break into systems — he breaks into trust. Every scam in this city, from a fake SMS to a fake arrest, traces back to his network.",
  },
];
