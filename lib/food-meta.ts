/** Static companions for the nutrition library, mirrored from the reference. */
export const FOOD_USES: Record<string, string[]> = {
  salmon: [
    "Bake a fillet with vegetables and potatoes.",
    "Flake leftovers onto a salad.",
    "Pair with beans or whole grains rather than making fish the whole plate.",
  ],
  beans: [
    "Add a scoop to a grain bowl.",
    "Simmer lentils into a vegetable soup.",
    "Mash beans with olive oil as a spread.",
  ],
  spinach: [
    "Wilt a handful into eggs.",
    "Use as the base of a bowl.",
    "Add to lentil soup near the end of cooking.",
  ],
  oranges: ["Eat it whole as a snack.", "Add segments to a salad.", "Pair with yogurt or nuts."],
  tomatoes: [
    "Roast a tray with other vegetables.",
    "Add to a bean stew.",
    "Use fresh slices beside eggs.",
  ],
  "olive-oil": [
    "Dress a salad.",
    "Finish a vegetable soup.",
    "Use a measured spoon when roasting vegetables.",
  ],
  avocado: [
    "Slice onto eggs or beans.",
    "Add to a grain bowl.",
    "Mash a small amount onto whole-grain toast.",
  ],
  walnuts: [
    "Stir into oatmeal.",
    "Pair with fruit.",
    "Chop over a salad or roasted vegetables.",
  ],
  oats: [
    "Cook with milk or fortified soy drink and add berries.",
    "Make overnight oats.",
    "Use leftovers as a base and add nuts.",
  ],
  quinoa: ["Use as the base of a lunch bowl.", "Stir into soup.", "Serve under roasted vegetables and beans."],
  "brown-rice": ["Serve beside salmon and greens.", "Mix with beans and salsa.", "Cool and use in a lunch bowl."],
  blueberries: [
    "Add to oats or yogurt.",
    "Eat a handful as a snack.",
    "Freeze them and blend into a smoothie with milk and oats.",
  ],
  water: [
    "Keep a glass with meals.",
    "Drink with activity.",
    "Use sparkling water if that helps you skip sweetened drinks.",
  ],
  "unsweetened-tea": [
    "Brew a pot with lunch.",
    "Choose a caffeine-free infusion in the evening.",
    "Skip the syrups and sweetened mixes.",
  ],
  "plain-yogurt": [
    "Top with berries and a few walnuts.",
    "Use as a sauce with herbs instead of mayonnaise.",
    "Pair with oats.",
  ],
};

/** Food slug → related recipe slugs. */
export const FOOD_RECIPES: Record<string, string[]> = {
  salmon: ["salmon-plate"],
  spinach: ["veggie-scramble", "lentil-soup"],
  tomatoes: ["chickpea-bowl", "lentil-soup"],
  "olive-oil": ["veggie-scramble", "chickpea-bowl", "chicken-grain-bowl"],
  avocado: ["salmon-plate"],
  walnuts: ["berry-oat-bowl", "yogurt-cup", "apple-walnut-snack"],
  oats: ["berry-oat-bowl"],
  quinoa: ["chickpea-bowl"],
  "brown-rice": ["chickpea-bowl", "chicken-grain-bowl", "salmon-plate"],
  blueberries: ["berry-oat-bowl"],
  "unsweetened-tea": ["berry-oat-bowl"],
  "plain-yogurt": ["yogurt-cup"],
};
