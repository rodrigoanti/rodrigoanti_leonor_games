"use client";

import { BRUSH_SIZES, type BrushSizeId } from "@/lib/drawing";

type BrushSizePickerProps = {
  selectedSize: BrushSizeId;
  color: string;
  onSizeChange: (size: BrushSizeId) => void;
};

export default function BrushSizePicker({
  selectedSize,
  color,
  onSizeChange,
}: BrushSizePickerProps) {
  return (
    <div className="paint-size-picker">
      {BRUSH_SIZES.map(({ id, label, value }) => (
        <button
          key={id}
          type="button"
          className={`paint-size-btn${selectedSize === id ? " is-active" : ""}`}
          aria-label={label}
          aria-pressed={selectedSize === id}
          onClick={() => onSizeChange(id)}
        >
          <span
            className="paint-size-dot"
            style={{
              width: `${Math.max(8, value * 0.55)}px`,
              height: `${Math.max(8, value * 0.55)}px`,
              backgroundColor: color,
            }}
          />
        </button>
      ))}
    </div>
  );
}
