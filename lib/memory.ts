export type MemoryCard = {
  id: string;
  emoji: string;
  pairId: number;
};

export const MEMORY_EMOJIS = ["🐶", "🐱", "🐸", "🦁", "🐷", "🐻"];

// Orden fijo para el primer render: el HTML estático del build y la
// hidratación del cliente deben coincidir. El azar se aplica ya montado.
export function createOrderedDeck(): MemoryCard[] {
  return MEMORY_EMOJIS.flatMap((emoji, pairId) => [
    { id: `${pairId}-a`, emoji, pairId },
    { id: `${pairId}-b`, emoji, pairId },
  ]);
}

export function createShuffledDeck(): MemoryCard[] {
  const cards = createOrderedDeck();

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}
