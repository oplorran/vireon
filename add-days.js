const fs = require("fs");
let s = fs.readFileSync("lib/i18n.tsx", "utf8").replace(/\r\n/g, "\n");

const blocks = [
  [
    '  "progress.lessons": "Program lessons",\n',
    `  "progress.day.w": "W",
  "progress.day.t": "T",
  "progress.day.f": "F",
  "progress.day.s": "S",
  "progress.day.s2": "S",
  "progress.day.m": "M",
  "progress.day.t2": "T",
`,
  ],
  [
    '  "progress.lessons": "Lições do programa",\n',
    `  "progress.day.w": "S",
  "progress.day.t": "T",
  "progress.day.f": "Q",
  "progress.day.s": "Q",
  "progress.day.s2": "S",
  "progress.day.m": "S",
  "progress.day.t2": "D",
`,
  ],
  [
    '  "progress.lessons": "Lecciones del programa",\n',
    `  "progress.day.w": "L",
  "progress.day.t": "M",
  "progress.day.f": "X",
  "progress.day.s": "J",
  "progress.day.s2": "V",
  "progress.day.m": "S",
  "progress.day.t2": "D",
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
