import { Hero } from "@/components/home/Hero";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle2, TrendingUp, Users, Target, Rocket, RefreshCw, Handshake, MapPin, UserCheck, Boxes, Network, PhoneCall, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { HomeProjects } from "@/components/home/HomeProjects";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      
      {/* SECTION 2: BUSINESS VALUE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="text-3xl md:text-5xl font-bold text-prr-primary mb-6">More Than a Real Estate Agency</h2>
          <p className="text-lg text-gray-600 mb-12">
            PRR does not just bring leads. We support developers from project strategy and market positioning to marketing, channel partner activation, site visits and sales closure.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
            {["Project Sales", "Mandate Sales", "Lead Generation", "Channel Partner Management", "Digital Marketing", "CRM & Follow-up", "Launch Strategy", "Sales Execution"].map((item) => (
              <div key={item} className="flex items-center space-x-2 bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-prr-accent" />
                <span className="font-medium text-gray-800 text-sm md:text-base">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WHY BUILDERS WORK WITH PRR */}
      <section className="py-24 bg-[#F5F5F3]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-prr-primary mb-4">Built Around Developer Growth</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Structured execution across the entire project lifecycle.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Local Market Intelligence", desc: "Deep understanding of Pune's micro-markets and buyer demographics.", icon: <Target className="w-8 h-8 text-prr-accent mb-4" /> },
              { title: "Structured Sales Strategy", desc: "Data-driven approach to pricing, inventory release, and sales acceleration.", icon: <TrendingUp className="w-8 h-8 text-prr-accent mb-4" /> },
              { title: "Channel Partner Network", desc: "Strong relationships with active CP networks across Pune.", icon: <Handshake className="w-8 h-8 text-prr-accent mb-4" /> },
              { title: "Lead Management", desc: "Rigorous follow-up protocols to convert inquiries into site visits.", icon: <Users className="w-8 h-8 text-prr-accent mb-4" /> },
              { title: "Launch Execution", desc: "High-impact strategies to maximize initial booking momentum.", icon: <Rocket className="w-8 h-8 text-prr-accent mb-4" /> },
              { title: "Sustenance Strategy", desc: "Continuous marketing efforts to clear remaining inventory post-launch.", icon: <RefreshCw className="w-8 h-8 text-prr-accent mb-4" /> },
            ].map((card, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                {card.icon}
                <h3 className="text-xl font-bold text-prr-primary mb-3">{card.title}</h3>
                <p className="text-gray-600">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: BUILDER SALES CHALLENGES */}
      <section className="py-24 text-white relative overflow-hidden" style={{
        background: `radial-gradient(circle at 50% 10%, rgba(0, 174, 239, 0.09), transparent 35%), radial-gradient(circle at 50% 100%, rgba(201, 169, 110, 0.08), transparent 30%), #101827`
      }}>
        {/* Subtle connector design element */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-[900px] mx-auto flex flex-col items-center relative z-10">
            <span className="text-[#C9A96E] text-xs md:text-sm font-bold tracking-widest uppercase mb-4 opacity-90">Builder Sales Challenges</span>
            <h2 className="text-[30px] sm:text-[36px] md:text-[44px] lg:text-[58px] font-bold mb-6 leading-[1.1]">
              Every Project Has a Sales Challenge.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#C9A96E]">We Build the Strategy Around It.</span>
            </h2>
            <p className="text-[#B8C0CC] text-[16px] md:text-[18px] max-w-[720px] leading-relaxed">
              From launch momentum to lead quality and inventory movement, PRR builds focused strategies around the challenges developers face.
            </p>
          </div>
          
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[24px] mb-20 relative z-10">
            {[
              { title: "Project Launch Not Getting Momentum", desc: "Build stronger launch visibility and early sales traction.", icon: <Rocket className="w-6 h-6 text-[#00AEEF] group-hover:text-[#C9A96E] transition-colors" />, highlight: false },
              { title: "Low Qualified Leads", desc: "Focus campaigns toward higher-intent buyer enquiries.", icon: <UserCheck className="w-6 h-6 text-[#00AEEF] group-hover:text-[#C9A96E] transition-colors" />, highlight: false },
              { title: "Low Site Visit Conversion", desc: "Improve qualification, follow-up and site visit movement.", icon: <MapPin className="w-6 h-6 text-[#00AEEF] group-hover:text-[#C9A96E] transition-colors" />, highlight: false },
              { title: "Large Unsold Inventory", desc: "Create focused strategies to move remaining inventory.", icon: <Boxes className="w-6 h-6 text-[#00AEEF] group-hover:text-[#C9A96E] transition-colors" />, highlight: false },
              { title: "Weak Channel Partner Network", desc: "Activate stronger CP participation and project reach.", icon: <Network className="w-6 h-6 text-[#00AEEF] group-hover:text-[#C9A96E] transition-colors" />, highlight: false },
              { title: "Poor Lead Follow-up", desc: "Create a structured lead nurturing and follow-up process.", icon: <PhoneCall className="w-6 h-6 text-[#00AEEF] group-hover:text-[#C9A96E] transition-colors" />, highlight: false },
              { title: "Incorrect Market Positioning", desc: "Align pricing, audience and communication with market demand.", icon: <Target className="w-6 h-6 text-[#00AEEF] group-hover:text-[#C9A96E] transition-colors" />, highlight: false },
              { title: "Need Dedicated Mandate Partner", desc: "Build focused sales accountability through a structured mandate.", icon: <Handshake className="w-6 h-6 text-[#00AEEF] group-hover:text-[#C9A96E] transition-colors" />, highlight: true }
            ].map((card, idx) => (
              <div 
                key={idx} 
                className={`group relative bg-[#1B2434]/40 border ${card.highlight ? 'border-[#C9A96E]/40' : 'border-white/10'} rounded-[20px] p-[28px] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#00AEEF]/35 hover:bg-[#1B2434]/60`}
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 12px 30px rgba(0,0,0,0.16)",
                  ...(card.highlight ? {boxShadow: "inset 0 1px 0 rgba(201,169,110,0.1), 0 12px 30px rgba(0,0,0,0.16)"} : {})
                }}
              >
                {/* Internal Glow on Hover */}
                <div className="absolute inset-0 rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: "0 16px 40px rgba(0,174,239,0.10)" }} />

                {card.highlight && (
                  <div className="absolute -top-3 right-6 bg-[#C9A96E] text-[#101827] text-[10px] font-bold px-2 py-1 rounded-sm tracking-wider">
                    PRR CORE SOLUTION
                  </div>
                )}
                
                <div className="flex justify-between items-start mb-6">
                  <div className="w-[48px] h-[48px] rounded-xl bg-[#00AEEF]/10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                    {card.icon}
                  </div>
                  <span className="text-white/20 font-bold text-xl group-hover:text-white/40 transition-colors">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
                
                <h3 className="text-[18px] font-bold text-white mb-3 group-hover:text-[#00AEEF] transition-colors">
                  {card.title}
                </h3>
                <p className="text-[#B8C0CC] text-[14px] leading-relaxed mb-4">
                  {card.desc}
                </p>

                <ArrowUpRight className="absolute bottom-6 right-6 w-5 h-5 text-white/10 group-hover:text-[#C9A96E] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
              </div>
            ))}
          </div>
          
          {/* CTA SECTION */}
          <div className="relative z-10 max-w-[800px] mx-auto text-center border-t border-white/10 pt-16">
            <h3 className="text-[24px] md:text-[28px] font-bold text-white mb-4">Facing One of These Challenges?</h3>
            <p className="text-[#B8C0CC] text-[16px] md:text-[18px] mb-8">
              Let’s discuss your project and build a focused sales strategy around it.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="w-full sm:w-auto font-bold px-8 py-6 bg-[#C9A96E] hover:bg-[#b5955a] text-white rounded-md shadow-md hover:shadow-[0_8px_20px_rgba(201,169,110,0.2)] hover:-translate-y-0.5 transition-all duration-300 border-none">
                <Link href="/pitch-your-project">Discuss Your Project &rarr;</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="w-full sm:w-auto font-bold px-8 py-6 bg-transparent border-white/20 text-white hover:bg-white/10 transition-all duration-300">
                <Link href="/how-we-work">Explore How We Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FEATURED PROJECTS */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-prr-primary mb-4">Our Portfolio</h2>
              <p className="text-lg text-gray-600">Selected real estate projects marketed and sold by PRR.</p>
            </div>
            <Button asChild variant="outline" className="hidden md:flex">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
          
          <HomeProjects initialProjects={projects.slice(0, 3)} />
          
          <div className="mt-10 text-center md:hidden">
            <Button asChild variant="outline">
              <Link href="/projects">View All Projects</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 7: MANDATES */}
      <section className="py-24 bg-prr-primary text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Focused Sales.<br/>Clear Accountability.<br/>Stronger Execution.</h2>
            <p className="text-gray-300 text-lg mb-8 max-w-lg">
              Appoint Prop Range Realty as your exclusive or non-exclusive mandate partner to manage your project's complete sales and marketing lifecycle.
            </p>
            <Button asChild variant="accent" size="lg">
              <Link href="/mandates">Explore Mandate Services</Link>
            </Button>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg text-center backdrop-blur-sm">
              <h4 className="text-xl font-bold text-prr-accent mb-2">Exclusive</h4>
              <p className="text-sm text-gray-300">Complete project sales responsibility</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg text-center backdrop-blur-sm">
              <h4 className="text-xl font-bold text-prr-accent mb-2">Inventory</h4>
              <p className="text-sm text-gray-300">Targeted tower or phase sales</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg text-center backdrop-blur-sm">
              <h4 className="text-xl font-bold text-prr-accent mb-2">Sustenance</h4>
              <p className="text-sm text-gray-300">Clearing unsold inventory</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-lg text-center backdrop-blur-sm">
              <h4 className="text-xl font-bold text-prr-accent mb-2">Launch</h4>
              <p className="text-sm text-gray-300">High-impact pre-launch momentum</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11: FINAL CTA */}
      <section className="py-32 bg-[#F5F5F3] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-prr-accent/5 -skew-x-12 transform translate-x-32" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-prr-primary mb-6">Have a Project to Launch or Inventory to Move?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Let's build the right positioning, marketing and sales strategy for your project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button asChild size="lg" variant="accent" className="font-bold text-lg px-8 py-6">
              <Link href="/pitch-your-project">Pitch Your Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="font-bold text-lg px-8 py-6 border-prr-primary text-prr-primary hover:bg-prr-primary hover:text-white transition-colors">
              <Link href="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
