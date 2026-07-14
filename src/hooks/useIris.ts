// src/hooks/useIris.ts
import { useCallback, useState } from "react";
import { COLORS } from "../constants/theme";

export interface IrisState {
  active: boolean;
  phase: "in" | "out";
  color: string;
}

const IRIS_HALF_DURATION_MS = 420;

/**
 * Drives the iris/portal transition: a ring of light expands to cover the
 * screen, the underlying navigation happens while covered, then the ring
 * contracts away. `go` accepts any navigation callback, so it works equally
 * for an in-page setState transition or a react-router navigate() call.
 */
export function useIris() {
  const [irisState, setIrisState] = useState<IrisState>({
    active: false,
    phase: "in",
    color: COLORS.cyan,
  });

  const go = useCallback((navigate: () => void, color: string = COLORS.cyan) => {
    setIrisState({ active: true, phase: "in", color });
    setTimeout(() => {
      navigate();
      setIrisState({ active: true, phase: "out", color });
    }, IRIS_HALF_DURATION_MS);
    setTimeout(() => {
      setIrisState({ active: false, phase: "in", color });
    }, IRIS_HALF_DURATION_MS * 2);
  }, []);

  return { irisState, go };
}
