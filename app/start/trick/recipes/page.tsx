import { RecipesClient } from "@/components/RecipesClient";

export const metadata = { title: "Recipes", robots: { index: false } };

export default function RecipesPage() {
  return <RecipesClient />;
}
