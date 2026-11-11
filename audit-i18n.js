// One-off audit: every t("key") used in components must exist in EN, PT and ES.
const fs = require("fs");
const path = require("path");

const src = fs.readFileSync("lib/i18n.tsx", "utf8");
const block = (name) => {
  const i = src.indexOf(`const ${name}: Record<string, string> = {`);
  const j = src.indexOf("\n};", i);
  return src.slice(i, j);
};
const dicts = { EN: block("EN"), PT: block("PT"), ES: block("ES") };
const has = (d, k) => d.includes(`"${k}":`);

const files = [];
(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === "node_modules" || e.name === ".next") continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.tsx?$/.test(e.name)) files.push(p);
  }
})(".");

const used = new Set();
for (const f of files) {
  const text = fs.readFileSync(f, "utf8");
  for (const m of text.matchAll(/\bt\(\s*"([a-zA-Z0-9_.]+)"/g)) used.add(m[1]);
  for (const m of text.matchAll(/titleKey="([^"]+)"/g)) used.add(m[1]);
  for (const m of text.matchAll(/(?:emptyKey|textKey)="([^"]+)"/g)) used.add(m[1]);
  for (const m of text.matchAll(/titleKey: "([^"]+)"/g)) used.add(m[1]);
  for (const m of text.matchAll(/(?:emptyKey|textKey): "([^"]+)"/g)) used.add(m[1]);
}

for (const [name, dict] of Object.entries(dicts)) {
  const miss = [...used].filter((k) => !has(dict, k));
  console.log(`${name}: ${miss.length ? "MISSING " + miss.join(", ") : "ok"}`);
}
