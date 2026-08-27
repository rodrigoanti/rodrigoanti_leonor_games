# Wiki index

- [[memory-game-flow]] — Memoria game flow (flow) → links: components-memorygame.tsx, lib-memory.ts, lib-games.ts, routes-and-games-registry
  `/memoria` → `app/memoria/page.tsx` → [[components/MemoryGame.tsx]]. Deck: `createShuffledDeck()` en [[lib/memory.ts]] (
- [[numbers-game-flow]] — Numbers game flow (flow) → links: components-numbersgame.tsx, lib-numbers.ts, lib-games.ts, routes-and-games-registry, shapes-game-flow
  `/numeros` → `app/numeros/page.tsx` → [[components/NumbersGame.tsx]]. Rondas: `createGameRounds()` en [[lib/numbers.ts]]
- [[paint-canvas-sizing-constraint]] — Paint canvas sizing constraint (decision) → links: paint-game-controls-flow, routes-and-games-registry
  `components/PaintCanvas.tsx` mide su `parentElement` con ResizeObserver y limpia con `clientWidth/clientHeight`. Regla: 
- [[paint-game-controls-flow]] — Pinta Leo controls flow (flow) → links: routes-and-games-registry
  Pinta Leo vive en [[routes-and-games-registry]]: `/pintar` renderiza `app/pintar/page.tsx` → `components/PaintGame.tsx` 
- [[paint-ui-class-prefix]] — Paint UI class prefix (decision) → links: paint-game-controls-flow, paint-canvas-sizing-constraint, routes-and-games-registry
  Los estilos de Pinta Leo usan prefijo `.paint-*` en `app/globals.css` (migración ya aplicada), alineados con `.memory-*`
- [[phone-game-flow]] — Phone game flow (flow) → links: components-phonegame.tsx, lib-phone.ts, app-globals.css, routes-and-games-registry, shapes-game-flow
  `/telefono` → `app/telefono/page.tsx` → [[components/PhoneGame.tsx]]. Datos: `CONTACTS` en [[lib/phone.ts]] (6 contactos
- [[production-deploy-flow]] — Production deploy flow (flow) → links: routes-and-games-registry
  Push a `develop` → `.github/workflows/integration.yml` (install, lint, typecheck, build, deploy SSH). Servidor: `/home/r
- [[routes-and-games-registry]] — Rutas y registro de juegos (concept) → links: app-page.tsx, app-pintar-page.tsx, components-paintgame.tsx, components-memorygame.tsx, lib-memory.ts, components-shapesgame.tsx, lib-shapes.ts, components-numbersgame.tsx, lib-numbers.ts, components-phonegame.tsx, lib-phone.ts, lib-games.ts, components-gamecard.tsx, app-globals.css, memory-game-flow, shapes-game-flow, numbers-game-flow, phone-game-flow, paint-game-controls-flow
  Hub en [[app/page.tsx]] (`/`). Pinta Leo en [[app/pintar/page.tsx]] (`/pintar`) vía [[components/PaintGame.tsx]]. Memori
- [[shapes-game-flow]] — Shapes game flow (flow) → links: components-shapesgame.tsx, lib-shapes.ts, lib-games.ts, routes-and-games-registry, memory-game-flow
  `/formas` → `app/formas/page.tsx` → [[components/ShapesGame.tsx]]. Rondas: `createGameRounds()` en [[lib/shapes.ts]] (8 
