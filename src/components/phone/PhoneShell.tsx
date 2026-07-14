// src/components/phone/PhoneShell.tsx
import React, { useState } from "react";
import { GlyphLabel } from "../ui/GlyphLabel";
import { EASE } from "../../constants/theme";

export interface PhoneShellProps {
  accent: string;
  children: React.ReactNode;
  screenOn: boolean;
  onWake: () => void;
  dragToRotate: boolean;
  shake?: boolean;
}

/** The central investigation device. Draggable to rotate before it wakes;
 * every case's evidence renders inside its screen. */
export function PhoneShell({ accent, children, screenOn, onWake, dragToRotate, shake }: PhoneShellProps) {
  const [drag, setDrag] = useState({ ry: dragToRotate ? -18 : 0, dragging: false, lastX: 0 });

  function onMouseDown(e: React.MouseEvent) {
    if (!dragToRotate) return;
    setDrag((d) => ({ ...d, dragging: true, lastX: e.clientX }));
  }
  function onMouseMove(e: React.MouseEvent) {
    if (!drag.dragging) return;
    const dx = e.clientX - drag.lastX;
    setDrag((d) => ({ ...d, ry: Math.max(-45, Math.min(45, d.ry + dx * 0.4)), lastX: e.clientX }));
  }
  function onMouseUp() {
    setDrag((d) => ({ ...d, dragging: false }));
  }

  return (
    <div
      style={{ perspective: 1100, display: "flex", justifyContent: "center", touchAction: "none" }}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div
        onClick={!screenOn ? onWake : undefined}
        className={shake ? "phone-shake" : ""}
        style={{
          width: 250,
          borderRadius: 34,
          position: "relative",
          cursor: dragToRotate && !screenOn ? "grab" : "default",
          background: "linear-gradient(155deg, #1b2030, #0a0c14)",
          border: "1px solid rgba(255,255,255,0.14)",
          boxShadow: `0 30px 80px -20px rgba(0,0,0,0.7), 0 0 60px -10px ${accent}66, inset 0 0 0 2px rgba(0,0,0,0.5)`,
          transform: `rotateY(${drag.ry}deg) rotateX(4deg)`,
          transition: drag.dragging ? "none" : `transform 0.6s ${EASE}`,
          padding: 10,
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 10,
            borderRadius: 24,
            pointerEvents: "none",
            zIndex: 3,
            background: `linear-gradient(${105 + drag.ry}deg, rgba(255,255,255,0.16) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.06) 100%)`,
          }}
        />
        <div style={{ position: "absolute", top: 18, left: "50%", transform: "translateX(-50%)", width: 60, height: 16, borderRadius: 10, background: "#000", zIndex: 4 }} />
        <div style={{ borderRadius: 24, overflow: "hidden", background: screenOn ? "#0B0E18" : "#050609", minHeight: 380, position: "relative" }}>
          {!screenOn && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: 380, gap: 10 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: accent, boxShadow: `0 0 16px ${accent}`, animation: "winFlicker 1.8s ease-in-out infinite" }} />
              <GlyphLabel color={accent}>Tap to wake</GlyphLabel>
            </div>
          )}
          {screenOn && children}
        </div>
      </div>
    </div>
  );
}
