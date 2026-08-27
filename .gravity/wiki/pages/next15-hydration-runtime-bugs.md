# Random en primer render rompe hidratación
<!-- iaterminal:wiki-page {"type":"decision"} -->

Regla: en rutas estáticas, nunca generar datos con `Math.random()` durante el render (ni en el initializer de `useState`). El HTML se hornea en el build con un valor y el cliente genera otro al hidratar → hydration mismatch.

Patrón obligatorio: estado inicial determinista + aleatorizar en un `useEffect` de montaje. Ya aplicado en `components/MemoryGame.tsx`, `components/ShapesGame.tsx` y `components/NumbersGame.tsx`, con las factories deterministas `createOrderedDeck()` en `lib/memory.ts` y `createOrderedRounds()` en `lib/shapes.ts` y `lib/numbers.ts`. Las variantes aleatorias siguen usándose en `restart`.

No era un bug de Next 15: existía con Next 14, el upgrade solo lo hizo visible. Ver [[nextjs-version-constraint]].

Cómo verificar: compilar dos veces desde cero y diffear `.next/server/app/<ruta>.html`; solo debe cambiar el build ID de Next.

Costo aceptado: un frame con la ronda determinista antes de aleatorizar. See [[memory-game-flow]] [[shapes-game-flow]] [[numbers-game-flow]].
