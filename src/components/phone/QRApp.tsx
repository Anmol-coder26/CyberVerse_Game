// src/components/phone/QRApp.tsx
import { GameIcon } from "../ui/GameIcon";
import { GlyphLabel } from "../ui/GlyphLabel";
import { EvidenceTray } from "./EvidenceTray";
import { HintButton } from "./HintButton";
import { ActionList } from "./ActionList";
import { COLORS } from "../../constants/theme";
import type { ActionOption, Chapter, Clue, FoundClue } from "../../types";

export interface QRAppProps {
  chapter: Chapter;
  foundClues: FoundClue[];
  onInspect: (clue: Clue) => void;
  canAct: boolean;
  onResolve: (action: ActionOption) => void;
  accent: string;
  onBack: () => void;
  scanned: boolean;
  onScan: () => void;
  hintProps: { cyberIQ: number; onHint: () => void; disabled: boolean };
}

/** Renders the QR-scan mechanic: a scanning viewfinder, then a payment
 * confirmation screen with inspectable merchant/PIN-request fields. */
export function QRApp({ chapter, foundClues, onInspect, canAct, onResolve, accent, onBack, scanned, onScan, hintProps }: QRAppProps) {
  if (!chapter.qr || !chapter.actions) return null;
  const foundIds = foundClues.map((c) => c.id);

  return (
    <div style={{ padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <GameIcon name="arrowLeft" size={14} color={COLORS.muted} style={{ cursor: "pointer" }} onClick={onBack} />
        <GlyphLabel color={accent} dot>QR Scanner</GlyphLabel>
      </div>
      {!scanned ? (
        <div onClick={onScan} style={{ cursor: "pointer", border: `1.5px dashed ${accent}88`, borderRadius: 14, padding: 20, textAlign: "center", position: "relative" }}>
          <div style={{ width: 120, height: 120, margin: "0 auto", background: "repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)", backgroundSize: "10px 10px", borderRadius: 8 }} />
          <div style={{ position: "absolute", inset: 0, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: accent, boxShadow: `0 0 10px ${accent}`, animation: "scanLine 1.6s ease-in-out infinite" }} />
          </div>
          <div style={{ fontSize: 11, marginTop: 12, color: COLORS.frost }}>{chapter.qr.label}</div>
          <div style={{ marginTop: 8 }}>
            <GlyphLabel color={COLORS.muted}>Tap to scan</GlyphLabel>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 14 }}>
            <GlyphLabel color={COLORS.muted}>Paying to</GlyphLabel>
            <div
              onClick={() => onInspect(chapter.qr!.result.clue2)}
              style={{ cursor: "pointer", marginTop: 4, fontSize: 14, fontWeight: 600, borderBottom: `1.5px dashed ${foundIds.includes("mismatch") ? COLORS.emerald : COLORS.crimson}`, display: "inline-block", color: foundIds.includes("mismatch") ? COLORS.emerald : COLORS.crimson }}
            >
              {chapter.qr.result.merchant} <GameIcon name="search" size={10} />
            </div>
            <div
              onClick={() => onInspect(chapter.qr!.result.clue1)}
              style={{ cursor: "pointer", marginTop: 12, fontSize: 12, borderBottom: `1.5px dashed ${foundIds.includes("pin") ? COLORS.emerald : COLORS.crimson}`, display: "inline-block", color: foundIds.includes("pin") ? COLORS.emerald : COLORS.crimson }}
            >
              Enter UPI PIN to claim ₹500 <GameIcon name="search" size={10} />
            </div>
          </div>
          <EvidenceTray clues={foundClues} />
          <HintButton {...hintProps} />
          <ActionList actions={chapter.actions} canAct={canAct} onResolve={onResolve} accent={accent} />
        </div>
      )}
    </div>
  );
}
