// src/components/mentor/MentorSection.tsx
import React, { useState } from "react";
import { GameIcon } from "../ui/GameIcon";
import { GlyphLabel } from "../ui/GlyphLabel";
import { COLORS, EASE } from "../../constants/theme";

export interface MentorSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

/** One click-to-expand section of ARIA's post-case debrief. */
export function MentorSection({ title, children, defaultOpen }: MentorSectionProps) {
  const [open, setOpen] = useState(!!defaultOpen);
  return (
    <div style={{ marginTop: 10, borderTop: `1px solid ${COLORS.muted}22`, paddingTop: 10 }}>
      <div onClick={() => setOpen((o) => !o)} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
        <GlyphLabel color={COLORS.muted}>{title}</GlyphLabel>
        <GameIcon name="chevronDown" size={13} color={COLORS.muted} style={{ transform: open ? "rotate(180deg)" : "rotate(0)", transition: `transform 0.3s ${EASE}` }} />
      </div>
      {open && <div className="fade-in" style={{ marginTop: 6, fontSize: 13.5, lineHeight: 1.65 }}>{children}</div>}
    </div>
  );
}
