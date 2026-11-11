const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
// Extract just the main content of each candidate page from a captured HTML dump.
const dumps = fs.readdirSync(".refdumps").filter((f) => f.endsWith(".html"));
for (const f of dumps) {
  const html = fs.readFileSync(path.join(".refdumps", f), "utf8");
  const i = html.indexOf('id="content"');
  const main = i >= 0 ? html.slice(i) : html;
  const text = main.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 900);
  console.log("=== " + f + " ===\n" + text + "\n");
}
