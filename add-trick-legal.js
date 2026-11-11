const fs = require("fs");
let s = fs.readFileSync("lib/i18n.tsx", "utf8").replace(/\r\n/g, "\n");

const blocks = [
  [
    '  "trick.notice.title": "Important notice",\n',
    `  "trick.legal.line":
    "VIREON MAX does not diagnose, prescribe, or replace a clinician. It does not measure or promise any change in erectile function.",
`,
  ],
  [
    '  "trick.notice.title": "Aviso importante",\n',
    `  "trick.legal.line":
    "VIREON MAX não diagnostica, não prescreve e não substitui um clínico. Não mede nem promete mudança na função erétil.",
`,
  ],
  [
    '  "trick.notice.title": "Aviso importante",\n',
    `  "trick.legal.line":
    "VIREON MAX no diagnostica, no receta ni sustituye a un clínico. No mide ni promete cambios en la función eréctil.",
`,
  ],
];

let cursor = 0;
for (const [anchor, add] of blocks) {
  const i = s.indexOf(anchor, cursor);
  if (i < 0) {
    console.log("missing:", anchor.trim(), "after", cursor);
    process.exit(1);
  }
  const end = i + anchor.length;
  s = s.slice(0, end) + add + s.slice(end);
  cursor = end + add.length;
}
fs.writeFileSync("lib/i18n.tsx", s);
console.log("ok");
