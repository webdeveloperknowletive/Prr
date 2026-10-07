"use client";

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Project } from '@/data/projects';
import { 
  MapPin, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  Phone, 
  Mail, 
  MessageCircle, 
  X, 
  ArrowUpRight, 
  Loader2, 
  Building2, 
  BadgeCheck 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { PRR_CONTACT } from '@/data/contact';

// ============================================================
// ============================================================
// 01 — PROJECT HERO (BOXED VIDEO + IMAGE PRESENTATION PANELS)
// ============================================================
export const ProjectHero = ({ project }: { project: Project }) => {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = project.heroVideo || project.video || `/videos/projects/${project.slug}.mp4`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isMounted = true;

    // Enforce muted and inline attributes directly on DOM instance for browser autoplay compliance
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    // Reset and load the project's specific video source
    video.pause();
    video.currentTime = 0;
    if (video.src !== new URL(videoSrc, window.location.origin).href) {
      video.src = videoSrc;
    }
    video.load();

    const attemptPlay = () => {
      if (!isMounted || !video) return;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            if (isMounted) setIsPlaying(true);
          })
          .catch((err) => {
            console.warn(`[PRR Video] Autoplay blocked for ${project.name}:`, err);
            if (isMounted) setIsPlaying(false);
          });
      }
    };

    if (video.readyState >= 2) {
      attemptPlay();
    } else {
      video.addEventListener('loadeddata', attemptPlay, { once: true });
      video.addEventListener('canplay', attemptPlay, { once: true });
    }

    const onPlayEvent = () => {
      if (isMounted) setIsPlaying(true);
    };
    const onPauseEvent = () => {
      if (isMounted) setIsPlaying(false);
    };

    video.addEventListener('playing', onPlayEvent);
    video.addEventListener('pause', onPauseEvent);

    // Global first-gesture fallback if browser policy blocks unmuted/autonomous autoplay
    const onFirstUserGesture = () => {
      if (video && video.paused) {
        video.play().catch(() => {});
      }
    };
    window.addEventListener('click', onFirstUserGesture, { once: true });
    window.addEventListener('touchstart', onFirstUserGesture, { once: true });

    return () => {
      isMounted = false;
      video.removeEventListener('playing', onPlayEvent);
      video.removeEventListener('pause', onPauseEvent);
      video.removeEventListener('loadeddata', attemptPlay);
      video.removeEventListener('canplay', attemptPlay);
      window.removeEventListener('click', onFirstUserGesture);
      window.removeEventListener('touchstart', onFirstUserGesture);
    };
  }, [project.slug, videoSrc, project.name]);

  const toggleVideoPlayback = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch((err) => {
        console.warn(`[PRR Video] Play failed:`, err);
      });
    } else {
      video.pause();
    }
  };

  return (
    <section className="w-full bg-[#030D18] text-white pt-24 pb-12 lg:pt-28 lg:pb-16 border-b border-white/10">
      <div className="container mx-auto px-4 max-w-7xl">

        {/* ---------------------------------------------------- */}
        {/* 1. PROJECT HEADER: BREADCRUMBS, TITLE & TAGLINE      */}
        {/* ---------------------------------------------------- */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            {/* Breadcrumbs */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs">
              <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-gray-600">/</span>
              <Link href="/projects" className="text-gray-400 hover:text-white transition-colors">
                Projects
              </Link>
              <span className="text-gray-600">/</span>
              <span className="text-[#00AEEF] font-semibold">{project.name}</span>
            </nav>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-[#00AEEF] text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-sm">
                {project.category || project.projectType}
              </span>
              <span className="px-3 py-1 bg-[#0B2748] text-[#C9A96E] border border-[#C9A96E]/30 text-xs font-semibold uppercase tracking-wider rounded-full">
                {project.zone} • {project.location}
              </span>
              {project.taxHighlight && (
                <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold rounded-full flex items-center gap-1.5">
                  <BadgeCheck className="w-3.5 h-3.5" />
                  {project.taxHighlight}
                </span>
              )}
              {project.possession && (
                <span className="hidden sm:inline-flex px-3 py-1 bg-white/10 text-gray-200 text-xs rounded-full">
                  {project.possession}
                </span>
              )}
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
            {project.name}
          </h1>
          {project.tagline && (
            <p className="text-base sm:text-lg text-gray-300 font-light italic max-w-3xl">
              "{project.tagline}"
            </p>
          )}
        </div>

        {/* ---------------------------------------------------- */}
        {/* 2. TWO DISTINCT MEDIA PANELS: 50% VIDEO / 50% IMAGE  */}
        {/* ---------------------------------------------------- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          
          {/* LEFT MEDIA PANEL: PROJECT VIDEO */}
          <div 
            onClick={toggleVideoPlayback}
            className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#020810] border border-white/15 shadow-2xl cursor-pointer group select-none"
            title="Click to play or pause project video"
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              src={videoSrc}
              className="w-full h-full object-cover object-center"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>

            {/* Badge Pill - Top Left */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#030D18]/80 backdrop-blur-md border border-white/15 text-[11px] font-semibold tracking-wider text-[#C9A96E] uppercase pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-[#C9A96E] animate-pulse"></span>
              Project Video Walkthrough
            </div>

            {/* Play overlay if paused */}
            {!isPlaying && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/35 backdrop-blur-[2px] transition-opacity">
                <div className="w-14 h-14 rounded-full bg-[#00AEEF] text-white flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
                  <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Bottom status badge */}
            <div className="absolute bottom-3 right-3 z-20 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#030D18]/70 backdrop-blur-sm border border-white/10 text-[10px] text-gray-300 pointer-events-none">
              <span>HD 1080p</span>
              <span>•</span>
              <span>{isPlaying ? 'Playing' : 'Tap to Play'}</span>
            </div>
          </div>

          {/* RIGHT MEDIA PANEL: PROJECT IMAGE */}
          <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-[#020810] border border-white/15 shadow-2xl group">
            <img
              src={project.image}
              alt={`${project.name} - Architectural Elevation`}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            />

            {/* Badge Pill - Top Right */}
            <div className="absolute top-4 right-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#030D18]/80 backdrop-blur-md border border-white/15 text-[11px] font-semibold tracking-wider text-gray-200 uppercase pointer-events-none">
              <Building2 className="w-3.5 h-3.5 text-[#00AEEF]" />
              Architectural Elevation
            </div>

            {/* Bottom status badge */}
            <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#030D18]/70 backdrop-blur-sm border border-white/10 text-[10px] text-gray-300 pointer-events-none">
              <span>{project.location}, Pune</span>
            </div>
          </div>

        </div>

        {/* ---------------------------------------------------- */}
        {/* 3. PROJECT INFORMATION (BELOW MEDIA PANELS)          */}
        {/* ---------------------------------------------------- */}
        <div className="mt-8 lg:mt-10 bg-[#041222] border border-[#C9A96E]/20 rounded-2xl p-6 lg:p-8 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-bold text-[#C9A96E] uppercase tracking-wider block mb-1">
                Project Specifications &amp; Overview
              </span>
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                {project.name}
                <span className="text-sm font-normal text-gray-400">
                  ({project.category || project.projectType})
                </span>
              </h2>
            </div>
            {project.possession && (
              <div className="text-left md:text-right">
                <span className="text-[11px] text-gray-400 uppercase tracking-wider block">Possession Timeline</span>
                <span className="text-sm font-semibold text-white">{project.possession}</span>
              </div>
            )}
          </div>

          {/* Dynamic Specs Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 pt-6">
            {/* Category */}
            <div>
              <span className="text-xs font-medium text-gray-400 block mb-1">Category</span>
              <p className="text-sm font-bold text-white">{project.category || project.projectType}</p>
            </div>

            {/* Location */}
            <div>
              <span className="text-xs font-medium text-gray-400 block mb-1">Location</span>
              <p className="text-sm font-bold text-white flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#00AEEF] flex-shrink-0" />
                {project.location}, Pune
              </p>
            </div>

            {/* Project Size */}
            <div>
              <span className="text-xs font-medium text-gray-400 block mb-1">Project Size</span>
              <p className="text-sm font-bold text-white">{project.projectSize || "Premium Site"}</p>
            </div>

            {/* Configuration */}
            <div>
              <span className="text-xs font-medium text-gray-400 block mb-1">Configuration</span>
              <p className="text-sm font-bold text-white">{project.configuration || "Residences"}</p>
            </div>

            {/* Price Guidance */}
            <div>
              <span className="text-xs font-medium text-gray-400 block mb-1">Price Guidance</span>
              <p className="text-sm font-extrabold text-[#C9A96E]">{project.price || "Price on Request"}</p>
            </div>

            {/* Status / RERA */}
            <div>
              <span className="text-xs font-medium text-gray-400 block mb-1">Status / RERA</span>
              <p className="text-sm font-bold text-white truncate" title={project.possession || project.status}>
                {project.taxHighlight || project.status || project.possession || "Under Construction"}
              </p>
            </div>
          </div>
        </div>

        {/* ---------------------------------------------------- */}
        {/* 4. CONTACT / ENQUIRY SECTION (BELOW PROJECT INFO)    */}
        {/* ---------------------------------------------------- */}
        <div className="mt-6 lg:mt-8 bg-gradient-to-r from-[#0B2748] to-[#041527] border border-[#00AEEF]/25 rounded-2xl p-6 lg:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-[#00AEEF] uppercase tracking-wider block mb-1">
                Direct Mandate Sales Desk
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                Interested in {project.name}?
              </h3>
              <p className="text-sm text-gray-300">
                Discuss unit configurations, pricing, and site visits directly with Prop Range Realty.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-3">
              {/* Enquire Button */}
              <button
                onClick={() => setIsEnquiryOpen(true)}
                aria-label={`Enquire about ${project.name}`}
                className="px-6 py-3.5 bg-[#00AEEF] hover:bg-[#009bd6] text-white font-bold rounded-xl text-sm transition-all shadow-lg hover:shadow-[#00AEEF]/30 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Enquire About This Project</span>
              </button>

              {/* WhatsApp Button */}
              <a
                href={PRR_CONTACT.getWhatsAppUrl(project.name)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Contact PRR on WhatsApp for ${project.name}`}
                className="px-5 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl text-sm transition-all shadow-md hover:-translate-y-0.5 flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {/* Call Desk Button */}
              <a
                href={PRR_CONTACT.phoneTel}
                aria-label={`Call PRR office desk at ${PRR_CONTACT.phone}`}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl text-sm transition-colors border border-white/20 flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#00AEEF]" />
                <span>Call Desk: {PRR_CONTACT.phone}</span>
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Project Enquiry Modal */}
      <ProjectEnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
        project={project}
      />
    </section>
  );
};

// ============================================================
// 02 — PROJECT ENQUIRY MODAL (DIRECT TO RAVI JAISWAL)
// ============================================================
export const ProjectEnquiryModal = ({
  isOpen,
  onClose,
  project
}: {
  isOpen: boolean;
  onClose: () => void;
  project: Project;
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    configuration: project.configurations?.[0]?.config || '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.email.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, phone number, and email.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          projectName: project.name,
          enquiryType: `Project Enquiry — ${project.name} (${formData.configuration || 'General'})`,
          message: formData.message.trim() || `Enquiry for ${project.name}, Location: ${project.location}`,
          source: 'Project Detail Modal'
        })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit enquiry.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Unable to dispatch enquiry. Please contact us directly via WhatsApp or Call.'
      );
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      configuration: project.configurations?.[0]?.config || '',
      message: ''
    });
    setStatus('idle');
    setErrorMessage('');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-[#0B2748] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {status === 'success' ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8" strokeWidth={3} />
            </div>
            <h3 className="text-2xl font-bold text-[#0B2748]">Enquiry Dispatched</h3>
            <p className="text-gray-600 text-sm leading-relaxed max-w-md mx-auto">
              Thank you, <strong className="text-[#0B2748]">{formData.name}</strong>. Your enquiry for <strong className="text-[#00AEEF]">{project.name}</strong> has been transmitted to <strong>Ravi Jaiswal</strong> ({PRR_CONTACT.email}). Our sales advisory desk will connect with you shortly.
            </p>
            <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={PRR_CONTACT.getWhatsAppUrl(project.name)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 bg-[#25D366] text-white font-bold rounded-xl text-sm flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                Open WhatsApp Desk
              </a>
              <Button onClick={handleReset} variant="outline" className="rounded-xl">
                Close
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-bold text-[#00AEEF] uppercase tracking-wider block mb-1">
                Project Dossier Enquiry
              </span>
              <h3 className="text-2xl font-extrabold text-[#0B2748]">{project.name}</h3>
              <p className="text-xs text-gray-500 mt-1">
                Direct advisory connection to Founder &amp; CEO Ravi Jaiswal
              </p>
            </div>

            {status === 'error' && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anand Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Mobile / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF]"
                  />
                </div>
              </div>

              {project.configurations && project.configurations.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Configuration Interest</label>
                  <select
                    value={formData.configuration}
                    onChange={(e) => setFormData({ ...formData, configuration: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF]"
                  >
                    {project.configurations.map((c, i) => (
                      <option key={i} value={c.config}>
                        {c.config} ({c.size}) {c.price ? `— ${c.price}` : ''}
                      </option>
                    ))}
                    <option value="All Configurations / Investor Enquiry">All Configurations / Investor Enquiry</option>
                  </select>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Message / Specific Requirements</label>
                <textarea
                  rows={3}
                  placeholder={`Interested in booking details, floor plans, and pricing for ${project.name}...`}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-[#00AEEF] focus:ring-1 focus:ring-[#00AEEF] resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 bg-[#00AEEF] hover:bg-[#009bd6] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Transmitting to Ravi Jaiswal...
                    </>
                  ) : (
                    <>
                      <span>Submit Project Enquiry</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              <div className="text-center pt-2">
                <p className="text-[11px] text-gray-400">
                  Enquiries are directly routed to {PRR_CONTACT.email} and {PRR_CONTACT.phone}.
                </p>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================================
// 03 — PROJECT SUB NAVIGATION (STICKY WITH SWITCH DROPDOWN)
// ============================================================
export const ProjectSubNav = ({ project, projectsList }: { project: Project, projectsList: Project[] }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsDropdownOpen(false);
    };
    
    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isDropdownOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'project-facts', 'amenities', 'gallery', 'location'];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string) => {
    e.preventDefault();
    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="sticky top-0 z-[50] bg-white border-b border-gray-200 shadow-sm w-full overflow-visible">
      <div className="container mx-auto px-4 max-w-6xl flex items-center justify-between">
        
        {/* Navigation Tabs */}
        <div className="overflow-x-auto min-w-0 flex-1 hide-scrollbar">
          <nav className="flex items-center space-x-6 md:space-x-8 min-w-max pr-4">
            {[
              { id: 'overview', label: 'OVERVIEW' },
              { id: 'project-facts', label: 'PROJECT FACTS' },
              { id: 'amenities', label: 'AMENITIES' },
              { id: 'gallery', label: 'GALLERY' },
              { id: 'location', label: 'LOCATION' }
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`py-4 md:py-5 text-xs md:text-sm font-bold tracking-wider border-b-2 transition-colors ${
                  activeSection === item.id 
                    ? 'border-[#00AEEF] text-[#00AEEF]' 
                    : 'border-transparent text-gray-500 hover:text-[#0B2748]'
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Switch Project Dropdown */}
        <div className="ml-4 md:ml-8 py-3 flex-shrink-0" ref={dropdownRef}>
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 bg-[#0B2748] text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-semibold hover:bg-[#0d2f5a] transition-colors"
            >
              <span className="hidden sm:inline">SWITCH PROJECT</span>
              <span className="inline sm:hidden">SWITCH</span>
              {isDropdownOpen ? (
                <ChevronUp className="w-4 h-4 transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform duration-200" />
              )}
            </button>
            
            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 md:w-64 bg-white border border-black/10 rounded-xl shadow-xl z-[9999] overflow-hidden">
                <div className="py-1 max-h-[60vh] overflow-y-auto">
                  {projectsList.map((p) => {
                    const isCurrent = p.slug === project.slug;
                    return (
                      <button
                        key={p.slug}
                        onClick={() => {
                          if (!isCurrent) {
                            setIsDropdownOpen(false);
                            router.push(`/projects/${p.slug}`);
                          }
                        }}
                        disabled={isCurrent}
                        className={`block w-full text-left px-4 py-3 text-sm transition-colors flex justify-between items-center ${
                          isCurrent 
                            ? 'text-[#C9A96E] font-semibold bg-gray-50 cursor-default' 
                            : 'text-[#0B1F33] hover:bg-[#F6F2E8]'
                        }`}
                      >
                        <span className="truncate pr-2">{p.name}</span>
                        {isCurrent && <span className="text-[10px] uppercase tracking-wider text-[#C9A96E]/70 flex-shrink-0">Current</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

// ============================================================
// 04 — PROJECT FACTS GRID
// ============================================================
export const ProjectFacts = ({ project }: { project: Project }) => {
  const facts = [
    { label: 'Project Type', value: project.projectType },
    { label: 'Project Size', value: project.projectSize },
    { label: 'Floor Structure', value: project.floorStructure },
    { label: 'Units Per Floor', value: project.unitsPerFloor },
    { label: 'Lifts', value: project.lifts },
    { label: 'Wings', value: project.wings },
    { label: 'Carpet Area', value: project.carpetArea },
    { label: 'Available Units', value: project.units },
    { label: 'Possession Status', value: project.possession || project.status },
    { label: 'Tax Highlight', value: project.taxHighlight },
  ].filter(f => f.value);

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#0B2748] mb-8">PROJECT FACTS</h2>
      <div className="bg-[#0B2748] rounded-[30px] p-8 md:p-12 shadow-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {facts.map((fact, idx) => (
            <div key={idx} className="border-l-2 border-[#00AEEF]/30 pl-4">
              <div className="text-[#00AEEF] text-xs uppercase font-bold tracking-wider mb-2">{fact.label}</div>
              <div className="text-white font-medium">{fact.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 05 — CONFIGURATION CARDS
// ============================================================
export const ConfigurationCards = ({ configurations }: { configurations?: Project['configurations'] }) => {
  const items = configurations || [];
  if (items.length === 0) return null;
  return (
    <div>
      <h3 className="text-2xl font-bold text-[#0B2748] mb-6">UNIT CONFIGURATIONS</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((config, idx) => (
          <div key={idx} className="bg-[#0B2748] rounded-[24px] p-8 text-white shadow-md relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00AEEF]/10 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-500"></div>
            <h4 className="text-[#00AEEF] font-bold text-xl mb-4">{config.config}</h4>
            <div className="mb-4">
              <span className="block text-xs text-gray-400 uppercase tracking-wider mb-1">Carpet Area</span>
              <span className="font-semibold text-lg">{config.size}</span>
            </div>
            {config.price && (
              <div className="mt-6 pt-6 border-t border-white/10">
                <span className="block text-[#00AEEF] font-bold text-2xl mb-1">{config.price}*</span>
                <span className="text-[10px] text-gray-400 block italic leading-tight">As per PRR company profile.<br/>Price and availability subject to current verification.</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================================
// 06 — AMENITIES SECTION
// ============================================================
export const AmenitiesSection = ({ amenities, image, projectName }: { amenities?: string[], image: string, projectName: string }) => {
  const list = amenities || [];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <div className="absolute inset-0 bg-[#00AEEF] rounded-[30px] transform -rotate-3 scale-[0.98] opacity-20"></div>
        <img src={image} alt={`${projectName} Amenities`} className="relative z-10 w-full h-[500px] object-cover rounded-[30px] shadow-xl" />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-[#0B2748] mb-8">AMENITIES</h2>
        <div className="bg-[#0B2748] rounded-[30px] p-8 md:p-12 shadow-lg text-white">
          <ul className="space-y-6">
            {list.map((amenity, idx) => (
              <li key={idx} className="flex items-center text-lg">
                <div className="bg-[#00AEEF] p-1.5 rounded-full mr-4 flex-shrink-0">
                  <Check className="w-4 h-4 text-white font-bold" strokeWidth={4} />
                </div>
                <span>{amenity}</span>
              </li>
            ))}
          </ul>
          {list.length <= 3 && list[0]?.includes('Modern Lifestyle') && (
            <div className="mt-8 pt-6 border-t border-white/10 text-sm text-gray-300 italic">
              * Detailed amenities to be updated/verified by PRR.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 07 — PROJECT GALLERY LIGHTBOX
// ============================================================
export const ProjectGallery = ({ gallery, projectName, fallbackImage }: { gallery?: string[], projectName: string, fallbackImage?: string }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const defaultImg = fallbackImage || '/images/projects/dream-glorious.png';
  const images = (gallery && gallery.length > 0) ? gallery : [defaultImg];

  return (
    <div>
      <h2 className="text-3xl font-bold text-[#0B2748] mb-8">GALLERY</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div 
            key={idx} 
            className="group relative h-64 rounded-[24px] overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            onClick={() => setSelectedImage(img)}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors z-10"></div>
            <img 
              src={img} 
              alt={`${projectName} Gallery ${idx + 1}`} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              onError={(e) => {
                (e.target as HTMLImageElement).src = defaultImg;
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
              <div className="bg-white/90 backdrop-blur-sm text-[#0B2748] px-4 py-2 rounded-full font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform">
                View Image
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4 md:p-8" onClick={() => setSelectedImage(null)}>
          <div className="relative w-full max-w-5xl h-full flex items-center justify-center">
            <button 
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 text-xl"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image lightbox"
            >
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Gallery Preview" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                 (e.target as HTMLImageElement).src = defaultImg;
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================
// 08 — PROJECT LOCATION & MAP
// ============================================================
export const ProjectLocation = ({ project }: { project: Project }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-[#0B2748] mb-8">LOCATION</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="rounded-[30px] overflow-hidden shadow-lg min-h-[320px] md:min-h-[500px] bg-gray-100 relative flex flex-col">
          {project.mapEmbedUrl ? (
            <iframe
              src={project.mapEmbedUrl}
              className="w-full h-full min-h-[320px] md:min-h-[500px]"
              style={{ border: 0, flexGrow: 1 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              title={`${project.name} Google Map Location`}
            />
          ) : (
            <div className="w-full h-full min-h-[320px] md:min-h-[500px] flex flex-col items-center justify-center text-gray-400">
              <MapPin className="w-16 h-16 mb-4 text-gray-300" />
              <p>Map Location Pending Update</p>
            </div>
          )}
        </div>
        <div className="bg-[#0B2748] rounded-[30px] p-8 md:p-12 shadow-lg text-white">
          <div className="mb-10">
            <div className="text-[#00AEEF] text-xs font-bold tracking-wider mb-2 uppercase">REGISTERED / PROJECT LOCATION</div>
            <h3 className="text-2xl font-bold">{project.name}</h3>
            <p className="text-gray-300 text-lg">{project.location}, Pune</p>
          </div>
          
          <div>
            <div className="text-[#00AEEF] text-xs font-bold tracking-wider mb-6 uppercase">NEARBY DESTINATIONS & HUBS</div>
            <ul className="space-y-6">
              {(project.nearbyLocations || []).map((loc, idx) => (
                <li key={idx} className="flex justify-between items-center border-b border-white/10 pb-4">
                  <span className="text-gray-300 font-medium">{loc.label}</span>
                  <span className="font-semibold text-right max-w-[60%]">{loc.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================================
// 09 — PROJECT CTA SECTION (WITH CENTRALIZED ACTIONS)
// ============================================================
export const ProjectCTA = ({ project }: { project?: Project }) => {
  return (
    <div className="bg-gradient-to-br from-[#0B2748] via-[#0D2F5A] to-[#041222] rounded-[30px] p-8 md:p-12 text-center text-white shadow-2xl mt-12 mb-12 border border-[#C9A96E]/20 relative overflow-hidden">
      <div className="relative z-10 max-w-3xl mx-auto">
        <span className="inline-block px-4 py-1.5 bg-[#C9A96E]/20 text-[#C9A96E] border border-[#C9A96E]/40 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          Prop Range Realty • Sales &amp; Mandate Advisory
        </span>
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          {project ? `Enquire About ${project.name} or Partner With PRR` : "Interested in working with us?"}
        </h3>
        <p className="text-gray-300 text-base md:text-lg mb-8 leading-relaxed">
          Led by Founder &amp; CEO Ravi Jaiswal, Prop Range Realty delivers high-velocity mandate sales, builder partnerships, and luxury advisory across Pune's prime corridors.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href={PRR_CONTACT.getWhatsAppUrl(project?.name)}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-7 py-3.5 rounded-full text-base flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp Ravi Jaiswal
          </a>

          <a
            href={PRR_CONTACT.phoneTel}
            className="bg-[#00AEEF] hover:bg-[#009FE3] text-white font-bold px-7 py-3.5 rounded-full text-base flex items-center gap-2 shadow-lg transition-transform hover:-translate-y-0.5"
          >
            <Phone className="w-5 h-5" />
            Call: {PRR_CONTACT.phone}
          </a>

          <a
            href={PRR_CONTACT.getMailtoUrl(project?.name)}
            className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-7 py-3.5 rounded-full text-base flex items-center gap-2 transition-colors"
          >
            <Mail className="w-5 h-5 text-gray-300" />
            Email Desk
          </a>
        </div>

        {/* Builder Pitch Link */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300">
          <span>Are you a developer or builder?</span>
          <Link href="/pitch-your-project" className="text-[#C9A96E] hover:underline font-semibold flex items-center gap-1">
            Pitch Your Project Mandate <ArrowUpRight className="w-4 h-4" />
          </Link>
          <span className="text-gray-500">•</span>
          <Link href="/contact" className="text-gray-300 hover:text-white underline">
            Visit Office: Hinjewadi Phase-1, Pune
          </Link>
        </div>
      </div>
    </div>
  );
};
