import { CourseClient } from "@/components/CourseClient";

export default async function CoursePage({ params }: { params: Promise<{ course: string }> }) {
  const { course } = await params;
  return <CourseClient slug={course} />;
}
