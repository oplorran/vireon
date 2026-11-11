const fs = require("fs");
let s = fs.readFileSync("lib/i18n.tsx", "utf8").replace(/\r\n/g, "\n");

const blocks = [
  [
    '  "progress.program": "Program progress",\n',
    `  "progress.lessons": "Program lessons",
  "progress.ofDays": "{done} of {total} days marked complete",
  "progress.open": "Open program",
`,
  ],
  [
    '  "progress.program": "Progresso do programa",\n',
    `  "progress.lessons": "Lições do programa",
  "progress.ofDays": "{done} de {total} dias marcados como concluídos",
  "progress.open": "Abrir programa",
`,
  ],
  [
    '  "progress.program": "Progreso del programa",\n',
    `  "progress.lessons": "Lecciones del programa",
  "progress.ofDays": "{done} de {total} días marcados como completados",
  "progress.open": "Abrir programa",
`,
  ],
];

for (const [anchor, add] of blocks) {
  const i = s.indexOf(anchor);
  if (i < 0) {
    console.log("missing:", anchor.trim());
    process.exit(1);
  }
  const end = i + anchor.length;
  s = s.slice(0, end) + add + s.slice(end);
}
fs.writeFileSync("lib/i18n.tsx", s);
console.log("ok");
