"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import SoundToggle from "@/components/SoundToggle";
import { playSound, unlockAudio } from "@/lib/audio";
import {
  LIGHT_SWITCHES,
  createInitialLightsState,
  type LightElementId,
  type LightsState,
} from "@/lib/lights";

const CONFETTI_MS = 1800;

const CONFETTI_PIECES = [
  { left: 8, delay: 0, tint: "#ffd43b", size: 14 },
  { left: 18, delay: 120, tint: "#ff8787", size: 11 },
  { left: 28, delay: 60, tint: "#74c0fc", size: 16 },
  { left: 38, delay: 200, tint: "#b197fc", size: 12 },
  { left: 48, delay: 30, tint: "#ffd43b", size: 15 },
  { left: 58, delay: 160, tint: "#69db7c", size: 11 },
  { left: 68, delay: 90, tint: "#ff8787", size: 14 },
  { left: 78, delay: 220, tint: "#74c0fc", size: 12 },
  { left: 88, delay: 50, tint: "#ffd43b", size: 16 },
  { left: 94, delay: 180, tint: "#b197fc", size: 11 },
];

function elementClass(id: LightElementId, on: boolean): string {
  return on
    ? `lights-element lights-element--${id} is-on`
    : `lights-element lights-element--${id}`;
}

export default function LightsGame() {
  const [lights, setLights] = useState<LightsState>(createInitialLightsState);
  const [confettiKey, setConfettiKey] = useState(0);
  const [confettiOn, setConfettiOn] = useState(false);
  const confettiTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const lightsRef = useRef<LightsState>(createInitialLightsState());

  const handleToggle = useCallback(
    (id: LightElementId, surprise: boolean) => {
      unlockAudio();

      const next = !lightsRef.current[id];
      lightsRef.current = { ...lightsRef.current, [id]: next };
      setLights(lightsRef.current);
      playSound(next ? "switchOn" : "switchOff");

      if (surprise && next) {
        setConfettiKey((key) => key + 1);
        setConfettiOn(true);
        if (confettiTimerRef.current) {
          clearTimeout(confettiTimerRef.current);
        }
        confettiTimerRef.current = setTimeout(() => {
          setConfettiOn(false);
          confettiTimerRef.current = null;
        }, CONFETTI_MS);
      }
    },
    [],
  );

  useEffect(() => {
    return () => {
      if (confettiTimerRef.current) {
        clearTimeout(confettiTimerRef.current);
      }
    };
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-start">
          <Link href="/" className="back-link" aria-label="Volver al hub">
            ← Volver
          </Link>
          <div className="app-title">Luces</div>
        </div>
        <SoundToggle />
      </header>

      <div className="lights-main">
        <div className="lights-scene" role="presentation">
          <div className={elementClass("luna", lights.luna)} aria-hidden="true">
            <svg viewBox="0 0 64 64" width="100%" height="100%">
              <path
                d="M40 6a26 26 0 1 0 18 34A22 22 0 0 1 40 6Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <div
            className={elementClass("estrella", lights.estrella)}
            aria-hidden="true"
          >
            <svg viewBox="0 0 48 48" width="100%" height="100%">
              <polygon
                points="24,3 29.5,17.5 45,18 32.5,27.5 37,42 24,33 11,42 15.5,27.5 3,18 18.5,17.5"
                fill="currentColor"
              />
            </svg>
          </div>

          <div
            className={elementClass("ventana", lights.ventana)}
            aria-hidden="true"
          >
            <svg viewBox="0 0 80 96" width="100%" height="100%">
              <rect
                x="4"
                y="4"
                width="72"
                height="88"
                rx="10"
                fill="currentColor"
                opacity="0.85"
              />
              <rect x="36" y="4" width="8" height="88" fill="#3b2f2f" />
              <rect x="4" y="44" width="72" height="8" fill="#3b2f2f" />
            </svg>
          </div>

          <div
            className={elementClass("lampara", lights.lampara)}
            aria-hidden="true"
          >
            <svg viewBox="0 0 96 110" width="100%" height="100%">
              <rect x="45" y="0" width="6" height="24" fill="#5c4b3b" />
              <path d="M20 26h56l14 34H6Z" fill="currentColor" />
              <circle cx="48" cy="72" r="12" fill="currentColor" />
            </svg>
          </div>

          {confettiOn ? (
            <div key={confettiKey} className="lights-confetti" aria-hidden="true">
              {CONFETTI_PIECES.map((piece) => (
                <span
                  key={piece.left}
                  className="lights-confetti-piece"
                  style={{
                    left: `${piece.left}%`,
                    width: `${piece.size}px`,
                    height: `${piece.size}px`,
                    background: piece.tint,
                    animationDelay: `${piece.delay}ms`,
                  }}
                />
              ))}
            </div>
          ) : null}
        </div>

        <div className="lights-switches">
          {LIGHT_SWITCHES.map((config) => {
            const on = lights[config.element];
            return (
              <button
                key={config.id}
                type="button"
                role="switch"
                aria-checked={on}
                aria-label={config.label}
                className={on ? "lights-switch is-on" : "lights-switch"}
                onClick={() =>
                  handleToggle(config.element, Boolean(config.surprise))
                }
              >
                <span className="lights-switch-emoji" aria-hidden="true">
                  {config.emoji}
                </span>
                <span className="lights-switch-track" aria-hidden="true">
                  <span className="lights-switch-knob" />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
