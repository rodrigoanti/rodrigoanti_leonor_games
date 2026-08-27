import GameCard from "@/components/GameCard";
import { GAMES } from "@/lib/games";

export default function Home() {
  return (
    <div className="hub-container">
      <header className="hub-header">
        <h1 className="hub-title">Juegos de Leo</h1>
        <p className="hub-subtitle">¡Elige un juego y diviértete aprendiendo!</p>
      </header>
      <main className="hub-grid">
        {GAMES.map((game) => (
          <GameCard
            key={game.id}
            title={game.title}
            emoji={game.emoji}
            href={game.href}
            available={game.available}
          />
        ))}
      </main>
    </div>
  );
}
