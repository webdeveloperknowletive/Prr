import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "For Builders | Prop Range Realty",
  description: "Learn how Prop Range Realty helps builders with project planning, market positioning, pricing support, and lead generation.",
};

const sections = [
  {
    id: "project-planning",
    title: "Project Planning",
    desc: "We evaluate your project stage, inventory, location, configuration, competition, pricing, target buyers, current sales, and project goals. Then, we build a structured sales roadmap.",
  },
  {
    id: "market-positioning",
    title: "Market Positioning",
    desc: "We help determine whether your project should be positioned as affordable, premium, luxury, investment-focused, family-focused, first-home focused, or lifestyle-focused.",
  },
  {
    id: "pricing-support",
    title: "Pricing Support",
    desc: "We evaluate competitive projects, micro-market rates, configuration, amenities, location, demand, inventory, and buyer behaviour to provide pricing inputs and market feedback.",
  },
  {
    id: "market-competitor-analysis",
    title: "Market & Competitor Analysis",
    desc: "Understanding who is selling what. We analyze best-selling projects, new launches, inventory levels, price range, configurations, offers, market demand, and micro-market positioning.",
  },
  {
    id: "lead-generation",
    title: "Lead Generation",
    desc: "Multi-channel lead sources including digital campaigns, property portals, referrals, events, corporate activities, bank activities, channel partners, and database marketing.",
  },
  {
    id: "digital-marketing",
    title: "Digital Marketing",
    desc: "Comprehensive digital strategies: Google Ads, Meta Ads, Instagram campaigns, landing pages, WhatsApp campaigns, email marketing, retargeting, portal promotions, creative strategy, and campaign analytics.",
  },
];

const cpActivation = [
  "Identify CPs", "Onboard CPs", "Conduct project presentations", 
  "Distribute marketing collateral", "Communicate offers", "Explain payout structures", 
  "Conduct CP meets", "Coordinate CP leads", "Support CP site visits", "Maintain CP communication"
];

export default function ForBuildersPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">How Can PRR Help My Project?</h1>
          <p className="text-xl text-gray-300">
            A structured approach to project marketing, sales, and channel partner management.
          </p>
        </div>
      </section>

      {/* Alternating Sections */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
            {sections.slice(0, 4).map((section, idx) => (
              <div key={section.id} className="bg-[#F5F5F3] p-10 rounded-2xl border border-gray-100">
                <div className="w-12 h-12 bg-prr-primary text-white rounded-full flex items-center justify-center font-bold text-xl mb-6">
                  {idx + 1}
                </div>
                <h2 className="text-2xl font-bold text-prr-primary mb-4">{section.title}</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{section.desc}</p>
              </div>
            ))}
          </div>

          {/* Lead Generation & Marketing */}
          <div className="bg-prr-primary text-white rounded-3xl p-8 md:p-16 mb-24">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Marketing & Lead Acquisition</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-prr-accent mb-6">Lead Generation</h3>
                <p className="text-gray-300 mb-6">We focus on highly qualified leads across multiple sources:</p>
                <ul className="space-y-3">
                  {["Digital campaigns", "Property portals", "Referrals", "Events", "Corporate & Bank activities", "Channel partners"].map(item => (
                    <li key={item} className="flex items-center text-gray-200">
                      <CheckCircle2 className="w-5 h-5 text-prr-accent mr-3" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-prr-accent mb-6">Digital Marketing</h3>
                <p className="text-gray-300 mb-6">Targeted campaigns to drive project awareness and inquiries:</p>
                <ul className="space-y-3">
                  {["Google Ads & Meta Ads", "Instagram campaigns", "Landing pages", "WhatsApp & Email marketing", "Retargeting", "Creative strategy & analytics"].map(item => (
                    <li key={item} className="flex items-center text-gray-200">
                      <CheckCircle2 className="w-5 h-5 text-prr-accent mr-3" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* CP Activation & Site Visits */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
            <div>
              <h2 className="text-3xl font-bold text-prr-primary mb-6">Channel Partner Activation</h2>
              <p className="text-gray-600 mb-8 text-lg">Activating indirect sales channels for maximum reach.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cpActivation.map((item) => (
                  <div key={item} className="flex items-start">
                    <ArrowRight className="w-5 h-5 text-prr-accent mt-1 mr-2 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F5F5F3] p-10 rounded-2xl">
              <h2 className="text-3xl font-bold text-prr-primary mb-6">Site Visit Generation</h2>
              <p className="text-gray-600 mb-8">The goal is not simply lead volume but qualified physical project visits.</p>
              
              <div className="space-y-4">
                {[
                  "Lead Acquisition", "Qualification", "Appointment Booking", 
                  "Site Visit", "Follow-up"
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-prr-primary text-white flex items-center justify-center font-bold text-sm shrink-0">
                      {idx + 1}
                    </div>
                    <div className="w-1 h-12 bg-prr-accent/30 mx-4 hidden sm:block"></div>
                    <div className="bg-white px-6 py-4 rounded-lg shadow-sm border border-gray-100 flex-grow font-semibold text-prr-primary">
                      {step}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sales Support & CRM */}
          <div className="mb-24">
            <h2 className="text-3xl font-bold text-prr-primary text-center mb-12">Sales Execution & Support</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="p-8 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-prr-primary mb-4">Sales Support</h3>
                <p className="text-gray-600">Buyer communication, project presentation, requirement understanding, follow-up, negotiation coordination, and booking assistance.</p>
              </div>
              <div className="p-8 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-prr-primary mb-4">Project Launch</h3>
                <p className="text-gray-600">Pre-launch planning, launch communication, CP activation events, high-impact digital campaigns, and early booking momentum.</p>
              </div>
              <div className="p-8 border border-gray-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-prr-primary mb-4">Sustenance Strategy</h3>
                <p className="text-gray-600">Launch is only the beginning. We continue supporting remaining inventory, lead reactivation, CP engagement, and sales pushes.</p>
              </div>
            </div>
          </div>

          {/* Mandates */}
          <div className="bg-[#F5F5F3] rounded-3xl p-8 md:p-16 mb-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-prr-primary mb-12">Our Sales Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-prr-primary mb-4">Mandate Sales</h3>
                <p className="text-gray-600">A developer can appoint PRR to take structured responsibility for marketing and/or sales of a project or selected inventory.</p>
              </div>
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-2xl font-bold text-prr-primary mb-4">Exclusive Inventory Sales</h3>
                <p className="text-gray-600">PRR may receive dedicated responsibility for selected units, selected towers, specific inventory blocks, specific phases, or special inventory campaigns.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Let PRR Build Your Project Sales Strategy</h2>
          <Button asChild size="lg" variant="accent" className="font-bold text-lg px-10 py-6">
            <Link href="/pitch-your-project">Pitch Your Project</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
