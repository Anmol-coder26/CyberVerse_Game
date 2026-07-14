// src/components/missions/InvestigationScene.tsx
import { useEffect, useState } from "react";
import { GameIcon } from "../ui/GameIcon";
import { GlyphLabel } from "../ui/GlyphLabel";
import { Atmosphere } from "../common/Atmosphere";
import { PhoneShell } from "../phone/PhoneShell";
import { AppTile } from "../phone/AppTile";
import { SceneClock } from "../phone/SceneClock";
import { MessageApp } from "../phone/MessageApp";
import { QRApp } from "../phone/QRApp";
import { useCountdown } from "../../hooks/useCountdown";
import { getAllClues } from "../../utils/gameUtils";
import { pickTimeoutAction } from "../../engine/DecisionEngine";
import { COLORS } from "../../constants/theme";
import type { ActionOption, Chapter, Clue, FoundClue } from "../../types";

export interface InvestigationSceneProps {
  chapter: Chapter;
  onResolve: (action: ActionOption, wasTimeout: boolean) => void;
  stress: number;
  cyberIQ: number;
  onSpendIQ: (amount: number) => void;
  onDangerChange: (active: boolean) => void;
}

/**
 * The heart of the game: enter a scene, wake the phone, open the relevant
 * app, tap the suspicious content yourself, then act before the Scene Clock
 * (driven by Stress) runs out. Every case renders through this one
 * component - adding a new case is a data change in constants/chapters.ts,
 * not a new component.
 */
export function InvestigationScene({ chapter, onResolve, stress, cyberIQ, onSpendIQ, onDangerChange }: InvestigationSceneProps) {
  const [screenOn, setScreenOn] = useState(false);
  const [appOpen, setAppOpen] = useState(false);
  const [foundClues, setFoundClues] = useState<FoundClue[]>([]);
  const [popover, setPopover] = useState<Clue | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [scanned, setScanned] = useState(false);

  const timerActive = chapter.appType === "qr" ? scanned : appOpen;

  const handleExpire = () => {
    if (!chapter.actions) return;
    onResolve(pickTimeoutAction(chapter.actions), true);
  };

  const { timeLeft, totalTime, danger } = useCountdown({ stress, active: timerActive, onExpire: handleExpire });

  useEffect(() => {
    onDangerChange(danger && timerActive);
  }, [danger, timerActive, onDangerChange]);

  // All hooks above must run unconditionally on every render - only branch
  // on missing data after they've all been called.
  if (!chapter.location) return null;
  const { palette, atmosphere, name } = chapter.location;

  const allClues = getAllClues(chapter);
  const canAct = foundClues.length >= 1;
  const channelLabel = chapter.appType === "call" ? "Live transcript" : chapter.appType === "email" ? "Email" : null;
  const appIconName = chapter.appType === "qr" ? "qr" : chapter.app?.icon ?? "chat";

  function inspect(clue: Clue) {
    setFoundClues((found) => (found.find((f) => f.id === clue.id) ? found : [...found, { id: clue.id, label: clue.label }]));
    setPopover(clue);
    setTimeout(() => setPopover(null), 1600);
  }

  function tapOtherApp(label: string) {
    setToast(label);
    setTimeout(() => setToast(null), 1200);
  }

  function useHint() {
    const unfound = allClues.filter((c) => !foundClues.find((f) => f.id === c.id));
    if (unfound.length === 0 || cyberIQ < 40) return;
    inspect(unfound[Math.floor(Math.random() * unfound.length)]);
    onSpendIQ(40);
  }

  const hintProps = {
    cyberIQ,
    onHint: useHint,
    disabled: cyberIQ < 40 || allClues.every((c) => foundClues.find((f) => f.id === c.id)),
  };

  return (
    <div style={{ position: "relative", borderRadius: 22, overflow: "hidden", background: `radial-gradient(ellipse at 50% 0%, ${palette.a} 0%, ${palette.b} 70%)`, minHeight: 500, border: `1px solid ${palette.accent}30`, padding: "30px 16px" }}>
      <Atmosphere type={atmosphere} accent={palette.accent} />
      <div style={{ position: "absolute", top: 16, left: 20, zIndex: 2 }}>
        <GlyphLabel color={palette.accent} dot>{name}</GlyphLabel>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 26, flexWrap: "wrap" }}>
        <PhoneShell accent={palette.accent} screenOn={screenOn} onWake={() => setScreenOn(true)} dragToRotate={!screenOn} shake={danger && timerActive}>
          {!appOpen && (
            <div className="fade-in" style={{ padding: 20, display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, paddingTop: 44 }}>
              <AppTile icon={appIconName} label={chapter.appType === "qr" ? "Scan QR" : chapter.app?.name ?? "App"} accent={palette.accent} pulse onClick={() => setAppOpen(true)} />
              <AppTile icon="landmark" label="Bank" accent={COLORS.muted} onClick={() => tapOtherApp("No new alerts.")} />
              <AppTile icon="camera" label="Gallery" accent={COLORS.muted} onClick={() => tapOtherApp("Nothing new here.")} />
              <AppTile icon="phone" label="Calls" accent={COLORS.muted} onClick={() => tapOtherApp("No missed calls.")} />
            </div>
          )}
          {appOpen && chapter.appType !== "qr" && (
            <MessageApp
              chapter={chapter}
              foundClues={foundClues}
              onInspect={inspect}
              canAct={canAct}
              onResolve={(action) => onResolve(action, false)}
              accent={palette.accent}
              onBack={() => setAppOpen(false)}
              channelLabel={channelLabel}
              hintProps={hintProps}
            />
          )}
          {appOpen && chapter.appType === "qr" && (
            <QRApp
              chapter={chapter}
              foundClues={foundClues}
              onInspect={inspect}
              canAct={canAct}
              onResolve={(action) => onResolve(action, false)}
              accent={palette.accent}
              onBack={() => setAppOpen(false)}
              scanned={scanned}
              onScan={() => setScanned(true)}
              hintProps={hintProps}
            />
          )}
        </PhoneShell>
        {timerActive && <SceneClock timeLeft={timeLeft} totalTime={totalTime} danger={danger} accent={palette.accent} />}
      </div>

      {popover && (
        <div className="clue-pop" style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", background: `${COLORS.emerald}20`, border: `1px solid ${COLORS.emerald}66`, borderRadius: 10, padding: "8px 14px", fontSize: 12, color: COLORS.emerald, display: "flex", gap: 8, alignItems: "center", zIndex: 5 }}>
          <GameIcon name="search" size={13} color={COLORS.emerald} /> {popover.label} — added to evidence.
        </div>
      )}
      {toast && (
        <div style={{ position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.6)", padding: "8px 16px", borderRadius: 999, fontSize: 12, fontFamily: "'JetBrains Mono', monospace", color: COLORS.muted, zIndex: 5 }}>
          {toast}
        </div>
      )}
    </div>
  );
}
