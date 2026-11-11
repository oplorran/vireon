const fs = require("fs");
const s = fs.readFileSync("ref-quiz.js", "utf8");
const i = s.indexOf("Questions before you begin");
console.log(JSON.stringify(s.slice(i - 400, i + 2600)));
