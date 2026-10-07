import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How We Work | Prop Range Realty",
  description: "Explore the structured real estate sales and marketing process used by Prop Range Realty.",
};

const timelineSteps = [
  "Project Discussion",
  "Project Audit",
  "Market Research",
  "Competitor Analysis",
  "Project Positioning",
  "Pricing Inputs",
  "Sales Strategy",
  "Marketing Plan",
  "Lead Generation",
  "Channel Partner Activation",
  "Site Visits",
  "Follow-ups",
  "Negotiation Support",
  "Sales Closure Support",
  "Performance Review"
];

export default function HowWeWorkPage() {
  return (
    <div className="w-full">
      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">How We Turn Project Potential Into Sales Execution</h1>
          <p className="text-xl text-gray-300">
            A structured, 15-step process designed to accelerate real estate sales.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#F5F5F3]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative border-l-4 border-prr-accent ml-6 md:ml-12 pl-8 md:pl-12 space-y-12">
            {timelineSteps.map((step, idx) => (
              <div key={idx} className="relative group">
                <div className="absolute -left-[42px] md:-left-[58px] top-1 w-8 h-8 rounded-full bg-prr-primary border-4 border-[#F5F5F3] flex items-center justify-center text-xs font-bold text-prr-accent group-hover:scale-110 transition-transform">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow">
                  <h3 className="text-2xl font-bold text-prr-primary">{step}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold mb-8">Let's build a structured roadmap for your project</h2>
          <Button asChild size="lg" variant="accent" className="font-bold text-lg px-10 py-6">
            <Link href="/pitch-your-project">Pitch Your Project</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
