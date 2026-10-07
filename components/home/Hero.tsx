'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Play, Pause, FileDown, Volume2, VolumeX } from 'lucide-react';

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Strict muted requirements for cross-browser autoplay
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', 'true');

    let isDestroyed = false;

    const attemptPlay = () => {
      if (isDestroyed || !video) return;
      if (!video.muted) {
        video.muted = true;
      }
      const promise = video.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            if (!isDestroyed) setIsPlaying(true);
          })
          .catch(() => {
            if (!isDestroyed) setIsPlaying(false);
          });
      }
    };

    // Try playing immediately
    attemptPlay();

    // Listen to native video events
    const handleCanPlay = () => attemptPlay();
    const handleLoadedData = () => attemptPlay();
    const handlePlaying = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleVolumeChange = () => setIsMuted(video.muted);
    const handleEnded = () => {
      video.currentTime = 0;
      attemptPlay();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('ended', handleEnded);

    // If browser strictly blocks initial unprompted autoplay (e.g. low-power mode),
    // kickstart playback immediately upon first user touch, scroll, click or keypress
    const handleFirstInteraction = () => {
      if (video && video.paused) {
        attemptPlay();
      }
    };

    const interactionEvents = ['click', 'touchstart', 'scroll', 'keydown', 'pointerdown'];
    interactionEvents.forEach((evt) => {
      window.addEventListener(evt, handleFirstInteraction, { passive: true });
    });

    // Resume playback if user switches tabs and returns
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && video && video.paused) {
        attemptPlay();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isDestroyed = true;
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('ended', handleEnded);
      interactionEvents.forEach((evt) => {
        window.removeEventListener(evt, handleFirstInteraction);
      });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (!video.paused) {
      video.pause();
    } else {
      video.play().catch(() => {});
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  return (
    <section className="relative w-full min-h-[100vh] lg:min-h-[calc(100vh-80px)] flex items-center bg-[#00111f] overflow-hidden">
      {/* Fallback Background Poster Image behind video */}
      <img
        src="/images/home/hero-poster.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover object-[60%_center] pointer-events-none"
      />

      {/* Video Background */}
      <video
        ref={videoRef}
        src="/videos/erasio_Hero-Video.mp4"
        poster="/images/home/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="absolute inset-0 z-0 w-full h-full object-cover object-[60%_center]"
        aria-hidden="true"
      >
        <source src="/videos/erasio_Hero-Video.mp4" type="video/mp4" />
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Hero Overlay - Directional Gradient for readability */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none hidden md:block" 
        style={{
          background: "linear-gradient(90deg, rgba(5,15,26,0.88) 0%, rgba(5,15,26,0.72) 30%, rgba(5,15,26,0.30) 58%, rgba(5,15,26,0.05) 78%, transparent 100%)"
        }} 
      />
      {/* Mobile Overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none md:hidden bg-gradient-to-r from-[rgba(5,15,26,0.92)] via-[rgba(5,15,26,0.75)] to-[rgba(5,15,26,0.4)]" />

      <div className="w-full relative z-20 flex min-h-full items-center justify-start px-5 sm:px-8 lg:px-[4vw] pt-[120px] md:pt-[140px] lg:pt-[160px] pb-[160px] md:pb-[140px]">
        <div className="max-w-[820px] ml-0 mr-auto w-full text-left">
          
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4 animate-fade-in-up" style={{ animationDuration: '0.5s' }}>
            <div className="w-8 h-[1px] bg-[#C9A96E]"></div>
            <span className="text-[#C9A96E] font-semibold text-[11px] md:text-[13px] tracking-[0.18em] uppercase">
              STRATEGIC REAL ESTATE SALES PARTNER
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-[34px] sm:text-[38px] md:text-[44px] lg:text-[50px] xl:text-[54px] font-medium leading-[1.08] tracking-[-0.02em] max-w-[980px] text-white animate-fade-in-up" style={{ animationDuration: '0.6s', animationDelay: '0.1s', animationFillMode: 'both' }}>
            Accelerating <span className="text-[#C9A96E] font-serif italic">Real Estate Sales</span><br className="hidden md:block" />
            Through Strategy, Marketing &<br className="hidden md:block" />
            <span className="text-[#C9A96E] font-serif italic">Channel Partnerships.</span>
          </h1>
          
          {/* Supporting Copy */}
          <p className="mt-6 max-w-[700px] text-[16px] lg:text-[18px] leading-[1.6] text-[rgba(255,255,255,0.82)] animate-fade-in-up" style={{ animationDuration: '0.7s', animationDelay: '0.2s', animationFillMode: 'both' }}>
            Prop Range Realty works with developers and promoters to plan, position, market and sell real-estate projects through structured sales execution, qualified lead generation and channel partner activation.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row justify-start mt-10 gap-4 items-start sm:items-center animate-fade-in-up" style={{ animationDuration: '0.8s', animationDelay: '0.3s', animationFillMode: 'both' }}>
            <Link 
              href="/pitch-your-project"
              className="group relative flex items-center justify-center gap-2 font-semibold text-[15px] px-8 py-4 text-white rounded-md transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
              style={{
                background: "linear-gradient(135deg, #DFBE7C 0%, #B99558 100%)",
                boxShadow: "0 10px 30px rgba(185, 149, 88, 0.3)"
              }}
            >
              PITCH YOUR PROJECT
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>

            <Link 
              href="/contact"
              className="group relative flex items-center justify-center gap-2 font-medium text-[15px] px-8 py-4 text-white rounded-md transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto overflow-hidden"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.15)"
              }}
            >
              <div className="absolute inset-0 bg-[#C9A96E]/0 group-hover:bg-[#C9A96E]/10 transition-colors duration-300" />
              <Play className="w-4 h-4 text-[#C9A96E]" />
              REQUEST A MEETING
            </Link>
          </div>
          
          {/* Download Company Profile */}
          <div className="mt-8 animate-fade-in-up" style={{ animationDuration: '0.9s', animationDelay: '0.4s', animationFillMode: 'both' }}>
            <Link 
              href="/documents/prr-company-profile.pdf" 
              target="_blank"
              className="inline-flex items-center gap-2 text-[14px] text-white/70 hover:text-[#C9A96E] font-medium transition-colors"
            >
              <FileDown className="w-4 h-4" />
              <span className="border-b border-transparent hover:border-[#C9A96E] transition-colors pb-[1px]">
                Download Company Profile
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero Video Controls Indicator */}
      <div className="absolute bottom-6 right-6 z-20 hidden md:flex items-center gap-2 bg-[#071827]/70 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-xs text-white/80">
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-1.5 hover:text-[#C9A96E] transition-colors cursor-pointer"
          aria-label={isPlaying ? 'Pause hero video' : 'Play hero video'}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-[#C9A96E]" />}
          <span>{isPlaying ? 'Video Playing' : 'Play Video'}</span>
        </button>
        <span className="text-white/20">|</span>
        <button
          type="button"
          onClick={toggleMute}
          className="hover:text-[#C9A96E] transition-colors cursor-pointer"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-[#C9A96E]" />}
        </button>
      </div>
    </section>
  );
}
