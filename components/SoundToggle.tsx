"use client";

import { useCallback, useEffect, useState } from "react";
import {
  isMuted,
  MUTE_STORAGE_KEY,
  toggleMuted,
  unlockAudio,
} from "@/lib/audio";

export default function SoundToggle() {
  const [muted, setMutedState] = useState(false);

  useEffect(() => {
    setMutedState(isMuted());

    const onStorage = (event: StorageEvent) => {
      if (event.key === MUTE_STORAGE_KEY) {
        setMutedState(event.newValue === "true");
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleToggle = useCallback(() => {
    unlockAudio();
    const next = toggleMuted();
    setMutedState(next);
  }, []);

  return (
    <button
      type="button"
      className="sound-toggle-btn"
      onClick={handleToggle}
      aria-label={muted ? "Activar sonidos" : "Silenciar sonidos"}
      aria-pressed={muted}
    >
      {muted ? "🔇" : "🔊"}
    </button>
  );
}
