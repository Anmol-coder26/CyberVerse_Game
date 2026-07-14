// src/components/common/HUDBar.tsx
import { GlyphLabel } from "../ui/GlyphLabel";
import { COLORS, EASE } from "../../constants/theme";
import type { PlayerStats } from "../../types";

interface StatCardProps {
  label: string;
  value: number;
  max?: number;
  color: string;
  sub?: string;
}

function StatCard({ label, value, max = 100, color, sub }: StatCardProps) {
  return (
    <div style={{ flex: 1, minWidth: 92, background: "rgba(15,20,36,0.5)", backdropFilter: "blur(8px)", borderRadius: 12, padding: "8px 12px", border: `1px solid ${color}30` }}>
      <GlyphLabel color={COLORS.muted}>{label}</GlyphLabel>
      <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 18, color }}>{Math.round(value)}</div>
      <div style={{ height: 3, background: "rgba(255,255,255,0.08)", marginTop: 4, borderRadius: 2 }}>
        <div
          style={{
            height: "100%",
            width: `${Math.min(100, (value / max) * 100)}%`,
            background: color,
            borderRadius: 2,
            transition: `width 0.6s ${EASE}`,
            boxShadow: `0 0 8px ${color}`,
          }}
        />
      </div>
      {sub && <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 8, color: COLORS.muted, marginTop: 3 }}>{sub}</div>}
    </div>
  );
}

export interface HUDBarProps {
  stats: PlayerStats;
}

/** The persistent four-pillar HUD shown on every screen once the player has
 * created a profile. Every value here changes real gameplay - see
 * engine/DecisionEngine.ts and engine/MissionEngine.ts. */
export function HUDBar({ stats }: HUDBarProps) {
  return (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
      <StatCard label="Trust" value={stats.trust} color={COLORS.cyan} sub="shapes the city" />
      <StatCard label="Cyber IQ" value={stats.cyberIQ} max={2000} color={COLORS.purple} sub="spend on hints" />
      <StatCard label="Health" value={stats.health} color={COLORS.emerald} sub="0 = game over" />
      <StatCard label="Stress" value={stats.stress} color={COLORS.saffron} sub="shortens your time" />
    </div>
  );
}
