// src/components/phone/HintButton.tsx
import { GameIcon } from "../ui/GameIcon";
import { COLORS, FONT_GLYPH } from "../../constants/theme";

export interface HintButtonProps {
  cyberIQ: number;
  onHint: () => void;
  disabled: boolean;
}

export function HintButton({ onHint, disabled }: HintButtonProps) {
  return (
    <button
      onClick={disabled ? undefined : onHint}
      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        justifyContent: "center",
        width: "100%",
        marginTop: 10,
        padding: "8px 10px",
        borderRadius: 10,
        background: `${COLORS.purple}14`,
        border: `1px solid ${COLORS.purple}55`,
        color: disabled ? COLORS.muted : COLORS.purple,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        fontFamily: FONT_GLYPH,
        fontSize: 10,
        letterSpacing: 1,
      }}
    >
      <GameIcon name="sparkles" size={12} color={disabled ? COLORS.muted : COLORS.purple} /> ASK ARIA FOR A HINT (-40 IQ)
    </button>
  );
}
