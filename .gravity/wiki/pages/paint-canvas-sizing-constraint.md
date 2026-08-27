# Paint canvas sizing constraint
<!-- iaterminal:wiki-page {"type":"decision"} -->

`components/PaintCanvas.tsx` mide su `parentElement` con ResizeObserver y limpia con `clientWidth/clientHeight`. Regla: el div contenedor inmediato del canvas debe tener alto concreto (`flex: 1; min-height: 0; overflow: hidden; position: relative`) y el canvas debe ser su único hijo. Si el padre colapsa, el canvas queda en 0px y no dibuja. See [[paint-game-controls-flow]] [[routes-and-games-registry]].
