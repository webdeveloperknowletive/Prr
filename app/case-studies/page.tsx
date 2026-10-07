import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies | Prop Range Realty",
  description: "Real estate sales performance and strategic marketing case studies by Prop Range Realty.",
};

const caseStudies = [
  {
    project: "Premium Residential Development",
    location: "West Pune",
    challenge: "Project was struggling with low site visits and poor channel partner engagement despite a prime location.",
    strategy: "Repositioned the project messaging, restructured CP payouts, and launched a targeted digital campaign focusing on lifestyle amenities.",
    services: ["Project Positioning", "CP Activation", "Digital Marketing"],
    execution: "Conducted 3 targeted CP meets, redesigned landing pages, and implemented strict 15-minute lead follow-up SLA.",
    result: "Performance details to be updated by PRR.",
    feedback: "Performance details to be updated by PRR."
  },
  {
    project: "Township Project Launch",
    location: "North Pune",
    challenge: "Required massive initial momentum for a large-scale project launch in a highly competitive micro-market.",
    strategy: "Implemented a 3-phase pre-launch tease strategy combined with an exclusive inventory allocation for top-performing CPs.",
    services: ["Launch Strategy", "Lead Generation", "Sales Execution"],
    execution: "Managed entire launch event logistics, generated high-intent buyer pool, and coordinated spot-closures.",
    result: "Performance details to be updated by PRR.",
    feedback: "Performance details to be updated by PRR."
  }
];

export default function CaseStudiesPage() {
  return (
    <div className="w-full">
      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Case Studies</h1>
          <p className="text-xl text-gray-300">
            How PRR turns sales challenges into successful project execution.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#F5F5F3]">
        <div className="container mx-auto px-4 max-w-5xl space-y-16">
          {caseStudies.map((cs, idx) => (
            <div key={idx} className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-gray-100">
              <div className="border-b pb-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-end">
                <div>
                  <div className="text-prr-accent font-bold tracking-wider text-sm mb-2 uppercase">{cs.location}</div>
                  <h2 className="text-3xl font-bold text-prr-primary">{cs.project}</h2>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Project Situation / Challenge</h4>
                    <p className="text-gray-600 leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">PRR Strategy</h4>
                    <p className="text-gray-600 leading-relaxed">{cs.strategy}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Services Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {cs.services.map(s => (
                        <span key={s} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Execution</h4>
                    <p className="text-gray-600 leading-relaxed">{cs.execution}</p>
                  </div>
                  <div className="bg-[#F5F5F3] p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-prr-primary mb-2">Result</h4>
                    <p className="text-gray-600 italic">{cs.result}</p>
                  </div>
                  <div className="bg-[#F5F5F3] p-6 rounded-xl">
                    <h4 className="text-lg font-bold text-prr-primary mb-2">Client Feedback</h4>
                    <p className="text-gray-600 italic">{cs.feedback}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-bold text-prr-primary mb-8">Want to become our next success story?</h2>
          <Button asChild size="lg" variant="accent" className="font-bold text-lg">
            <Link href="/pitch-your-project">Pitch Your Project</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
