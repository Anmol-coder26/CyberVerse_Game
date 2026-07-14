// src/pages/Landing/LandingPage.tsx
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { GlyphLabel } from "../../components/ui/GlyphLabel";
import { usePresentation } from "../../context/PresentationContext";
import { COLORS } from "../../constants/theme";

/** The very first screen: the glowing CYBERVERSE logo, tagline, and the
 * Start Game / Skip Intro choice. */
export function LandingPage() {
  const navigate = useNavigate();
  const { go, music } = usePresentation();

  function handleStart() {
    music.start();
    go(() => navigate("/intro"), COLORS.purple);
  }

  function handleSkip() {
    music.start();
    go(() => navigate("/intro", { state: { skipCinematic: true } }), COLORS.cyan);
  }

  return (
    <div className="fade-in" style={{ textAlign: "center", paddingTop: 64 }}>
      <div style={{ marginBottom: 14, display: "flex", justifyContent: "center" }}>
        <GlyphLabel color={COLORS.emerald} dot>
          Secure uplink established · Cyber Crime Cell OS v4.2
        </GlyphLabel>
      </div>
      <div
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          fontWeight: 700,
          fontSize: "clamp(40px,9vw,72px)",
          letterSpacing: 5,
          animation: "titleGlow 3s ease-in-out infinite",
        }}
      >
        CYBER<span style={{ color: COLORS.cyan }}>VERSE</span>
      </div>
      <div style={{ marginTop: 12, display: "flex", justifyContent: "center" }}>
        <GlyphLabel color={COLORS.muted}>Every click has consequences</GlyphLabel>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 44 }}>
        <Button onClick={handleStart}>Start game</Button>
        <Button variant="ghost" onClick={handleSkip}>
          Skip intro
        </Button>
      </div>
    </div>
  );
}
