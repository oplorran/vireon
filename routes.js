const fs = require("fs");
const s = fs.readFileSync(".refbundle/app.js", "utf8");
const pat = process.argv[2];
const before = Number(process.argv[3] || 300);
const after = Number(process.argv[4] || 300);
const max = Number(process.argv[5] || 5);
let i = s.indexOf(pat);
let c = 0;
while (i > -1 && c < max) {
  console.log("---", c, "at", i, "---");
  console.log(s.slice(Math.max(0, i - before), i + after));
  i = s.indexOf(pat, i + 1);
  c++;
}
if (c === 0) console.log("NOT FOUND");
