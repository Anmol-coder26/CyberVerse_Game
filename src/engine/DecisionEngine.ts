// src/engine/DecisionEngine.ts
// Pure, framework-free game logic for what happens when a player commits to
// an action inside a case. Kept separate from any React component so it's
// independently testable and reusable (e.g. by a future backend simulator).

import type { ActionOption, PlayerStats } from "../types";

export const CORRECT_TRUST_GAIN = 15;
export const CORRECT_IQ_GAIN = 40;
export const WRONG_TRUST_LOSS = 20;
export const WRONG_HEALTH_LOSS = 15;
export const TIMEOUT_HEALTH_LOSS = 25;
export const WRONG_STRESS_GAIN = 15;
export const TIMEOUT_STRESS_GAIN = 25;

/**
 * Computes the next PlayerStats after resolving an action choice.
 * Pure function - no side effects, safe to unit test directly.
 */
export function computeOutcomeStats(
  stats: PlayerStats,
  action: ActionOption,
  wasTimeout: boolean
): PlayerStats {
  if (action.correct) {
    return {
      ...stats,
      trust: Math.min(100, stats.trust + CORRECT_TRUST_GAIN),
      cyberIQ: stats.cyberIQ + CORRECT_IQ_GAIN,
    };
  }
  return {
    ...stats,
    trust: Math.max(0, stats.trust - WRONG_TRUST_LOSS),
    health: Math.max(0, stats.health - (wasTimeout ? TIMEOUT_HEALTH_LOSS : WRONG_HEALTH_LOSS)),
    stress: Math.min(100, stats.stress + (wasTimeout ? TIMEOUT_STRESS_GAIN : WRONG_STRESS_GAIN)),
  };
}

/** True once Health has been depleted - triggers the Game Over screen. */
export function isGameOver(stats: PlayerStats): boolean {
  return stats.health <= 0;
}

/** The stats a player is restored to after a Game Over retry. */
export function reviveStats(stats: PlayerStats): PlayerStats {
  return { ...stats, health: 50 };
}

/**
 * Chooses which action to auto-resolve when the Scene Clock runs out.
 * Picks the first incorrect action, falling back to the first action of any
 * kind if a chapter were ever misconfigured with no wrong answers.
 */
export function pickTimeoutAction(actions: ActionOption[]): ActionOption {
  return actions.find((action) => !action.correct) ?? actions[0];
}
