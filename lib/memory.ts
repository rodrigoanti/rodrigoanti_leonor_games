export type MemoryCard = {
  id: string;
  emoji: string;
  pairId: number;
};

export const MEMORY_EMOJIS = ["🐶", "🐱", "🐸", "🦁", "🐷", "🐻"];

export function createShuffledDeck(): MemoryCard[] {
  const cards: MemoryCard[] = MEMORY_EMOJIS.flatMap((emoji, pairId) => [
    { id: `${pairId}-a`, emoji, pairId },
    { id: `${pairId}-b`, emoji, pairId },
  ]);

  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }

  return cards;
}
