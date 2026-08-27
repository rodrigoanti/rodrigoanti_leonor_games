export type KitchenScreen = "menu" | "cooking" | "done";

export type GestureType = "drag" | "stir" | "sprinkle" | "cut" | "tap";

export type TargetZone = "bowl" | "plate" | "sandwich" | "bread";

export type KitchenStep = {
  id: string;
  gesture: GestureType;
  ingredientEmoji: string;
  actionIcon: string;
  targetZone: TargetZone;
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
export const DRAG_ZONE_MIN_PX = 72;

export const DISHES: Dish[] = [
  {
    id: "salad",
    title: "Ensalada",
    emoji: "🥗",
    steps: [
      {
        id: "salad-lettuce",
        gesture: "drag",
        ingredientEmoji: "🥬",
        actionIcon: "👆",
        targetZone: "bowl",
        shortLabel: "Lechuga al bowl",
      },
      {
        id: "salad-tomato",
        gesture: "drag",
        ingredientEmoji: "🍅",
        actionIcon: "👆",
        targetZone: "bowl",
        shortLabel: "Tomate al bowl",
      },
      {
        id: "salad-stir",
        gesture: "stir",
        ingredientEmoji: "🥣",
        actionIcon: "🔄",
        targetZone: "bowl",
        shortLabel: "Revolver",
      },
      {
        id: "salad-serve",
        gesture: "drag",
        ingredientEmoji: "🥗",
        actionIcon: "👆",
        targetZone: "plate",
        shortLabel: "Al plato",
      },
      {
        id: "salad-sprinkle",
        gesture: "sprinkle",
        ingredientEmoji: "🧂",
        actionIcon: "✨",
        targetZone: "plate",
        shortLabel: "Salpicar",
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
        actionIcon: "🔪",
        targetZone: "bread",
        shortLabel: "Cortar pan",
      },
      {
        id: "sandwich-ham",
        gesture: "drag",
        ingredientEmoji: "🥓",
        actionIcon: "👆",
        targetZone: "sandwich",
        shortLabel: "Jamón",
      },
      {
        id: "sandwich-cheese",
        gesture: "drag",
        ingredientEmoji: "🧀",
        actionIcon: "👆",
        targetZone: "sandwich",
        shortLabel: "Queso",
      },
      {
        id: "sandwich-tap",
        gesture: "tap",
        ingredientEmoji: "🍞",
        actionIcon: "👇",
        targetZone: "sandwich",
        shortLabel: "Tapar",
      },
    ],
  },
];

export function getDishById(id: DishId): Dish {
  return DISHES.find((d) => d.id === id) ?? DISHES[0];
}
