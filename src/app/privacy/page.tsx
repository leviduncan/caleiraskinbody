import type { Metadata } from "next";
import { privacyPolicy } from "@/content/legal";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: privacyPolicy.seo.title,
  description: privacyPolicy.seo.description,
};

export default function PrivacyPage() {
  return <LegalPage document={privacyPolicy} />;
}
