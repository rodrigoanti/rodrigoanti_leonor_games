"use client";

import GameCard from "@/components/GameCard";
import SoundToggle from "@/components/SoundToggle";
import { GAMES } from "@/lib/games";
import { playSound, unlockAudio } from "@/lib/audio";

export default function HubContent() {
  const handleCardTap = () => {
    unlockAudio();
    playSound("tap");
  };

  return (
    <div className="hub-container">
      <header className="hub-header">
        <div className="hub-header-row">
          <div className="hub-header-text">
            <h1 className="hub-title">Juegos de Leo</h1>
            <p className="hub-subtitle">¡Elige un juego y diviértete aprendiendo!</p>
          </div>
          <SoundToggle />
        </div>
      </header>
      <main className="hub-grid">
        {GAMES.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            emoji={game.emoji}
            href={game.href}
            available={game.available}
            onActiveTap={game.available ? handleCardTap : undefined}
          />
        ))}
      </main>
    </div>
  );
}
