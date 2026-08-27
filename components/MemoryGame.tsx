"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  createShuffledDeck,
  type MemoryCard,
} from "@/lib/memory";

const FLIP_BACK_DELAY_MS = 1000;

export default function MemoryGame() {
  const [deck, setDeck] = useState<MemoryCard[]>(() => createShuffledDeck());
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedPairIds, setMatchedPairIds] = useState<Set<number>>(
    () => new Set(),
  );
  const [evaluating, setEvaluating] = useState(false);
  const [victory, setVictory] = useState(false);
  const flipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const restart = useCallback(() => {
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
      flipTimeoutRef.current = null;
    }
    setDeck(createShuffledDeck());
    setFlippedIds([]);
    setMatchedPairIds(new Set());
    setEvaluating(false);
    setVictory(false);
  }, []);

  const handleCardClick = useCallback(
    (card: MemoryCard) => {
      if (
        evaluating ||
        victory ||
        matchedPairIds.has(card.pairId) ||
        flippedIds.includes(card.id)
      ) {
        return;
      }

      const nextFlipped = [...flippedIds, card.id];
      setFlippedIds(nextFlipped);

      if (nextFlipped.length < 2) {
        return;
      }

      setEvaluating(true);
      const [firstId, secondId] = nextFlipped;
      const first = deck.find((c) => c.id === firstId);
      const second = deck.find((c) => c.id === secondId);

      if (first && second && first.pairId === second.pairId) {
        const nextMatched = new Set(matchedPairIds);
        nextMatched.add(first.pairId);
        setMatchedPairIds(nextMatched);
        setFlippedIds([]);
        setEvaluating(false);

        if (nextMatched.size === 6) {
          setVictory(true);
        }
      } else {
        flipTimeoutRef.current = setTimeout(() => {
          setFlippedIds([]);
          setEvaluating(false);
          flipTimeoutRef.current = null;
        }, FLIP_BACK_DELAY_MS);
      }
    },
    [deck, evaluating, flippedIds, matchedPairIds, victory],
  );

  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  const isFlipped = (card: MemoryCard) =>
    flippedIds.includes(card.id) || matchedPairIds.has(card.pairId);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-start">
          <Link href="/" className="back-link" aria-label="Volver al hub">
            ← Volver
          </Link>
          <div className="app-title">Memoria</div>
        </div>
        <button
          type="button"
          className="memory-restart-btn"
          onClick={restart}
        >
          Jugar de nuevo
        </button>
      </header>

      <div className="memory-main">
        <div className="memory-grid" role="group" aria-label="Tablero de memoria">
          {deck.map((card) => {
            const matched = matchedPairIds.has(card.pairId);
            const flipped = isFlipped(card);
            const classes = [
              "memory-card",
              flipped ? "memory-card--flipped" : "memory-card--hidden",
              matched ? "memory-card--matched" : "",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <button
                key={card.id}
                type="button"
                className={classes}
                onClick={() => handleCardClick(card)}
                disabled={matched || evaluating}
                aria-label={
                  matched
                    ? `Pareja encontrada: ${card.emoji}`
                    : flipped
                      ? `Carta volteada: ${card.emoji}`
                      : "Carta boca abajo"
                }
              >
                <span className="memory-card-face memory-card-face--back" />
                <span className="memory-card-face memory-card-face--front">
                  {card.emoji}
                </span>
              </button>
            );
          })}
        </div>

        {victory && (
          <div className="memory-victory" role="status" aria-live="polite">
            <p className="memory-victory-message">¡Lo lograste! 🎉</p>
            <button
              type="button"
              className="memory-restart-btn"
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
