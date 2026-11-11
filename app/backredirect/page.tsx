import { BackRedirect } from "@/components/BackRedirect";

export const metadata = {
  title: "Vireon — Wait, your price dropped",
  robots: { index: false, follow: false },
};

export default function BackRedirectPage() {
  return (
    <main>
      <BackRedirect />
    </main>
  );
}
