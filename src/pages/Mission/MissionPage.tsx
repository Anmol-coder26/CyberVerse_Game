// src/pages/Mission/MissionPage.tsx
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HUDBar } from "../../components/common/HUDBar";
import { TrustRing } from "../../components/common/TrustRing";
import { HoloPanel } from "../../components/ui/HoloPanel";
import { Button } from "../../components/ui/Button";
import { GlyphLabel } from "../../components/ui/GlyphLabel";
import { GameIcon } from "../../components/ui/GameIcon";
import { InvestigationScene } from "../../components/missions/InvestigationScene";
import { MentorSection } from "../../components/mentor/MentorSection";
import { SpotTheFake } from "../../components/mentor/SpotTheFake";
import { usePresentation } from "../../context/PresentationContext";
import { useGame } from "../../context/GameContext";
import { CHAPTERS } from "../../constants/chapters";
import { getCaseReward } from "../../engine/RewardEngine";
import { computeOutcomeStats, isGameOver as checkGameOver } from "../../engine/DecisionEngine";
import { COLORS } from "../../constants/theme";
import type { ActionOption } from "../../types";

type MissionStep = "intro" | "scene" | "consequence" | "gameover" | "mentor" | "reward";

/** Runs one full case: briefing, the InvestigationScene itself, the outcome,
 * ARIA's debrief, and the reward screen - or the Game Over screen if Health
 * hit zero along the way. */
export function MissionPage() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const { go, music } = usePresentation();
  const { state, dispatch } = useGame();

  const [step, setStep] = useState<MissionStep>("intro");
  const [chosenAction, setChosenAction] = useState<ActionOption | null>(null);
  const [wasTimeout, setWasTimeout] = useState(false);
  const [sceneKey, setSceneKey] = useState(0);

  const chapter = CHAPTERS.find((c) => c.id === chapterId);
  if (!chapter) return <div>Case not found.</div>;

  function handleResolve(action: ActionOption, timedOut: boolean) {
    setChosenAction(action);
    setWasTimeout(timedOut);
    const nextStats = computeOutcomeStats(state.stats, action, timedOut);
    dispatch({ type: "RESOLVE_ACTION", action, wasTimeout: timedOut });
    music.playChime(action.correct ? "success" : "fail");
    if (checkGameOver(nextStats)) {
      go(() => setStep("gameover"), COLORS.crimson);
    } else {
      go(() => setStep("consequence"), action.correct ? COLORS.emerald : COLORS.crimson);
    }
  }

  function finishMission() {
    dispatch({ type: "COMPLETE_CHAPTER", chapterId: chapter!.id });
    go(() => setStep("reward"), COLORS.purple);
  }

  function retryAfterGameOver() {
    dispatch({ type: "REVIVE_AFTER_GAME_OVER" });
    setSceneKey((k) => k + 1);
    go(() => setStep("intro"), COLORS.saffron);
  }

  function returnToHub() {
    dispatch({ type: "REVIVE_AFTER_GAME_OVER" });
    music.setMood(null);
    go(() => navigate("/game"), COLORS.saffron);
  }

  const reward = getCaseReward();

  return (
    <>
      {step === "intro" && (
        <div className="fade-in" style={{ maxWidth: 540, margin: "0 auto" }}>
          <HUDBar stats={state.stats} />
          <HoloPanel accent={COLORS.saffron}>
            <GlyphLabel color={COLORS.saffron}>{`Chapter ${chapter.num} · ${chapter.tag}`}</GlyphLabel>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 24, marginTop: 8 }}>{chapter.title}</div>
            <div style={{ fontSize: 14, lineHeight: 1.7, marginTop: 14, opacity: 0.9 }}>{chapter.intro}</div>
            <Button onClick={() => go(() => setStep("scene"), COLORS.cyan)} style={{ marginTop: 22 }}>Enter the scene</Button>
          </HoloPanel>
        </div>
      )}

      {step === "scene" && (
        <div className="fade-in" style={{ maxWidth: 620, margin: "0 auto" }}>
          <HUDBar stats={state.stats} />
          <InvestigationScene
            key={sceneKey}
            chapter={chapter}
            onResolve={handleResolve}
            stress={state.stats.stress}
            cyberIQ={state.stats.cyberIQ}
            onSpendIQ={(amount) => dispatch({ type: "SPEND_IQ", amount })}
            onDangerChange={music.setTension}
          />
        </div>
      )}

      {step === "consequence" && chosenAction && (
        <div className="fade-in" style={{ maxWidth: 520, margin: "0 auto" }}>
          <HUDBar stats={state.stats} />
          <HoloPanel accent={chosenAction.correct ? COLORS.emerald : COLORS.crimson}>
            {wasTimeout && (
              <div style={{ marginBottom: 10 }}>
                <GlyphLabel color={COLORS.crimson} dot>Too slow — you froze</GlyphLabel>
              </div>
            )}
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 20, color: chosenAction.correct ? COLORS.emerald : COLORS.crimson }}>
              {chosenAction.correct ? "Trust preserved" : "Trust compromised"}
            </div>
            <div style={{ fontSize: 14, marginTop: 12, lineHeight: 1.7, opacity: 0.9, fontStyle: "italic" }}>{chosenAction.reaction}</div>
            <Button onClick={() => go(() => setStep("mentor"), COLORS.purple)} style={{ marginTop: 20 }}>ARIA debrief</Button>
          </HoloPanel>
        </div>
      )}

      {step === "gameover" && (
        <div className="fade-in" style={{ maxWidth: 460, margin: "60px auto", textAlign: "center" }}>
          <GameIcon name="skull" size={54} color={COLORS.crimson} style={{ filter: `drop-shadow(0 0 20px ${COLORS.crimson})` }} />
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 24, marginTop: 16, color: COLORS.crimson }}>
            The Puppeteer wins this round
          </div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 10, lineHeight: 1.6 }}>
            Health hit zero — too many wrong calls, too little time. The case is still open.
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", marginTop: 26 }}>
            <Button onClick={retryAfterGameOver}>Retry the case</Button>
            <Button variant="ghost" onClick={returnToHub}>Back to the dashboard</Button>
          </div>
        </div>
      )}

      {step === "mentor" && chapter.mentor && (
        <div className="fade-in" style={{ maxWidth: 540, margin: "0 auto" }}>
          <HUDBar stats={state.stats} />
          <HoloPanel accent={COLORS.purple}>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 19, color: COLORS.purple }}>ARIA // debrief</div>
            <MentorSection title="Why it happened" defaultOpen>
              <div>{chapter.mentor.whyItHappened}</div>
            </MentorSection>
            <MentorSection title="Warning signs">
              <ul style={{ paddingLeft: 18, margin: 0 }}>
                {chapter.mentor.warningSigns.map((w, i) => <li key={i} style={{ marginTop: 3 }}>{w}</li>)}
              </ul>
            </MentorSection>
            <MentorSection title="Do this now">
              <div>{chapter.mentor.immediateSteps}</div>
            </MentorSection>
            <MentorSection title="If it's too late">
              <div>{chapter.mentor.recoverySteps}</div>
            </MentorSection>
            <div style={{ marginTop: 16, padding: "10px 14px", background: "rgba(0,0,0,0.3)", borderRadius: 10, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS.cyan }}>
              {`Helpline: ${chapter.mentor.helpline} · Report at ${chapter.mentor.portal}`}
            </div>
            <SpotTheFake data={chapter.spotTheFake} />
            <Button onClick={finishMission} style={{ marginTop: 20 }}>Close case</Button>
          </HoloPanel>
        </div>
      )}

      {step === "reward" && (
        <div className="fade-in" style={{ maxWidth: 460, margin: "40px auto", textAlign: "center" }}>
          <div style={{ animation: "floatY 3s ease-in-out infinite" }}>
            <TrustRing value={state.stats.trust} size={130} />
          </div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 22, marginTop: 18 }}>Case closed</div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 14 }}>
            <div style={{ color: COLORS.cyan, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{`+${reward.xp} XP`}</div>
            <div style={{ color: COLORS.saffron, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>{`+${reward.coins} coins`}</div>
          </div>
          <div style={{ marginTop: 24 }}>
            <Button onClick={() => go(() => navigate("/game"), COLORS.saffron)}>Back to the dashboard</Button>
          </div>
        </div>
      )}
    </>
  );
}
