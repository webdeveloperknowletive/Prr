import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights | Prop Range Realty",
  description: "Real estate industry insights, project marketing strategies, and sales execution advice for developers.",
};

const insights = [
  {
    title: "How Builders Can Improve Project Sales",
    category: "Sales Strategy",
    summary: "Key areas developers must optimize to ensure consistent sales momentum throughout the project lifecycle.",
    date: "Sep 2026",
    image: "/images/blog/strategy.jpg"
  },
  {
    title: "Launch Strategy vs Sustenance Strategy",
    category: "Marketing",
    summary: "Understanding the difference in approach between high-impact pre-launch campaigns and steady inventory clearance.",
    date: "Aug 2026",
    image: "/images/blog/launch.jpg"
  },
  {
    title: "How Channel Partners Influence Real Estate Sales",
    category: "Channel Partners",
    summary: "Why building a strong indirect sales network is crucial for large-scale residential developments.",
    date: "Aug 2026",
    image: "/images/blog/cp.jpg"
  },
  {
    title: "How Developers Should Position a Project",
    category: "Market Research",
    summary: "Strategic decisions in branding, pricing, and messaging that dictate a project's market perception.",
    date: "Jul 2026",
    image: "/images/blog/positioning.jpg"
  },
  {
    title: "Understanding Pune's Micro-Markets",
    category: "Market Intelligence",
    summary: "A deep dive into buyer demographics and demand trends across West, North, and East Pune.",
    date: "Jul 2026",
    image: "/images/blog/pune.jpg"
  },
  {
    title: "What Is a Real Estate Mandate?",
    category: "Business Strategy",
    summary: "Exploring the benefits of appointing a dedicated partner for project marketing and sales execution.",
    date: "Jun 2026",
    image: "/images/blog/mandate.jpg"
  }
];

export default function InsightsPage() {
  return (
    <div className="w-full">
      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Insights & Intelligence</h1>
          <p className="text-xl text-gray-300">
            Professional perspectives on real estate sales, marketing, and market strategy.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#F5F5F3]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {insights.map((article, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
                <div className="h-48 bg-gray-200 relative overflow-hidden flex items-center justify-center">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-prr-accent text-white px-3 py-1 text-xs font-bold rounded">
                    {article.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-gray-400 text-xs mb-3 font-medium uppercase tracking-wider">{article.date}</div>
                  <h3 className="text-xl font-bold text-prr-primary mb-3 leading-snug">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">{article.summary}</p>
                  <Button variant="link" className="px-0 text-prr-accent font-semibold justify-start mt-auto" asChild>
                    <Link href="/contact">Discuss Strategy <ArrowRight className="w-4 h-4 ml-1" /></Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-prr-primary mb-6">Need tailored insights for your project?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Connect with our team for a detailed market analysis and project audit.
          </p>
          <Button asChild size="lg" variant="accent" className="font-bold">
            <Link href="/pitch-your-project">Request Project Audit</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
