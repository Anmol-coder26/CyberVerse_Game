// src/components/common/PerspectiveFloor.tsx
import { COLORS } from "../../constants/theme";

export interface PerspectiveFloorProps {
  tint?: string;
}

/** The animated perspective grid floor rendered under every full-screen view. */
export function PerspectiveFloor({ tint = COLORS.cyan }: PerspectiveFloorProps) {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "40%", overflow: "hidden", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: "-20% 0 0 0",
          height: "160%",
          background: `linear-gradient(${tint}22 1px, transparent 1px), linear-gradient(90deg, ${tint}22 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          transform: "perspective(320px) rotateX(62deg)",
          transformOrigin: "bottom",
          animation: "floorScroll 4s linear infinite",
          maskImage: "linear-gradient(to top, black 20%, transparent 95%)",
          WebkitMaskImage: "linear-gradient(to top, black 20%, transparent 95%)",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, ${COLORS.void} 0%, transparent 60%)` }} />
    </div>
  );
}
