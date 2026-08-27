"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { floodFill } from "@/lib/floodFill";
import type { Tool } from "@/lib/drawing";

export type PaintCanvasRef = {
  clear: () => void;
};

type PaintCanvasProps = {
  color: string;
  tool: Tool;
  brushSize: number;
};

const PaintCanvas = forwardRef<PaintCanvasRef, PaintCanvasProps>(
  function PaintCanvas({ color, tool, brushSize }, ref) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawing = useRef(false);
    const lastPoint = useRef<{ x: number; y: number } | null>(null);

    const resizeCanvas = useCallback(() => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      const dpr = window.devicePixelRatio || 1;
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);
    }, []);

    useEffect(() => {
      resizeCanvas();

      const canvas = canvasRef.current;
      if (!canvas) return;

      const observer = new ResizeObserver(resizeCanvas);
      observer.observe(canvas.parentElement!);

      return () => observer.disconnect();
    }, [resizeCanvas]);

    const getPoint = (e: React.PointerEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas) return null;

      const rect = canvas.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const drawLine = (
      from: { x: number; y: number },
      to: { x: number; y: number }
    ) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (tool === "eraser") {
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = brushSize * 1.15;
      } else {
        ctx.strokeStyle = color;
        ctx.lineWidth = brushSize;
      }

      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      ctx.stroke();
    };

    const drawStamp = (point: { x: number; y: number }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(point.x, point.y, brushSize / 2, 0, Math.PI * 2);
      ctx.fill();
    };

    const applyFill = (point: { x: number; y: number }) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const imageData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      );
      floodFill(
        imageData,
        point.x * dpr,
        point.y * dpr,
        color
      );
      ctx.putImageData(imageData, 0, 0);
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      const point = getPoint(e);
      if (!point) return;

      if (tool === "fill") {
        applyFill(point);
        return;
      }

      if (tool === "stamp") {
        drawStamp(point);
        return;
      }

      isDrawing.current = true;
      lastPoint.current = point;
      e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
      e.preventDefault();
      if (!isDrawing.current || tool === "fill" || tool === "stamp") return;

      const point = getPoint(e);
      if (!point || !lastPoint.current) return;

      drawLine(lastPoint.current, point);
      lastPoint.current = point;
    };

    const stopDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (isDrawing.current) {
        isDrawing.current = false;
        lastPoint.current = null;
        if (e.currentTarget.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      }
    };

    useImperativeHandle(ref, () => ({
      clear: () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
      },
    }));

    const cursor =
      tool === "fill" || tool === "stamp" ? "pointer" : "crosshair";

    return (
      <canvas
        ref={canvasRef}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          touchAction: "none",
          cursor,
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={stopDrawing}
        onPointerLeave={stopDrawing}
        onPointerCancel={stopDrawing}
      />
    );
  }
);

export default PaintCanvas;
