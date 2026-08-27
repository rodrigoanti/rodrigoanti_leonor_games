"use client";

import { useState } from "react";

export const COLORS = [
  { hex: "#FF6B6B", label: "Rojo" },
  { hex: "#FF922B", label: "Naranja" },
  { hex: "#FFD43B", label: "Amarillo" },
  { hex: "#69DB7C", label: "Verde" },
  { hex: "#4DABF7", label: "Azul" },
  { hex: "#9775FA", label: "Morado" },
  { hex: "#F783AC", label: "Rosa" },
  { hex: "#212529", label: "Negro" },
] as const;

type ColorPaletteProps = {
  selectedColor: string;
  onColorChange: (color: string) => void;
};

export default function ColorPalette({
  selectedColor,
  onColorChange,
}: ColorPaletteProps) {
  const [popColor, setPopColor] = useState<string | null>(null);

  const handleSelect = (hex: string) => {
    onColorChange(hex);
    setPopColor(hex);
    setTimeout(() => setPopColor(null), 200);
  };

  return (
    <div className="paint-color-palette">
      {COLORS.map(({ hex, label }) => (
        <button
          key={hex}
          type="button"
          className={`paint-color-btn${selectedColor === hex ? " is-active" : ""}${popColor === hex ? " is-pop" : ""}`}
          style={{ backgroundColor: hex }}
          aria-label={label}
          aria-pressed={selectedColor === hex}
          onClick={() => handleSelect(hex)}
        />
      ))}
    </div>
  );
}
