import { LibraryClient } from "@/components/LibraryClient";
import type { Kind } from "@/lib/adminStore";

export const metadata = { title: "Library · Admin", robots: { index: false } };

export default async function LibraryPage({ params }: { params: Promise<{ kind: string }> }) {
  const { kind } = await params;
  return <LibraryClient kind={kind as Kind} />;
}
