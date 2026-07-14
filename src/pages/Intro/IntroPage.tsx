// src/pages/Intro/IntroPage.tsx
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HoloPanel } from "../../components/ui/HoloPanel";
import { Button } from "../../components/ui/Button";
import { GlyphLabel } from "../../components/ui/GlyphLabel";
import { GameIcon } from "../../components/ui/GameIcon";
import { Typewriter } from "../../components/animations/Typewriter";
import { usePresentation } from "../../context/PresentationContext";
import { useGame } from "../../context/GameContext";
import { CINEMATIC, CHARACTERS } from "../../constants/characters";
import { AVATARS } from "../../constants/avatars";
import { PILLARS } from "../../constants/pillars";
import { COLORS } from "../../constants/theme";
import type { AvatarId } from "../../types";

type IntroStep = "cinematic" | "characters" | "create" | "pillars";

/** Orchestrates the full pre-game onboarding: the opening cinematic (who
 * ARIA and the Puppeteer are), character creation with a real role choice,
 * and the Four Pillars briefing - before handing off to the case dashboard. */
export function IntroPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { go } = usePresentation();
  const { state, dispatch } = useGame();

  const skipCinematic = Boolean((location.state as { skipCinematic?: boolean } | null)?.skipCinematic);
  const [step, setStep] = useState<IntroStep>(skipCinematic ? "create" : "cinematic");

  function goToHub() {
    const avatar = AVATARS.find((a) => a.id === state.player.avatar);
    if (avatar) dispatch({ type: "APPLY_AVATAR_BONUS", avatar });
    go(() => navigate("/game"), COLORS.saffron);
  }

  return (
    <>
      {step === "cinematic" && (
        <div className="fade-in" style={{ maxWidth: 560, margin: "50px auto" }}>
          <HoloPanel accent={COLORS.purple}>
            <Typewriter lines={CINEMATIC} onDone={() => setStep("characters")} />
          </HoloPanel>
        </div>
      )}

      {step === "characters" && (
        <div className="fade-in" style={{ maxWidth: 700, margin: "20px auto" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <GlyphLabel color={COLORS.cyan} dot>Know who you're dealing with</GlyphLabel>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 24, marginTop: 8 }}>Two forces are already in this story</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
            {CHARACTERS.map((c) => (
              <div key={c.key} style={{ background: "rgba(15,20,36,0.55)", backdropFilter: "blur(10px)", borderRadius: 18, border: `1px solid ${c.color}44`, padding: 22, boxShadow: `0 0 28px -10px ${c.color}55` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <div style={{ width: 54, height: 54, borderRadius: "50%", background: `${c.color}18`, border: `1px solid ${c.color}88`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    <GameIcon name={c.icon} size={26} color={c.color} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 19, color: c.color }}>{c.name}</div>
                    <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, color: COLORS.muted, letterSpacing: 1 }}>{c.role.toUpperCase()}</div>
                  </div>
                </div>
                <div style={{ fontSize: 13, color: COLORS.frost, opacity: 0.85, lineHeight: 1.6 }}>{c.bio}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 26 }}>
            <Button onClick={() => setStep("create")}>Continue</Button>
          </div>
        </div>
      )}

      {step === "create" && (
        <div className="fade-in" style={{ maxWidth: 440, margin: "20px auto" }}>
          <HoloPanel>
            <GlyphLabel color={COLORS.saffron} dot>Agent clearance required</GlyphLabel>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 22, marginTop: 8, marginBottom: 18 }}>Create your profile</div>
            <input
              value={state.player.name}
              onChange={(e) => dispatch({ type: "SET_PLAYER_NAME", name: e.target.value })}
              placeholder="Enter a name"
              style={{ display: "block", width: "100%", background: "rgba(0,0,0,0.3)", border: `1px solid ${COLORS.muted}55`, borderRadius: 10, color: COLORS.frost, padding: "11px 14px", marginBottom: 18, fontSize: 14, boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", gap: 10, marginBottom: 10 }}>
              {AVATARS.map((a) => {
                const active = state.player.avatar === a.id;
                return (
                  <div
                    key={a.id}
                    onClick={() => dispatch({ type: "SET_AVATAR", avatar: a.id as AvatarId })}
                    style={{ flex: 1, textAlign: "center", padding: "14px 8px", cursor: "pointer", borderRadius: 12, background: active ? `${COLORS.cyan}18` : "rgba(255,255,255,0.02)", border: `1px solid ${active ? COLORS.cyan : COLORS.muted}55` }}
                  >
                    <GameIcon name={a.icon} size={22} color={active ? COLORS.cyan : COLORS.muted} />
                    <div style={{ marginTop: 6 }}>
                      <GlyphLabel color={active ? COLORS.cyan : COLORS.muted}>{a.label}</GlyphLabel>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ fontSize: 11.5, color: COLORS.muted, textAlign: "center", minHeight: 32, marginBottom: 18, lineHeight: 1.5, fontStyle: "italic" }}>
              {AVATARS.find((a) => a.id === state.player.avatar)?.tagline}
            </div>
            <Button onClick={() => setStep("pillars")} style={{ width: "100%" }}>Continue</Button>
          </HoloPanel>
        </div>
      )}

      {step === "pillars" && (
        <div className="fade-in" style={{ maxWidth: 620, margin: "20px auto" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <GlyphLabel color={COLORS.cyan} dot>Before you enter the field</GlyphLabel>
            </div>
            <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 24, marginTop: 8 }}>Four systems keep you alive</div>
            <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 6 }}>Every scam in this city attacks one of these. Know them before you go in.</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))", gap: 14 }}>
            {PILLARS.map((p) => (
              <div key={p.key} style={{ background: "rgba(15,20,36,0.55)", backdropFilter: "blur(10px)", borderRadius: 16, border: `1px solid ${p.color}44`, padding: 18, boxShadow: `0 0 24px -10px ${p.color}55` }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: `${p.color}18`, border: `1px solid ${p.color}66`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                  <GameIcon name={p.icon} size={18} color={p.color} />
                </div>
                <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 16, color: p.color }}>{p.title}</div>
                <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 6, lineHeight: 1.6 }}>{p.desc}</div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 24 }}>
            <Button onClick={goToHub}>Enter Digital India</Button>
          </div>
        </div>
      )}
    </>
  );
}
