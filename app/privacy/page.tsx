import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy",
  description: "SofTech Solutions basic privacy policy draft for review.",
};

export default function PrivacyPage() {
  return <LegalPage document="privacy" />;
}
