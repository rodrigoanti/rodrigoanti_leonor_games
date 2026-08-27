export type KitchenScreen = "menu" | "cooking" | "done";

export type GestureType =
  | "drag-place"
  | "tap-place"
  | "stir"
  | "sprinkle"
  | "cut"
  | "tap";

export type DishId =
  | "salad"
  | "sandwich"
  | "pizza"
  | "soup"
  | "smoothie"
  | "pancakes"
  | "cookies"
  | "pasta"
  | "eggs"
  | "fruit";

export type KitchenStep = {
  id: string;
  /** Gesto del paso. `drag-place` acepta arrastre magnético y tap como atajo. */
  gesture: GestureType;
  /** Ingrediente/herramienta que aparece en la bandeja (o que vuela al objeto). */
  ingredientEmoji: string;
  actionIcon: string;
  /** Objeto central grande de la escena (bowl, olla, sartén, plato, pan...). */
  sceneEmoji: string;
  /** Escena apilada (sándwich): los items se dibujan uno sobre otro. */
  stack?: boolean;
  /** Al completar, el ingrediente queda visible dentro del objeto central. */
  addsToScene?: boolean;
  shortLabel: string;
};

export type Dish = {
  id: DishId;
  title: string;
  emoji: string;
  steps: KitchenStep[];
};

export const STIR_CIRCLES_REQUIRED = 3;
export const STIR_TIME_MS = 2000;
export const SPRINKLE_TAPS_REQUIRED = 4;
export const CUT_SWIPES_REQUIRED = 3;
export const CUT_SWIPE_MIN_PX = 72;
export const FLY_DURATION_MS = 420;
export const RETURN_DURATION_MS = 300;
/** Margen extra de la zona magnética: 20% del objeto + piso en px. */
export const MAGNET_RATIO = 0.2;
export const MAGNET_MIN_PX = 24;
/** Movimiento máximo para tratar el gesto como tap y no como drag. */
export const TAP_SLOP_PX = 12;

export const DISHES: Dish[] = [
  {
    id: "salad",
    title: "Ensalada",
    emoji: "🥗",
    steps: [
      {
        id: "salad-lettuce",
        gesture: "drag-place",
        ingredientEmoji: "🥬",
        actionIcon: "👋",
        sceneEmoji: "🥣",
        addsToScene: true,
        shortLabel: "Lleva la lechuga al bowl",
      },
      {
        id: "salad-tomato",
        gesture: "drag-place",
        ingredientEmoji: "🍅",
        actionIcon: "👋",
        sceneEmoji: "🥣",
        addsToScene: true,
        shortLabel: "Lleva el tomate al bowl",
      },
      {
        id: "salad-stir",
        gesture: "stir",
        ingredientEmoji: "🥣",
        actionIcon: "🌀",
        sceneEmoji: "🥣",
        shortLabel: "Revuelve el bowl",
      },
      {
        id: "salad-serve",
        gesture: "drag-place",
        ingredientEmoji: "🥣",
        actionIcon: "👋",
        sceneEmoji: "🍽️",
        shortLabel: "Lleva el bowl al plato",
      },
      {
        id: "salad-sprinkle",
        gesture: "sprinkle",
        ingredientEmoji: "🧂",
        actionIcon: "✨",
        sceneEmoji: "🥗",
        shortLabel: "Salpica el plato",
      },
    ],
  },
  {
    id: "sandwich",
    title: "Sándwich",
    emoji: "🥪",
    steps: [
      {
        id: "sandwich-cut",
        gesture: "cut",
        ingredientEmoji: "🍞",
        actionIcon: "👉",
        sceneEmoji: "🍞",
        shortLabel: "Corta el pan",
      },
      {
        id: "sandwich-ham",
        gesture: "drag-place",
        ingredientEmoji: "🥓",
        actionIcon: "👋",
        sceneEmoji: "🍞",
        stack: true,
        addsToScene: true,
        shortLabel: "Lleva el jamón al pan",
      },
      {
        id: "sandwich-cheese",
        gesture: "drag-place",
        ingredientEmoji: "🧀",
        actionIcon: "👋",
        sceneEmoji: "🍞",
        stack: true,
        addsToScene: true,
        shortLabel: "Lleva el queso al pan",
      },
      {
        id: "sandwich-top",
        gesture: "drag-place",
        ingredientEmoji: "🍞",
        actionIcon: "👋",
        sceneEmoji: "🍞",
        stack: true,
        addsToScene: true,
        shortLabel: "Tapa el sándwich",
      },
    ],
  },
  {
    id: "pizza",
    title: "Pizza",
    emoji: "🍕",
    steps: [
      {
        id: "pizza-dough",
        gesture: "drag-place",
        ingredientEmoji: "🫓",
        actionIcon: "👋",
        sceneEmoji: "🍽️",
        addsToScene: true,
        shortLabel: "Lleva la masa a la bandeja",
      },
      {
        id: "pizza-sauce",
        gesture: "stir",
        ingredientEmoji: "🥫",
        actionIcon: "🌀",
        sceneEmoji: "🫓",
        shortLabel: "Revuelve la salsa",
      },
      {
        id: "pizza-cheese",
        gesture: "drag-place",
        ingredientEmoji: "🧀",
        actionIcon: "👋",
        sceneEmoji: "🫓",
        addsToScene: true,
        shortLabel: "Lleva el queso a la masa",
      },
      {
        id: "pizza-mushroom",
        gesture: "drag-place",
        ingredientEmoji: "🍄",
        actionIcon: "👋",
        sceneEmoji: "🫓",
        addsToScene: true,
        shortLabel: "Lleva el champiñón a la masa",
      },
      {
        id: "pizza-oregano",
        gesture: "sprinkle",
        ingredientEmoji: "🌿",
        actionIcon: "✨",
        sceneEmoji: "🍕",
        shortLabel: "Salpica el orégano",
      },
    ],
  },
  {
    id: "soup",
    title: "Sopa",
    emoji: "🍲",
    steps: [
      {
        id: "soup-carrot",
        gesture: "drag-place",
        ingredientEmoji: "🥕",
        actionIcon: "👋",
        sceneEmoji: "🍲",
        addsToScene: true,
        shortLabel: "Lleva la zanahoria a la olla",
      },
      {
        id: "soup-potato",
        gesture: "drag-place",
        ingredientEmoji: "🥔",
        actionIcon: "👋",
        sceneEmoji: "🍲",
        addsToScene: true,
        shortLabel: "Lleva la papa a la olla",
      },
      {
        id: "soup-stir",
        gesture: "stir",
        ingredientEmoji: "🍲",
        actionIcon: "🌀",
        sceneEmoji: "🍲",
        shortLabel: "Revuelve la olla",
      },
      {
        id: "soup-serve",
        gesture: "tap",
        ingredientEmoji: "🍜",
        actionIcon: "👆",
        sceneEmoji: "🍜",
        shortLabel: "Toca para servir",
      },
    ],
  },
  {
    id: "smoothie",
    title: "Batido",
    emoji: "🥤",
    steps: [
      {
        id: "smoothie-banana",
        gesture: "drag-place",
        ingredientEmoji: "🍌",
        actionIcon: "👋",
        sceneEmoji: "🥤",
        addsToScene: true,
        shortLabel: "Lleva el plátano al vaso",
      },
      {
        id: "smoothie-strawberry",
        gesture: "drag-place",
        ingredientEmoji: "🍓",
        actionIcon: "👋",
        sceneEmoji: "🥤",
        addsToScene: true,
        shortLabel: "Lleva la fresa al vaso",
      },
      {
        id: "smoothie-stir",
        gesture: "stir",
        ingredientEmoji: "🥤",
        actionIcon: "🌀",
        sceneEmoji: "🥤",
        shortLabel: "Revuelve el vaso",
      },
      {
        id: "smoothie-serve",
        gesture: "tap",
        ingredientEmoji: "🥤",
        actionIcon: "👆",
        sceneEmoji: "🥤",
        shortLabel: "Toca para servir",
      },
    ],
  },
  {
    id: "pancakes",
    title: "Panqueques",
    emoji: "🥞",
    steps: [
      {
        id: "pancakes-stir",
        gesture: "stir",
        ingredientEmoji: "🥣",
        actionIcon: "🌀",
        sceneEmoji: "🥣",
        shortLabel: "Revuelve la masa",
      },
      {
        id: "pancakes-pan",
        gesture: "drag-place",
        ingredientEmoji: "🥣",
        actionIcon: "👋",
        sceneEmoji: "🍳",
        shortLabel: "Lleva la masa a la sartén",
      },
      {
        id: "pancakes-flip",
        gesture: "tap",
        ingredientEmoji: "🥞",
        actionIcon: "👆",
        sceneEmoji: "🥞",
        shortLabel: "Toca para voltear",
      },
      {
        id: "pancakes-honey",
        gesture: "sprinkle",
        ingredientEmoji: "🍯",
        actionIcon: "✨",
        sceneEmoji: "🥞",
        shortLabel: "Salpica la miel",
      },
    ],
  },
  {
    id: "cookies",
    title: "Galletas",
    emoji: "🍪",
    steps: [
      {
        id: "cookies-cut",
        gesture: "cut",
        ingredientEmoji: "🍪",
        actionIcon: "👉",
        sceneEmoji: "🍪",
        shortLabel: "Corta la masa",
      },
      {
        id: "cookies-chips",
        gesture: "drag-place",
        ingredientEmoji: "🍫",
        actionIcon: "👋",
        sceneEmoji: "🍪",
        addsToScene: true,
        shortLabel: "Lleva el chocolate a la masa",
      },
      {
        id: "cookies-sugar",
        gesture: "sprinkle",
        ingredientEmoji: "🍬",
        actionIcon: "✨",
        sceneEmoji: "🍪",
        shortLabel: "Salpica el azúcar",
      },
      {
        id: "cookies-bake",
        gesture: "tap",
        ingredientEmoji: "🍪",
        actionIcon: "👆",
        sceneEmoji: "🍪",
        shortLabel: "Toca para hornear",
      },
    ],
  },
  {
    id: "pasta",
    title: "Pasta",
    emoji: "🍝",
    steps: [
      {
        id: "pasta-noodles",
        gesture: "drag-place",
        ingredientEmoji: "🍝",
        actionIcon: "👋",
        sceneEmoji: "🍽️",
        addsToScene: true,
        shortLabel: "Lleva la pasta al plato",
      },
      {
        id: "pasta-sauce",
        gesture: "stir",
        ingredientEmoji: "🥫",
        actionIcon: "🌀",
        sceneEmoji: "🥣",
        shortLabel: "Revuelve la salsa",
      },
      {
        id: "pasta-cheese",
        gesture: "drag-place",
        ingredientEmoji: "🧀",
        actionIcon: "👋",
        sceneEmoji: "🍝",
        addsToScene: true,
        shortLabel: "Lleva el queso a la pasta",
      },
      {
        id: "pasta-serve",
        gesture: "tap",
        ingredientEmoji: "🍝",
        actionIcon: "👆",
        sceneEmoji: "🍝",
        shortLabel: "Toca para servir",
      },
    ],
  },
  {
    id: "eggs",
    title: "Huevos",
    emoji: "🍳",
    steps: [
      {
        id: "eggs-crack",
        gesture: "tap",
        ingredientEmoji: "🥚",
        actionIcon: "👆",
        sceneEmoji: "🥚",
        shortLabel: "Toca para cascar el huevo",
      },
      {
        id: "eggs-stir",
        gesture: "stir",
        ingredientEmoji: "🍳",
        actionIcon: "🌀",
        sceneEmoji: "🍳",
        shortLabel: "Revuelve la sartén",
      },
      {
        id: "eggs-salt",
        gesture: "sprinkle",
        ingredientEmoji: "🧂",
        actionIcon: "✨",
        sceneEmoji: "🍳",
        shortLabel: "Salpica la sal",
      },
      {
        id: "eggs-serve",
        gesture: "tap",
        ingredientEmoji: "🍳",
        actionIcon: "👆",
        sceneEmoji: "🍳",
        shortLabel: "Toca para servir",
      },
    ],
  },
  {
    id: "fruit",
    title: "Fruta",
    emoji: "🍉",
    steps: [
      {
        id: "fruit-cut",
        gesture: "cut",
        ingredientEmoji: "🍉",
        actionIcon: "👉",
        sceneEmoji: "🍉",
        shortLabel: "Corta la sandía",
      },
      {
        id: "fruit-melon",
        gesture: "drag-place",
        ingredientEmoji: "🍉",
        actionIcon: "👋",
        sceneEmoji: "🥣",
        addsToScene: true,
        shortLabel: "Lleva la sandía al bowl",
      },
      {
        id: "fruit-grapes",
        gesture: "drag-place",
        ingredientEmoji: "🍇",
        actionIcon: "👋",
        sceneEmoji: "🥣",
        addsToScene: true,
        shortLabel: "Lleva las uvas al bowl",
      },
      {
        id: "fruit-serve",
        gesture: "tap",
        ingredientEmoji: "🍨",
        actionIcon: "👆",
        sceneEmoji: "🍨",
        shortLabel: "Toca para servir",
      },
    ],
  },
];

export function getDishById(id: DishId): Dish {
  return DISHES.find((d) => d.id === id) ?? DISHES[0];
}

/** ¿El paso usa la bandeja de ingredientes (drag magnético + tap de atajo)? */
export function usesTray(step: KitchenStep): boolean {
  return step.gesture === "drag-place" || step.gesture === "tap-place";
}

/** Zona magnética: rect del objeto central inflado ~20% (mínimo 24px por lado). */
export function isInMagnetZone(
  rect: { left: number; top: number; right: number; bottom: number; width: number; height: number },
  x: number,
  y: number,
): boolean {
  const mx = Math.max(rect.width * MAGNET_RATIO, MAGNET_MIN_PX);
  const my = Math.max(rect.height * MAGNET_RATIO, MAGNET_MIN_PX);
  return (
    x >= rect.left - mx &&
    x <= rect.right + mx &&
    y >= rect.top - my &&
    y <= rect.bottom + my
  );
}
