const fs = require("fs");
let s = fs.readFileSync("lib/i18n.tsx", "utf8").replace(/\r\n/g, "\n");

const blocks = [
  [
    '  "discover.title": "Discover",\n',
    `  "discover.search": "Search foods, recipes, exercises, articles",
  "discover.searchLabel": "Search the library",
`,
  ],
  [
    '  "discover.title": "Descobrir",\n',
    `  "discover.search": "Buscar alimentos, receitas, exercícios, artigos",
  "discover.searchLabel": "Buscar na biblioteca",
`,
  ],
  [
    '  "discover.title": "Descubrir",\n',
    `  "discover.search": "Buscar alimentos, recetas, ejercicios, artículos",
  "discover.searchLabel": "Buscar en la biblioteca",
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
