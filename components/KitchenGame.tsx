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
  SPRINKLE_TAPS_REQUIRED,
  STIR_CIRCLES_REQUIRED,
  STIR_TIME_MS,
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

function centerOf(rect: DOMRect): Point {
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

export default function KitchenGame() {
  const [screen, setScreen] = useState<KitchenScreen>("menu");
  const [dish, setDish] = useState<Dish | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [bowlItems, setBowlItems] = useState<string[]>([]);
  const [plateReady, setPlateReady] = useState(false);
  const [sandwichLayers, setSandwichLayers] = useState<string[]>([]);
  const [sandwichClosed, setSandwichClosed] = useState(false);
  const [breadCut, setBreadCut] = useState(false);
  const [sprinkleCount, setSprinkleCount] = useState(0);
  const [cutCount, setCutCount] = useState(0);
  const [cutLines, setCutLines] = useState<number[]>([]);
  const [sprinkleParticles, setSprinkleParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const [flying, setFlying] = useState<Flying | null>(null);

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
    setBowlItems([]);
    setPlateReady(false);
    setSandwichLayers([]);
    setSandwichClosed(false);
    setBreadCut(false);
    setSprinkleCount(0);
    setCutCount(0);
    setCutLines([]);
    setSprinkleParticles([]);
    setFlying(null);
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
    setStepIndex((i) => i + 1);
    setSprinkleCount(0);
    setCutCount(0);
    setCutLines([]);
    stirAngleRef.current = 0;
    stirTotalRef.current = 0;
    stirStartRef.current = null;
    clearStirQuietTimer();
  }, [dish, stepIndex, clearStirQuietTimer]);

  const applyStepVisual = useCallback((step: KitchenStep) => {
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
    } else if (step.id === "sandwich-tap") {
      setSandwichClosed(true);
    } else if (step.id === "sandwich-cut") {
      setBreadCut(true);
    }
  }, []);

  // Tap-place: el ingrediente vuela al objeto central y el paso avanza al aterrizar.
  const handleTapPlace = useCallback(
    (e: ReactPointerEvent, step: KitchenStep) => {
      if (busyRef.current) {
        return;
      }
      unlockAudio();
      busyRef.current = true;
      const source = centerOf(e.currentTarget.getBoundingClientRect());
      const targetEl = targetRef.current;
      const target = targetEl
        ? centerOf(targetEl.getBoundingClientRect())
        : { x: source.x, y: source.y - 160 };
      playSound("tap");
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
        setBreadCut(true);
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
    if (step.gesture !== "tap-place" && step.gesture !== "tap") {
      return null;
    }
    if (step.scene === "pour") {
      return null;
    }
    return (
      <div className="kitchen-tray">
        <button
          type="button"
          className="kitchen-ingredient"
          aria-label={step.shortLabel}
          onPointerDown={(e) => handleTapPlace(e, step)}
        >
          <span className="kitchen-ingredient-emoji" aria-hidden="true">
            {step.ingredientEmoji}
          </span>
          <span className="kitchen-hand" aria-hidden="true">
            👆
          </span>
        </button>
      </div>
    );
  };

  const renderBowl = (step: KitchenStep, tappable: boolean) => (
    <div
      ref={tappable ? undefined : targetRef}
      className={`kitchen-object kitchen-object--bowl ${
        step.gesture === "stir" ? "kitchen-object--stir" : ""
      }`}
      onPointerMove={step.gesture === "stir" ? handleStirPointer : undefined}
      onPointerDown={
        tappable ? (e) => handleTapPlace(e, step) : undefined
      }
      role={tappable ? "button" : undefined}
      aria-label={tappable ? step.shortLabel : undefined}
    >
      <div ref={stirRef} className="kitchen-object-inner">
        <span className="kitchen-object-emoji" aria-hidden="true">
          🥣
        </span>
        {bowlItems.length > 0 && (
          <span className="kitchen-bowl-items" aria-hidden="true">
            {bowlItems.map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </span>
        )}
        {step.gesture === "stir" && (
          <span className="kitchen-hint kitchen-hint--stir" aria-hidden="true">
            🌀
          </span>
        )}
        {tappable && (
          <span className="kitchen-hint kitchen-hint--tap" aria-hidden="true">
            👆
          </span>
        )}
      </div>
    </div>
  );

  const renderPlate = (step: KitchenStep, isTarget: boolean) => (
    <div
      ref={isTarget ? targetRef : undefined}
      className="kitchen-object kitchen-object--plate"
      onPointerDown={
        step.gesture === "sprinkle" ? handleSprinkle : undefined
      }
    >
      <div className="kitchen-object-inner">
        <span className="kitchen-object-emoji" aria-hidden="true">
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
        {step.gesture === "sprinkle" && (
          <span className="kitchen-hint kitchen-hint--shaker" aria-hidden="true">
            🧂
          </span>
        )}
      </div>
    </div>
  );

  const renderScene = (step: KitchenStep) => {
    if (step.scene === "bowl") {
      return renderBowl(step, false);
    }
    if (step.scene === "pour") {
      return (
        <div className="kitchen-scene-stack">
          {renderBowl(step, true)}
          {renderPlate(step, true)}
        </div>
      );
    }
    if (step.scene === "plate") {
      return renderPlate(step, true);
    }
    if (step.scene === "bread") {
      return (
        <div
          className="kitchen-object kitchen-object--bread"
          onPointerDown={handleCutPointerDown}
          onPointerMove={handleCutPointerMove}
          onPointerUp={handleCutPointerUp}
          onPointerCancel={handleCutPointerUp}
        >
          <div className="kitchen-object-inner">
            <span
              className={`kitchen-object-emoji ${
                breadCut ? "kitchen-object-emoji--cut" : ""
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
            <span className="kitchen-hint kitchen-hint--swipe" aria-hidden="true">
              👉
            </span>
          </div>
        </div>
      );
    }
    return (
      <div ref={targetRef} className="kitchen-object kitchen-object--sandwich">
        <div className="kitchen-object-inner">
          <span className="kitchen-sandwich-stack" aria-hidden="true">
            {sandwichClosed && <span>🍞</span>}
            {[...sandwichLayers].reverse().map((layer, i) => (
              <span key={i}>{layer}</span>
            ))}
            <span>🍞</span>
          </span>
        </div>
      </div>
    );
  };

  const flyStyle: CSSProperties | undefined = flying
    ? ({
        left: flying.x,
        top: flying.y,
        "--kitchen-fly-dx": `${flying.dx}px`,
        "--kitchen-fly-dy": `${flying.dy}px`,
      } as CSSProperties)
    : undefined;

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

      {flying && (
        <span className="kitchen-fly" style={flyStyle} aria-hidden="true">
          {flying.emoji}
        </span>
      )}
    </div>
  );
}
