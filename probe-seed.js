// Adjust the program seed slugs to the slugs that really exist in lib/content.ts.
const fs = require("fs");
const p = "lib/programs.ts";
let s = fs.readFileSync(p, "utf8");
const map = {
  "sleep-and-recovery": "sleep-fundamentals",
  "brisk-walking": "brisk-walk",
  "bodyweight-squat": "sit-to-stand",
  "overnight-oats": "oats",
};
for (const [from, to] of Object.entries(map)) s = s.split(`slug: "${from}"`).join(`slug: "${to}"`);
fs.writeFileSync(p, s);
console.log("done");
