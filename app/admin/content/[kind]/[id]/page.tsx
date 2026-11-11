import { ItemEditor } from "@/components/ItemEditor";
import type { Kind } from "@/lib/adminStore";

export const metadata = { title: "Edit item · Admin", robots: { index: false } };

export default async function ItemPage({
  params,
}: {
  params: Promise<{ kind: string; id: string }>;
}) {
  const { kind, id } = await params;
  return <ItemEditor kind={kind as Kind} itemId={id} />;
}
