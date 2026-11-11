import { LessonClient } from "@/components/LessonClient";

export default async function LessonPage({ params }: { params: Promise<{ course: string; slug: string }> }) {
  const { course, slug } = await params;
  return <LessonClient courseSlug={course} lessonSlug={slug} />;
}
