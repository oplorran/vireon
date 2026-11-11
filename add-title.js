const fs = require("fs");
let s = fs.readFileSync("lib/i18n.tsx", "utf8");
s = s.replace(/\r\n/g, "\n");
const plan = [
  ['  "nav.profile": "Profile",\n', '  "notifications.title": "Notifications",\n'],
  ['  "nav.profile": "Perfil",\n', '  "notifications.title": "Notificações",\n'],
  ['  "nav.profile": "Perfil",\n', '  "notifications.title": "Notificaciones",\n'],
];
let pos = 0;
for (const [anchor, line] of plan) {
  const i = s.indexOf(anchor, pos);
  if (i < 0) {
    console.log("anchor missing after", pos);
    process.exit(1);
  }
  s = s.slice(0, i + anchor.length) + line + s.slice(i + anchor.length);
  pos = i + anchor.length + line.length;
}
fs.writeFileSync("lib/i18n.tsx", s);
console.log("ok");
