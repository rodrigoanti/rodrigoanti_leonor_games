export type ShapeId = "circle" | "square" | "triangle" | "star";

export const SHAPES: readonly { id: ShapeId; name: string }[] = [
  { id: "circle", name: "círculo" },
  { id: "square", name: "cuadrado" },
  { id: "triangle", name: "triángulo" },
  { id: "star", name: "estrella" },
];

export type ShapeRound = {
  prompt: string;
  correctId: ShapeId;
  options: ShapeId[];
};

export const ROUNDS_PER_GAME = 8;

const ALL_SHAPE_IDS: ShapeId[] = ["circle", "square", "triangle", "star"];

function shuffle<T>(array: readonly T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function pickRandomShapeId(): ShapeId {
  return ALL_SHAPE_IDS[Math.floor(Math.random() * ALL_SHAPE_IDS.length)];
}

function pickRandomShapeIdNot(previous: ShapeId | null): ShapeId {
  let id = pickRandomShapeId();
  if (previous === null) {
    return id;
  }
  while (id === previous) {
    id = pickRandomShapeId();
  }
  return id;
}

export function createGameRounds(): ShapeRound[] {
  const rounds: ShapeRound[] = [];
  let previousCorrectId: ShapeId | null = null;

  for (let i = 0; i < ROUNDS_PER_GAME; i++) {
    const correctId = pickRandomShapeIdNot(previousCorrectId);
    previousCorrectId = correctId;
    const shape = SHAPES.find((s) => s.id === correctId)!;
    rounds.push({
      prompt: `¿Cuál es el ${shape.name}?`,
      correctId,
      options: shuffle(ALL_SHAPE_IDS),
    });
  }

  return rounds;
}
