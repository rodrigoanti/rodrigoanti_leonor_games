"use client";

import {
  BrushIcon,
  EraserIcon,
  FillIcon,
  StampIcon,
} from "@/components/ToolIcons";
import type { Tool } from "@/lib/drawing";

type ToolbarProps = {
  selectedTool: Tool;
  onToolChange: (tool: Tool) => void;
};

const TOOLS: { id: Tool; label: string; Icon: typeof BrushIcon }[] = [
  { id: "brush", label: "Pincel", Icon: BrushIcon },
  { id: "eraser", label: "Goma", Icon: EraserIcon },
  { id: "fill", label: "Rellenar", Icon: FillIcon },
  { id: "stamp", label: "Sello", Icon: StampIcon },
];

export default function Toolbar({
  selectedTool,
  onToolChange,
}: ToolbarProps) {
  return (
    <div className="paint-tool-grid">
      {TOOLS.map(({ id, label, Icon }) => (
        <button
          key={id}
          type="button"
          className={`paint-tool-btn${selectedTool === id ? " is-active" : ""}`}
          aria-label={label}
          aria-pressed={selectedTool === id}
          onClick={() => onToolChange(id)}
        >
          <Icon />
          <span className="paint-tool-label">{label}</span>
        </button>
      ))}
    </div>
  );
}
