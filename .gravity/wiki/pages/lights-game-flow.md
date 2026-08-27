# Lights game flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

`/luces` → `app/luces/page.tsx` → [[components/LightsGame.tsx]]. Config de switches en [[lib/lights.ts]]: `LIGHT_SWITCHES` (4 entradas `{ id, label, emoji, element, surprise? }`) y `createInitialLightsState()` → `Record<LightElementId, boolean>` todo en false.

Toggle: click en `.lights-switch` → `handleToggle(element, surprise)` → `unlockAudio()` → lee `lightsRef.current[id]` (ref espejo, no updater de estado, para no disparar audio dos veces en StrictMode) → `setLights` con el objeto nuevo → `playSound(next ? 'switchOn' : 'switchOff')`.

Cada elemento es un SVG absoluto en `.lights-scene` con clase `lights-element lights-element--<id>` y `is-on` cuando está encendido; el look de apagado/encendido es solo CSS (`color`, `opacity`, `drop-shadow`). Elementos: `lampara`, `luna`, `ventana`, `estrella`.

Sorpresa: el switch `estrella` tiene `surprise: true`. Al ENCENDER (no al apagar) incrementa `confettiKey`, monta `.lights-confetti` con 10 piezas deterministas (`CONFETTI_PIECES`, sin Math.random) y un `setTimeout` de `CONFETTI_MS = 1800` la desmonta; el `key` reinicia la animación en toggles rápidos y el timer se limpia en unmount.

Sin puntaje, temporizador, secuencia obligatoria ni estado de fallo: el estado persiste mientras el niño juega. Header claro `.app-header` con `← Volver` y `SoundToggle`; el fondo oscuro vive en `.lights-main` (nunca en `body`).

Estilos `.lights-*` en [[app/globals.css]]: `.lights-switches` es grid de 4 columnas fijas y los botones miden 84px de alto. Audio `switchOn`/`switchOff` en [[lib/audio.ts]] — ver [[audio-system]]. Segundo juego del brief [[cause-effect-games-brief]]; hermano de [[stars-game-flow]]. Registro en [[lib/games.ts]] — ver [[routes-and-games-registry]].
