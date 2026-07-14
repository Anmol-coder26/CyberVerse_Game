// src/components/common/TrustRing.tsx
import { trustColor } from "../../utils/gameUtils";
import { COLORS, FONT_DISPLAY, FONT_GLYPH, EASE } from "../../constants/theme";

export interface TrustRingProps {
  value: number;
  size?: number;
}

/** Circular dial showing the player's current Trust value, colored by band. */
export function TrustRing({ value, size = 110 }: TrustRingProps) {
  const r = size / 2 - 9;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  const color = trustColor(value);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ filter: `drop-shadow(0 0 12px ${color}77)` }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(139,147,168,0.15)" strokeWidth="5" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeDasharray={c}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: `stroke-dashoffset 0.8s ${EASE}, stroke 0.8s ${EASE}` }}
      />
      <text x={size / 2} y={size / 2 - 2} textAnchor="middle" fill={COLORS.frost} fontFamily={FONT_DISPLAY} fontWeight={700} fontSize={size * 0.24}>
        {Math.round(value)}
      </text>
      <text x={size / 2} y={size / 2 + 17} textAnchor="middle" fill={COLORS.muted} fontFamily={FONT_GLYPH} fontSize="9" letterSpacing="1">
        TRUST
      </text>
    </svg>
  );
}
