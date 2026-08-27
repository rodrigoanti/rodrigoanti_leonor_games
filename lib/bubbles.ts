export type Bubble = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  driftX: number;
  driftY: number;
  floatSeconds: number;
};

export const MAX_BUBBLES = 4;

export const MIN_BUBBLE_SIZE = 84;
export const MAX_BUBBLE_SIZE = 128;

export const BUBBLE_COLORS = [
  "#bde0fe",
  "#ffc8dd",
  "#caffbf",
  "#fdffb6",
  "#e0c3fc",
  "#b8f2e6",
];

const MIN_DISTANCE = 30;
const PLACEMENT_TRIES = 24;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function distance(ax: number, ay: number, bx: number, by: number): number {
  return Math.hypot(ax - bx, ay - by);
}

function pickPosition(existing: Bubble[]): { x: number; y: number } {
  let best = { x: randomBetween(18, 82), y: randomBetween(18, 82) };
  let bestGap = -1;

  for (let i = 0; i < PLACEMENT_TRIES; i += 1) {
    const candidate = { x: randomBetween(18, 82), y: randomBetween(18, 82) };
    const gap = existing.length
      ? Math.min(
          ...existing.map((b) => distance(candidate.x, candidate.y, b.x, b.y)),
        )
      : Number.POSITIVE_INFINITY;

    if (gap >= MIN_DISTANCE) {
      return candidate;
    }
    if (gap > bestGap) {
      bestGap = gap;
      best = candidate;
    }
  }

  return best;
}

export function createBubble(id: number, existing: Bubble[] = []): Bubble {
  const { x, y } = pickPosition(existing);

  return {
    id,
    x,
    y,
    size: Math.round(randomBetween(MIN_BUBBLE_SIZE, MAX_BUBBLE_SIZE)),
    color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
    driftX: Math.round(randomBetween(-26, 26)),
    driftY: Math.round(randomBetween(-34, -12)),
    floatSeconds: Number(randomBetween(5.5, 9).toFixed(2)),
  };
}

export function createInitialBubbles(startId = 1): Bubble[] {
  const count = 2 + Math.floor(Math.random() * (MAX_BUBBLES - 1));
  const bubbles: Bubble[] = [];

  for (let i = 0; i < count; i += 1) {
    bubbles.push(createBubble(startId + i, bubbles));
  }

  return bubbles;
}
