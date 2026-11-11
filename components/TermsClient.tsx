"use client";

import { LegalPage } from "@/components/LegalPage";

export function TermsClient() {
  return <LegalPage titleKey="terms.title" prefix="terms" paragraphs={7} />;
}
