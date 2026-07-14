// src/components/phone/EvidenceTray.tsx
import { COLORS, FONT_GLYPH } from "../../constants/theme";
import type { FoundClue } from "../../types";

export function EvidenceTray({ clues }: { clues: FoundClue[] }) {
  if (clues.length === 0) return null;
  return (
    <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12, justifyContent: "center" }}>
      {clues.map((c) => (
        <div
          key={c.id}
          className="clue-pop"
          style={{ fontFamily: FONT_GLYPH, fontSize: 9.5, letterSpacing: 0.5, color: COLORS.saffron, background: `${COLORS.saffron}18`, border: `1px solid ${COLORS.saffron}55`, borderRadius: 999, padding: "4px 10px" }}
        >
          {c.label}
        </div>
      ))}
    </div>
  );
}
