# Stars game flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

`/estrellas` → `app/estrellas/page.tsx` → [[components/StarsGame.tsx]]. Sin lib de lógica: todo el estado vive en el componente.

Tap: `onPointerDown` en `.stars-sky` → `getBoundingClientRect()` para x/y en % → `unlockAudio()` + `playSound('sparkle')` → nueva estrella al array `stars`. Ids desde `nextIdRef` (no index, no Date.now).

Límite: `MAX_STARS = 15` contado en `activeCountRef` (ref, no state, para sobrevivir al batching de taps rápidos). Al llegar a 15 todas las estrellas del array se marcan `fading: true`, `activeCountRef` vuelve a 0 y un `setTimeout` de `FADE_MS = 1500` las elimina con `filter(s => !s.fading)`. Los taps durante el fade crean estrellas nuevas sin `fading`, así el filtro no las borra. Fin del ciclo: array vacío, listo para seguir tocando.

Sin puntaje, contador, temporizador ni estado de fallo. Header comparte `.app-header` claro con `← Volver` y `SoundToggle`; el fondo nocturno vive solo en `.stars-main`.

Estilos `.stars-*` en [[app/globals.css]]: `.stars-star` con `pointer-events: none` (los taps siempre llegan al cielo) y `animation: stars-appear 800ms forwards`; `.stars-star--fading` sobreescribe con `stars-fade 1500ms`. `touch-action: none` en `.stars-sky` evita scroll/zoom.

Audio: `sparkle` en [[lib/audio.ts]] — ver [[audio-system]]. Primer juego del brief [[cause-effect-games-brief]]. Registro en [[lib/games.ts]] — ver [[routes-and-games-registry]].
