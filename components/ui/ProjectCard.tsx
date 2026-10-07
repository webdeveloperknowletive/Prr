'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { MapPin, ArrowUpRight, Eye } from 'lucide-react';

export interface ProjectCardProps {
  image: string;
  title: string;
  location: string;
  badge: string;
  href: string;
  video?: string;
  tagline?: string;
  zone?: string;
  configuration?: string;
  onOpenOverlay?: () => void;
  priority?: boolean;
}

export function ProjectCard({
  image,
  title,
  location,
  badge,
  href,
  video,
  tagline,
  zone,
  configuration,
  onOpenOverlay,
  priority = false
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transformStyle, setTransformStyle] = useState<string>('');

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply subtle 3D tilt on devices with hover and non-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (window.innerWidth < 1024) return;
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    // Strict safety limits: rotateY max ±2deg, rotateX max ±1.5deg
    const rotY = (x * 3.5).toFixed(2);
    const rotX = (-y * 2.5).toFixed(2);
    setTransformStyle(`perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-4px)`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle('');
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: transformStyle ? 'transform 0.1s ease-out' : 'transform 0.4s ease, box-shadow 0.4s ease'
      }}
      className="relative overflow-hidden rounded-[24px] group h-[440px] shadow-sm hover:shadow-2xl bg-[#071827] will-change-transform border border-white/10"
    >
      {/* Background Media (Video on hover, Image static) */}
      {video ? (
        <video
          ref={videoRef}
          src={video}
          poster={image}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      ) : (
        <img
          src={image}
          alt={title}
          loading={priority ? 'eager' : 'lazy'}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
        />
      )}

      {/* Cinematic Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(180deg, rgba(7,24,39,0.15) 0%, rgba(7,24,39,0.3) 35%, rgba(7,24,39,0.75) 65%, rgba(7,24,39,0.96) 100%)'
        }}
      />
      <div className="absolute inset-0 bg-[#071827]/0 group-hover:bg-[#071827]/20 transition-colors duration-500 pointer-events-none" />

      {/* Subtle PRR Gold Architectural Edge on Hover */}
      <div className="absolute inset-0 rounded-[24px] border border-transparent group-hover:border-[#C9A96E]/40 pointer-events-none transition-colors duration-500" />

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6 z-10">
        {/* Top Row: Category Badge + Quick Dossier Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#101827]/85 px-3 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9A96E]" />
            {badge}
          </div>

          <Link
            href={href}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#C9A96E]/30 bg-[#071827]/80 hover:bg-[#C9A96E] hover:text-[#071827] px-2.5 py-1 text-[11px] font-medium text-[#C9A96E] backdrop-blur-[8px] transition-all duration-200 cursor-pointer shadow-sm"
            title={`${title} Dossier`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Dossier</span>
          </Link>
        </div>

        {/* Bottom Row: Location, Configuration, Title, Link */}
        <div className="flex flex-col gap-2">
          {/* Location & Corridor */}
          <div className="flex items-center gap-2 text-white/90 text-sm md:text-base font-medium">
            <MapPin className="w-[18px] h-[18px] text-[#C9A96E]" />
            <span>{location}{zone ? ` · ${zone}` : ', Pune'}</span>
          </div>

          {configuration && (
            <div className="text-xs text-[#AEB7C4] font-medium tracking-wide">
              {configuration}
            </div>
          )}

          {/* Title */}
          <Link href={href} className="group/title block">
            <h3 className="text-white text-[28px] md:text-[34px] font-semibold leading-[1.08] group-hover/title:text-[#D1AD67] transition-colors duration-300">
              {title}
            </h3>
          </Link>

          {tagline && (
            <p className="text-xs md:text-sm text-gray-300/80 line-clamp-1 italic font-light">
              &ldquo;{tagline}&rdquo;
            </p>
          )}

          {/* View Project Action */}
          <Link href={href} className="flex items-center justify-between pt-3 mt-1 border-t border-white/10 group/link">
            <span className="text-[#D0AE67] group-hover/link:text-white font-semibold text-sm md:text-base transition-colors duration-300">
              View Project
            </span>
            <ArrowUpRight className="w-5 h-5 text-[#D0AE67] group-hover/link:text-white transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
          </Link>
        </div>
      </div>
    </div>
  );
}
