# Next.js version constraint
<!-- iaterminal:wiki-page {"type":"decision"} -->

Next **15.5.9** con React **18.3.1** (pin exacto de `next` y `eslint-config-next` en `package.json`). React 18 es peer válido de Next 15 (`^18.2.0 || ^19.0.0`): no migrar a React 19 salvo que se necesite una feature suya.

Engine: `^18.18.0 || >= 20`. CI (`node-version: 18`) y servidor (`v18.20.7`) cumplen — no bajar de 18.18.

`tsconfig.json` requiere `"target": "ES2017"`; si falta, Next lo reescribe entero y ensucia el diff.

El upgrade no tocó `app/`, `components/` ni `lib/`: el repo no usa ninguna API que Next 15 volvió async (`cookies`, `headers`, `params`, `searchParams`, `draftMode`). Único contacto con el framework: `next/font/google` en `app/layout.tsx`.

Deuda: `next lint` está deprecado y desaparece en Next 16 (hoy solo warning). Antes de subir a 16, correr `npx @next/codemod@canary next-lint-to-eslint-cli .`. See [[production-deploy-flow]] [[routes-and-games-registry]] [[paint-canvas-sizing-constraint]].
