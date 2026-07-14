// src/components/phone/AppTile.tsx
import { GameIcon } from "../ui/GameIcon";
import { GlyphLabel } from "../ui/GlyphLabel";
import { COLORS } from "../../constants/theme";

export interface AppTileProps {
  icon: string;
  label: string;
  accent: string;
  pulse?: boolean;
  onClick: () => void;
}

export function AppTile({ icon, label, accent, pulse, onClick }: AppTileProps) {
  return (
    <div onClick={onClick} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, cursor: "pointer" }}>
      <div
        className={pulse ? "app-pulse" : ""}
        style={{ width: 48, height: 48, borderRadius: 14, background: `${accent}14`, border: `1px solid ${accent}55`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}
      >
        <GameIcon name={icon} size={19} color={accent} />
        {pulse && <div style={{ position: "absolute", top: -3, right: -3, width: 8, height: 8, borderRadius: "50%", background: COLORS.crimson, boxShadow: `0 0 8px ${COLORS.crimson}` }} />}
      </div>
      <GlyphLabel color={COLORS.muted}>{label}</GlyphLabel>
    </div>
  );
}
