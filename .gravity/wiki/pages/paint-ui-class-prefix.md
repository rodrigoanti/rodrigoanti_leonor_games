# Paint UI class prefix
<!-- iaterminal:wiki-page {"type":"decision"} -->

Los estilos de Pinta Leo usan prefijo `.paint-*` en `app/globals.css` (migración ya aplicada), alineados con `.memory-*`, `.shapes-*` y `.numbers-*`: border-radius 20px, box-shadow 0 4px 20px rgba(0,0,0,0.08), `:active` scale(0.96), estado activo con ring inset.

Clases vivas: `paint-main`, `paint-canvas-card`, `paint-panel` (+ modificadores `--tools` / `--colors`), `paint-tool-grid`, `paint-tool-btn`, `paint-tool-label`, `paint-size-picker`, `paint-size-btn`, `paint-size-dot`, `paint-color-palette`, `paint-color-btn`, `paint-clear-btn`, `paint-banner`, `paint-banner-message`. Estados como sufijo de clase: `is-active`, `is-pending`, `is-pop`.

Las clases viejas sin prefijo (`tool-btn`, `color-btn`, `size-btn`, `canvas-area`, `tools-bar`, `colors-bar`, `clear-btn`, `clear-banner`) fueron eliminadas y no quedan referencias. El banner de borrado mantiene `pointer-events: none` para que el segundo toque llegue al botón del header. See [[paint-game-controls-flow]] [[paint-canvas-sizing-constraint]] [[routes-and-games-registry]].
