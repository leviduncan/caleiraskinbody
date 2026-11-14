import type { Metadata } from "next";
import { termsAndConditions } from "@/content/legal";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: termsAndConditions.seo.title,
  description: termsAndConditions.seo.description,
};

export default function TermsPage() {
  return <LegalPage document={termsAndConditions} />;
}
