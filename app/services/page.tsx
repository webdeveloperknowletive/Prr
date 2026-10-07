import type { Metadata } from "next";
import Link from "next/link";
import { ServicePresentation } from "@/components/services/ServicePresentation";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Core Services Presentation | Prop Range Realty",
  description:
    "Explore Prop Range Realty's 11 core real estate capabilities: consulting and valuation, project planning, strategic alliances, transactions, property management, financial services, lead management, CRM, omnichannel lead generation, industry events, and CP acquisition.",
  openGraph: {
    title: "Prop Range Realty — Core Services Presentation",
    description:
      "Interactive presentation of Prop Range Realty's 11 strategic core services for developers, promoters, and real estate partners.",
  },
};

export default function ServicesPage() {
  return (
    <div className="w-full bg-[#081423]">
      {/* Interactive Service Presentation Stage */}
      <ServicePresentation />

      {/* APPROVED PRR CTA SECTION */}
      <section className="py-24 bg-[#F5F5F3] relative overflow-hidden text-center border-t border-gray-200">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[#C9A96E]/5 -skew-x-12 transform translate-x-32 pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1.5px] bg-[#C9A96E]" />
            <span className="text-[#C9A96E] font-bold text-xs tracking-widest uppercase">
              NEXT STEP FOR DEVELOPERS
            </span>
            <span className="w-6 h-[1.5px] bg-[#C9A96E]" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-prr-primary mb-5 leading-tight">
            Have a Project to Launch or Inventory to Move?
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let's discuss how our 11 core services can be tailored to meet your
            development's unique sales, positioning, and marketing goals.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Button
              asChild
              size="lg"
              className="w-full sm:w-auto font-bold text-sm tracking-wider uppercase px-8 py-6 bg-[#C9A96E] hover:bg-[#b89555] text-white rounded-md shadow-md hover:shadow-[0_8px_20px_rgba(201,169,110,0.25)] hover:-translate-y-0.5 transition-all duration-300 border-none cursor-pointer"
            >
              <Link href="/pitch-your-project">Pitch Your Project</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="w-full sm:w-auto font-bold text-sm tracking-wider uppercase px-8 py-6 border-prr-primary text-prr-primary hover:bg-prr-primary hover:text-white transition-colors cursor-pointer"
            >
              <Link href="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
