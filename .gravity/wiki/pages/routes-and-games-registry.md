# Rutas y registro de juegos
<!-- iaterminal:wiki-page {"type":"concept"} -->

Hub en [[app/page.tsx]] (`/`) → [[components/HubContent.tsx]]. Pinta Leo en [[app/pintar/page.tsx]] (`/pintar`) vía [[components/PaintGame.tsx]]. Memoria en `app/memoria/page.tsx` (`/memoria`) vía [[components/MemoryGame.tsx]]; lógica en [[lib/memory.ts]]. Formas en `app/formas/page.tsx` (`/formas`) vía [[components/ShapesGame.tsx]]; lógica en [[lib/shapes.ts]]. Números en `app/numeros/page.tsx` (`/numeros`) vía [[components/NumbersGame.tsx]]; lógica en [[lib/numbers.ts]]. Teléfono en `app/telefono/page.tsx` (`/telefono`) vía [[components/PhoneGame.tsx]]; datos en [[lib/phone.ts]]. Estrellas en `app/estrellas/page.tsx` (`/estrellas`) vía [[components/StarsGame.tsx]]; sin lib, estado en el componente — ver [[stars-game-flow]]. Luces en `app/luces/page.tsx` (`/luces`) vía [[components/LightsGame.tsx]]; config en [[lib/lights.ts]] — ver [[lights-game-flow]]. Burbujas en `app/burbujas/page.tsx` (`/burbujas`) vía [[components/BubblesGame.tsx]]; config y factory en [[lib/bubbles.ts]] — ver [[bubbles-game-flow]]. Cocina Leo en `app/cocina/page.tsx` (`/cocina`) vía [[components/KitchenGame.tsx]]; recetas en [[lib/kitchen.ts]] — ver [[kitchen-game-flow]].

Registro tipado en [[lib/games.ts]] (`GAMES`: id, title, emoji, href, available) — 9 juegos activos. Hub UI: [[components/GameCard.tsx]]; `.hub-grid` es 1 columna y 2 desde 600px, sirve para 9 tarjetas sin cambios.

Estilos hub, `.paint-*`, `.memory-*`, `.shapes-*`, `.numbers-*`, `.phone-*`, `.stars-*`, `.lights-*`, `.bubbles-*` y `.kitchen-*` en [[app/globals.css]]; los juegos comparten `.app-container`, `.app-header` y `.back-link`. Estrellas y Luces son los de fondo oscuro, aplicado en `.stars-main` / `.lights-main`; Burbujas usa fondo claro en `.bubbles-main`; Cocina usa fondo claro en `.kitchen-main` (nunca en `body`, que tiene el gradiente rosado global).

Los tres juegos causa-efecto del brief [[cause-effect-games-brief]] (Estrellas, Luces, Burbujas) ya están completos y activos.

See [[memory-game-flow]] [[shapes-game-flow]] [[numbers-game-flow]] [[phone-game-flow]] [[paint-game-controls-flow]] [[stars-game-flow]] [[lights-game-flow]] [[bubbles-game-flow]] [[kitchen-game-flow]] [[cause-effect-games-brief]].
