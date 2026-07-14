// src/context/GameContext.tsx
// Single source of truth for cross-page game state: the player's profile,
// their four stats, which chapters are completed, and which chapter is
// currently active. Pages read this via useGame() instead of prop-drilling.

import React, { createContext, useContext, useMemo, useReducer } from "react";
import { DEFAULT_STATS } from "../constants/avatars";
import { applyAvatarBonus } from "../engine/RewardEngine";
import { computeOutcomeStats, isGameOver, reviveStats } from "../engine/DecisionEngine";
import type { ActionOption, AvatarOption, PlayerProfile, PlayerStats } from "../types";

interface GameState {
  player: PlayerProfile;
  stats: PlayerStats;
  completedChapterIds: string[];
  currentChapterId: string | null;
}

type GameAction =
  | { type: "SET_PLAYER_NAME"; name: string }
  | { type: "SET_AVATAR"; avatar: PlayerProfile["avatar"] }
  | { type: "APPLY_AVATAR_BONUS"; avatar: AvatarOption }
  | { type: "SELECT_CHAPTER"; chapterId: string }
  | { type: "RESOLVE_ACTION"; action: ActionOption; wasTimeout: boolean }
  | { type: "SPEND_IQ"; amount: number }
  | { type: "COMPLETE_CHAPTER"; chapterId: string }
  | { type: "REVIVE_AFTER_GAME_OVER" };

const initialState: GameState = {
  player: { name: "", avatar: "agent" },
  stats: { ...DEFAULT_STATS },
  completedChapterIds: [],
  currentChapterId: null,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "SET_PLAYER_NAME":
      return { ...state, player: { ...state.player, name: action.name } };
    case "SET_AVATAR":
      return { ...state, player: { ...state.player, avatar: action.avatar } };
    case "APPLY_AVATAR_BONUS":
      return { ...state, stats: applyAvatarBonus(state.stats, action.avatar) };
    case "SELECT_CHAPTER":
      return { ...state, currentChapterId: action.chapterId };
    case "RESOLVE_ACTION":
      return { ...state, stats: computeOutcomeStats(state.stats, action.action, action.wasTimeout) };
    case "SPEND_IQ":
      return { ...state, stats: { ...state.stats, cyberIQ: Math.max(0, state.stats.cyberIQ - action.amount) } };
    case "COMPLETE_CHAPTER":
      return state.completedChapterIds.includes(action.chapterId)
        ? state
        : { ...state, completedChapterIds: [...state.completedChapterIds, action.chapterId] };
    case "REVIVE_AFTER_GAME_OVER":
      return { ...state, stats: reviveStats(state.stats) };
    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  isGameOver: boolean;
}

const GameContext = createContext<GameContextValue | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const value = useMemo<GameContextValue>(
    () => ({ state, dispatch, isGameOver: isGameOver(state.stats) }),
    [state]
  );
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame() must be used inside a <GameProvider>.");
  return ctx;
}
