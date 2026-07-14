// src/hooks/useMusic.ts
import { useMemo, useState } from "react";
import { MusicEngine } from "../services/audio/MusicEngine";

/**
 * Provides a stable MusicEngine instance for the lifetime of the component
 * tree, plus a `muted` flag the UI can render a mute icon from. The engine
 * itself holds all the Tone.js wiring - this hook is just the React glue.
 */
export function useMusic() {
  const engine = useMemo(() => new MusicEngine(), []);
  const [muted, setMuted] = useState(false);

  function start() {
    void engine.start();
  }

  function toggleMute() {
    engine.toggleMute();
    setMuted((m) => !m);
  }

  return {
    start,
    setMood: (accentColor: string | null) => engine.setMood(accentColor),
    setTension: (active: boolean) => engine.setTension(active),
    playChime: (kind: "success" | "fail") => engine.playChime(kind),
    toggleMute,
    muted,
  };
}
