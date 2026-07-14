// src/pages/Settings/SettingsPage.tsx
import { HoloPanel } from "../../components/ui/HoloPanel";
import { GlyphLabel } from "../../components/ui/GlyphLabel";
import { COLORS } from "../../constants/theme";

/**
 * STATUS: Not yet implemented.
 * Reserved page for audio/accessibility/difficulty settings. Kept as a
 * real, honest placeholder rather than fabricated functionality.
 */
export function SettingsPage() {
  return (
    <div className="fade-in" style={{ maxWidth: 440, margin: "40px auto" }}>
      <HoloPanel>
        <GlyphLabel color={COLORS.muted} dot>Coming soon</GlyphLabel>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 20, marginTop: 8 }}>Settings</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 10, lineHeight: 1.6 }}>
          Audio, accessibility, and difficulty controls are on the roadmap. The mute toggle in the top-right corner
          works today; everything else here is scaffolding.
        </div>
      </HoloPanel>
    </div>
  );
}
