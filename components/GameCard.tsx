"use client";

import Link from "next/link";

type GameCardProps = {
  title: string;
  emoji: string;
  href: string;
  available: boolean;
  onActiveTap?: () => void;
};

export default function GameCard({
  title,
  emoji,
  href,
  available,
  onActiveTap,
}: GameCardProps) {
  if (available) {
    return (
      <Link
        href={href}
        className="game-card game-card--active"
        onClick={onActiveTap}
      >
        <span className="game-card-emoji" aria-hidden="true">
          {emoji}
        </span>
        <span className="game-card-title">{title}</span>
      </Link>
    );
  }

  return (
    <div
      className="game-card game-card--disabled"
      aria-disabled="true"
    >
      <span className="game-card-emoji" aria-hidden="true">
        {emoji}
      </span>
      <span className="game-card-title">{title}</span>
      <span className="game-card-badge">Próximamente</span>
    </div>
  );
}
