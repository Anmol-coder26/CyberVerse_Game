// src/components/phone/MessageApp.tsx
import { GameIcon } from "../ui/GameIcon";
import { GlyphLabel } from "../ui/GlyphLabel";
import { Segment } from "./Segment";
import { EvidenceTray } from "./EvidenceTray";
import { HintButton } from "./HintButton";
import { ActionList } from "./ActionList";
import { COLORS } from "../../constants/theme";
import type { ActionOption, Chapter, Clue, FoundClue } from "../../types";

export interface MessageAppProps {
  chapter: Chapter;
  foundClues: FoundClue[];
  onInspect: (clue: Clue) => void;
  canAct: boolean;
  onResolve: (action: ActionOption) => void;
  accent: string;
  onBack: () => void;
  channelLabel: string | null;
  hintProps: { cyberIQ: number; onHint: () => void; disabled: boolean };
}

/** Renders a chat/call/email thread as an inspectable evidence screen -
 * shared across every non-QR case, since the mechanic (tap the suspicious
 * part yourself) is identical regardless of which app it's dressed as. */
export function MessageApp({ chapter, foundClues, onInspect, canAct, onResolve, accent, onBack, channelLabel, hintProps }: MessageAppProps) {
  if (!chapter.thread || !chapter.actions) return null;
  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <GameIcon name="arrowLeft" size={14} color={COLORS.muted} style={{ cursor: "pointer" }} onClick={onBack} />
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.crimson }}>{chapter.thread.from}</div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, color: COLORS.muted, marginLeft: "auto" }}>{chapter.thread.time}</div>
      </div>
      {channelLabel && (
        <div style={{ marginBottom: 8 }}>
          <GlyphLabel color={accent}>{channelLabel}</GlyphLabel>
        </div>
      )}
      <div style={{ background: "rgba(255,51,102,0.08)", borderLeft: `2px solid ${COLORS.crimson}`, borderRadius: "0 10px 10px 0", padding: "11px 12px", fontSize: 12.5, lineHeight: 1.65 }}>
        {chapter.thread.segments.map((segment, i) => (
          <Segment key={i} segment={segment} onInspect={onInspect} found={foundClues.map((c) => c.id)} />
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <GlyphLabel color={COLORS.muted}>Tap underlined parts</GlyphLabel>
      </div>
      <EvidenceTray clues={foundClues} />
      <HintButton {...hintProps} />
      <ActionList actions={chapter.actions} canAct={canAct} onResolve={onResolve} accent={accent} />
    </div>
  );
}
