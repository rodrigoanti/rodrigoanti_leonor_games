# Pinta Leo controls flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

Pinta Leo vive en [[routes-and-games-registry]]: `/pintar` renderiza `app/pintar/page.tsx` → `components/PaintGame.tsx` → `components/PaintCanvas.tsx`. Controles: `Toolbar` cambia tool, `BrushSizePicker` cambia brushSize, `ColorPalette` cambia color. Canvas maneja pointer events; `ClearButton` requiere doble toque: primero banner, segundo `PaintCanvas.clear()`. See [[routes-and-games-registry]].
