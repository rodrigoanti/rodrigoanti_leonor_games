# Phone game flow
<!-- iaterminal:wiki-page {"type":"flow"} -->

`/telefono` → `app/telefono/page.tsx` → [[components/PhoneGame.tsx]]. Datos: `CONTACTS` en [[lib/phone.ts]] (6 contactos: id, name, emoji, phrases[3]).

Máquina de 3 pantallas en un solo `useState<Screen>`: `contacts` → `ringing` → `call`.
- `contacts`: grid de botones `.phone-contact`; tocar uno guarda el contacto y pasa a `ringing`.
- `ringing`: un `useEffect` con `setTimeout(RINGING_MS = 2000)` pasa a `call` y pone `visiblePhrases = 1`. El cleanup cancela la transición si el niño cuelga antes.
- `call`: segundo `useEffect` incrementa `visiblePhrases` cada `PHRASE_DELAY_MS = 1500` hasta `phrases.length`; se renderiza `phrases.slice(0, visiblePhrases)`.

Termina con `hangUp()`: vuelve a `contacts` y resetea contacto y `visiblePhrases`, así la siguiente llamada arranca desde la primera frase. Sin audio, sin `getUserMedia`, sin links `tel:` — todo es simulado. Estilos `.phone-*` al final de [[app/globals.css]]. See [[routes-and-games-registry]] [[shapes-game-flow]].
