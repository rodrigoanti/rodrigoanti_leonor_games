export type Tool = "brush" | "eraser" | "fill" | "stamp";

export const BRUSH_SIZES = [
  { id: "s", label: "Pequeño", value: 12 },
  { id: "m", label: "Mediano", value: 24 },
  { id: "l", label: "Grande", value: 36 },
  { id: "xl", label: "Extra", value: 52 },
] as const;

export type BrushSizeId = (typeof BRUSH_SIZES)[number]["id"];

export function brushSizeValue(id: BrushSizeId): number {
  return BRUSH_SIZES.find((s) => s.id === id)?.value ?? 24;
}
