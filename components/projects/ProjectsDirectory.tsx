'use client';

import React, { useState, useMemo } from 'react';
import { Project } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import ProjectOverlay from '@/components/projects/ProjectOverlay';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, SlidersHorizontal, ArrowRight, RotateCcw } from 'lucide-react';

interface ProjectsDirectoryProps {
  projects: Project[];
}

export function ProjectsDirectory({ projects }: ProjectsDirectoryProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [filterZone, setFilterZone] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterBudget, setFilterBudget] = useState<string>('ALL');

  // Derive filters dynamically from real fields (Requirement #7)
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      // Zone / Corridor Filter
      if (filterZone !== 'ALL' && p.zone !== filterZone) {
        return false;
      }

      // Status & Type Filter
      if (filterType === 'OC') {
        const isOC =
          p.status?.toLowerCase().includes('oc') ||
          p.possession?.toLowerCase().includes('oc') ||
          p.type?.toLowerCase().includes('oc') ||
          p.taxHighlight === 'No GST';
        if (!isOC) return false;
      }
      if (filterType === 'COMMERCIAL') {
        const isCommercial =
          p.projectType.toLowerCase().includes('commercial') ||
          p.type.toLowerCase().includes('commercial');
        if (!isCommercial) return false;
      }
      if (filterType === 'TOWNSHIP') {
        const isTownship =
          p.category.toLowerCase().includes('township') ||
          p.projectType.toLowerCase().includes('township');
        if (!isTownship) return false;
      }

      // Budget Guidance Filter derived from real price fields
      if (filterBudget === 'UNDER_75L') {
        // Find if any configuration or price string indicates under 75L
        const priceStr = (p.price || '') + ' ' + p.configurations.map((c) => c.price || '').join(' ');
        const matchesUnder75 =
          priceStr.includes('35') ||
          priceStr.includes('46') ||
          priceStr.includes('50') ||
          priceStr.includes('69.99') ||
          (priceStr.includes('Lac') && !priceStr.includes('88') && !priceStr.includes('Cr'));
        if (!matchesUnder75) return false;
      }
      if (filterBudget === 'OVER_1CR') {
        const priceStr = (p.price || '') + ' ' + p.configurations.map((c) => c.price || '').join(' ');
        const matchesOver1Cr = priceStr.includes('Cr') || priceStr.includes('1.15') || priceStr.includes('1.44');
        if (!matchesOver1Cr) return false;
      }

      return true;
    });
  }, [projects, filterZone, filterType, filterBudget]);

  const hasActiveFilters = filterZone !== 'ALL' || filterType !== 'ALL' || filterBudget !== 'ALL';

  const resetFilters = () => {
    setFilterZone('ALL');
    setFilterType('ALL');
    setFilterBudget('ALL');
  };

  return (
    <div className="w-full bg-[#F5F5F3]">
      {/* ARCHITECTURAL PORTFOLIO HERO */}
      <section className="py-24 md:py-32 bg-[#0B1F33] text-white relative overflow-hidden">
        {/* Subtle background glow */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 20% 20%, rgba(201, 169, 110, 0.12), transparent 45%), radial-gradient(circle at 80% 80%, rgba(0, 174, 239, 0.08), transparent 40%)'
          }}
        />

        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C9A96E]/15 border border-[#C9A96E]/30 text-[#C9A96E] text-xs font-semibold uppercase tracking-widest mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architectural Portfolio</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.08]">
            Selected Mandates Across <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#F6F4EF] to-[#C9A96E]">
              Pune&apos;s Growth Corridors
            </span>
          </h1>

          <p className="text-lg md:text-xl text-[#AEB7C4] max-w-3xl mx-auto font-normal leading-relaxed">
            Residential and commercial projects represented, marketed, and executed by Prop Range Realty through structured developer mandate strategy.
          </p>
        </div>
      </section>

      {/* FILTER BAR SECTION */}
      <section className="sticky top-[72px] z-30 bg-[#071827]/95 backdrop-blur-md border-b border-white/10 py-4 shadow-lg transition-all">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            
            {/* Filter Groups */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              
              {/* Corridor */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#C9A96E] uppercase tracking-wider">
                  Corridor:
                </span>
                <div className="flex items-center gap-1 bg-[#101827] p-1 rounded-lg border border-white/10">
                  {['ALL', 'WEST PUNE', 'NORTH PUNE'].map((zone) => (
                    <button
                      key={zone}
                      type="button"
                      onClick={() => setFilterZone(zone)}
                      className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                        filterZone === zone
                          ? 'bg-[#C9A96E] text-[#071827] shadow-sm'
                          : 'text-[#AEB7C4] hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {zone === 'ALL' ? 'All Corridors' : zone}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status & Type */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#C9A96E] uppercase tracking-wider">
                  Type:
                </span>
                <div className="flex items-center gap-1 bg-[#101827] p-1 rounded-lg border border-white/10">
                  <button
                    type="button"
                    onClick={() => setFilterType('ALL')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      filterType === 'ALL'
                        ? 'bg-[#C9A96E] text-[#071827] shadow-sm'
                        : 'text-[#AEB7C4] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    All Types
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType('OC')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      filterType === 'OC'
                        ? 'bg-[#C9A96E] text-[#071827] shadow-sm'
                        : 'text-[#AEB7C4] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Ready OC (Zero GST)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType('COMMERCIAL')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      filterType === 'COMMERCIAL'
                        ? 'bg-[#C9A96E] text-[#071827] shadow-sm'
                        : 'text-[#AEB7C4] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Res + Commercial
                  </button>
                </div>
              </div>

              {/* Budget Guidance */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold text-[#C9A96E] uppercase tracking-wider">
                  Bracket:
                </span>
                <div className="flex items-center gap-1 bg-[#101827] p-1 rounded-lg border border-white/10">
                  <button
                    type="button"
                    onClick={() => setFilterBudget('ALL')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      filterBudget === 'ALL'
                        ? 'bg-[#C9A96E] text-[#071827] shadow-sm'
                        : 'text-[#AEB7C4] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    All Brackets
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterBudget('UNDER_75L')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      filterBudget === 'UNDER_75L'
                        ? 'bg-[#C9A96E] text-[#071827] shadow-sm'
                        : 'text-[#AEB7C4] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Upto ₹75L
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterBudget('OVER_1CR')}
                    className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                      filterBudget === 'OVER_1CR'
                        ? 'bg-[#C9A96E] text-[#071827] shadow-sm'
                        : 'text-[#AEB7C4] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    ₹1 Cr+
                  </button>
                </div>
              </div>

            </div>

            {/* Match Counter & Reset */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#AEB7C4]">
                Showing <strong className="text-white">{filteredProjects.length}</strong> of {projects.length} Mandates
              </span>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs text-[#C9A96E] hover:text-white transition-colors cursor-pointer bg-white/5 px-2.5 py-1 rounded-md"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* PROJECTS GALLERY GRID */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, idx) => (
                <ProjectCard
                  key={project.slug}
                  image={project.image}
                  video={project.video}
                  title={project.name}
                  location={project.location}
                  zone={project.zone}
                  configuration={project.configuration}
                  tagline={project.tagline}
                  badge={project.category}
                  href={`/projects/${project.slug}`}
                  onOpenOverlay={() => setActiveSlug(project.slug)}
                  priority={idx < 3}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200 shadow-sm p-8">
              <h3 className="text-2xl font-bold text-[#0B1F33] mb-2">No Projects Match Selected Filters</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your corridor, status or budget filters to explore our full mandate portfolio.
              </p>
              <Button onClick={resetFilters} variant="accent">
                Reset All Filters
              </Button>
            </div>
          )}

          {/* Centralized Disclaimer */}
          <div className="mt-16 text-center max-w-3xl mx-auto bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
            <h4 className="font-semibold text-[#0B1F33] mb-1.5 text-sm uppercase tracking-wider">
              PRR Portfolio Verification Disclaimer
            </h4>
            <p className="text-xs text-gray-500 leading-relaxed">
              Project details, pricing guidance, specifications, and possession timelines displayed here are sourced from the PRR company profile and official project filings. All information is subject to current developer and RERA verification.
            </p>
          </div>
        </div>
      </section>


      {/* BUILDER-FOCUSED FINAL CTA (Requirement #30) */}
      <section className="py-24 bg-[#0B1F33] text-white relative overflow-hidden border-t border-white/10">
        <div 
          className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle at 100% 0%, rgba(201, 169, 110, 0.15), transparent 60%)'
          }}
        />
        
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <span className="text-[#C9A96E] text-xs md:text-sm font-bold tracking-widest uppercase mb-4 inline-block">
            Developer Mandates
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
            Have a Project to Launch or Inventory to Move?
          </h2>
          <p className="text-[#AEB7C4] text-base md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Partner with PRR for positioning, marketing, channel activation and structured sales execution.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" variant="accent" className="w-full sm:w-auto font-bold px-8 py-6 text-base">
              <Link href="/pitch-your-project">Pitch Your Project</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto font-bold px-8 py-6 text-base border-white/20 text-white hover:bg-white/10 transition-colors">
              <Link href="/contact">Talk to Our Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* QUICK DOSSIER OVERLAY */}
      <ProjectOverlay
        projectSlug={activeSlug}
        onClose={() => setActiveSlug(null)}
        onSelectProject={(slug) => setActiveSlug(slug)}
      />
    </div>
  );
}
