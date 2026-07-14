// src/components/common/Atmosphere.tsx
import type { AtmosphereType } from "../../types";

export interface AtmosphereProps {
  type: AtmosphereType;
  accent: string;
}

/** Renders the location-specific ambient effect for a chapter's scene. */
export function Atmosphere({ type, accent }: AtmosphereProps) {
  if (type === "rain") {
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {new Array(20).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${(i * 5) % 100}%`,
              top: -40,
              width: 1,
              height: 55 + Math.random() * 35,
              background: `linear-gradient(${accent}, transparent)`,
              opacity: 0.32,
              animation: `rainFall ${0.7 + Math.random() * 0.6}s linear infinite`,
              animationDelay: `${Math.random()}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (type === "metro") {
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {new Array(9).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: -200,
              top: `${8 + i * 10}%`,
              width: 150,
              height: 2,
              background: `linear-gradient(90deg, transparent, ${accent}, transparent)`,
              animation: `metroStreak ${1.2 + Math.random() * 1.3}s linear infinite`,
              animationDelay: `${Math.random() * 1.5}s`,
              opacity: 0.5,
            }}
          />
        ))}
      </div>
    );
  }
  if (type === "dust") {
    return (
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
        {new Array(24).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: 2,
              height: 2,
              borderRadius: "50%",
              background: accent,
              opacity: 0.4,
              animation: `dustDrift ${4 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
    );
  }
  return null;
}
