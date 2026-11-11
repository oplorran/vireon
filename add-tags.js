const fs = require("fs");
let s = fs.readFileSync("lib/i18n.tsx", "utf8").replace(/\r\n/g, "\n");

const sets = [
  [
    '  "tag.advanced": "Advanced",\n',
    `  "tag.basics": "The basics",
  "tag.risk": "Risk factors",
  "tag.mind": "Mind and mood",
  "tag.lifestyle": "Lifestyle",
  "tag.urgent": "When to seek help",
  "tag.clinic": "Clinical options",
`,
  ],
  [
    '  "tag.advanced": "Avançado",\n',
    `  "tag.basics": "O básico",
  "tag.risk": "Fatores de risco",
  "tag.mind": "Mente e humor",
  "tag.lifestyle": "Estilo de vida",
  "tag.urgent": "Quando buscar ajuda",
  "tag.clinic": "Opções clínicas",
`,
  ],
  [
    '  "tag.advanced": "Avanzado",\n',
    `  "tag.basics": "Lo básico",
  "tag.risk": "Factores de riesgo",
  "tag.mind": "Mente y ánimo",
  "tag.lifestyle": "Estilo de vida",
  "tag.urgent": "Cuándo buscar ayuda",
  "tag.clinic": "Opciones clínicas",
`,
  ],
];

let cursor = 0;
for (const [anchor, add] of sets) {
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
