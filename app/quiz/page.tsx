import { Quiz } from "@/components/Quiz";

export const metadata = {
  title: "Vireon – Dr Michael Thompson's protocol for men",
};

export default function QuizPage() {
  return (
    <main className="min-h-dvh bg-white">
      <Quiz />
    </main>
  );
}
