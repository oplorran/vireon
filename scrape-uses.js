// Scrape the reference "Ways to use it" lists for every nutrition item.
const fs = require("fs");

const SLUGS = [
  "salmon", "beans", "spinach", "oranges", "tomatoes", "olive-oil", "avocado",
  "walnuts", "oats", "quinoa", "brown-rice", "blueberries", "water",
  "unsweetened-tea", "plain-yogurt",
];

(async () => {
  const out = {};
  for (const slug of SLUGS) {
    const html = await fetch(`https://vireon-max.vercel.app/app/discover/nutrition/${slug}`).then((r) => r.text());
    out[slug] = html.length;
  }
  console.log(JSON.stringify(out, null, 2));
})();
