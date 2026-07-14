// src/constants/theme.ts
// Single source of truth for the game's visual language. Every component
// pulls colors/fonts from here instead of hardcoding hex values, so the
// entire game re-themes from one file if needed.

export const COLORS = {
  void: "#050609",
  cyan: "#00F0FF",
  purple: "#8B5CF6",
  saffron: "#FFA94D",
  crimson: "#FF3366",
  emerald: "#12E8A6",
  frost: "#F2F5FF",
  muted: "#888EA6",
} as const;

export const FONT_DISPLAY = "'Rajdhani', 'Arial Narrow', sans-serif";
export const FONT_BODY = "'Inter', system-ui, sans-serif";
export const FONT_GLYPH = "'JetBrains Mono', 'Courier New', monospace";

// Premium "slow settle" easing used for every transition in the game -
// deliberately weightier than a default ease, not snappy.
export const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
