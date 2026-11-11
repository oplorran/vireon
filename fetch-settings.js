(async () => {
  const r = await fetch("https://vireon-max.vercel.app/app/profile/settings");
  const html = await r.text();
  const stripped = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<style[\s\S]*?<\/style>/g, "");
  const idx = stripped.indexOf('id="content"');
  const main = stripped.slice(idx > 0 ? idx : 0);
  console.log(main.slice(0, 12000));
})();
