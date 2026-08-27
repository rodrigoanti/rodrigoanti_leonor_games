"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import SoundToggle from "@/components/SoundToggle";
import { playSound, unlockAudio } from "@/lib/audio";
import {
  MAX_BUBBLES,
  createBubble,
  createInitialBubbles,
  type Bubble,
} from "@/lib/bubbles";

const POP_MS = 520;
const POP_PARTICLES = [0, 60, 120, 180, 240, 300];

type Pop = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
};

export default function BubblesGame() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [pops, setPops] = useState<Pop[]>([]);
  const nextIdRef = useRef(0);
  const popTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const initial = createInitialBubbles(1);
    nextIdRef.current = initial.length;
    setBubbles(initial);
  }, []);

  useEffect(() => {
    return () => {
      popTimersRef.current.forEach(clearTimeout);
      popTimersRef.current = [];
    };
  }, []);

  const handlePop = useCallback((bubbleId: number) => {
    unlockAudio();
    playSound("pop");

    setBubbles((prev) => {
      const target = prev.find((b) => b.id === bubbleId);
      if (!target) {
        return prev;
      }

      const others = prev.filter((b) => b.id !== bubbleId);
      nextIdRef.current += 1;
      const replacement = createBubble(nextIdRef.current, others);

      const next = [...others, replacement];
      return next.slice(-MAX_BUBBLES);
    });
  }, []);

  const handlePointerDown = useCallback(
    (event: React.PointerEvent<HTMLButtonElement>, bubble: Bubble) => {
      event.preventDefault();

      setPops((prev) => [
        ...prev,
        {
          id: bubble.id,
          x: bubble.x,
          y: bubble.y,
          size: bubble.size,
          color: bubble.color,
        },
      ]);

      const timer = setTimeout(() => {
        setPops((prev) => prev.filter((p) => p.id !== bubble.id));
        popTimersRef.current = popTimersRef.current.filter((t) => t !== timer);
      }, POP_MS);
      popTimersRef.current.push(timer);

      handlePop(bubble.id);
    },
    [handlePop],
  );

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-start">
          <Link href="/" className="back-link" aria-label="Volver al hub">
            ← Volver
          </Link>
          <div className="app-title">Burbujas</div>
        </div>
        <SoundToggle />
      </header>

      <div className="bubbles-main">
        <div className="bubbles-area" role="presentation">
          {pops.map((pop) => (
            <span
              key={`pop-${pop.id}`}
              className="bubbles-pop"
              style={{
                left: `${pop.x}%`,
                top: `${pop.y}%`,
                width: `${pop.size}px`,
                height: `${pop.size}px`,
                color: pop.color,
              }}
              aria-hidden="true"
            >
              {POP_PARTICLES.map((angle) => (
                <span
                  key={angle}
                  className="bubbles-pop-particle"
                  style={{ ["--angle" as string]: `${angle}deg` }}
                />
              ))}
            </span>
          ))}

          {bubbles.map((bubble) => (
            <button
              key={bubble.id}
              type="button"
              className="bubbles-bubble"
              aria-label="Burbuja"
              onPointerDown={(event) => handlePointerDown(event, bubble)}
              style={{
                left: `${bubble.x}%`,
                top: `${bubble.y}%`,
                width: `${bubble.size}px`,
                height: `${bubble.size}px`,
                ["--drift-x" as string]: `${bubble.driftX}px`,
                ["--drift-y" as string]: `${bubble.driftY}px`,
                ["--float-seconds" as string]: `${bubble.floatSeconds}s`,
                ["--bubble-color" as string]: bubble.color,
              }}
            >
              <span className="bubbles-bubble-skin" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
