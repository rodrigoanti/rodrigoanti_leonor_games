"use client";

import { TrashIcon } from "@/components/ToolIcons";

type ClearButtonProps = {
  pending: boolean;
  onClear: () => void;
};

export default function ClearButton({ pending, onClear }: ClearButtonProps) {
  return (
    <button
      type="button"
      className={`paint-clear-btn${pending ? " is-pending" : ""}`}
      aria-label={pending ? "Confirmar limpiar lienzo" : "Limpiar lienzo"}
      onClick={onClear}
    >
      <TrashIcon size={22} />
    </button>
  );
}
