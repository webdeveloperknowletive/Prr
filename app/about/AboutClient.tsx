"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Building2, Users, Target, ShieldCheck, Map, Handshake, 
  MoveRight, ArrowDown, Activity, CheckCircle, Compass, TrendingUp, Briefcase, Search
} from 'lucide-react';
import Link from 'next/link';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function AboutClient() {
  return (
    <div className="w-full overflow-hidden">
      
      {/* 1. ABOUT HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 bg-[#0B1F33] text-white min-h-[90vh] flex items-center">
        {/* Subtle Background Graphics */}
        <div className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#C9A96E 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#C9A96E] rounded-full blur-[150px] opacity-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial="hidden" animate="visible" variants={staggerContainer}
              className="max-w-xl"
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-6">
                <div className="w-10 h-[1px] bg-[#C9A96E]"></div>
                <span className="text-[#C9A96E] font-semibold text-xs tracking-[0.2em] uppercase">
                  ABOUT PROP RANGE REALTY
                </span>
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="text-[40px] md:text-[56px] font-bold leading-[1.1] mb-6 tracking-tight">
                Building <span className="text-[#C9A96E]">Stronger Connections</span> Between Developers, Buyers & Channel Partners
              </motion.h1>
              
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 font-light">
                We are a professional real estate sales, marketing, mandate, and project advisory organization that developers appoint as their strategic partner.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
                <Link href="/for-builders" passHref legacyBehavior>
                  <Button className="bg-[#C9A96E] hover:bg-[#b8975d] text-[#0B1F33] font-bold px-8 py-6 rounded-none text-base transition-all duration-300 w-full sm:w-auto">
                    Partner With PRR
                  </Button>
                </Link>
                <Link href="/contact" passHref legacyBehavior>
                  <Button variant="outline" className="border-white/30 text-white hover:bg-white hover:text-[#0B1F33] px-8 py-6 rounded-none text-base transition-all duration-300 w-full sm:w-auto">
                    Download Company Profile
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Right Visual Graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative h-[500px] hidden md:flex items-center justify-center perspective-[1000px]"
            >
              <div className="absolute inset-0 flex items-center justify-center transform-style-3d rotate-y-[-5deg] rotate-x-[2deg]">
                
                {/* PRR Center Node */}
                <div className="absolute z-30 w-48 h-48 bg-[#0B1F33]/80 backdrop-blur-md border border-[#C9A96E]/50 rounded-2xl flex flex-col items-center justify-center shadow-[0_0_40px_rgba(201,169,110,0.15)] transform translate-z-[50px]">
                  <div className="w-16 h-16 rounded-full bg-[#C9A96E]/20 flex items-center justify-center mb-3">
                    <Building2 className="w-8 h-8 text-[#C9A96E]" />
                  </div>
                  <span className="text-lg font-bold text-white text-center leading-tight">Prop Range<br/>Realty</span>
                </div>

                {/* Developers Node (Left) */}
                <div className="absolute z-20 w-40 h-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center justify-center transform -translate-x-48 -translate-y-16 translate-z-[20px]">
                  <Building2 className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm font-semibold text-gray-200">Developers</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider mt-1">Promoters</span>
                </div>

                {/* Buyers Node (Right) */}
                <div className="absolute z-20 w-40 h-40 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center justify-center transform translate-x-48 translate-y-16 translate-z-[20px]">
                  <Users className="w-6 h-6 text-gray-400 mb-2" />
                  <span className="text-sm font-semibold text-gray-200 text-center px-2">Buyers &<br/>Partners</span>
                </div>

                {/* Connecting Lines */}
                <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none transform translate-z-[10px]" viewBox="0 0 600 500">
                  <path d="M 220 180 Q 300 180 300 250" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="2" strokeDasharray="6 6" />
                  <path d="M 300 250 Q 300 320 380 320" fill="none" stroke="rgba(201,169,110,0.4)" strokeWidth="2" strokeDasharray="6 6" />
                  <circle cx="220" cy="180" r="4" fill="#C9A96E" />
                  <circle cx="380" cy="320" r="4" fill="#C9A96E" />
                </svg>

              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. COMPANY OVERVIEW */}
      <section className="py-24 bg-[#F6F2E8]">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
              className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <img src="/images/projects/dream-glorious.jpg" alt="Architectural Building" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0B1F33]/10 mix-blend-multiply"></div>
            </motion.div>
            
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={staggerContainer}
            >
              <motion.h2 variants={fadeUp} className="text-[38px] md:text-[46px] font-bold text-[#0B1F33] mb-6 leading-tight">
                More Than a <br/><span className="text-[#C9A96E] font-serif italic font-normal">Real Estate Agency</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-gray-600 text-lg mb-10 leading-relaxed">
                PRR operates as an extension of the developer's team. We take full responsibility for the project's market success, from initial planning to final handover, employing a structured and accountable approach.
              </motion.p>
              
              <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  "Project Sales Partner", "Marketing Partner", "Mandate Partner",
                  "Lead Generation Partner", "CP Management Partner", "Advisory Partner"
                ].map((item, idx) => (
                  <motion.div key={idx} variants={fadeUp} className="flex items-center space-x-4">
                    <div className="w-8 h-8 rounded-full bg-[#C9A96E]/10 flex items-center justify-center shrink-0">
                      <CheckCircle className="w-4 h-4 text-[#C9A96E]" />
                    </div>
                    <span className="text-[#0B1F33] font-semibold">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. MISSION & VISION */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-white p-12 rounded-2xl border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#F6F2E8] rounded-bl-full -mr-8 -mt-8 opacity-50 transition-transform group-hover:scale-110 duration-700"></div>
              <Target className="w-12 h-12 text-[#C9A96E] mb-6 relative z-10" />
              <h3 className="text-[28px] font-bold text-[#0B1F33] mb-4 relative z-10">Our Mission</h3>
              <p className="text-gray-600 text-lg leading-relaxed relative z-10">
                To accelerate real estate sales for developers through structured, data-driven, and highly accountable sales and marketing execution, bridging the gap between product creation and market realization.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              className="bg-[#0B1F33] p-12 rounded-2xl border border-[#1a365d] shadow-[0_20px_60px_-15px_rgba(11,31,51,0.2)] relative overflow-hidden group hover:-translate-y-2 transition-transform duration-500 text-white"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#C9A96E]/10 rounded-bl-full -mr-8 -mt-8 opacity-50 transition-transform group-hover:scale-110 duration-700"></div>
              <Compass className="w-12 h-12 text-[#C9A96E] mb-6 relative z-10" />
              <h3 className="text-[28px] font-bold text-white mb-4 relative z-10">Our Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed relative z-10">
                To be the most trusted and results-oriented real estate mandate and project marketing partner in the industry, recognized for transforming skylines through strategic sales empowerment.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. WHAT WE BRING */}
      <section className="py-24 bg-[#FAFAFA]">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-[38px] md:text-[46px] font-bold text-[#0B1F33] mb-6">What PRR Brings to Every Project</h2>
            <p className="text-lg text-gray-600">A comprehensive ecosystem designed to guarantee project velocity and market dominance.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { icon: <Map className="w-6 h-6"/>, title: "Project Planning", desc: "Architectural feedback, layout optimization, and sizing strategies." },
              { icon: <Target className="w-6 h-6"/>, title: "Market Positioning", desc: "Crafting the right narrative and price discovery for maximum impact." },
              { icon: <Search className="w-6 h-6"/>, title: "Lead Generation", desc: "Targeted digital and offline marketing to secure high-intent buyers." },
              { icon: <Handshake className="w-6 h-6"/>, title: "Channel Partner Activation", desc: "Mobilizing a vast network of trained brokers for rapid inventory clearance." },
              { icon: <TrendingUp className="w-6 h-6"/>, title: "Sales Execution", desc: "Deploying high-performance site teams to drive conversions and closures." },
              { icon: <ShieldCheck className="w-6 h-6"/>, title: "Mandate Management", desc: "End-to-end accountability from pre-launch buzz to post-sales CRM." }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} variants={fadeUp}
                className="bg-white p-8 rounded-xl border border-gray-100 hover:border-[#C9A96E]/30 hover:shadow-[0_10px_40px_-10px_rgba(201,169,110,0.15)] transition-all duration-300 group"
              >
                <div className="w-14 h-14 bg-[#F6F2E8] rounded-lg flex items-center justify-center text-[#C9A96E] mb-6 group-hover:bg-[#C9A96E] group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-[22px] font-bold text-[#0B1F33] mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. BUSINESS RELATIONSHIP MODEL */}
      <section className="py-24 bg-[#0B1F33] overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-[38px] md:text-[46px] font-bold text-white mb-6">Our Relationship Model</h2>
            <p className="text-lg text-gray-300">The strategic nexus connecting supply with accelerated demand.</p>
          </motion.div>

          <div className="relative max-w-5xl mx-auto hidden lg:block perspective-[1000px]">
            {/* Desktop Diagram */}
            <div className="flex items-center justify-between relative transform-style-3d rotate-x-[1deg]">
              
              {/* Left: Developers */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
                className="w-72 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center z-20"
              >
                <Building2 className="w-10 h-10 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-1">Developers</h3>
                <p className="text-sm text-gray-400">Promoters & Builders</p>
              </motion.div>

              {/* Center: PRR */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="w-80 bg-gradient-to-br from-[#C9A96E] to-[#9a7d47] p-10 rounded-2xl flex flex-col items-center text-center z-30 shadow-[0_0_50px_rgba(201,169,110,0.3)] transform translate-z-[40px]"
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
                  <Activity className="w-8 h-8 text-[#0B1F33]" />
                </div>
                <h3 className="text-2xl font-bold text-[#0B1F33] mb-1">Prop Range Realty</h3>
                <p className="text-sm text-[#0B1F33]/80 font-medium uppercase tracking-wider">Strategic Nexus</p>
              </motion.div>

              {/* Right: Buyers */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.4 }}
                className="w-72 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl flex flex-col items-center text-center z-20"
              >
                <Users className="w-10 h-10 text-gray-400 mb-4" />
                <h3 className="text-xl font-bold text-white mb-1">Market</h3>
                <p className="text-sm text-gray-400">Buyers & Channel Partners</p>
              </motion.div>

              {/* Top Arrows (Left to Right) */}
              <div className="absolute top-[20%] left-0 w-full h-[1px] z-10 pointer-events-none flex justify-between px-36">
                <div className="relative w-[30%]">
                  <div className="absolute top-0 left-0 w-full border-t-2 border-dashed border-[#C9A96E]/50"></div>
                  <MoveRight className="absolute -top-3 right-0 text-[#C9A96E]/80" />
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[11px] text-gray-400 text-center w-full">
                    Project • Inventory<br/>Pricing • Goals
                  </div>
                </div>
                <div className="relative w-[30%]">
                  <div className="absolute top-0 left-0 w-full border-t-2 border-dashed border-[#C9A96E]/50"></div>
                  <MoveRight className="absolute -top-3 right-0 text-[#C9A96E]/80" />
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 text-[11px] text-gray-400 text-center w-full">
                    Marketing • Lead Servicing<br/>Site Visits • Sales
                  </div>
                </div>
              </div>

              {/* Bottom Arrows (Right to Left) */}
              <div className="absolute bottom-[20%] left-0 w-full h-[1px] z-10 pointer-events-none flex justify-between px-36">
                <div className="relative w-[30%] rotate-180">
                  <div className="absolute top-0 left-0 w-full border-t-2 border-dashed border-[#C9A96E]/30"></div>
                  <MoveRight className="absolute -top-3 right-0 text-[#C9A96E]/50" />
                </div>
                <div className="absolute bottom-[-40px] left-[15%] text-[11px] text-gray-400 text-center w-[30%]">
                  Sales Updates • Feedback<br/>Performance Insights
                </div>

                <div className="relative w-[30%] rotate-180">
                  <div className="absolute top-0 left-0 w-full border-t-2 border-dashed border-[#C9A96E]/30"></div>
                  <MoveRight className="absolute -top-3 right-0 text-[#C9A96E]/50" />
                </div>
                <div className="absolute bottom-[-40px] right-[15%] text-[11px] text-gray-400 text-center w-[30%]">
                  Buyer Feedback • Demand<br/>Market Intelligence
                </div>
              </div>

            </div>
          </div>

          {/* Mobile Diagram */}
          <div className="lg:hidden flex flex-col items-center gap-8">
            <div className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
              <Building2 className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">Developers</h3>
            </div>
            <ArrowDown className="text-[#C9A96E]" />
            <div className="w-full bg-gradient-to-br from-[#C9A96E] to-[#9a7d47] p-6 rounded-2xl text-center">
              <h3 className="text-xl font-bold text-[#0B1F33]">Prop Range Realty</h3>
            </div>
            <ArrowDown className="text-[#C9A96E]" />
            <div className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-center">
              <Users className="w-8 h-8 text-gray-400 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-white">Buyers & Partners</h3>
            </div>
          </div>
          
        </div>
      </section>

      {/* 6. OUR PRINCIPLES */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-[38px] md:text-[46px] font-bold text-[#0B1F33] mb-6">Our Principles</h2>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
          >
            {[
              { num: "01", title: "Transparency", desc: "Clear, honest communication with developers and buyers at every step." },
              { num: "02", title: "Accountability", desc: "Taking full ownership of sales targets and marketing ROI." },
              { num: "03", title: "Market Intelligence", desc: "Relying on data-driven insights rather than pure assumptions." },
              { num: "04", title: "Customer Focus", desc: "Ensuring an exceptional journey for the end homebuyer." },
              { num: "05", title: "Partnership", desc: "Working as an integrated extension of the developer's core team." },
              { num: "06", title: "Execution Excellence", desc: "Relentless focus on closing deals and clearing inventory." }
            ].map((val, idx) => (
              <motion.div key={idx} variants={fadeUp} className="relative pl-12 md:pl-16">
                <div className="absolute left-0 top-0 text-[40px] md:text-[50px] font-black text-[#F6F2E8] leading-none select-none">
                  {val.num}
                </div>
                <h3 className="text-[22px] font-bold text-[#0B1F33] mb-3 relative z-10 pt-2">{val.title}</h3>
                <p className="text-gray-600 leading-relaxed relative z-10">{val.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 7. WHY DEVELOPERS WORK WITH PRR */}
      <section className="py-24 bg-gradient-to-b from-[#0B1F33] to-[#050f1a] text-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-16"
          >
            <h2 className="text-[38px] md:text-[46px] font-bold text-white mb-6">Built Around Developer Growth</h2>
            <p className="text-lg text-gray-400 max-w-2xl">Why top builders choose to mandate their projects to us.</p>
          </motion.div>

          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              "Local market understanding", "Direct + indirect sales strategy",
              "Channel partner network", "Structured lead management",
              "Launch execution", "Sustenance strategy",
              "Competitive positioning", "Builder-focused communication"
            ].map((reason, idx) => (
              <motion.div 
                key={idx} variants={fadeUp}
                className="bg-white/5 border border-white/10 p-6 rounded-xl hover:bg-white/10 transition-colors flex flex-col"
              >
                <div className="w-10 h-10 rounded-full bg-[#C9A96E]/20 flex items-center justify-center mb-4">
                  <CheckCircle className="w-5 h-5 text-[#C9A96E]" />
                </div>
                <h4 className="text-lg font-semibold text-gray-200">{reason}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 8. JOURNEY / TIMELINE */}
      <section className="py-24 bg-[#F6F2E8] overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-[38px] md:text-[46px] font-bold text-[#0B1F33] mb-6">How PRR Works With Developers</h2>
          </motion.div>

          <div className="relative">
            {/* Desktop Line */}
            <div className="hidden md:block absolute top-[45px] left-[5%] right-[5%] h-[2px] bg-[#C9A96E]/30"></div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10">
              {[
                { step: "01", title: "Study Market", desc: "Analyze micro-market and competition." },
                { step: "02", title: "Define Positioning", desc: "Pricing and product strategy." },
                { step: "03", title: "Launch Marketing", desc: "Create high-impact assets." },
                { step: "04", title: "Activate Sales", desc: "CP networks & site visits." }
              ].map((phase, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="flex flex-col md:items-center text-left md:text-center relative"
                >
                  <div className="w-24 h-24 rounded-full bg-white shadow-lg border-[4px] border-[#F6F2E8] flex items-center justify-center text-2xl font-black text-[#C9A96E] mb-6 z-10 mx-0 md:mx-auto">
                    {phase.step}
                  </div>
                  <h4 className="text-xl font-bold text-[#0B1F33] mb-2">{phase.title}</h4>
                  <p className="text-gray-600 text-sm px-0 md:px-4">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="hidden md:block absolute top-[200px] left-[5%] right-[5%] h-[2px] bg-[#C9A96E]/30 mt-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 relative z-10 mt-8">
              {[
                { step: "05", title: "Lead Generation", desc: "Run digital marketing." },
                { title: "Client Servicing", desc: "Handle site visits.", step: "06" },
                { title: "Closures", desc: "Negotiations and bookings.", step: "07" },
                { title: "CRM Support", desc: "Post-sale assistance.", step: "08" }
              ].map((phase, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }}
                  className="flex flex-col md:items-center text-left md:text-center relative"
                >
                  <div className="w-24 h-24 rounded-full bg-white shadow-lg border-[4px] border-[#F6F2E8] flex items-center justify-center text-2xl font-black text-[#C9A96E] mb-6 z-10 mx-0 md:mx-auto">
                    {phase.step}
                  </div>
                  <h4 className="text-xl font-bold text-[#0B1F33] mb-2">{phase.title}</h4>
                  <p className="text-gray-600 text-sm px-0 md:px-4">{phase.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. LEADERSHIP PREVIEW */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="mb-16"
          >
            <h2 className="text-[38px] md:text-[46px] font-bold text-[#0B1F33] mb-6">Leadership</h2>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center gap-12 max-w-4xl mx-auto">
            
            {/* Leader 1 */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex-1 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              <div 
                className="h-80 w-full relative overflow-hidden flex items-end justify-center pt-4"
                style={{
                  background: "linear-gradient(135deg, #F5F1E8 0%, #E7EDF4 100%)"
                }}
              >
                <img 
                  src="/images/leadership/ravi-jaiswal.png" 
                  alt="Ravi Jaiswal - Founder & CEO, Prop Range Realty" 
                  className="w-full h-full object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.02]" 
                  style={{
                    filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.12))"
                  }}
                />
              </div>
              <div className="p-8 text-left relative">
                <div className="absolute top-0 right-8 -mt-6 w-12 h-12 bg-[#C9A96E] rounded-full flex items-center justify-center shadow-lg text-white hover:bg-[#0B1F33] transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-[26px] font-bold text-[#0B1F33] mb-1">Ravi Jaiswal</h3>
                <p className="text-[#C9A96E] font-semibold mb-4 text-sm tracking-wider uppercase">Founder & CEO</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Driving strategic vision and developer partnerships with years of core real-estate expertise.
                </p>
              </div>
            </motion.div>

            {/* Leader 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="flex-1 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group"
            >
              <div 
                className="h-80 w-full relative overflow-hidden flex items-end justify-center pt-4"
                style={{
                  background: "linear-gradient(135deg, #F5F1E8 0%, #E7EDF4 100%)"
                }}
              >
                <img 
                  src="/images/leadership/anamika-prasad.png" 
                  alt="Anamika Prasad - Co-Founder & CMO, Prop Range Realty" 
                  className="w-full h-full object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.02]" 
                  style={{
                    filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.12))"
                  }}
                />
              </div>
              <div className="p-8 text-left relative">
                <div className="absolute top-0 right-8 -mt-6 w-12 h-12 bg-[#C9A96E] rounded-full flex items-center justify-center shadow-lg text-white hover:bg-[#0B1F33] transition-colors">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-[26px] font-bold text-[#0B1F33] mb-1">Anamika Prasad</h3>
                <p className="text-[#C9A96E] font-semibold mb-4 text-sm tracking-wider uppercase">Co-Founder & CMO</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Leading marketing strategies, digital positioning, and brand narratives for partner projects.
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="py-32 relative bg-[#0B1F33] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F33] to-[#040b12]"></div>
        {/* Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C9A96E] opacity-[0.05] blur-[120px] rounded-t-full pointer-events-none"></div>
        
        <div className="container mx-auto px-4 max-w-4xl relative z-10 text-center">
          <h2 className="text-[40px] md:text-[56px] font-bold text-white mb-6 leading-tight">
            Looking for a Strategic <br/><span className="text-[#C9A96E]">Sales Partner</span> for Your Project?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-light">
            Let’s discuss how PRR can support your project from positioning to sales execution.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild className="bg-[#C9A96E] hover:bg-[#b8975d] text-[#0B1F33] font-bold px-8 py-6 rounded-none text-base transition-all duration-300 w-full sm:w-auto">
              <Link href="/pitch-your-project">Pitch Your Project</Link>
            </Button>
            <Button asChild variant="outline" className="border-white/30 text-white hover:bg-white hover:text-[#0B1F33] px-8 py-6 rounded-none text-base transition-all duration-300 w-full sm:w-auto">
              <Link href="/contact">Request a Meeting</Link>
            </Button>
          </div>
        </div>
      </section>

    </div>
  );
}
