// src/engine/StoryEngine.ts
// Sequencing logic for the opening cinematic's dialogue lines. Extracted out
// of the Typewriter component so the "what line comes next" decision isn't
// buried inside a UI component.

import type { CinematicLine } from "../types";

export function isLastLine(lines: CinematicLine[], index: number): boolean {
  return index === lines.length - 1;
}

export function nextLineIndex(lines: CinematicLine[], currentIndex: number): number {
  return Math.min(currentIndex + 1, lines.length - 1);
}

/** Typing speed for the cinematic's letter-by-letter reveal, in ms per character. */
export const TYPEWRITER_MS_PER_CHAR = 18;
