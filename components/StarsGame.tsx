"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import SoundToggle from "@/components/SoundToggle";
import { playSound, unlockAudio } from "@/lib/audio";

const MAX_STARS = 15;
const FADE_MS = 1500;
const STAR_SIZES = [34, 42, 50, 58];
const STAR_TINTS = ["#fff9c4", "#ffe082", "#ffffff", "#b3e5fc"];

type Star = {
  id: number;
  x: number;
  y: number;
  size: number;
  tint: string;
  fading: boolean;
};

export default function StarsGame() {
  const [stars, setStars] = useState<Star[]>([]);
  const skyRef = useRef<HTMLDivElement | null>(null);
  const nextIdRef = useRef(0);
  const activeCountRef = useRef(0);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSkyTap = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const sky = skyRef.current;
    if (!sky) {
      return;
    }

    const rect = sky.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return;
    }

    const id = nextIdRef.current + 1;
    nextIdRef.current = id;

    const star: Star = {
      id,
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100,
      size: STAR_SIZES[id % STAR_SIZES.length],
      tint: STAR_TINTS[id % STAR_TINTS.length],
      fading: false,
    };

    unlockAudio();
    playSound("sparkle");

    activeCountRef.current += 1;
    const reachedMax = activeCountRef.current >= MAX_STARS;

    setStars((prev) => {
      const next = [...prev, star];
      return reachedMax ? next.map((s) => ({ ...s, fading: true })) : next;
    });

    if (reachedMax) {
      activeCountRef.current = 0;
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
      }
      fadeTimerRef.current = setTimeout(() => {
        setStars((prev) => prev.filter((s) => !s.fading));
        fadeTimerRef.current = null;
      }, FADE_MS);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
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
          <div className="app-title">Estrellas</div>
        </div>
        <SoundToggle />
      </header>

      <div className="stars-main">
        <div
          ref={skyRef}
          className="stars-sky"
          onPointerDown={handleSkyTap}
          role="presentation"
          aria-label="Cielo: toca para crear estrellas"
        >
          {stars.map((star) => (
            <span
              key={star.id}
              className={
                star.fading ? "stars-star stars-star--fading" : "stars-star"
              }
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                color: star.tint,
              }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 48 48" width="100%" height="100%">
                <polygon
                  points="24,3 29.5,17.5 45,18 32.5,27.5 37,42 24,33 11,42 15.5,27.5 3,18 18.5,17.5"
                  fill="currentColor"
                />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
