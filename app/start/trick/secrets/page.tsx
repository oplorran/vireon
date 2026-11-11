import { SecretsClient } from "@/components/SecretsClient";

export const metadata = { title: "Secrets", robots: { index: false } };

export default function SecretsPage() {
  return <SecretsClient />;
}
