"use client";

import { LegalPage } from "@/components/LegalPage";

export function DisclaimerClient() {
  return <LegalPage titleKey="disclaimer.title" prefix="disclaimer" paragraphs={5} />;
}
