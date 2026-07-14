// src/components/phone/Segment.tsx
import { GameIcon } from "../ui/GameIcon";
import { COLORS } from "../../constants/theme";
import type { Clue, ThreadSegment } from "../../types";

export interface SegmentProps {
  segment: ThreadSegment;
  onInspect: (clue: Clue) => void;
  found: string[];
}

/** A single span of message text - plain, or an inspectable underlined clue. */
export function Segment({ segment, onInspect, found }: SegmentProps) {
  if (!segment.clue) return <span>{segment.text}</span>;
  const isFound = found.includes(segment.clue.id);
  return (
    <span
      onClick={() => onInspect(segment.clue as Clue)}
      title="Tap to inspect"
      style={{ cursor: "pointer", borderBottom: `1.5px dashed ${isFound ? COLORS.emerald : COLORS.crimson}`, color: isFound ? COLORS.emerald : COLORS.crimson, fontWeight: 500 }}
    >
      {segment.text}
      {!isFound && <GameIcon name="search" size={10} color={COLORS.crimson} style={{ marginLeft: 2, verticalAlign: "-1px" }} />}
    </span>
  );
}
