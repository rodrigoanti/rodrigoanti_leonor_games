export type KitchenScreen = "menu" | "cooking" | "done";

export type GestureType = "tap-place" | "stir" | "sprinkle" | "cut" | "tap";

export type TargetZone = "bowl" | "plate" | "sandwich" | "bread";

export type SceneId = "bowl" | "pour" | "plate" | "bread" | "sandwich";

export type KitchenStep = {
  id: string;
  gesture: GestureType;
  ingredientEmoji: string;
  actionIcon: string;
  targetZone: TargetZone;
  scene: SceneId;
  shortLabel: string;
};

export type DishId = "salad" | "sandwich";

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

export const DISHES: Dish[] = [
  {
    id: "salad",
    title: "Ensalada",
    emoji: "🥗",
    steps: [
      {
        id: "salad-lettuce",
        gesture: "tap-place",
        ingredientEmoji: "🥬",
        actionIcon: "👆",
        targetZone: "bowl",
        scene: "bowl",
        shortLabel: "Toca la lechuga",
      },
      {
        id: "salad-tomato",
        gesture: "tap-place",
        ingredientEmoji: "🍅",
        actionIcon: "👆",
        targetZone: "bowl",
        scene: "bowl",
        shortLabel: "Toca el tomate",
      },
      {
        id: "salad-stir",
        gesture: "stir",
        ingredientEmoji: "🥣",
        actionIcon: "🌀",
        targetZone: "bowl",
        scene: "bowl",
        shortLabel: "Revuelve el bowl",
      },
      {
        id: "salad-serve",
        gesture: "tap-place",
        ingredientEmoji: "🥗",
        actionIcon: "👆",
        targetZone: "plate",
        scene: "pour",
        shortLabel: "Toca el bowl",
      },
      {
        id: "salad-sprinkle",
        gesture: "sprinkle",
        ingredientEmoji: "🧂",
        actionIcon: "✨",
        targetZone: "plate",
        scene: "plate",
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
        targetZone: "bread",
        scene: "bread",
        shortLabel: "Corta el pan",
      },
      {
        id: "sandwich-ham",
        gesture: "tap-place",
        ingredientEmoji: "🥓",
        actionIcon: "👆",
        targetZone: "sandwich",
        scene: "sandwich",
        shortLabel: "Toca el jamón",
      },
      {
        id: "sandwich-cheese",
        gesture: "tap-place",
        ingredientEmoji: "🧀",
        actionIcon: "👆",
        targetZone: "sandwich",
        scene: "sandwich",
        shortLabel: "Toca el queso",
      },
      {
        id: "sandwich-tap",
        gesture: "tap",
        ingredientEmoji: "🍞",
        actionIcon: "👆",
        targetZone: "sandwich",
        scene: "sandwich",
        shortLabel: "Tapa el sándwich",
      },
    ],
  },
];

export function getDishById(id: DishId): Dish {
  return DISHES.find((d) => d.id === id) ?? DISHES[0];
}
