import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Terms",
  description: "SofTech Solutions basic terms draft for review.",
};

export default function TermsPage() {
  return <LegalPage document="terms" />;
}
