// src/components/phone/SceneClock.tsx
import { GlyphLabel } from "../ui/GlyphLabel";
import { formatClock } from "../../utils/gameUtils";
import { COLORS, FONT_DISPLAY } from "../../constants/theme";

export interface SceneClockProps {
  timeLeft: number;
  totalTime: number;
  danger: boolean;
  accent: string;
}

/** The visible countdown clock rendered beside the phone once an app is
 * open. Its starting duration comes from the player's Stress stat - see
 * engine/MissionEngine.ts. */
export function SceneClock({ timeLeft, totalTime, danger, accent }: SceneClockProps) {
  const r = 34;
  const c = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(1, timeLeft / totalTime));
  const offset = c - pct * c;
  const color = danger ? COLORS.crimson : accent;
  const label = formatClock(timeLeft);

  return (
    <div className={danger ? "clock-pulse" : ""} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
      <svg width="88" height="88" viewBox="0 0 88 88" style={{ filter: `drop-shadow(0 0 12px ${color}99)` }}>
        <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
        <circle
          cx="44"
          cy="44"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="5"
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 44 44)"
          style={{ transition: "stroke-dashoffset 1s linear, stroke .4s ease" }}
        />
        <text x="44" y="50" textAnchor="middle" fill={COLORS.frost} fontFamily={FONT_DISPLAY} fontWeight={700} fontSize="20">
          {label}
        </text>
      </svg>
      <GlyphLabel color={danger ? COLORS.crimson : COLORS.muted} dot={danger}>
        {danger ? "HURRY" : "TIME LEFT"}
      </GlyphLabel>
    </div>
  );
}
