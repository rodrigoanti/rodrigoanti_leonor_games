"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  createGameRounds,
  ROUNDS_PER_GAME,
  SHAPES,
  type ShapeId,
  type ShapeRound,
} from "@/lib/shapes";

const CELEBRATION_DELAY_MS = 600;
const SHAKE_DELAY_MS = 400;

const SHAPE_COLORS: Record<ShapeId, string> = {
  circle: "#4dabf7",
  square: "#ff6b9d",
  triangle: "#51cf66",
  star: "#ffc107",
};

function getShapeName(id: ShapeId): string {
  return SHAPES.find((s) => s.id === id)?.name ?? id;
}

function ShapeSvg({ id }: { id: ShapeId }) {
  const color = SHAPE_COLORS[id];

  switch (id) {
    case "circle":
      return (
        <svg viewBox="0 0 56 56" width={56} height={56} aria-hidden="true">
          <circle cx="28" cy="28" r="22" fill={color} />
        </svg>
      );
    case "square":
      return (
        <svg viewBox="0 0 56 56" width={56} height={56} aria-hidden="true">
          <rect x="10" y="10" width="36" height="36" rx="4" fill={color} />
        </svg>
      );
    case "triangle":
      return (
        <svg viewBox="0 0 56 56" width={56} height={56} aria-hidden="true">
          <polygon points="28,8 50,48 6,48" fill={color} />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 56 56" width={56} height={56} aria-hidden="true">
          <polygon
            points="28,6 33,20 48,20 36,30 40,46 28,36 16,46 20,30 8,20 23,20"
            fill={color}
          />
        </svg>
      );
  }
}

export default function ShapesGame() {
  const [rounds, setRounds] = useState<ShapeRound[]>(() => createGameRounds());
  const [currentRound, setCurrentRound] = useState(0);
  const [victory, setVictory] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [shaking, setShaking] = useState<ShapeId | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [correctOption, setCorrectOption] = useState<ShapeId | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const round = rounds[currentRound];

  const restart = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setRounds(createGameRounds());
    setCurrentRound(0);
    setVictory(false);
    setCelebrating(false);
    setShaking(null);
    setEvaluating(false);
    setCorrectOption(null);
  }, []);

  const handleOptionClick = useCallback(
    (optionId: ShapeId) => {
      if (evaluating || victory || celebrating) {
        return;
      }

      if (optionId === round.correctId) {
        setEvaluating(true);
        setCelebrating(true);
        setCorrectOption(optionId);

        timeoutRef.current = setTimeout(() => {
          if (currentRound === ROUNDS_PER_GAME - 1) {
            setVictory(true);
          } else {
            setCurrentRound((r) => r + 1);
          }
          setCelebrating(false);
          setCorrectOption(null);
          setEvaluating(false);
          timeoutRef.current = null;
        }, CELEBRATION_DELAY_MS);
      } else {
        setEvaluating(true);
        setShaking(optionId);

        timeoutRef.current = setTimeout(() => {
          setShaking(null);
          setEvaluating(false);
          timeoutRef.current = null;
        }, SHAKE_DELAY_MS);
      }
    },
    [evaluating, victory, celebrating, round.correctId, currentRound],
  );

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const progressPercent = (currentRound / ROUNDS_PER_GAME) * 100;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-start">
          <Link href="/" className="back-link" aria-label="Volver al hub">
            ← Volver
          </Link>
          <div className="app-title">Formas</div>
        </div>
      </header>

      <div className="shapes-main">
        <p className="shapes-prompt">{round.prompt}</p>
        <p className="shapes-counter">
          {currentRound + 1} de {ROUNDS_PER_GAME}
        </p>
        <div
          className="shapes-progress"
          role="progressbar"
          aria-valuenow={currentRound + 1}
          aria-valuemin={1}
          aria-valuemax={ROUNDS_PER_GAME}
          aria-label="Progreso del juego"
        >
          <div
            className="shapes-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="shapes-options" role="group" aria-label="Opciones de forma">
          {round.options.map((optionId) => {
            const classes = [
              "shapes-option",
              correctOption === optionId ? "shapes-option--correct" : "",
              shaking === optionId ? "shapes-option--shake" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={optionId}
                type="button"
                className={classes}
                onClick={() => handleOptionClick(optionId)}
                disabled={evaluating}
                aria-label={getShapeName(optionId)}
              >
                <ShapeSvg id={optionId} />
              </button>
            );
          })}
        </div>

        {victory && (
          <div className="shapes-victory" role="status" aria-live="polite">
            <p className="shapes-victory-message">¡Lo lograste! 🎉</p>
            <button
              type="button"
              className="shapes-restart-btn"
              onClick={restart}
            >
              Jugar de nuevo
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
