// src/hooks/useCountdown.ts
import { useEffect, useState } from "react";
import { computeTimerDuration, isDanger } from "../engine/MissionEngine";

interface UseCountdownOptions {
  stress: number;
  active: boolean;
  onExpire: () => void;
}

/**
 * Runs the Scene Clock: computes the total duration from the player's
 * current Stress, ticks down once per second while `active`, and fires
 * `onExpire` exactly once when it reaches zero.
 */
export function useCountdown({ stress, active, onExpire }: UseCountdownOptions) {
  const totalTime = computeTimerDuration(stress);
  const [timeLeft, setTimeLeft] = useState(totalTime);

  useEffect(() => {
    if (!active) return;
    if (timeLeft <= 0) {
      onExpire();
      return;
    }
    const timeout = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, active]);

  const danger = isDanger(timeLeft, totalTime);
  const percentRemaining = Math.max(0, (timeLeft / totalTime) * 100);

  return { timeLeft, totalTime, danger, percentRemaining };
}
