// src/layouts/GameLayout.tsx
import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import { ParticleField } from "../components/common/ParticleField";
import { PerspectiveFloor } from "../components/common/PerspectiveFloor";
import { IrisOverlay } from "../components/animations/IrisOverlay";
import { GameIcon } from "../components/ui/GameIcon";
import { trustColor } from "../utils/gameUtils";
import { COLORS } from "../constants/theme";
import { useGame } from "../context/GameContext";
import { usePresentation } from "../context/PresentationContext";

/**
 * The persistent visual shell every page renders inside: the ambient
 * particle field, the perspective floor grid, the iris transition overlay,
 * and the mute button. Used as a layout route wrapping <Outlet /> so it
 * mounts once and never remounts on navigation between pages.
 */
export function GameLayout() {
  const { state } = useGame();
  const { irisState, music } = usePresentation();
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const worldTint = trustColor(state.stats.trust);

  function handleMouseMove(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current = { x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height };
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        minHeight: "100vh",
        background: `radial-gradient(ellipse at 50% -10%, #161d38 0%, ${COLORS.void} 60%)`,
        color: COLORS.frost,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: "hidden",
      }}
    >
      <ParticleField mouse={mouse} tint={worldTint} />
      <PerspectiveFloor tint={worldTint} />
      <IrisOverlay state={irisState} />

      <div
        onClick={music.toggleMute}
        style={{
          position: "fixed",
          top: 14,
          right: 14,
          zIndex: 10,
          cursor: "pointer",
          width: 34,
          height: 34,
          borderRadius: "50%",
          background: "rgba(15,20,36,0.6)",
          border: `1px solid ${COLORS.muted}44`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <GameIcon name={music.muted ? "volumeMute" : "volume"} size={15} color={music.muted ? COLORS.muted : COLORS.cyan} />
      </div>

      <div style={{ position: "relative", zIndex: 2, padding: "40px 24px" }}>
        <Outlet />
      </div>
    </div>
  );
}
