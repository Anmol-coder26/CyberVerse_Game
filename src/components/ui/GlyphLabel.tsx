// src/components/ui/GlyphLabel.tsx
import React from "react";
import { COLORS, FONT_GLYPH } from "../../constants/theme";

export interface GlyphLabelProps {
  children: React.ReactNode;
  color?: string;
  dot?: boolean;
}

/** Small-caps monospace label with an optional glowing dot - used for every
 * section kicker, HUD sub-label, and location tag in the game. */
export function GlyphLabel({ children, color = COLORS.muted, dot }: GlyphLabelProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        fontFamily: FONT_GLYPH,
        fontSize: 10,
        letterSpacing: 2.2,
        textTransform: "uppercase",
        color,
      }}
    >
      {dot && (
        <span
          style={{
            width: 4,
            height: 4,
            borderRadius: 1,
            background: color,
            boxShadow: `0 0 6px ${color}`,
          }}
        />
      )}
      {children}
    </div>
  );
}
