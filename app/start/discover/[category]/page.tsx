import { CategoryClient } from "@/components/CategoryClient";

export const metadata = { title: "Discover", robots: { index: false } };

export default async function DiscoverCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return <CategoryClient category={category} />;
}
