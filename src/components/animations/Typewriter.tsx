// src/components/animations/Typewriter.tsx
import { useEffect, useState } from "react";
import { GlyphLabel } from "../ui/GlyphLabel";
import { Button } from "../ui/Button";
import { isLastLine, nextLineIndex, TYPEWRITER_MS_PER_CHAR } from "../../engine/StoryEngine";
import { FONT_BODY } from "../../constants/theme";
import type { CinematicLine } from "../../types";

export interface TypewriterProps {
  lines: CinematicLine[];
  onDone: () => void;
}

/** Renders the opening cinematic's dialogue one letter at a time. */
export function Typewriter({ lines, onDone }: TypewriterProps) {
  const [index, setIndex] = useState(0);
  const [shown, setShown] = useState("");

  useEffect(() => {
    setShown("");
    let i = 0;
    const full = lines[index].text;
    const interval = setInterval(() => {
      i++;
      setShown(full.slice(0, i));
      if (i >= full.length) clearInterval(interval);
    }, TYPEWRITER_MS_PER_CHAR);
    return () => clearInterval(interval);
  }, [index, lines]);

  const done = isLastLine(lines, index);
  const line = lines[index];

  return (
    <div>
      <GlyphLabel color={line.color} dot>
        {line.speaker}
      </GlyphLabel>
      <div style={{ fontFamily: FONT_BODY, fontSize: 18, lineHeight: 1.7, minHeight: 84, marginTop: 10 }}>
        {shown}
        <span style={{ opacity: 0.6 }}>▌</span>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <Button onClick={() => (done ? onDone() : setIndex(nextLineIndex(lines, index)))}>
          {done ? "Begin" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
