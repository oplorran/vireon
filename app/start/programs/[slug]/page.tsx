import { ProgramClient } from "@/components/ProgramClient";

export const metadata = { title: "Program", robots: { index: false } };

export default async function ProgramDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProgramClient slug={slug} />;
}
