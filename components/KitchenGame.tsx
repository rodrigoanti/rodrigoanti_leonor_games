"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";
import Link from "next/link";
import SoundToggle from "@/components/SoundToggle";
import { playSound, unlockAudio } from "@/lib/audio";
import {
  CUT_SWIPE_MIN_PX,
  CUT_SWIPES_REQUIRED,
  DISHES,
  FLY_DURATION_MS,
  isInMagnetZone,
  RETURN_DURATION_MS,
  SPRINKLE_TAPS_REQUIRED,
  STIR_CIRCLES_REQUIRED,
  STIR_TIME_MS,
  TAP_SLOP_PX,
  usesTray,
  type Dish,
  type KitchenScreen,
  type KitchenStep,
} from "@/lib/kitchen";

type Point = { x: number; y: number };

type Flying = {
  emoji: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
};

type DragState = {
  emoji: string;
  x: number;
  y: number;
  over: boolean;
};

function centerOf(rect: DOMRect): Point {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

export default function KitchenGame() {
  const [screen, setScreen] = useState<KitchenScreen>("menu");
  const [dish, setDish] = useState<Dish | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [placed, setPlaced] = useState<string[]>([]);
  const [cutDone, setCutDone] = useState(false);
  const [sprinkleCount, setSprinkleCount] = useState(0);
  const [cutCount, setCutCount] = useState(0);
  const [cutLines, setCutLines] = useState<number[]>([]);
  const [sprinkleParticles, setSprinkleParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [flying, setFlying] = useState<Flying | null>(null);
  const [returning, setReturning] = useState<Flying | null>(null);
  const [drag, setDrag] = useState<DragState | null>(null);

  const targetRef = useRef<HTMLDivElement>(null);
  const stirRef = useRef<HTMLDivElement>(null);
  const stirAngleRef = useRef(0);
  const stirTotalRef = useRef(0);
  const stirStartRef = useRef<number | null>(null);
  const cutStartRef = useRef<Point | null>(null);
  const cutActiveRef = useRef(false);
  const particleIdRef = useRef(0);
  const busyRef = useRef(false);
  const uiTimersRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const stirQuietTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Un solo ingrediente arrastrable a la vez.
  const dragRef = useRef<{
    emoji: string;
    origin: Point;
    start: Point;
    over: boolean;
    pointerId: number;
  } | null>(null);

  const clearStirQuietTimer = useCallback(() => {
    if (stirQuietTimerRef.current) {
      clearTimeout(stirQuietTimerRef.current);
      stirQuietTimerRef.current = null;
    }
  }, []);

  const scheduleUiTimer = useCallback((fn: () => void, ms: number) => {
    const timer = setTimeout(() => {
      fn();
      uiTimersRef.current = uiTimersRef.current.filter((t) => t !== timer);
    }, ms);
    uiTimersRef.current.push(timer);
    return timer;
  }, []);

  const currentStep: KitchenStep | null =
    dish && screen === "cooking" ? dish.steps[stepIndex] : null;

  const resetCookingState = useCallback(() => {
    setStepIndex(0);
    setPlaced([]);
    setCutDone(false);
    setSprinkleCount(0);
    setCutCount(0);
    setCutLines([]);
    setSprinkleParticles([]);
    setFlying(null);
    setReturning(null);
    setDrag(null);
    dragRef.current = null;
    busyRef.current = false;
    stirAngleRef.current = 0;
    stirTotalRef.current = 0;
    stirStartRef.current = null;
    clearStirQuietTimer();
    cutStartRef.current = null;
    cutActiveRef.current = false;
  }, [clearStirQuietTimer]);

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
    const current = dish.steps[stepIndex];
    const next = dish.steps[stepIndex + 1];
    setStepIndex((i) => i + 1);
    // Cambiar de objeto central estrena escena vacía.
    if (next.sceneEmoji !== current.sceneEmoji) {
      setPlaced([]);
    }
    setSprinkleCount(0);
    setCutCount(0);
    setCutLines([]);
    setCutDone(false);
    stirAngleRef.current = 0;
    stirTotalRef.current = 0;
    stirStartRef.current = null;
    clearStirQuietTimer();
  }, [dish, stepIndex, clearStirQuietTimer]);

  const applyStepVisual = useCallback((step: KitchenStep) => {
    if (step.addsToScene) {
      setPlaced((items) => [...items, step.ingredientEmoji]);
    }
  }, []);

  // Vuelo del ingrediente hasta el objeto central; al aterrizar avanza el paso.
  const flyToTarget = useCallback(
    (step: KitchenStep, source: Point) => {
      const targetEl = targetRef.current;
      const target = targetEl
        ? centerOf(targetEl.getBoundingClientRect())
        : { x: source.x, y: source.y - 160 };
      setFlying({
        emoji: step.ingredientEmoji,
        x: source.x,
        y: source.y,
        dx: target.x - source.x,
        dy: target.y - source.y,
      });
      scheduleUiTimer(() => {
        setFlying(null);
        busyRef.current = false;
        playSound("drop");
        applyStepVisual(step);
        completeStep();
      }, FLY_DURATION_MS);
    },
    [applyStepVisual, completeStep, scheduleUiTimer],
  );

  // Tap-place (atajo): el ingrediente vuela solo desde la bandeja.
  const handleTapPlace = useCallback(
    (step: KitchenStep, source: Point) => {
      busyRef.current = true;
      playSound("tap");
      flyToTarget(step, source);
    },
    [flyToTarget],
  );

  const handleDragStart = useCallback(
    (e: ReactPointerEvent, step: KitchenStep) => {
      if (busyRef.current || dragRef.current) {
        return;
      }
      unlockAudio();
      e.currentTarget.setPointerCapture(e.pointerId);
      const origin = centerOf(e.currentTarget.getBoundingClientRect());
      dragRef.current = {
        emoji: step.ingredientEmoji,
        origin,
        start: { x: e.clientX, y: e.clientY },
        over: false,
        pointerId: e.pointerId,
      };
      playSound("tap");
      setDrag({
        emoji: step.ingredientEmoji,
        x: e.clientX,
        y: e.clientY,
        over: false,
      });
    },
    [],
  );

  const handleDragMove = useCallback((e: ReactPointerEvent) => {
    const state = dragRef.current;
    if (!state || state.pointerId !== e.pointerId) {
      return;
    }
    const targetEl = targetRef.current;
    const over = targetEl
      ? isInMagnetZone(targetEl.getBoundingClientRect(), e.clientX, e.clientY)
      : false;
    state.over = over;
    setDrag({ emoji: state.emoji, x: e.clientX, y: e.clientY, over });
  }, []);

  const handleDragEnd = useCallback(
    (e: ReactPointerEvent, step: KitchenStep) => {
      const state = dragRef.current;
      if (!state || state.pointerId !== e.pointerId) {
        return;
      }
      dragRef.current = null;
      setDrag(null);
      const dx = e.clientX - state.start.x;
      const dy = e.clientY - state.start.y;
      const moved = Math.hypot(dx, dy);

      // Movimiento mínimo = tap: mismo atajo que tap-place.
      if (moved <= TAP_SLOP_PX) {
        handleTapPlace(step, state.origin);
        return;
      }

      const targetEl = targetRef.current;
      const inZone = targetEl
        ? isInMagnetZone(targetEl.getBoundingClientRect(), e.clientX, e.clientY)
        : false;

      if (inZone) {
        busyRef.current = true;
        flyToTarget(step, { x: e.clientX, y: e.clientY });
        return;
      }

      // Soltar lejos: el ingrediente vuelve suave a la bandeja.
      busyRef.current = true;
      setReturning({
        emoji: step.ingredientEmoji,
        x: e.clientX,
        y: e.clientY,
        dx: state.origin.x - e.clientX,
        dy: state.origin.y - e.clientY,
      });
      scheduleUiTimer(() => {
        setReturning(null);
        busyRef.current = false;
      }, RETURN_DURATION_MS);
    },
    [flyToTarget, handleTapPlace, scheduleUiTimer],
  );

  const handleDragCancel = useCallback((e: ReactPointerEvent) => {
    const state = dragRef.current;
    if (!state || state.pointerId !== e.pointerId) {
      return;
    }
    dragRef.current = null;
    setDrag(null);
  }, []);

  // Tap directo sobre el objeto central (cascar, voltear, servir, hornear).
  const handleTapObject = useCallback(
    (step: KitchenStep) => {
      if (busyRef.current) {
        return;
      }
      unlockAudio();
      playSound("tap");
      applyStepVisual(step);
      completeStep();
    },
    [applyStepVisual, completeStep],
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
        clearStirQuietTimer();
        stirQuietTimerRef.current = setTimeout(() => {
          stirQuietTimerRef.current = null;
          stirTotalRef.current = 0;
          stirStartRef.current = null;
          completeStep();
        }, STIR_TIME_MS);
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
        clearStirQuietTimer();
        completeStep();
      }
    },
    [currentStep, completeStep, clearStirQuietTimer],
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
      scheduleUiTimer(() => {
        setSprinkleParticles((p) => p.filter((item) => item.id !== id));
      }, 700);
      const next = sprinkleCount + 1;
      setSprinkleCount(next);
      if (next >= SPRINKLE_TAPS_REQUIRED) {
        completeStep();
      }
    },
    [currentStep, sprinkleCount, completeStep, scheduleUiTimer],
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

  const handleCutPointerMove = useCallback(
    (e: ReactPointerEvent) => {
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
      const linePct = 25 + cutCount * 25;
      setCutLines((lines) => [...lines, linePct]);
      const next = cutCount + 1;
      setCutCount(next);
      if (next >= CUT_SWIPES_REQUIRED) {
        setCutDone(true);
        completeStep();
      }
    },
    [cutCount, completeStep],
  );

  const handleCutPointerUp = useCallback(() => {
    cutActiveRef.current = false;
    cutStartRef.current = null;
  }, []);

  const cookAnother = useCallback(() => {
    playSound("tap");
    resetCookingState();
    setScreen("menu");
    setDish(null);
  }, [resetCookingState]);

  useEffect(() => {
    return () => {
      uiTimersRef.current.forEach(clearTimeout);
      uiTimersRef.current = [];
      clearStirQuietTimer();
    };
  }, [clearStirQuietTimer]);

  const renderIngredientTray = (step: KitchenStep) => {
    if (!usesTray(step)) {
      return null;
    }
    const hidden = drag !== null || returning !== null || flying !== null;
    return (
      <div className="kitchen-tray">
        <button
          type="button"
          className={`kitchen-ingredient ${
            hidden ? "kitchen-ingredient--ghost" : ""
          }`}
          aria-label={step.shortLabel}
          onPointerDown={(e) => handleDragStart(e, step)}
          onPointerMove={handleDragMove}
          onPointerUp={(e) => handleDragEnd(e, step)}
          onPointerCancel={handleDragCancel}
        >
          <span className="kitchen-ingredient-emoji" aria-hidden="true">
            {step.ingredientEmoji}
          </span>
          <span className="kitchen-hand" aria-hidden="true">
            {step.actionIcon}
          </span>
        </button>
      </div>
    );
  };

  const renderScene = (step: KitchenStep) => {
    const isStir = step.gesture === "stir";
    const isCut = step.gesture === "cut";
    const isSprinkle = step.gesture === "sprinkle";
    const isTap = step.gesture === "tap";
    const magnet = drag?.over ?? false;

    return (
      <div
        ref={targetRef}
        className={`kitchen-object ${isStir ? "kitchen-object--stir" : ""} ${
          isCut ? "kitchen-object--cut" : ""
        } ${magnet ? "kitchen-object--magnet" : ""}`}
        onPointerMove={
          isStir ? handleStirPointer : isCut ? handleCutPointerMove : undefined
        }
        onPointerDown={
          isSprinkle
            ? handleSprinkle
            : isCut
              ? handleCutPointerDown
              : isTap
                ? () => handleTapObject(step)
                : undefined
        }
        onPointerUp={isCut ? handleCutPointerUp : undefined}
        onPointerCancel={isCut ? handleCutPointerUp : undefined}
        role={isTap ? "button" : undefined}
        aria-label={isTap ? step.shortLabel : undefined}
      >
        <div ref={stirRef} className="kitchen-object-inner">
          {step.stack ? (
            <span className="kitchen-stack" aria-hidden="true">
              {[...placed].reverse().map((item, i) => (
                <span key={i}>{item}</span>
              ))}
              <span>{step.sceneEmoji}</span>
            </span>
          ) : (
            <>
              <span
                className={`kitchen-object-emoji ${
                  cutDone ? "kitchen-object-emoji--cut" : ""
                }`}
                aria-hidden="true"
              >
                {step.sceneEmoji}
              </span>
              {placed.length > 0 && (
                <span className="kitchen-placed-items" aria-hidden="true">
                  {placed.map((item, i) => (
                    <span key={i}>{item}</span>
                  ))}
                </span>
              )}
            </>
          )}

          {cutLines.map((line, i) => (
            <span
              key={i}
              className="kitchen-cut-line"
              style={{ top: `${line}%` }}
              aria-hidden="true"
            />
          ))}

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

          {isStir && (
            <span className="kitchen-hint kitchen-hint--stir" aria-hidden="true">
              🌀
            </span>
          )}
          {isSprinkle && (
            <span
              className="kitchen-hint kitchen-hint--shaker"
              aria-hidden="true"
            >
              {step.ingredientEmoji}
            </span>
          )}
          {isCut && (
            <span className="kitchen-hint kitchen-hint--swipe" aria-hidden="true">
              👉
            </span>
          )}
          {isTap && (
            <span className="kitchen-hint kitchen-hint--tap" aria-hidden="true">
              👆
            </span>
          )}
        </div>
      </div>
    );
  };

  const flyStyle = (item: Flying): CSSProperties =>
    ({
      left: item.x,
      top: item.y,
      "--kitchen-fly-dx": `${item.dx}px`,
      "--kitchen-fly-dy": `${item.dy}px`,
    }) as CSSProperties;

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
              className="kitchen-progress"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={dish.steps.length}
              aria-valuenow={stepIndex + 1}
              aria-label={`Paso ${stepIndex + 1} de ${dish.steps.length}`}
            >
              <span
                className="kitchen-progress-fill"
                style={{
                  width: `${((stepIndex + 1) / dish.steps.length) * 100}%`,
                }}
              />
            </div>

            <p className="kitchen-action-label" aria-live="polite">
              {currentStep.shortLabel}
            </p>

            <div className="kitchen-scene">{renderScene(currentStep)}</div>

            {renderIngredientTray(currentStep)}
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

      {drag && (
        <span
          className={`kitchen-drag-item ${
            drag.over ? "kitchen-drag-item--over" : ""
          }`}
          style={{ left: drag.x, top: drag.y }}
          aria-hidden="true"
        >
          {drag.emoji}
        </span>
      )}

      {returning && (
        <span
          className="kitchen-fly kitchen-fly--return"
          style={flyStyle(returning)}
          aria-hidden="true"
        >
          {returning.emoji}
        </span>
      )}

      {flying && (
        <span
          className="kitchen-fly"
          style={flyStyle(flying)}
          aria-hidden="true"
        >
          {flying.emoji}
        </span>
      )}
    </div>
  );
}
