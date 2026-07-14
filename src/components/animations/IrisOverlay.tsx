// src/components/animations/IrisOverlay.tsx
import { EASE, COLORS } from "../../constants/theme";
import type { IrisState } from "../../hooks/useIris";

export interface IrisOverlayProps {
  state: IrisState;
}

/** The full-screen ring-of-light transition rendered on top of every
 * navigation. Purely presentational - see hooks/useIris.ts for the timing. */
export function IrisOverlay({ state }: IrisOverlayProps) {
  if (!state.active) return null;
  return (
    <div
      key={state.phase}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        pointerEvents: "none",
        background: `radial-gradient(circle, ${state.color}20 0%, ${COLORS.void} 70%)`,
        animation: `${state.phase === "in" ? "irisIn" : "irisOut"} 0.45s ${EASE} forwards`,
      }}
    />
  );
}
