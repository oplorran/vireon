import { ProgramEditor } from "@/components/ProgramEditor";

export const metadata = { title: "Edit program · Admin", robots: { index: false } };

export default async function ProgramEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProgramEditor programId={id} />;
}
