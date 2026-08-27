export const ROUNDS_PER_GAME = 8;

export const COUNT_EMOJIS: readonly string[] = [
  "⭐",
  "🍎",
  "🐶",
  "🌸",
  "🎈",
  "🐟",
];

export type NumberRound = {
  emoji: string;
  count: number;
  options: number[];
};

const ALL_COUNTS = [1, 2, 3, 4, 5] as const;

function shuffle<T>(array: readonly T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandomCount(): number {
  return ALL_COUNTS[Math.floor(Math.random() * ALL_COUNTS.length)];
}

function pickRandomCountNot(previous: number | null): number {
  let count = pickRandomCount();
  if (previous === null) {
    return count;
  }
  while (count === previous) {
    count = pickRandomCount();
  }
  return count;
}

function pickRandomEmoji(): string {
  return COUNT_EMOJIS[Math.floor(Math.random() * COUNT_EMOJIS.length)];
}

function buildOptions(count: number): number[] {
  const distractors = ALL_COUNTS.filter((n) => n !== count);
  return shuffle([count, ...shuffle(distractors).slice(0, 3)]);
}

export function createGameRounds(): NumberRound[] {
  const rounds: NumberRound[] = [];
  let previousCount: number | null = null;

  for (let i = 0; i < ROUNDS_PER_GAME; i++) {
    const count = pickRandomCountNot(previousCount);
    previousCount = count;
    rounds.push({
      emoji: pickRandomEmoji(),
      count,
      options: buildOptions(count),
    });
  }

  return rounds;
}
