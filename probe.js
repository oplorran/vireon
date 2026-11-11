const fs = require("fs");
const s = fs.readFileSync(".refbundle/app.js", "utf8");
const needle = process.argv[2];
const ctxBefore = Number(process.argv[3] || 800);
const ctxAfter = Number(process.argv[4] || 1600);
let i = s.indexOf(needle);
let n = 0;
while (i > -1 && n < 5) {
  console.log("=== " + i);
  console.log(s.slice(Math.max(0, i - ctxBefore), i + ctxAfter));
  i = s.indexOf(needle, i + needle.length);
  n++;
}
