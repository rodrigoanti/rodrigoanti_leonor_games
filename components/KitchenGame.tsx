"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import SoundToggle from "@/components/SoundToggle";
import { playSound, unlockAudio } from "@/lib/audio";
import {
  CUT_SWIPE_MIN_PX,
  CUT_SWIPES_REQUIRED,
  DISHES,
  SPRINKLE_TAPS_REQUIRED,
  STIR_CIRCLES_REQUIRED,
  STIR_TIME_MS,
  type Dish,
  type KitchenScreen,
  type KitchenStep,
  type TargetZone,
} from "@/lib/kitchen";

type Point = { x: number; y: number };

function isPointInRect(point: Point, rect: DOMRect): boolean {
  return (
    point.x >= rect.left &&
    point.x <= rect.right &&
    point.y >= rect.top &&
    point.y <= rect.bottom
  );
}

function getZoneRect(
  zone: TargetZone,
  refs: Record<TargetZone, HTMLDivElement | null>,
): DOMRect | null {
  const el = refs[zone];
  if (!el) {
    return null;
  }
  return el.getBoundingClientRect();
}

export default function KitchenGame() {
  const [screen, setScreen] = useState<KitchenScreen>("menu");
  const [dish, setDish] = useState<Dish | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [bowlItems, setBowlItems] = useState<string[]>([]);
  const [plateReady, setPlateReady] = useState(false);
  const [sandwichLayers, setSandwichLayers] = useState<string[]>([]);
  const [breadCut, setBreadCut] = useState(false);
  const [sprinkleCount, setSprinkleCount] = useState(0);
  const [cutCount, setCutCount] = useState(0);
  const [cutLines, setCutLines] = useState<number[]>([]);
  const [sprinkleParticles, setSprinkleParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [dragging, setDragging] = useState<{
    emoji: string;
    x: number;
    y: number;
    originX: number;
    originY: number;
  } | null>(null);
  const [dragReturning, setDragReturning] = useState(false);

  const bowlRef = useRef<HTMLDivElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const sandwichRef = useRef<HTMLDivElement>(null);
  const breadRef = useRef<HTMLDivElement>(null);
  const stirRef = useRef<HTMLDivElement>(null);
  const zoneRefs = useRef<Record<TargetZone, HTMLDivElement | null>>({
    bowl: null,
    plate: null,
    sandwich: null,
    bread: null,
  });
  const stirAngleRef = useRef(0);
  const stirTotalRef = useRef(0);
  const stirStartRef = useRef<number | null>(null);
  const cutStartRef = useRef<Point | null>(null);
  const cutActiveRef = useRef(false);
  const particleIdRef = useRef(0);

  const currentStep: KitchenStep | null =
    dish && screen === "cooking" ? dish.steps[stepIndex] : null;

  const resetCookingState = useCallback(() => {
    setStepIndex(0);
    setBowlItems([]);
    setPlateReady(false);
    setSandwichLayers([]);
    setBreadCut(false);
    setSprinkleCount(0);
    setCutCount(0);
    setCutLines([]);
    setSprinkleParticles([]);
    setDragging(null);
    setDragReturning(false);
    stirAngleRef.current = 0;
    stirTotalRef.current = 0;
    stirStartRef.current = null;
    cutStartRef.current = null;
    cutActiveRef.current = false;
  }, []);

  const selectDish = useCallback(
    (selected: Dish) => {
      unlockAudio();
      playSound("tap");
      setDish(selected);
      resetCookingState();
      setScreen("cooking");
    },
    [resetCookingState],
  );

  const completeStep = useCallback(() => {
    playSound("correct");
    if (!dish) {
      return;
    }
    if (stepIndex >= dish.steps.length - 1) {
      playSound("victory");
      setScreen("done");
      return;
    }
    setStepIndex((i) => i + 1);
    setSprinkleCount(0);
    setCutCount(0);
    setCutLines([]);
    stirAngleRef.current = 0;
    stirTotalRef.current = 0;
    stirStartRef.current = null;
  }, [dish, stepIndex]);

  const applyStepVisual = useCallback(
    (step: KitchenStep) => {
      if (step.id === "salad-lettuce") {
        setBowlItems((items) => [...items, "🥬"]);
      } else if (step.id === "salad-tomato") {
        setBowlItems((items) => [...items, "🍅"]);
      } else if (step.id === "salad-serve") {
        setPlateReady(true);
        setBowlItems([]);
      } else if (step.id === "sandwich-ham") {
        setSandwichLayers((layers) => [...layers, "🥓"]);
      } else if (step.id === "sandwich-cheese") {
        setSandwichLayers((layers) => [...layers, "🧀"]);
      } else if (step.id === "sandwich-cut") {
        setBreadCut(true);
      }
    },
    [],
  );

  const handleDragComplete = useCallback(
    (step: KitchenStep) => {
      playSound("drop");
      applyStepVisual(step);
      completeStep();
    },
    [applyStepVisual, completeStep],
  );

  const startDrag = useCallback(
    (
      e: ReactPointerEvent,
      emoji: string,
      originX: number,
      originY: number,
    ) => {
      if (!currentStep || currentStep.gesture !== "drag") {
        return;
      }
      unlockAudio();
      e.currentTarget.setPointerCapture(e.pointerId);
      setDragReturning(false);
      setDragging({
        emoji,
        x: e.clientX,
        y: e.clientY,
        originX,
        originY,
      });
    },
    [currentStep],
  );

  const moveDrag = useCallback(
    (e: ReactPointerEvent) => {
      if (!dragging) {
        return;
      }
      setDragging((d) =>
        d ? { ...d, x: e.clientX, y: e.clientY } : null,
      );
    },
    [dragging],
  );

  const endDrag = useCallback(
    (step: KitchenStep) => {
      if (!dragging) {
        return;
      }
      const point = { x: dragging.x, y: dragging.y };
      const rect = getZoneRect(step.targetZone, zoneRefs.current);
      if (rect && isPointInRect(point, rect)) {
        setDragging(null);
        handleDragComplete(step);
        return;
      }
      setDragReturning(true);
      setDragging(null);
      setTimeout(() => setDragReturning(false), 400);
    },
    [dragging, handleDragComplete],
  );

  const handleStirPointer = useCallback(
    (e: ReactPointerEvent) => {
      if (!currentStep || currentStep.gesture !== "stir") {
        return;
      }
      const bowl = stirRef.current;
      if (!bowl) {
        return;
      }
      unlockAudio();
      const rect = bowl.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx);

      if (stirStartRef.current === null) {
        stirStartRef.current = Date.now();
        stirAngleRef.current = angle;
        return;
      }

      let delta = angle - stirAngleRef.current;
      if (delta > Math.PI) {
        delta -= 2 * Math.PI;
      }
      if (delta < -Math.PI) {
        delta += 2 * Math.PI;
      }
      stirAngleRef.current = angle;
      stirTotalRef.current += Math.abs(delta) / (2 * Math.PI);
      playSound("stir");

      const elapsed = Date.now() - stirStartRef.current;
      if (
        stirTotalRef.current >= STIR_CIRCLES_REQUIRED ||
        elapsed >= STIR_TIME_MS
      ) {
        stirTotalRef.current = 0;
        stirStartRef.current = null;
        completeStep();
      }
    },
    [currentStep, completeStep],
  );

  const handleSprinkle = useCallback(
    (e: ReactPointerEvent) => {
      if (!currentStep || currentStep.gesture !== "sprinkle") {
        return;
      }
      unlockAudio();
      playSound("sprinkle");
      const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      const id = particleIdRef.current++;
      setSprinkleParticles((p) => [...p, { id, x, y }]);
      setTimeout(() => {
        setSprinkleParticles((p) => p.filter((item) => item.id !== id));
      }, 700);
      const next = sprinkleCount + 1;
      setSprinkleCount(next);
      if (next >= SPRINKLE_TAPS_REQUIRED) {
        completeStep();
      }
    },
    [currentStep, sprinkleCount, completeStep],
  );

  const handleCutPointerDown = useCallback(
    (e: ReactPointerEvent) => {
      if (!currentStep || currentStep.gesture !== "cut") {
        return;
      }
      unlockAudio();
      e.currentTarget.setPointerCapture(e.pointerId);
      cutStartRef.current = { x: e.clientX, y: e.clientY };
      cutActiveRef.current = true;
    },
    [currentStep],
  );

  const handleCutPointerMove = useCallback((e: ReactPointerEvent) => {
    if (!cutActiveRef.current || !cutStartRef.current) {
      return;
    }
    const dx = e.clientX - cutStartRef.current.x;
    if (Math.abs(dx) < CUT_SWIPE_MIN_PX) {
      return;
    }
    cutActiveRef.current = false;
    cutStartRef.current = null;
    playSound("chop");
    const linePct = 20 + cutCount * 25;
    setCutLines((lines) => [...lines, linePct]);
    const next = cutCount + 1;
    setCutCount(next);
    if (next >= CUT_SWIPES_REQUIRED) {
      completeStep();
    }
  }, [cutCount, completeStep]);

  const handleCutPointerUp = useCallback(() => {
    cutActiveRef.current = false;
    cutStartRef.current = null;
  }, []);

  const handleTap = useCallback(() => {
    if (!currentStep || currentStep.gesture !== "tap") {
      return;
    }
    unlockAudio();
    playSound("tap");
    completeStep();
  }, [currentStep, completeStep]);

  const cookAnother = useCallback(() => {
    playSound("tap");
    resetCookingState();
    setScreen("menu");
    setDish(null);
  }, [resetCookingState]);

  useEffect(() => {
    zoneRefs.current.bowl = bowlRef.current;
    zoneRefs.current.plate = plateRef.current;
    zoneRefs.current.sandwich = sandwichRef.current;
    zoneRefs.current.bread = breadRef.current;
  });

  const renderIngredientSource = (
    emoji: string,
    step: KitchenStep,
    className: string,
  ) => {
    const show =
      step.gesture === "drag" && step.ingredientEmoji === emoji;
    if (!show) {
      return null;
    }
    return (
      <button
        type="button"
        className={`kitchen-ingredient ${className} ${
          dragReturning ? "kitchen-ingredient--return" : ""
        }`}
        aria-label={step.shortLabel}
        onPointerDown={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          startDrag(
            e,
            emoji,
            rect.left + rect.width / 2,
            rect.top + rect.height / 2,
          );
        }}
        onPointerMove={moveDrag}
        onPointerUp={() => endDrag(step)}
        onPointerCancel={() => endDrag(step)}
      >
        <span aria-hidden="true">{emoji}</span>
      </button>
    );
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="app-header-start">
          <Link href="/" className="back-link" aria-label="Volver al hub">
            ← Volver
          </Link>
          <div className="app-title">Cocina Leo</div>
        </div>
        <SoundToggle />
      </header>

      <div className="kitchen-main">
        {screen === "menu" && (
          <>
            <p className="kitchen-prompt">¿Qué quieres cocinar?</p>
            <div className="kitchen-menu" role="group" aria-label="Platos">
              {DISHES.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="kitchen-dish-card"
                  onClick={() => selectDish(item)}
                  aria-label={`Cocinar ${item.title}`}
                >
                  <span className="kitchen-dish-emoji" aria-hidden="true">
                    {item.emoji}
                  </span>
                  <span className="kitchen-dish-name">{item.title}</span>
                </button>
              ))}
            </div>
          </>
        )}

        {screen === "cooking" && dish && currentStep && (
          <div className="kitchen-cooking">
            <div
              className="kitchen-steps"
              role="list"
              aria-label="Pasos de la receta"
            >
              {dish.steps.map((step, index) => (
                <div
                  key={step.id}
                  role="listitem"
                  className={`kitchen-step-dot ${
                    index < stepIndex ? "kitchen-step-dot--done" : ""
                  } ${index === stepIndex ? "kitchen-step-dot--active" : ""}`}
                  aria-hidden="true"
                >
                  <span>{step.actionIcon}</span>
                </div>
              ))}
            </div>

            <div className="kitchen-action-hint" aria-live="polite">
              <span className="kitchen-action-icon" aria-hidden="true">
                {currentStep.actionIcon}
              </span>
              <span className="kitchen-action-label">
                {currentStep.shortLabel}
              </span>
            </div>

            <div className="kitchen-workspace">
              {dish.id === "salad" && (
                <>
                  <div
                    ref={bowlRef}
                    className={`kitchen-zone kitchen-zone--bowl ${
                      currentStep.targetZone === "bowl" &&
                      currentStep.gesture !== "drag"
                        ? "kitchen-zone--highlight"
                        : ""
                    }`}
                    onPointerMove={
                      currentStep.gesture === "stir"
                        ? handleStirPointer
                        : undefined
                    }
                  >
                    <div ref={stirRef} className="kitchen-bowl-inner">
                      <span className="kitchen-bowl-emoji" aria-hidden="true">
                        🥣
                      </span>
                      <div className="kitchen-bowl-items">
                        {bowlItems.map((item, i) => (
                          <span key={i} aria-hidden="true">{item}</span>
                        ))}
                      </div>
                      {currentStep.gesture === "stir" && (
                        <span
                          className="kitchen-stir-hint"
                          aria-hidden="true"
                        >
                          🔄
                        </span>
                      )}
                    </div>
                  </div>

                  <div
                    ref={plateRef}
                    className={`kitchen-zone kitchen-zone--plate ${
                      currentStep.targetZone === "plate"
                        ? "kitchen-zone--highlight"
                        : ""
                    }`}
                    onPointerDown={
                      currentStep.gesture === "sprinkle"
                        ? handleSprinkle
                        : undefined
                    }
                  >
                    <span className="kitchen-plate-emoji" aria-hidden="true">
                      {plateReady ? "🥗" : "🍽️"}
                    </span>
                    {sprinkleParticles.map((p) => (
                      <span
                        key={p.id}
                        className="kitchen-sprinkle-particle"
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        aria-hidden="true"
                      >
                        ✨
                      </span>
                    ))}
                    {currentStep.gesture === "sprinkle" && (
                      <span className="kitchen-shaker" aria-hidden="true">
                        🧂
                      </span>
                    )}
                  </div>

                  {renderIngredientSource(
                    "🥬",
                    currentStep,
                    "kitchen-ingredient--lettuce",
                  )}
                  {renderIngredientSource(
                    "🍅",
                    currentStep,
                    "kitchen-ingredient--tomato",
                  )}
                  {currentStep.id === "salad-serve" && (
                    <button
                      type="button"
                      className={`kitchen-ingredient kitchen-ingredient--salad ${
                        dragReturning ? "kitchen-ingredient--return" : ""
                      }`}
                      aria-label={currentStep.shortLabel}
                      onPointerDown={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        startDrag(
                          e,
                          "🥗",
                          rect.left + rect.width / 2,
                          rect.top + rect.height / 2,
                        );
                      }}
                      onPointerMove={moveDrag}
                      onPointerUp={() => endDrag(currentStep)}
                      onPointerCancel={() => endDrag(currentStep)}
                    >
                      <span aria-hidden="true">🥗</span>
                    </button>
                  )}
                </>
              )}

              {dish.id === "sandwich" && (
                <>
                  <div
                    ref={breadRef}
                    className={`kitchen-zone kitchen-zone--bread ${
                      currentStep.targetZone === "bread"
                        ? "kitchen-zone--highlight"
                        : ""
                    }`}
                    onPointerDown={handleCutPointerDown}
                    onPointerMove={handleCutPointerMove}
                    onPointerUp={handleCutPointerUp}
                    onPointerCancel={handleCutPointerUp}
                  >
                    <span
                      className={`kitchen-bread-emoji ${
                        breadCut ? "kitchen-bread-emoji--cut" : ""
                      }`}
                      aria-hidden="true"
                    >
                      🍞
                    </span>
                    {cutLines.map((line, i) => (
                      <span
                        key={i}
                        className="kitchen-cut-line"
                        style={{ top: `${line}%` }}
                        aria-hidden="true"
                      />
                    ))}
                  </div>

                  <div
                    ref={sandwichRef}
                    className={`kitchen-zone kitchen-zone--sandwich ${
                      currentStep.targetZone === "sandwich"
                        ? "kitchen-zone--highlight"
                        : ""
                    }`}
                    onClick={
                      currentStep.gesture === "tap" ? handleTap : undefined
                    }
                  >
                    <div className="kitchen-sandwich-stack">
                      <span aria-hidden="true">🍞</span>
                      {sandwichLayers.map((layer, i) => (
                        <span key={i} aria-hidden="true">{layer}</span>
                      ))}
                      {currentStep.gesture === "tap" && (
                        <span className="kitchen-tap-hint" aria-hidden="true">
                          🍞
                        </span>
                      )}
                    </div>
                  </div>

                  {renderIngredientSource(
                    "🥓",
                    currentStep,
                    "kitchen-ingredient--ham",
                  )}
                  {renderIngredientSource(
                    "🧀",
                    currentStep,
                    "kitchen-ingredient--cheese",
                  )}
                </>
              )}
            </div>

            {dragging && (
              <div
                className="kitchen-drag-ghost"
                style={{
                  left: dragging.x,
                  top: dragging.y,
                }}
                aria-hidden="true"
              >
                {dragging.emoji}
              </div>
            )}
          </div>
        )}

        {screen === "done" && (
          <div className="kitchen-done" role="status" aria-live="polite">
            <span className="kitchen-done-emoji" aria-hidden="true">
              😋
            </span>
            <p className="kitchen-done-title">¡Listo!</p>
            <p className="kitchen-done-sub">Leo está feliz 🎉</p>
            <button
              type="button"
              className="kitchen-btn kitchen-btn--primary"
              onClick={cookAnother}
            >
              Cocinar otro 🍳
            </button>
            <Link href="/" className="kitchen-btn kitchen-btn--secondary">
              ← Volver
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
