import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Prop Range Realty | Strategic Sales Partner",
  description: "Prop Range Realty is a professional real estate sales, marketing, mandate, and project advisory organization.",
};

export default function AboutPage() {
  return <AboutClient />;
}
