# Memoria game flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

`/memoria` → `app/memoria/page.tsx` → [[components/MemoryGame.tsx]]. Deck: `createShuffledDeck()` en [[lib/memory.ts]] (12 cartas, 6 pares). Volteo: 2 cartas; match → `memory-card--matched`; fallo → revert tras ~1s. Victoria 6 pares → overlay "¡Lo lograste! 🎉". Reinicio: header o victoria llaman `createShuffledDeck()`. Hub: `memoria` `available: true` en [[lib/games.ts]]. See [[routes-and-games-registry]].
