const fs = require("fs");
let s = fs.readFileSync("lib/i18n.tsx", "utf8").replace(/\r\n/g, "\n");
const plan = [
  [
    '    "Open Profile, then Delete my account. You will confirm with the word DELETE. This removes your personal progress from this server.",\n',
    '  "help.emergency":\n    "If you are in immediate danger, contact local emergency services. In the United States you can call or text 988 for a mental-health crisis.",\n',
  ],
  [
    '    "Não. É educação para adultos. Sintomas persistentes pertencem a um clínico qualificado. Sintomas de emergência pertencem ao serviço de emergência.",\n',
    '  "help.emergency":\n    "Se você estiver em perigo imediato, contate os serviços de emergência locais. Nos Estados Unidos você pode ligar ou mandar mensagem para 988 em crise de saúde mental.",\n',
  ],
  [
    '    "No. Es educación para adultos. Los síntomas persistentes pertenecen a un clínico cualificado. Los síntomas de emergencia pertenecen a los servicios de emergencia.",\n',
    '  "help.emergency":\n    "Si estás en peligro inmediato, contacta los servicios de emergencia locales. En Estados Unidos puedes llamar o enviar un mensaje al 988 en una crisis de salud mental.",\n',
  ],
];
for (let k = plan.length - 1; k >= 0; k--) {
  const [anchor, line] = plan[k];
  const i = s.indexOf(anchor);
  if (i < 0) {
    console.log("anchor missing:", JSON.stringify(anchor.slice(0, 70)));
    process.exit(1);
  }
  s = s.slice(0, i + anchor.length) + line + s.slice(i + anchor.length);
}
fs.writeFileSync("lib/i18n.tsx", s);
console.log("ok");
