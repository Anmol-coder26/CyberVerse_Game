// src/engine/MissionEngine.ts
// Logic for running a single mission/case: the Stress-linked countdown
// timer, and the mapping from a chapter's accent color to a musical mood.

import { COLORS } from "../constants/theme";

export const TIMER_BASE_SECONDS = 36;
export const TIMER_MIN_SECONDS = 18;

/**
 * The Scene Clock's starting duration is driven by the player's current
 * Stress stat - 36s at 0 Stress, down to a floor of 18s at 100 Stress.
 * This is the mechanical link between "panic compounds" and actual
 * gameplay difficulty, not just flavor text.
 */
export function computeTimerDuration(stress: number): number {
  const reduction = (stress / 100) * (TIMER_BASE_SECONDS - TIMER_MIN_SECONDS);
  return Math.max(TIMER_MIN_SECONDS, Math.round(TIMER_BASE_SECONDS - reduction));
}

export interface MoodProfile {
  semitoneShift: number;
  filterBrightness: number;
}

/**
 * Every chapter's accent color maps to a distinct musical mood - a
 * transposition and filter brightness applied to the ambient score - so a
 * phishing-email case and a digital-arrest case are sonically distinct.
 */
export const MOOD_BY_ACCENT: Record<string, MoodProfile> = {
  [COLORS.purple]: { semitoneShift: -3, filterBrightness: 620 },
  [COLORS.cyan]: { semitoneShift: 2, filterBrightness: 950 },
  [COLORS.saffron]: { semitoneShift: 5, filterBrightness: 820 },
  [COLORS.crimson]: { semitoneShift: -5, filterBrightness: 480 },
  [COLORS.emerald]: { semitoneShift: 7, filterBrightness: 780 },
};

export const NEUTRAL_MOOD: MoodProfile = { semitoneShift: 0, filterBrightness: 700 };

export function getMoodForAccent(accentColor: string | null | undefined): MoodProfile {
  if (!accentColor) return NEUTRAL_MOOD;
  return MOOD_BY_ACCENT[accentColor] ?? NEUTRAL_MOOD;
}

/** Danger threshold - below this fraction of time remaining, the UI turns urgent. */
export const DANGER_THRESHOLD = 0.3;

export function isDanger(timeLeft: number, totalTime: number): boolean {
  return timeLeft <= totalTime * DANGER_THRESHOLD;
}
