const fs = require("fs");
let s = fs.readFileSync("lib/i18n.tsx", "utf8").replace(/\r\n/g, "\n");

const blocks = [
  [
    '  "home.program.title": "Choose a program",\n',
    `  "home.program.tag": "Current program",
  "home.program.percent": "0 percent complete",
  "home.focus.title": "Today's focus",
  "home.focus.text": "Gentle strength you can begin.",
  "home.focus.1": "Read the day",
  "home.focus.2": "Do one strength pattern or document why you skipped it",
  "home.focus.3": "Read the contraindications",
  "home.focus.open": "Open the day",
  "discover.1.short": "Nutrition",
  "discover.2.short": "Recipe",
  "discover.3.short": "Exercise",
  "discover.4.short": "Sleep",
  "discover.5.short": "Stress",
  "discover.6.short": "ED center",
`,
  ],
  [
    '  "home.program.title": "Escolha um programa",\n',
    `  "home.program.tag": "Programa atual",
  "home.program.percent": "0 por cento concluído",
  "home.focus.title": "Foco de hoje",
  "home.focus.text": "Força leve para começar.",
  "home.focus.1": "Leia o dia",
  "home.focus.2": "Faça um padrão de força ou registre por que pulou",
  "home.focus.3": "Leia as contraindicações",
  "home.focus.open": "Abrir o dia",
  "discover.1.short": "Nutrição",
  "discover.2.short": "Receita",
  "discover.3.short": "Exercício",
  "discover.4.short": "Sono",
  "discover.5.short": "Estresse",
  "discover.6.short": "Central DE",
`,
  ],
  [
    '  "home.program.title": "Elige un programa",\n',
    `  "home.program.tag": "Programa actual",
  "home.program.percent": "0 por ciento completado",
  "home.focus.title": "Enfoque de hoy",
  "home.focus.text": "Fuerza suave para empezar.",
  "home.focus.1": "Lee el día",
  "home.focus.2": "Haz un patrón de fuerza o registra por qué lo saltaste",
  "home.focus.3": "Lee las contraindicaciones",
  "home.focus.open": "Abrir el día",
  "discover.1.short": "Nutrición",
  "discover.2.short": "Receta",
  "discover.3.short": "Ejercicio",
  "discover.4.short": "Sueño",
  "discover.5.short": "Estrés",
  "discover.6.short": "Centro DE",
`,
  ],
];

let cursor = 0;
for (const [anchor, add] of blocks) {
  const i = s.indexOf(anchor, cursor);
  if (i < 0) {
    console.log("missing:", anchor.trim());
    process.exit(1);
  }
  const end = i + anchor.length;
  s = s.slice(0, end) + add + s.slice(end);
  cursor = end + add.length;
}
fs.writeFileSync("lib/i18n.tsx", s);
console.log("ok");
