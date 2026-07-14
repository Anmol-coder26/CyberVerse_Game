// src/context/PresentationContext.tsx
// Holds the ONE instance of the music engine and the iris transition state
// for the entire app lifetime. If each page created its own useMusic()/
// useIris(), the soundtrack would restart and mood would reset on every
// navigation - this context is what makes both persist correctly.

import React, { createContext, useContext } from "react";
import { useIris, type IrisState } from "../hooks/useIris";
import { useMusic } from "../hooks/useMusic";

interface PresentationContextValue {
  irisState: IrisState;
  go: (navigate: () => void, color?: string) => void;
  music: ReturnType<typeof useMusic>;
}

const PresentationContext = createContext<PresentationContextValue | null>(null);

export function PresentationProvider({ children }: { children: React.ReactNode }) {
  const { irisState, go } = useIris();
  const music = useMusic();
  return <PresentationContext.Provider value={{ irisState, go, music }}>{children}</PresentationContext.Provider>;
}

export function usePresentation(): PresentationContextValue {
  const ctx = useContext(PresentationContext);
  if (!ctx) throw new Error("usePresentation() must be used inside a <PresentationProvider>.");
  return ctx;
}
