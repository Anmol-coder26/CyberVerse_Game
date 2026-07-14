// src/components/ui/Button.tsx
import React from "react";
import { COLORS, EASE, FONT_DISPLAY } from "../../constants/theme";

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
  style?: React.CSSProperties;
}

const VARIANTS: Record<string, React.CSSProperties> = {
  primary: {
    background: `linear-gradient(120deg, ${COLORS.cyan}30, ${COLORS.purple}30)`,
    color: COLORS.frost,
    boxShadow: `0 0 0 1px ${COLORS.cyan}90 inset, 0 0 26px ${COLORS.cyan}30`,
  },
  ghost: {
    background: "rgba(255,255,255,0.03)",
    color: COLORS.muted,
    boxShadow: `0 0 0 1px ${COLORS.muted}55 inset`,
  },
};

export function Button({ children, onClick, variant = "primary", disabled, style }: ButtonProps) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{
        fontFamily: FONT_DISPLAY,
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: 1.6,
        textTransform: "uppercase",
        padding: "13px 28px",
        cursor: disabled ? "not-allowed" : "pointer",
        border: "none",
        borderRadius: 999,
        transition: `all 0.35s ${EASE}`,
        opacity: disabled ? 0.4 : 1,
        ...VARIANTS[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled) e.currentTarget.style.transform = "translateY(-2px) scale(1.03)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0) scale(1)";
      }}
    >
      {children}
    </button>
  );
}
