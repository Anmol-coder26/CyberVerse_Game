// src/utils/gameUtils.ts
// Small, pure, reusable helper functions used across the game. Nothing here
// holds state - anything stateful belongs in hooks/ or context/, not here.

import { COLORS } from "../constants/theme";
import type { Chapter, Clue } from "../types";

/** Maps a Trust stat value to its display color band. */
export function trustColor(value: number): string {
  if (value >= 60) return COLORS.cyan;
  if (value >= 35) return COLORS.saffron;
  return COLORS.crimson;
}

/**
 * Returns every inspectable clue for a chapter, regardless of whether it's a
 * chat/call/email thread or a QR scan. This is what powers the "inspect
 * before deciding" gate and the hint system.
 */
export function getAllClues(chapter: Chapter): Clue[] {
  if (chapter.appType === "qr" && chapter.qr) {
    return [chapter.qr.result.clue1, chapter.qr.result.clue2];
  }
  return (chapter.thread?.segments ?? [])
    .filter((segment) => segment.clue)
    .map((segment) => segment.clue as Clue);
}

/** Formats seconds as either "12" or "1:05" for the Scene Clock. */
export function formatClock(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  if (minutes > 0) return `${minutes}:${String(seconds).padStart(2, "0")}`;
  return String(seconds);
}
