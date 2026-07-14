// src/pages/Game/GamePage.tsx
import { useNavigate } from "react-router-dom";
import { HUDBar } from "../../components/common/HUDBar";
import { TrustRing } from "../../components/common/TrustRing";
import { ChapterGrid } from "../../components/game/ChapterCard";
import { usePresentation } from "../../context/PresentationContext";
import { useGame } from "../../context/GameContext";
import { CHAPTERS } from "../../constants/chapters";
import { COLORS } from "../../constants/theme";

/** The case dashboard - all 10 chapters unlocked and playable in any order. */
export function GamePage() {
  const navigate = useNavigate();
  const { go, music } = usePresentation();
  const { state, dispatch } = useGame();

  function selectChapter(chapterId: string) {
    const chapter = CHAPTERS.find((c) => c.id === chapterId);
    dispatch({ type: "SELECT_CHAPTER", chapterId });
    if (chapter?.location) music.setMood(chapter.location.palette.accent);
    go(() => navigate(`/game/mission/${chapterId}`), COLORS.saffron);
  }

  const playableCount = CHAPTERS.filter((c) => !c.lockedForever).length;

  return (
    <div className="fade-in" style={{ maxWidth: 760, margin: "0 auto" }}>
      <HUDBar stats={state.stats} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 22 }}>
            {(state.player.name || "Agent") + "'s case dashboard"}
          </div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, color: COLORS.muted, marginTop: 2 }}>
            {`ALL CASES UNLOCKED · ${state.completedChapterIds.length}/${playableCount} CLOSED`}
          </div>
        </div>
        <TrustRing value={state.stats.trust} size={70} />
      </div>
      <ChapterGrid chapters={CHAPTERS} completed={state.completedChapterIds} onSelect={selectChapter} />
    </div>
  );
}
