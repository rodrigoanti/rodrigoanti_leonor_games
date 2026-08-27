export type Contact = {
  id: string;
  name: string;
  emoji: string;
  phrases: string[];
};

export const RINGING_MS = 2000;
export const PHRASE_DELAY_MS = 1500;

export const CONTACTS: readonly Contact[] = [
  {
    id: "mama",
    name: "Mamá",
    emoji: "👩",
    phrases: [
      "¡Hola, mi amor!",
      "¿Ya jugaste hoy?",
      "Te mando un beso muy grande.",
    ],
  },
  {
    id: "papa",
    name: "Papá",
    emoji: "👨",
    phrases: [
      "¡Hola, campeón!",
      "Estoy volviendo a casa.",
      "¿Jugamos a la pelota más tarde?",
    ],
  },
  {
    id: "abuela",
    name: "Abuela",
    emoji: "👵",
    phrases: [
      "¡Qué lindo que llamaste!",
      "Hice galletas de chocolate.",
      "Te quiero muchísimo.",
    ],
  },
  {
    id: "leo",
    name: "Leo",
    emoji: "🦁",
    phrases: [
      "¡Ruaar! Hola, amigo.",
      "Estoy pintando un arcoíris.",
      "¿Vienes a jugar conmigo?",
    ],
  },
  {
    id: "doctor",
    name: "Doctor",
    emoji: "🩺",
    phrases: [
      "Hola, ¿cómo te sientes?",
      "Recuerda comer muchas frutas.",
      "¡Estás muy sano! Adiós.",
    ],
  },
  {
    id: "bombero",
    name: "Bombero",
    emoji: "🚒",
    phrases: [
      "¡Aquí la estación de bomberos!",
      "Vamos rápido con la sirena.",
      "Todos están a salvo. ¡Chau!",
    ],
  },
];
