import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mandates & Exclusive Sales | Prop Range Realty",
  description: "Focused sales partnerships designed around your project. Learn about PRR's exclusive and non-exclusive real estate mandates.",
};

const benefits = [
  "Dedicated sales focus",
  "Clear responsibility",
  "Channel partner activation",
  "Structured marketing",
  "Better lead servicing",
  "Consistent follow-ups",
  "Faster sales execution",
  "Market feedback",
  "Single-point coordination",
  "Sales accountability",
];

const howItWorks = [
  "Project Discussion",
  "Project Audit",
  "Commercial Discussion",
  "Scope Definition",
  "Marketing & Sales Plan",
  "Team Allocation",
  "Campaign Launch",
  "Lead + CP Execution",
  "Site Visits",
  "Closures",
  "Performance Review"
];

export default function MandatesPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Focused Sales Partnerships Designed Around Your Project</h1>
          <div className="bg-white/10 p-8 rounded-xl border border-white/20 mt-12 backdrop-blur-sm text-left">
            <h3 className="text-prr-accent text-sm font-bold tracking-widest uppercase mb-2">What is a real estate mandate?</h3>
            <p className="text-xl md:text-2xl font-light italic leading-relaxed">
              "A mandate is a structured business arrangement where a developer appoints a sales/marketing partner to manage agreed responsibilities for the project or selected inventory."
            </p>
          </div>
        </div>
      </section>

      {/* Types of Mandates */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F5F5F3] p-10 rounded-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-prr-primary mb-4">Exclusive Mandate</h3>
              <p className="text-gray-700">PRR receives exclusive or primary responsibility for agreed project sales/marketing responsibilities. One dedicated partner driving your complete sales engine.</p>
            </div>
            
            <div className="bg-[#F5F5F3] p-10 rounded-2xl border border-gray-100">
              <h3 className="text-2xl font-bold text-prr-primary mb-4">Non-Exclusive Mandate</h3>
              <p className="text-gray-700">PRR works alongside other appointed agencies or partners to bring additional sales volume and market reach to your project.</p>
            </div>
            
            <div className="bg-prr-primary text-white p-10 rounded-2xl border border-prr-primary shadow-lg">
              <h3 className="text-2xl font-bold text-prr-accent mb-4">Inventory Mandate</h3>
              <p className="text-gray-300 mb-6">PRR receives specific responsibility for targeted inventory to market and sell:</p>
              <ul className="space-y-3">
                {["Specific units", "Specific towers", "Specific phases", "Specific inventory blocks"].map((item) => (
                  <li key={item} className="flex items-center text-gray-200">
                    <CheckCircle2 className="w-5 h-5 text-prr-accent mr-3" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-[#F5F5F3]">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-prr-primary text-center mb-16">Why Appoint a Mandate Partner?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-8">
            {benefits.map((benefit) => (
              <div key={benefit} className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                <CheckCircle2 className="w-6 h-6 text-prr-accent mr-4 shrink-0" />
                <span className="font-semibold text-gray-800">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl md:text-5xl font-bold text-prr-primary text-center mb-16">How It Works</h2>
          
          <div className="relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0"></div>
            
            <div className="flex flex-col md:flex-row flex-wrap justify-center gap-6 relative z-10">
              {howItWorks.map((step, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="w-12 h-12 rounded-full bg-[#F5F5F3] border-2 border-prr-primary text-prr-primary flex items-center justify-center font-bold mb-3 group-hover:bg-prr-primary group-hover:text-white transition-colors">
                    {idx + 1}
                  </div>
                  <div className="bg-white px-4 py-2 rounded shadow-sm border border-gray-100 text-sm font-medium text-gray-700 text-center max-w-[140px]">
                    {step}
                  </div>
                  {idx < howItWorks.length - 1 && (
                    <ArrowRight className="md:hidden w-6 h-6 text-gray-300 my-3" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Discuss a Mandate With PRR</h2>
          <Button asChild size="lg" variant="accent" className="font-bold text-lg px-10 py-6">
            <Link href="/contact">Contact Our Team</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
