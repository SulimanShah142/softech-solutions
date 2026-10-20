
import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy | SofTech Solutions",
  description:
    "Learn how SofTech Solutions handles information submitted through its website, including inquiries, data sharing, retention, and privacy requests.",
};

export default function PrivacyPage() {
  return <LegalPage document="privacy" />;
}
