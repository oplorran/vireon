const pages = [
  "/app/profile/completed",
  "/app/profile/help",
  "/app/profile/disclaimer",
  "/app/profile/terms",
  "/app/profile/privacy",
  "/app/profile/delete",
];
(async () => {
  for (const p of pages) {
    const r = await fetch("https://vireon-max.vercel.app" + p);
    const html = await r.text();
    const stripped = html.replace(/<script[\s\S]*?<\/script>/g, "");
    const main = stripped.split('id="content"')[1] || stripped;
    const text = main.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").slice(0, 700);
    console.log("=== " + p + " ===\n" + text + "\n");
  }
})();
