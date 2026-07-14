// src/components/ui/HoloPanel.tsx
import React from "react";
import { useTilt } from "../../hooks/useTilt";
import { COLORS, EASE } from "../../constants/theme";

export interface HoloPanelProps {
  children: React.ReactNode;
  accent?: string;
  style?: React.CSSProperties;
}

/** The game's signature glass panel: tilts toward the cursor and renders a
 * moving specular highlight, like a hologram floating in front of you. */
export function HoloPanel({ children, accent = COLORS.cyan, style }: HoloPanelProps) {
  const { ref, tilt, onMove, onLeave } = useTilt(7);

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        position: "relative",
        background: "linear-gradient(160deg, rgba(22,27,46,0.55), rgba(8,11,20,0.78))",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderRadius: 20,
        border: `1px solid ${accent}38`,
        boxShadow: `0 0 0 1px ${accent}20 inset, 0 24px 70px -24px rgba(0,0,0,0.65), 0 0 40px -10px ${accent}40`,
        padding: "28px 32px",
        overflow: "hidden",
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: `transform 0.5s ${EASE}`,
        ...style,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: `radial-gradient(circle at ${tilt.px * 100}% ${tilt.py * 100}%, rgba(255,255,255,0.10), transparent 45%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "8%",
          right: "8%",
          height: 1,
          background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
          opacity: 0.7,
        }}
      />
      {children}
    </div>
  );
}
