# Numbers game flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

`/numeros` → `app/numeros/page.tsx` → [[components/NumbersGame.tsx]]. Rondas: `createGameRounds()` en [[lib/numbers.ts]] (8 rondas, cuenta 1–5 con emojis, sin `count` consecutivo). Acierto → animación ~600ms y avanza; fallo → shake ~400ms y reintento. Victoria tras ronda 8 → overlay "¡Lo lograste! 🎉". Reinicio solo en victoria. Hub: `numeros` `available: true` en [[lib/games.ts]]. See [[routes-and-games-registry]] [[shapes-game-flow]].
