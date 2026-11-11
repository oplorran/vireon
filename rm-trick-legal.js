const fs = require("fs");
let s = fs.readFileSync("lib/i18n.tsx", "utf8").replace(/\r\n/g, "\n");
s = s.replace(/^ {2}"trick\.legal\.line":\n {4}"[^"]*",\n/gm, "");
fs.writeFileSync("lib/i18n.tsx", s);
console.log(fs.readFileSync("lib/i18n.tsx", "utf8").includes("trick.legal.line") ? "still present" : "removed");
