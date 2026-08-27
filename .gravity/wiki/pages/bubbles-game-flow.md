# Bubbles game flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

/burbujas → app/burbujas/page.tsx → [[components/BubblesGame.tsx]]. Config y factory en [[lib/bubbles.ts]]: MAX_BUBBLES 4, createInitialBubbles(n), createBubble(id, others) posiciona lejos de las existentes.

Estado en el componente: `bubbles` (flotando) y `pops` (partículas efímeras). handlePointerDown → playSound("pop") de [[audio-system]], agrega un Pop, programa un setTimeout de POP_MS 520ms para retirarlo, y handlePop reemplaza la burbuja tocada por una nueva lejos del punto. Sin puntaje, sin fallo, sin fin — patrón del [[cause-effect-games-brief]].

Regla de timers: el efecto de cleanup debe leer `popTimersRef.current` dentro del return, nunca capturar el array antes. Cada timeout que ejecuta reasigna el ref a un array nuevo (filter), así que una referencia capturada al montar deja timers vivos tras unmount. Bug encontrado por QA y corregido.

Registrado en [[routes-and-games-registry]].
