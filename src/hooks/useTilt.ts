// src/hooks/useTilt.ts
import { useCallback, useRef, useState } from "react";

export interface TiltState {
  rx: number;
  ry: number;
  px: number;
  py: number;
}

/**
 * Tracks mouse position over an element and returns a 3D rotation + a
 * normalized pointer position (0-1), used to drive the holographic
 * tilt-toward-cursor effect on panels and the specular sweep inside them.
 */
export function useTilt(maxDegrees = 8) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState<TiltState>({ rx: 0, ry: 0, px: 0.5, py: 0.5 });

  const onMove = useCallback(
    (e: React.MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      setTilt({ rx: (py - 0.5) * -maxDegrees, ry: (px - 0.5) * maxDegrees, px, py });
    },
    [maxDegrees]
  );

  const onLeave = useCallback(() => {
    setTilt((t) => ({ ...t, rx: 0, ry: 0 }));
  }, []);

  return { ref, tilt, onMove, onLeave };
}
