import { Thanks } from "@/components/Thanks";

export const metadata = {
  title: "Thank you for your purchase",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <main>
      <Thanks />
    </main>
  );
}
