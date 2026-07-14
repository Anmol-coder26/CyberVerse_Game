// src/components/phone/ActionList.tsx
import { GameIcon } from "../ui/GameIcon";
import { GlyphLabel } from "../ui/GlyphLabel";
import { COLORS, EASE, FONT_BODY } from "../../constants/theme";
import type { ActionOption } from "../../types";

export interface ActionListProps {
  actions: ActionOption[];
  canAct: boolean;
  onResolve: (action: ActionOption) => void;
  accent: string;
}

/** The three action choices, gated until at least one clue has been found. */
export function ActionList({ actions, canAct, onResolve, accent }: ActionListProps) {
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 6 }}>
        {actions.map((action) => (
          <button
            key={action.id}
            disabled={!canAct}
            onClick={() => onResolve(action)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textAlign: "left",
              fontSize: 12.5,
              padding: "10px 12px",
              borderRadius: 10,
              background: "rgba(255,255,255,0.04)",
              border: `1px solid ${COLORS.muted}40`,
              color: COLORS.frost,
              cursor: canAct ? "pointer" : "not-allowed",
              opacity: canAct ? 1 : 0.35,
              fontFamily: FONT_BODY,
              transition: `all 0.3s ${EASE}`,
            }}
          >
            <GameIcon name={action.icon} size={16} color={accent} style={{ flexShrink: 0 }} />
            {action.label}
          </button>
        ))}
      </div>
      {!canAct && (
        <div style={{ display: "flex", gap: 6, alignItems: "center", justifyContent: "center", marginTop: 10 }}>
          <GameIcon name="alertTriangle" size={12} color={COLORS.saffron} />
          <GlyphLabel color={COLORS.saffron}>Inspect before deciding</GlyphLabel>
        </div>
      )}
    </>
  );
}
