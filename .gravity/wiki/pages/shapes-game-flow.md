# Shapes game flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

`/formas` → `app/formas/page.tsx` → [[components/ShapesGame.tsx]]. Rondas: `createGameRounds()` en [[lib/shapes.ts]] (8 rondas, 4 formas SVG, sin `correctId` consecutivo). Acierto → animación ~600ms y avanza; fallo → shake ~400ms y reintento. Victoria tras ronda 8 → overlay "¡Lo lograste! 🎉". Reinicio solo en victoria. Hub: `formas` `available: true` en [[lib/games.ts]]. See [[routes-and-games-registry]] [[memory-game-flow]].
