import type { Metadata } from "next";
import { PitchProjectForm } from "@/components/pitch/PitchProjectForm";

export const metadata: Metadata = {
  title: "Pitch Your Project | Prop Range Realty",
  description: "Share your real estate project's details with Prop Range Realty to discuss a strategic sales and marketing partnership.",
};

export default function PitchProjectPage() {
  return (
    <div className="w-full bg-[#F5F5F3]">
      {/* Hero Section */}
      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Tell Us About Your Project</h1>
          <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Share your project's current stage, inventory and sales challenges. Our team will review the opportunity and connect with you to discuss the right sales and marketing approach.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 pb-32">
        <div className="container mx-auto px-4 max-w-4xl">
          <PitchProjectForm />
        </div>
      </section>
    </div>
  );
}
