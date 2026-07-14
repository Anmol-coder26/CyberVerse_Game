// src/types/game.types.ts
// Central domain types for CyberVerse. Every game data structure (chapters,
// player stats, characters, mentor content) is typed here so the rest of the
// codebase gets compile-time safety instead of relying on shape-by-convention.

export interface PlayerStats {
  trust: number;
  cyberIQ: number;
  health: number;
  stress: number;
}

export type AvatarId = "agent" | "breaker" | "analyst";

export interface AvatarOption {
  id: AvatarId;
  label: string;
  icon: string;
  tagline: string;
  statMod: Partial<PlayerStats>;
}

export interface PlayerProfile {
  name: string;
  avatar: AvatarId;
}

export interface Character {
  key: string;
  name: string;
  role: string;
  color: string;
  icon: string;
  bio: string;
}

export interface PillarInfo {
  key: keyof PlayerStats;
  icon: string;
  color: string;
  title: string;
  desc: string;
}

export interface CinematicLine {
  speaker: string;
  color: string;
  text: string;
}

export interface Clue {
  id: string;
  label: string;
}

export interface ThreadSegment {
  text: string;
  clue?: Clue;
}

export interface MessageThread {
  from: string;
  time: string;
  segments: ThreadSegment[];
}

export interface ActionOption {
  id: string;
  icon: string;
  label: string;
  correct: boolean;
  reaction: string;
}

export interface ChapterPalette {
  a: string;
  b: string;
  accent: string;
}

export type AtmosphereType = "rain" | "metro" | "dust" | "none";

export interface ChapterLocation {
  name: string;
  atmosphere: AtmosphereType;
  palette: ChapterPalette;
}

export interface ChapterApp {
  name: string;
  icon: string;
}

export interface QRResult {
  merchant: string;
  clue1: Clue;
  clue2: Clue;
}

export interface QRData {
  label: string;
  result: QRResult;
}

export interface MentorInfo {
  whyItHappened: string;
  warningSigns: string[];
  immediateSteps: string;
  recoverySteps: string;
  helpline: string;
  portal: string;
}

export interface SpotTheFakeOption {
  label: string;
  fake: boolean;
}

export interface SpotTheFakeData {
  prompt: string;
  a: SpotTheFakeOption;
  b: SpotTheFakeOption;
}

export type AppType = "chat" | "call" | "email" | "qr";

export interface Chapter {
  id: string;
  num: string;
  title: string;
  tag: string;
  icon: string;
  hook: string;
  lockedForever?: boolean;
  intro?: string;
  location?: ChapterLocation;
  appType?: AppType;
  app?: ChapterApp;
  thread?: MessageThread;
  qr?: QRData;
  actions?: ActionOption[];
  mentor?: MentorInfo;
  spotTheFake?: SpotTheFakeData;
}

export type ScreenName =
  | "boot"
  | "cinematic"
  | "characters"
  | "create"
  | "pillars"
  | "hub"
  | "mission-intro"
  | "scene"
  | "consequence"
  | "gameover"
  | "mentor"
  | "reward";

export interface FoundClue {
  id: string;
  label: string;
}
