const fs = require("fs");
const c = fs.readFileSync("ref-quiz.js", "utf8");
const needle = process.argv[2];
const back = Number(process.argv[3] || 0);
const fwd = Number(process.argv[4] || 2000);
const i = c.indexOf(needle);
if (i === -1) {
  console.log("not found:", needle);
  process.exit(1);
}
const start = Math.max(0, i - back);
console.log(c.slice(start, i + fwd));
