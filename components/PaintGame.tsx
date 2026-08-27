"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrushSizePicker from "@/components/BrushSizePicker";
import ClearButton from "@/components/ClearButton";
import ColorPalette from "@/components/ColorPalette";
import PaintCanvas, { type PaintCanvasRef } from "@/components/PaintCanvas";
import Toolbar from "@/components/Toolbar";
import {
  brushSizeValue,
  type BrushSizeId,
  type Tool,
} from "@/lib/drawing";

export default function PaintGame() {
  const canvasRef = useRef<PaintCanvasRef>(null);
  const [color, setColor] = useState("#FF6B6B");
  const [tool, setTool] = useState<Tool>("brush");
  const [brushSizeId, setBrushSizeId] = useState<BrushSizeId>("m");
  const [clearCount, setClearCount] = useState(0);
  const [showClearBanner, setShowClearBanner] = useState(false);
  const clearTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const brushSize = brushSizeValue(brushSizeId);

  const resetClear = useCallback(() => {
    setClearCount(0);
    setShowClearBanner(false);
    if (clearTimeoutRef.current) {
      clearTimeout(clearTimeoutRef.current);
      clearTimeoutRef.current = null;
    }
  }, []);

  const handleClearRequest = useCallback(() => {
    if (clearCount === 0) {
      setClearCount(1);
      setShowClearBanner(true);
      clearTimeoutRef.current = setTimeout(resetClear, 3000);
    } else {
      canvasRef.current?.clear();
      resetClear();
    }
  }, [clearCount, resetClear]);

  useEffect(() => {
    return () => {
      if (clearTimeoutRef.current) {
        clearTimeout(clearTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-start">
          <Link href="/" className="back-link" aria-label="Volver al hub">
            ← Volver
          </Link>
          <div className="app-title">Pinta Leo</div>
        </div>
        <ClearButton pending={clearCount > 0} onClear={handleClearRequest} />
      </header>

      <main className="paint-main">
        <div className="paint-canvas-card">
          <PaintCanvas
            ref={canvasRef}
            color={color}
            tool={tool}
            brushSize={brushSize}
          />
        </div>
        <div className="paint-panel paint-panel--tools">
          <Toolbar selectedTool={tool} onToolChange={setTool} />
          <BrushSizePicker
            selectedSize={brushSizeId}
            color={color}
            onSizeChange={setBrushSizeId}
          />
        </div>
        <div className="paint-panel paint-panel--colors">
          <ColorPalette selectedColor={color} onColorChange={setColor} />
        </div>
        {showClearBanner && (
          <div className="paint-banner">
            <div className="paint-banner-message">
              Toca otra vez el ícono para borrar todo el dibujo
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
