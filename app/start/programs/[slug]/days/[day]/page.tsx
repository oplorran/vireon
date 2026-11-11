import { ProgramDayClient } from "@/components/ProgramDayClient";

export const metadata = { title: "Day", robots: { index: false } };

export default async function ProgramDayPage({ params }: { params: Promise<{ slug: string; day: string }> }) {
  const { slug, day } = await params;
  return <ProgramDayClient slug={slug} day={Number(day)} />;
}
