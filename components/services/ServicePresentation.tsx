"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  ArrowRight,
  CheckCircle2,
  Layers,
  Sparkles,
  Play,
  Pause,
  Compass,
} from "lucide-react";
import { servicesData, ServiceItem } from "@/data/servicesData";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ServicePresentation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [direction, setDirection] = useState<1 | -1>(1);

  const containerRef = useRef<HTMLDivElement>(null);
  const presentationStageRef = useRef<HTMLDivElement>(null);
  const desktopTextRef = useRef<HTMLDivElement>(null);
  const desktopImageRef = useRef<HTMLDivElement>(null);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch tracking for mobile swipe without hijacking vertical scroll
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const currentService: ServiceItem = servicesData[currentIndex];

  // Navigation handlers
  const goToService = useCallback(
    (index: number) => {
      if (index === currentIndex) return;
      setDirection(index > currentIndex ? 1 : -1);
      setCurrentIndex(index);
    },
    [currentIndex]
  );

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % servicesData.length);
  }, []);

  const goToPrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + servicesData.length) % servicesData.length);
  }, []);

  const isInitialMount = useRef(true);

  // Sync hash or query param on mount (e.g. #03 or ?slide=3 or ?service=project-planning)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const querySlide = params.get("slide") || params.get("service");
      const hash = window.location.hash.replace("#", "");

      let targetNum = NaN;
      if (querySlide) {
        const parsed = parseInt(querySlide, 10);
        if (!isNaN(parsed)) {
          targetNum = parsed;
        } else {
          const foundIdx = servicesData.findIndex((s) => s.slug === querySlide);
          if (foundIdx !== -1) targetNum = foundIdx + 1;
        }
      } else if (hash) {
        targetNum = parseInt(hash, 10);
      }

      if (!isNaN(targetNum) && targetNum >= 1 && targetNum <= servicesData.length) {
        setCurrentIndex(targetNum - 1);
      }
    }
  }, []);

  // Update hash subtly on change without jumping page
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (typeof window !== "undefined") {
      const hash = currentService.number;
      if (window.location.hash !== `#${hash}`) {
        window.history.replaceState(null, "", `#${hash}`);
      }
    }
  }, [currentService.number]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "Escape" && isModalOpen) {
        setIsModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev, isModalOpen]);

  // Autoplay functionality for client meetings / presentation pitches
  useEffect(() => {
    if (isAutoPlay) {
      autoPlayTimerRef.current = setInterval(() => {
        goToNext();
      }, 7500);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }

    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlay, goToNext]);

  // GSAP animation on slide change
  useEffect(() => {
    if (!containerRef.current) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Desktop transitions
      if (desktopImageRef.current) {
        gsap.fromTo(
          desktopImageRef.current,
          { opacity: 0.25, scale: 0.98, y: direction * 8 },
          { opacity: 1, scale: 1, y: 0, duration: 0.42, ease: "power2.out" }
        );
      }
      if (desktopTextRef.current) {
        gsap.fromTo(
          desktopTextRef.current,
          { opacity: 0, y: direction * 14 },
          { opacity: 1, y: 0, duration: 0.38, ease: "power2.out", delay: 0.03 }
        );
      }
      // Mobile transition
      if (mobileContainerRef.current) {
        gsap.fromTo(
          mobileContainerRef.current,
          { opacity: 0.2, x: direction * 16 },
          { opacity: 1, x: 0, duration: 0.38, ease: "power2.out" }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [currentIndex, direction]);

  // Touch handlers for mobile swipe navigation (careful to never hijack vertical scrolling)
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Only swipe if horizontal gesture is distinct from vertical scrolling
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
      if (deltaX < 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Preload adjacent images
  const nextService = servicesData[(currentIndex + 1) % servicesData.length];
  const prevService =
    servicesData[(currentIndex - 1 + servicesData.length) % servicesData.length];

  return (
    <div
      ref={containerRef}
      className="w-full bg-[#081423] text-white pt-24 md:pt-28 pb-16 relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background ambient lighting matching PRR palette */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#C9A96E]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#00AEEF]/5 rounded-full blur-[120px] pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* PRESENTATION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 mb-8 md:mb-12 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2.5">
              <span className="w-6 h-[1.5px] bg-[#C9A96E]" />
              <span className="text-[#C9A96E] font-semibold text-xs tracking-[0.2em] uppercase">
                PRR CORE CAPABILITIES
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.15] break-words">
              Real Estate Expertise.
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-100 to-[#C9A96E]">
                Structured. Strategic. Scalable.
              </span>
            </h1>
          </div>

          {/* Presentation Deck Status Indicator & AutoPlay Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/75 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse" />
              <span>Interactive Service Presentation</span>
            </div>

            <button
              type="button"
              onClick={() => setIsAutoPlay(!isAutoPlay)}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 cursor-pointer",
                isAutoPlay
                  ? "bg-[#C9A96E] border-[#C9A96E] text-[#081423] font-bold"
                  : "bg-white/5 border-white/15 text-white/80 hover:text-white hover:bg-white/10"
              )}
              title={isAutoPlay ? "Pause Auto-Deck" : "Start Pitch Mode (7.5s)"}
              aria-label={isAutoPlay ? "Pause Auto-Deck" : "Start Pitch Mode"}
            >
              {isAutoPlay ? (
                <>
                  <Pause className="w-3 h-3" />
                  <span>Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#C9A96E]" />
                  <span>Pitch Mode</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* =========================================================================
            1. "Explore PRR's Core Service Portfolio" (FIRST CONTENT SECTION)
        ========================================================================= */}
        <section id="portfolio-overview" className="mb-14 md:mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-[#C9A96E] text-xs font-bold tracking-[0.2em] uppercase">
              COMPLETE SUITE OF 11 CAPABILITIES
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-2">
              Explore PRR&apos;s Core Service Portfolio
            </h2>
            <p className="text-gray-400 text-sm md:text-base mt-2">
              Select any capability below to bring it to the main presentation stage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-4">
            {servicesData.map((service, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={service.id}
                  type="button"
                  onClick={() => {
                    goToService(index);
                    presentationStageRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  }}
                  className={cn(
                    "text-left p-4 rounded-xl border transition-all duration-300 relative group cursor-pointer flex flex-col justify-between min-h-[130px]",
                    isActive
                      ? "bg-[#0B1B2B] border-[#C9A96E] shadow-[0_8px_25px_rgba(201,169,110,0.15)] ring-1 ring-[#C9A96E]"
                      : "bg-[#081423]/70 border-white/10 hover:border-white/20 hover:bg-[#0B1B2B]/60"
                  )}
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span
                        className={cn(
                          "text-xs font-mono font-bold",
                          isActive ? "text-[#C9A96E]" : "text-white/40 group-hover:text-[#C9A96E]"
                        )}
                      >
                        {service.number}
                      </span>
                      <span className="text-[10px] text-white/50 tracking-wider uppercase">
                        {service.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#C9A96E] transition-colors line-clamp-2">
                      {service.title}
                    </h4>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs text-white/50 pt-2 border-t border-white/5">
                    <span className="text-[11px] truncate max-w-[80%]">
                      {service.pillars[0]?.title}
                    </span>
                    <ArrowRight
                      className={cn(
                        "w-3.5 h-3.5 transition-transform group-hover:translate-x-1",
                        isActive ? "text-[#C9A96E]" : "text-white/30 group-hover:text-white"
                      )}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            2. INTERACTIVE PPT-STYLE SERVICE PRESENTATION STAGE (SECOND SECTION)
        ========================================================================= */}
        <section ref={presentationStageRef} id="presentation-stage" className="scroll-mt-24 pt-6 border-t border-white/10">
          {/* TOP PROGRESS TIMELINE LINE */}
          <div className="w-full bg-white/10 h-[2px] rounded-full mb-8 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#C9A96E] to-[#E3C588] transition-all duration-300 ease-out rounded-full"
              style={{
                width: `${((currentIndex + 1) / servicesData.length) * 100}%`,
              }}
            />
          </div>

          {/* =========================================================================
              DELIBERATE MOBILE PRESENTATION LAYOUT (Below lg: 1024px)
              Structure as specified by user:
              1. SERVICE NUMBER & CATEGORY
              2. SERVICE TITLE
              3. IMAGE
              4. DESCRIPTION
              5. SERVICE NAVIGATION
          ========================================================================= */}
          <div
            ref={mobileContainerRef}
            className="lg:hidden bg-[#0B1B2B]/85 border border-white/10 rounded-2xl p-5 sm:p-7 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur-md relative space-y-5"
          >
            {/* 1. SERVICE NUMBER & CATEGORY */}
            <div className="flex items-center justify-between gap-3">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-[#C9A96E]/10 border border-[#C9A96E]/25 text-[#C9A96E] text-[11px] font-bold uppercase tracking-wider">
                <Compass className="w-3 h-3" />
                <span>{currentService.category}</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold tracking-tight text-[#C9A96E]">
                  {currentService.number}
                </span>
                <span className="text-white/40 text-xs font-medium ml-1">
                  / {String(servicesData.length).padStart(2, "0")}
                </span>
              </div>
            </div>

            {/* 2. SERVICE TITLE */}
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight leading-tight">
              {currentService.title}
            </h2>

            {/* 3. IMAGE (LARGE SERVICE IMAGE) */}
            <div className="w-full relative rounded-xl bg-[#F8F6F0] p-4 shadow-[0_10px_30px_rgba(0,0,0,0.4)] border border-white/20 group overflow-hidden">
              <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1.5 px-2 py-0.5 rounded bg-[#081423]/80 backdrop-blur-md text-[#C9A96E] text-[9px] font-bold tracking-wider uppercase border border-white/10">
                <Sparkles className="w-2.5 h-2.5 text-[#C9A96E]" />
                <span>Process Diagram</span>
              </div>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-lg bg-[#081423]/70 hover:bg-[#081423] text-white/80 hover:text-[#C9A96E] border border-white/10 transition-colors cursor-pointer"
                aria-label="Inspect diagram"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>

              <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                <Image
                  src={currentService.image}
                  alt={currentService.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* 4. DESCRIPTION & PILLARS */}
            <div className="space-y-4">
              <p className="text-[#D1D7E0] text-sm sm:text-base leading-relaxed">
                {currentService.description}
              </p>

              {/* Strategic Pillars */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="text-[10px] font-bold text-[#C9A96E] uppercase tracking-widest flex items-center gap-1.5">
                  <Layers className="w-3 h-3" />
                  <span>Strategic Pillars</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {currentService.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs"
                    >
                      <div className="font-semibold text-white flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C9A96E] shrink-0" />
                        <span>{pillar.title}</span>
                      </div>
                      <div className="text-[#9DAEC2] text-[11px] mt-1 pl-5 leading-normal">
                        {pillar.description}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stakeholders and CTA */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-white/50">For:</span>
                  <div className="flex flex-wrap gap-1">
                    {currentService.stakeholders.map((stk, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/10 text-white/80"
                      >
                        {stk}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  asChild
                  size="sm"
                  className="w-full sm:w-auto bg-[#C9A96E] hover:bg-[#b89455] text-[#081423] font-bold text-xs tracking-wider uppercase shadow-md transition-all duration-300 border-none"
                >
                  <Link href={`/pitch-your-project?service=${currentService.slug}`}>
                    <span>Discuss This Service</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* =========================================================================
              DESKTOP PRESENTATION LAYOUT (lg: 1024px and up)
              Side-by-side pitch deck layout:
              LEFT: Service Intel, Title, Description, Pillars, Stakeholders, CTA
              RIGHT: Large High-Resolution Service Image
          ========================================================================= */}
          <div className="hidden lg:block bg-[#0B1B2B]/75 border border-white/10 rounded-3xl p-8 xl:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-md relative">
            <div className="absolute top-0 right-1/3 w-72 h-1 bg-gradient-to-r from-transparent via-[#C9A96E]/50 to-transparent pointer-events-none" />

            <div className="grid grid-cols-12 gap-10 xl:gap-12 items-center">
              {/* LEFT COLUMN: SERVICE INTEL */}
              <div ref={desktopTextRef} className="col-span-6 flex flex-col justify-center">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#C9A96E]/10 border border-[#C9A96E]/25 text-[#C9A96E] text-xs font-bold uppercase tracking-wider">
                    <Compass className="w-3.5 h-3.5" />
                    <span>{currentService.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold tracking-tight text-[#C9A96E]">
                      {currentService.number}
                    </span>
                    <span className="text-white/35 text-sm font-medium ml-1">
                      / {String(servicesData.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl xl:text-4xl font-bold text-white tracking-tight leading-tight mb-4">
                  {currentService.title}
                </h2>

                <p className="text-[#D1D7E0] text-base xl:text-lg leading-relaxed mb-6 font-normal">
                  {currentService.description}
                </p>

                {/* Pillars */}
                <div className="mb-6 space-y-2.5">
                  <div className="text-[11px] font-bold text-[#C9A96E] uppercase tracking-widest flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Strategic Methodology & Pillars</span>
                  </div>
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-2.5">
                    {currentService.pillars.map((pillar, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 hover:border-[#C9A96E]/30 transition-colors"
                      >
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#C9A96E] shrink-0 mt-0.5" />
                          <div>
                            <div className="text-sm font-semibold text-white">
                              {pillar.title}
                            </div>
                            <div className="text-xs text-[#9DAEC2] mt-0.5 leading-snug">
                              {pillar.description}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stakeholders & CTA */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/50">Stakeholders:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {currentService.stakeholders.map((stk, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/10 text-white/80"
                        >
                          {stk}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Button
                    asChild
                    size="sm"
                    className="bg-[#C9A96E] hover:bg-[#b89455] text-[#081423] font-bold text-xs tracking-wider uppercase shadow-[0_2px_12px_rgba(201,169,110,0.25)] hover:shadow-[0_4px_20px_rgba(201,169,110,0.35)] transition-all duration-300 border-none group cursor-pointer"
                  >
                    <Link href={`/pitch-your-project?service=${currentService.slug}`}>
                      <span>Discuss This Service</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* RIGHT COLUMN: LARGE ARCHITECTURAL SERVICE DIAGRAM */}
              <div className="col-span-6 flex flex-col items-center justify-center">
                <div
                  ref={desktopImageRef}
                  className="w-full relative rounded-2xl bg-[#F8F6F0] p-6 xl:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.45)] border border-white/20 group overflow-hidden"
                >
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#081423]/80 backdrop-blur-md text-[#C9A96E] text-[10px] font-bold tracking-wider uppercase border border-white/10">
                    <Sparkles className="w-3 h-3 text-[#C9A96E]" />
                    <span>PRR Process Architecture</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="absolute top-3 right-3 z-20 p-2 rounded-lg bg-[#081423]/70 hover:bg-[#081423] text-white/80 hover:text-[#C9A96E] border border-white/10 transition-all duration-200 shadow-md cursor-pointer"
                    title="View full resolution diagram"
                    aria-label="Inspect diagram in high resolution"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <div className="relative w-full aspect-[4/3] flex items-center justify-center">
                    <Image
                      src={currentService.image}
                      alt={currentService.imageAlt}
                      fill
                      sizes="(max-width: 1200px) 50vw, 600px"
                      priority
                      className="object-contain transition-transform duration-500 ease-out group-hover:scale-[1.015]"
                    />
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-[#081423]/10 flex items-center justify-between text-[#081423]/70 text-xs">
                    <span className="font-semibold text-[#081423] truncate max-w-[80%]">
                      {currentService.title} — Strategic Architecture
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="text-[#96743A] hover:text-[#081423] font-bold flex items-center gap-1 cursor-pointer shrink-0"
                    >
                      <span>Inspect</span>
                      <Maximize2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 5. SERVICE NAVIGATION CONTROLLER (PITCH DECK CONTROLS) */}
          <div className="mt-6 md:mt-8 bg-[#0B1B2B]/90 border border-white/10 rounded-2xl p-3.5 sm:p-5 shadow-[0_12px_30px_rgba(0,0,0,0.35)] backdrop-blur-md">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
                <button
                  type="button"
                  onClick={goToPrev}
                  className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 hover:border-[#C9A96E]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] cursor-pointer"
                  aria-label="Previous Service"
                >
                  <ChevronLeft className="w-4 h-4 text-[#C9A96E]" />
                  <span>Prev</span>
                  <span className="hidden sm:inline-block text-[10px] text-white/40 ml-1">
                    [←]
                  </span>
                </button>

                <button
                  type="button"
                  onClick={goToNext}
                  className="flex items-center gap-2 px-3.5 sm:px-4 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium text-xs tracking-wider uppercase transition-all duration-200 hover:border-[#C9A96E]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] cursor-pointer"
                  aria-label="Next Service"
                >
                  <span>Next</span>
                  <span className="hidden sm:inline-block text-[10px] text-white/40 mr-1">
                    [→]
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#C9A96E]" />
                </button>
              </div>

              {/* 11 SERVICE SELECTOR BUTTONS */}
              <div className="w-full lg:w-auto overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
                <div
                  className="flex items-center gap-1 sm:gap-2 min-w-max justify-center"
                  role="tablist"
                  aria-label="Service Presentation Slides"
                >
                  {servicesData.map((service, index) => {
                    const isActive = index === currentIndex;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Service ${service.number}: ${service.title}`}
                        onClick={() => goToService(index)}
                        className={cn(
                          "relative group px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg text-xs font-bold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] cursor-pointer",
                          isActive
                            ? "bg-[#C9A96E] text-[#081423] shadow-[0_2px_12px_rgba(201,169,110,0.4)] scale-105"
                            : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/5 hover:border-white/15"
                        )}
                      >
                        <span className="block font-mono tracking-tight text-[11px] sm:text-xs">
                          {service.number}
                        </span>

                        {/* Tooltip on hover for desktop */}
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-[#081423] border border-white/15 text-[11px] font-medium text-white shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-30 hidden md:block">
                          {service.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Slide Index Counter */}
              <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-white/50 shrink-0">
                <span className="text-[#C9A96E] font-bold">
                  {currentService.number}
                </span>
                <span>/</span>
                <span>{String(servicesData.length).padStart(2, "0")}</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* FULL RESOLUTION DIAGRAM INSPECTION MODAL */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${currentService.title} High Resolution Diagram`}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-[#FAF9F6] rounded-2xl p-5 sm:p-8 shadow-2xl overflow-hidden border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#081423]/10 mb-3">
              <div>
                <span className="text-xs font-bold text-[#96743A] uppercase tracking-wider">
                  Service {currentService.number} • {currentService.category}
                </span>
                <h3 className="text-lg sm:text-2xl font-bold text-[#081423]">
                  {currentService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-lg bg-[#081423]/10 hover:bg-[#081423] text-[#081423] hover:text-white transition-colors cursor-pointer"
                aria-label="Close high resolution diagram view"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* High Res Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[70vh]">
              <Image
                src={currentService.image}
                alt={currentService.imageAlt}
                fill
                sizes="100vw"
                priority
                className="object-contain"
              />
            </div>

            {/* Modal Footer */}
            <div className="mt-3 pt-3 border-t border-[#081423]/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#081423]/70">
              <p className="italic line-clamp-2 sm:line-clamp-none">
                {currentService.description}
              </p>
              <Button
                asChild
                size="sm"
                className="bg-[#C9A96E] hover:bg-[#b89455] text-[#081423] font-bold shrink-0 border-none"
              >
                <Link href={`/pitch-your-project?service=${currentService.slug}`}>
                  Discuss With PRR
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden preloads for next/prev slides */}
      <div className="hidden" aria-hidden="true">
        <Image
          src={nextService.image}
          alt=""
          width={100}
          height={100}
          priority={false}
        />
        <Image
          src={prevService.image}
          alt=""
          width={100}
          height={100}
          priority={false}
        />
      </div>
    </div>
  );
}
