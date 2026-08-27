# Kitchen game flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

/cocina → app/cocina/page.tsx → [[components/KitchenGame.tsx]]. Recetas en [[lib/kitchen.ts]]: 10 platos (`salad, sandwich, pizza, soup, smoothie, pancakes, cookies, pasta, eggs, fruit`), 4–5 pasos cada uno. Estilos `.kitchen-*` en [[app/globals.css]]. Audio [[audio-system]]: tap/drop/stir/chop/sprinkle + correct/victory.

Pantallas: `menu` (grid scrollable de DISHES) → `cooking` (stepIndex) → `done`.

Modelo de paso v3 (reemplaza `scene`/`targetZone` enumerados): cada `KitchenStep` trae `sceneEmoji` (objeto central grande), `stack?` (sándwich apilado) y `addsToScene?` (el ingrediente queda visible dentro del objeto). `renderScene` es UNO y genérico — no hay ramas por `SceneId` ni transiciones por `step.id`. Al avanzar, si `next.sceneEmoji !== current.sceneEmoji` se vacía `placed`. Agregar un plato = solo editar DISHES.

Gesto `drag-place` (principal): `handleDragStart` toma pointer capture y `.kitchen-drag-item` sigue al dedo; `handleDragMove` marca `over` con `isInMagnetZone` (rect del objeto + 20%, piso 24px) y pinta `.kitchen-object--magnet`; `handleDragEnd` decide — movimiento ≤`TAP_SLOP_PX` es tap y usa `handleTapPlace`, soltar dentro de la zona hace snap con `flyToTarget`, soltar lejos anima `.kitchen-fly--return` durante `RETURN_DURATION_MS` sin avanzar. `busyRef` bloquea durante vuelo y retorno: un solo ingrediente a la vez. Sin zonas punteadas ni rectángulos visibles.

Stir: primer `pointermove` sobre el objeto arma `stirQuietTimerRef` (`STIR_TIME_MS`); también completa por `STIR_CIRCLES_REQUIRED`. Cut: swipe ≥`CUT_SWIPE_MIN_PX`, 3 veces. Sprinkle: 4 taps sobre el objeto entero. Gesto `tap`: un tap sobre el objeto central (cascar, voltear, servir, hornear), sin bandeja. Timers UI en `uiTimersRef` con cleanup en unmount — mismo patrón que [[bubbles-game-flow]]. Ver [[kitchen-game-brief]] [[routes-and-games-registry]] [[phone-game-flow]].
