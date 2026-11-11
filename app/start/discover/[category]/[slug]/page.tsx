import { ItemClient } from "@/components/ItemClient";

export const metadata = { title: "Discover", robots: { index: false } };

export default async function DiscoverItemPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  return <ItemClient category={category} slug={slug} />;
}
