// src/components/game/ChapterCard.tsx
import { GameIcon } from "../ui/GameIcon";
import { COLORS, EASE, FONT_DISPLAY, FONT_GLYPH } from "../../constants/theme";
import type { Chapter } from "../../types";

export interface ChapterCardProps {
  chapter: Chapter;
  completed: string[];
  onSelect: (chapterId: string) => void;
}

export function ChapterCard({ chapter, completed, onSelect }: ChapterCardProps) {
  if (chapter.lockedForever) {
    return (
      <div
        style={{
          borderRadius: 14,
          padding: 16,
          background: "rgba(255,255,255,0.02)",
          border: `1px solid ${COLORS.muted}22`,
          opacity: 0.5,
          display: "flex",
          flexDirection: "column",
          gap: 8,
          minHeight: 130,
        }}
      >
        <GameIcon name="lock" size={18} color={COLORS.muted} />
        <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 13 }}>{chapter.title}</div>
        <div style={{ fontFamily: FONT_GLYPH, fontSize: 9, color: COLORS.muted, letterSpacing: 0.5 }}>{chapter.tag}</div>
      </div>
    );
  }

  const accent = chapter.location?.palette.accent ?? COLORS.cyan;
  const isDone = completed.includes(chapter.id);

  return (
    <div
      onClick={() => onSelect(chapter.id)}
      style={{
        position: "relative",
        cursor: "pointer",
        borderRadius: 14,
        padding: 16,
        background: "linear-gradient(160deg, rgba(22,27,46,0.6), rgba(8,11,20,0.8))",
        border: `1px solid ${accent}44`,
        boxShadow: `0 0 0 1px ${accent}18 inset, 0 0 24px -8px ${accent}55`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        minHeight: 130,
        transition: `all 0.3s ${EASE}`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-3px)";
        e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}88 inset, 0 12px 30px -8px ${accent}77`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}18 inset, 0 0 24px -8px ${accent}55`;
      }}
    >
      <div style={{ position: "absolute", top: 0, left: "10%", right: "10%", height: 1, background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 36, height: 36, borderRadius: 10, background: `${accent}18`, border: `1px solid ${accent}66`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <GameIcon name={chapter.icon} size={16} color={accent} />
        </div>
        {isDone ? <GameIcon name="check" size={16} color={COLORS.emerald} /> : <div style={{ fontFamily: FONT_GLYPH, fontSize: 9, color: accent }}>{"CH" + chapter.num}</div>}
      </div>
      <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 14, lineHeight: 1.2 }}>{chapter.title}</div>
      <div style={{ fontFamily: FONT_GLYPH, fontSize: 8.5, color: accent, letterSpacing: 0.5 }}>{chapter.tag.toUpperCase()}</div>
      <div style={{ fontSize: 11, color: COLORS.muted, lineHeight: 1.4, flex: 1 }}>{chapter.hook}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 4, fontFamily: FONT_GLYPH, fontSize: 9, color: accent }}>
        ENTER CASE <GameIcon name="arrowRight" size={11} color={accent} />
      </div>
    </div>
  );
}

export interface ChapterGridProps {
  chapters: Chapter[];
  completed: string[];
  onSelect: (chapterId: string) => void;
}

/** The case dashboard - a responsive grid of thumbnail cards, one per chapter. */
export function ChapterGrid({ chapters, completed, onSelect }: ChapterGridProps) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: 12, marginBottom: 24 }}>
      {chapters.map((chapter) => (
        <ChapterCard key={chapter.id} chapter={chapter} completed={completed} onSelect={onSelect} />
      ))}
    </div>
  );
}
