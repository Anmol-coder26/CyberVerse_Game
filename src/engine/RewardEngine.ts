// src/engine/RewardEngine.ts
// Logic for the two places the game hands the player something: applying a
// chosen role's starting-stat bonus at character creation, and the flat
// reward shown on the case-complete screen.

import type { AvatarOption, PlayerStats } from "../types";

/** Applies a chosen role's real starting-stat modifier on top of the defaults. */
export function applyAvatarBonus(baseStats: PlayerStats, avatar: AvatarOption | undefined): PlayerStats {
  if (!avatar) return baseStats;
  return { ...baseStats, ...avatar.statMod };
}

export interface CaseReward {
  xp: number;
  coins: number;
}

/** Flat reward shown on the "Case closed" screen after a successful debrief. */
export function getCaseReward(): CaseReward {
  return { xp: 50, coins: 20 };
}
