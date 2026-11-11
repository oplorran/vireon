import { SecretLessonClient } from "@/components/SecretLessonClient";

export default async function SecretLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <SecretLessonClient id={id} />;
}
