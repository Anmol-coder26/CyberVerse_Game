// src/pages/Leaderboard/LeaderboardPage.tsx
import { HoloPanel } from "../../components/ui/HoloPanel";
import { GlyphLabel } from "../../components/ui/GlyphLabel";
import { COLORS } from "../../constants/theme";

/**
 * STATUS: Not yet implemented.
 * Reserved page for a future cross-player leaderboard, which depends on the
 * planned Firebase backend (see src/services/firebase).
 */
export function LeaderboardPage() {
  return (
    <div className="fade-in" style={{ maxWidth: 440, margin: "40px auto" }}>
      <HoloPanel>
        <GlyphLabel color={COLORS.muted} dot>Coming soon</GlyphLabel>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 20, marginTop: 8 }}>Leaderboard</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 10, lineHeight: 1.6 }}>
          Cross-player rankings need the backend save-sync described in
          CyberVerse_Tech_Stack.pdf, which isn't deployed yet.
        </div>
      </HoloPanel>
    </div>
  );
}
