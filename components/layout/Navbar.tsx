"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "For Builders", href: "/for-builders" },
  { name: "Services", href: "/services" },
  { name: "Mandates", href: "/mandates" },
  { name: "Projects", href: "/projects" },
  { name: "How We Work", href: "/how-we-work" },
  { name: "Insights", href: "/insights" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  React.useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Subtle scroll listener
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[#081423]/92 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)] border-b border-white/[0.08]"
          : "bg-[#081423]/60 backdrop-blur-sm border-b border-white/[0.05]"
      )}
    >
      {/* Subtle architectural top reflection */}
      <div
        className="absolute top-0 left-0 w-full h-[1px] pointer-events-none opacity-40"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(201,169,110,0.6) 50%, transparent)",
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-[74px] md:h-[78px] flex items-center justify-between relative z-10">
        {/* LOGO: The dominant hero element of the navbar */}
        <Link
          href="/"
          className="flex items-center group relative z-20 py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/50 rounded"
          aria-label="Prop Range Realty - Home"
        >
          <div className="relative flex items-center">
            <Image
              src="/images/logo/prr-logo.png"
              alt="Prop Range Realty - We Make It Easy"
              width={180}
              height={90}
              priority
              className="h-[44px] xs:h-[48px] sm:h-[50px] md:h-[54px] lg:h-[58px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02] drop-shadow-[0_2px_10px_rgba(201,169,110,0.22)]"
            />
          </div>
        </Link>

        {/* Desktop Nav - Secondary to logo, clean and elegant */}
        <nav
          className="hidden lg:flex items-center space-x-4 xl:space-x-6"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "text-[13px] xl:text-[14px] font-medium tracking-wide transition-colors duration-200 py-1 relative group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A96E]",
                  isActive
                    ? "text-[#C9A96E] font-semibold"
                    : "text-white/80 hover:text-white"
                )}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-[2px] bg-[#C9A96E] transition-all duration-300 ease-out",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            );
          })}
        </nav>

        {/* Action Button: Controlled, elegant accent */}
        <div className="hidden lg:flex items-center space-x-3">
          <Button
            asChild
            size="sm"
            className="font-semibold text-xs tracking-wider uppercase px-5 py-2.5 bg-[#C9A96E] hover:bg-[#b89555] text-[#081423] rounded-md transition-all duration-300 shadow-[0_2px_12px_rgba(201,169,110,0.25)] hover:shadow-[0_4px_18px_rgba(201,169,110,0.35)] hover:-translate-y-0.5 border-none"
          >
            <Link href="/pitch-your-project">Pitch Your Project</Link>
          </Button>
        </div>

        {/* Mobile Hamburger Control - Subtle and secondary to Logo */}
        <button
          type="button"
          className="lg:hidden p-2 text-white/75 hover:text-white rounded-md transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E]/50"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
        >
          {isOpen ? <X className="h-6 w-6 text-[#C9A96E]" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden fixed inset-x-0 top-[74px] md:top-[78px] bg-[#081423]/98 backdrop-blur-2xl border-t border-b border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-1 p-5 max-h-[calc(100vh-85px)] overflow-y-auto">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-[15px] font-medium py-3 px-4 rounded-md transition-all duration-200 flex items-center justify-between",
                    isActive
                      ? "bg-[#C9A96E]/15 text-[#C9A96E] font-semibold border-l-2 border-[#C9A96E]"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
                  )}
                </Link>
              );
            })}
            <div className="pt-4 mt-2 border-t border-white/10">
              <Button
                asChild
                className="w-full font-semibold text-xs tracking-wider uppercase py-3 bg-[#C9A96E] hover:bg-[#b89555] text-[#081423] rounded-md transition-all duration-300 shadow-md border-none"
              >
                <Link href="/pitch-your-project">Pitch Your Project</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
