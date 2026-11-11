import { RecipeClient } from "@/components/RecipeClient";

export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <RecipeClient id={id} />;
}
