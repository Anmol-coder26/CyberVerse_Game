// src/components/ui/GameIcon.tsx
// A single icon renderer used throughout the game. Deliberately hand-built
// rather than pulling in an icon library dependency - keeps the bundle
// dependency-free and removes an entire class of "icon didn't load" bugs.

import React from "react";

export type IconName =
  | "lock" | "check" | "shield" | "terminal" | "radar" | "chat" | "phone"
  | "shieldAlert" | "search" | "arrowLeft" | "arrowRight" | "landmark"
  | "camera" | "alertTriangle" | "qr" | "sparkles" | "skull" | "mail"
  | "volume" | "volumeMute" | "chevronDown" | "brain" | "heart" | "heartbeat"
  | "fire" | "userX" | "briefcase" | "creditCard" | "smartphone" | "robot"
  | "city" | "bolt" | "clock" | "gamepad" | "users" | "graduationCap";

export interface GameIconProps {
  name: string;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export function GameIcon({ name, size = 16, color = "currentColor", style, onClick }: GameIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    style,
    onClick,
  };

  switch (name) {
    case "lock":
      return <svg {...common}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
    case "check":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M8 12l3 3 5-6" /></svg>;
    case "shield":
      return <svg {...common}><path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" /></svg>;
    case "terminal":
      return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M7 9l3 3-3 3M13 15h4" /></svg>;
    case "radar":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="1.4" fill={color} /><path d="M12 12L18 6" /></svg>;
    case "chat":
      return <svg {...common}><path d="M4 5h16v11H8l-4 4V5z" /></svg>;
    case "phone":
      return <svg {...common}><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2C9 21 3 15 3 6a2 2 0 0 1 2-2z" /></svg>;
    case "shieldAlert":
      return <svg {...common}><path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" /><path d="M12 8v5M12 16h.01" /></svg>;
    case "search":
      return <svg {...common}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>;
    case "arrowLeft":
      return <svg {...common}><path d="M19 12H5M11 18l-6-6 6-6" /></svg>;
    case "arrowRight":
      return <svg {...common}><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
    case "landmark":
      return <svg {...common}><path d="M3 21h18M4 21V10M20 21V10M2 10l10-6 10 6M6 10v11M18 10v11M10 10v11M14 10v11" /></svg>;
    case "camera":
      return <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2" /><circle cx="12" cy="13.5" r="3.5" /><path d="M8 7l1.5-2h5L16 7" /></svg>;
    case "alertTriangle":
      return <svg {...common}><path d="M12 3l10 18H2L12 3z" /><path d="M12 10v4M12 17h.01" /></svg>;
    case "qr":
      return <svg {...common}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><path d="M14 14h3v3h-3zM19 14h2M14 19h2M19 19h2" /></svg>;
    case "sparkles":
      return <svg {...common}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M18 6l-2.5 2.5M8.5 15.5L6 18" /></svg>;
    case "skull":
      return <svg {...common}><circle cx="12" cy="11" r="8" /><circle cx="9" cy="10" r="1.2" fill={color} /><circle cx="15" cy="10" r="1.2" fill={color} /><path d="M9 19v2M15 19v2M12 15v2" /></svg>;
    case "mail":
      return <svg {...common}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 6l9 7 9-7" /></svg>;
    case "volume":
      return <svg {...common}><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16 9a4 4 0 0 1 0 6" /></svg>;
    case "volumeMute":
      return <svg {...common}><path d="M4 9v6h4l5 4V5L8 9H4z" /><path d="M16 10l4 4M20 10l-4 4" /></svg>;
    case "chevronDown":
      return <svg {...common}><path d="M6 9l6 6 6-6" /></svg>;
    case "brain":
      return <svg {...common}><path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-2 5 3 3 0 0 0 2 5v1a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3z" /><path d="M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 2 5 3 3 0 0 1-2 5v1a3 3 0 0 1-6 0" /></svg>;
    case "heart":
    case "heartbeat":
      return <svg {...common}><path d="M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6c-2.5 4.5-9.5 9-9.5 9z" /></svg>;
    case "fire":
    case "flame":
      return <svg {...common}><path d="M12 2s5 4 5 9a5 5 0 01-10 0c0-1.5.5-2.5 1.5-3.5C9 9 9.5 11 10 11c-.3-3 1-6 2-9z" /></svg>;
    case "userX":
      return <svg {...common}><circle cx="9" cy="8" r="4" /><path d="M2 21c0-4 3-6 7-6M17 8l4 4M21 8l-4 4" /></svg>;
    case "briefcase":
      return <svg {...common}><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>;
    case "creditCard":
      return <svg {...common}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>;
    case "smartphone":
      return <svg {...common}><rect x="6" y="2" width="12" height="20" rx="2" /><path d="M11 18h2" /></svg>;
    case "robot":
      return <svg {...common}><rect x="5" y="8" width="14" height="11" rx="2" /><circle cx="9.5" cy="13.5" r="1.2" fill={color} /><circle cx="14.5" cy="13.5" r="1.2" fill={color} /><path d="M12 8V5M9 5h6" /></svg>;
    case "city":
      return <svg {...common}><path d="M3 21h18M5 21V9l4-3v15M13 21V5l4 3v13M9 12h.01M9 15h.01M17 12h.01" /></svg>;
    case "bolt":
      return <svg {...common}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" /></svg>;
    case "clock":
      return <svg {...common}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 3" /></svg>;
    case "gamepad":
      return <svg {...common}><rect x="2" y="8" width="20" height="10" rx="4" /><path d="M7 12h.01M7 14h.01M6 13h2M15 12h2M16 11v2" /></svg>;
    case "users":
      return <svg {...common}><circle cx="9" cy="8" r="3.5" /><path d="M2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6M16 8.5a3 3 0 110-.01M17 14c2.5.3 4.5 2.3 4.5 5" /></svg>;
    case "graduationCap":
      return <svg {...common}><path d="M2 8l10-5 10 5-10 5-10-5z" /><path d="M6 10.5V16c0 1.5 3 3 6 3s6-1.5 6-3v-5.5" /></svg>;
    default:
      return <svg {...common}><circle cx="12" cy="12" r="9" /></svg>;
  }
}
