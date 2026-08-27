"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import SoundToggle from "@/components/SoundToggle";
import {
  createGameRounds,
  ROUNDS_PER_GAME,
  type NumberRound,
} from "@/lib/numbers";
import { playSound, unlockAudio } from "@/lib/audio";

const CELEBRATION_DELAY_MS = 600;
const SHAKE_DELAY_MS = 400;

export default function NumbersGame() {
  const [rounds, setRounds] = useState<NumberRound[]>(() => createGameRounds());
  const [currentRound, setCurrentRound] = useState(0);
  const [victory, setVictory] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const [shaking, setShaking] = useState<number | null>(null);
  const [evaluating, setEvaluating] = useState(false);
  const [correctOption, setCorrectOption] = useState<number | null>(null);
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
    (option: number) => {
      if (evaluating || victory || celebrating) {
        return;
      }

      unlockAudio();
      playSound("tap");

      if (option === round.count) {
        playSound("correct");
        setEvaluating(true);
        setCelebrating(true);
        setCorrectOption(option);

        timeoutRef.current = setTimeout(() => {
          if (currentRound === ROUNDS_PER_GAME - 1) {
            playSound("victory");
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
        playSound("wrong");
        setEvaluating(true);
        setShaking(option);

        timeoutRef.current = setTimeout(() => {
          setShaking(null);
          setEvaluating(false);
          timeoutRef.current = null;
        }, SHAKE_DELAY_MS);
      }
    },
    [evaluating, victory, celebrating, round.count, currentRound],
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
          <div className="app-title">Números</div>
        </div>
        <SoundToggle />
      </header>

      <div className="numbers-main">
        <div className="numbers-objects" aria-hidden="true">
          {Array.from({ length: round.count }, (_, i) => (
            <span key={i} className="numbers-emoji">
              {round.emoji}
            </span>
          ))}
        </div>
        <p className="numbers-prompt">¿Cuántos hay?</p>
        <p className="numbers-counter">
          {currentRound + 1} de {ROUNDS_PER_GAME}
        </p>
        <div
          className="numbers-progress"
          role="progressbar"
          aria-valuenow={currentRound + 1}
          aria-valuemin={1}
          aria-valuemax={ROUNDS_PER_GAME}
          aria-label="Progreso del juego"
        >
          <div
            className="numbers-progress-bar"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="numbers-options" role="group" aria-label="Opciones numéricas">
          {round.options.map((option) => {
            const classes = [
              "numbers-option",
              correctOption === option ? "numbers-option--correct" : "",
              shaking === option ? "numbers-option--shake" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={option}
                type="button"
                className={classes}
                onClick={() => handleOptionClick(option)}
                disabled={evaluating}
                aria-label={String(option)}
              >
                {option}
              </button>
            );
          })}
        </div>

        {victory && (
          <div className="numbers-victory" role="status" aria-live="polite">
            <p className="numbers-victory-message">¡Lo lograste! 🎉</p>
            <button
              type="button"
              className="numbers-restart-btn"
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
