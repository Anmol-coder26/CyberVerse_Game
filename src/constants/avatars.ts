// src/constants/avatars.ts
// The three player roles. Each one carries a real starting-stat modifier -
// this is not cosmetic. See engine/RewardEngine.ts for where statMod is
// actually applied.

import type { AvatarOption } from "../types";

export const AVATARS: AvatarOption[] = [
  {
    id: "agent",
    label: "Field Agent",
    icon: "shield",
    tagline: "Tougher — starts with 130 Health instead of 100.",
    statMod: { health: 130 },
  },
  {
    id: "breaker",
    label: "Code Breaker",
    icon: "terminal",
    tagline: "Sharper — starts with 700 Cyber IQ, room for far more hints.",
    statMod: { cyberIQ: 700 },
  },
  {
    id: "analyst",
    label: "Signal Analyst",
    icon: "radar",
    tagline: "Calmer — starts at 0 Stress, giving longer timers all game.",
    statMod: { stress: 0 },
  },
];

export const DEFAULT_STATS = {
  trust: 50,
  cyberIQ: 300,
  health: 100,
  stress: 20,
};
