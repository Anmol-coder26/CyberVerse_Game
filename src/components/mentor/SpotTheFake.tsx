// src/components/mentor/SpotTheFake.tsx
import { useState } from "react";
import { GlyphLabel } from "../ui/GlyphLabel";
import { COLORS, FONT_BODY } from "../../constants/theme";
import type { SpotTheFakeData } from "../../types";

export interface SpotTheFakeProps {
  data?: SpotTheFakeData;
}

/** The applied-recognition exercise shown at the end of every Mentor
 * Debrief - a real vs. fake message/domain, side by side, with immediate
 * feedback. This is what turns the game into a learning tool rather than a
 * memory test. */
export function SpotTheFake({ data }: SpotTheFakeProps) {
  const [pick, setPick] = useState<"a" | "b" | null>(null);
  if (!data) return null;

  const options = [
    { key: "a" as const, ...data.a },
    { key: "b" as const, ...data.b },
  ];

  return (
    <div style={{ marginTop: 18, background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: 16 }}>
      <GlyphLabel color={COLORS.purple} dot>Spot the fake</GlyphLabel>
      <div style={{ fontSize: 13, marginTop: 8, marginBottom: 12 }}>{data.prompt}</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {options.map((option) => {
          const isPicked = pick === option.key;
          const showResult = pick !== null;
          let border = `${COLORS.muted}44`;
          let color: string = COLORS.frost;
          if (showResult && isPicked) {
            border = option.fake ? COLORS.emerald : COLORS.crimson;
            color = option.fake ? COLORS.emerald : COLORS.crimson;
          }
          if (showResult && !isPicked && option.fake) {
            border = COLORS.emerald;
            color = COLORS.emerald;
          }
          return (
            <button
              key={option.key}
              disabled={pick !== null}
              onClick={() => setPick(option.key)}
              style={{ textAlign: "left", padding: "10px 12px", borderRadius: 10, background: "rgba(255,255,255,0.03)", border: `1px solid ${border}`, color, fontSize: 12.5, cursor: pick === null ? "pointer" : "default", fontFamily: FONT_BODY }}
            >
              {option.label}
            </button>
          );
        })}
      </div>
      {pick !== null && (
        <div style={{ marginTop: 10, fontSize: 12, color: COLORS.muted, fontStyle: "italic" }}>
          {options.find((o) => o.key === pick)?.fake ? "That's the scam pattern — good catch." : "That one's actually fine — the other option is the trap."}
        </div>
      )}
    </div>
  );
}
