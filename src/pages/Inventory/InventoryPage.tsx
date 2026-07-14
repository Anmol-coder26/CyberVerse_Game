// src/pages/Inventory/InventoryPage.tsx
import { HoloPanel } from "../../components/ui/HoloPanel";
import { GlyphLabel } from "../../components/ui/GlyphLabel";
import { COLORS } from "../../constants/theme";

/**
 * STATUS: Not yet implemented.
 * Reserved page for a future collected-evidence/unlockables inventory.
 */
export function InventoryPage() {
  return (
    <div className="fade-in" style={{ maxWidth: 440, margin: "40px auto" }}>
      <HoloPanel>
        <GlyphLabel color={COLORS.muted} dot>Coming soon</GlyphLabel>
        <div style={{ fontFamily: "'Rajdhani', sans-serif", fontWeight: 700, fontSize: 20, marginTop: 8 }}>Inventory</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 10, lineHeight: 1.6 }}>
          A collected-evidence and unlockables inventory is planned but not built yet. See the roadmap in README.md.
        </div>
      </HoloPanel>
    </div>
  );
}
