'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { projects, Project } from '@/data/projects';
import styles from './ProjectsSection.module.css';

interface ProjectsSectionProps {
  onProjectSelect: (id: string) => void;
}

function ProjectMedia({ 
  project, 
  isActive, 
  isSectionVisible, 
  sizes = '(max-width: 1200px) 50vw, 40vw', 
  priority = false 
}: { 
  project: Project; 
  isActive: boolean; 
  isSectionVisible: boolean; 
  sizes?: string;
  priority?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isActive && isSectionVisible) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isActive, isSectionVisible]);

  return (
    <div className={styles.mediaFrame}>
      {project.video ? (
        <video
          ref={videoRef}
          src={project.video}
          className={styles.mediaVideo}
          muted
          loop
          playsInline
          preload="metadata"
          poster={project.image || undefined}
        />
      ) : project.image ? (
        <Image
          src={project.image}
          alt={project.name}
          fill
          className={styles.mediaImage}
          sizes={sizes}
          priority={priority}
        />
      ) : null}
      <div className={styles.mediaVignette} />
      <div className={styles.crimsonThreadGlow} />
    </div>
  );
}

export default function ProjectsSection({ onProjectSelect }: ProjectsSectionProps) {
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [activeMobileIndex, setActiveMobileIndex] = useState(0);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to pause offscreen videos (Requirement #16)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Subtle 3D perspective mouse tracking for spatial exhibition
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    setMouseOffset({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
    setHoveredProjectId(null);
  };

  const handleMobileScroll = () => {
    if (!mobileRailRef.current) return;
    const scrollLeft = mobileRailRef.current.scrollLeft;
    const itemWidth = mobileRailRef.current.clientWidth * 0.88;
    const idx = Math.round(scrollLeft / itemWidth);
    setActiveMobileIndex(Math.min(Math.max(idx, 0), projects.length - 1));
  };

  const featured = projects[0]; // Dream Glorious
  const wingProjects = [projects[1], projects[2]]; // The Quill, Arkaa Galaxy
  const deepProjects = [projects[3], projects[4], projects[5]]; // VTP Urban Life, Revanta, White Water House

  const activeVideoId = hoveredProjectId || featured.id;

  return (
    <section 
      id="projects" 
      className={styles.universeSection} 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Red Thread Receiver from Company Story */}
      <div className="red-thread-receiver">
        <div className="thread-stem" />
        <div className="thread-node" />
      </div>

      {/* Editorial Header */}
      <div className={styles.header}>
        <div className={styles.headerKicker}>
          <span className="editorial-tag">Architectural Portfolio</span>
        </div>
        <div className={styles.headerMain}>
          <h2 className={styles.headline}>
            THE PROJECT UNIVERSE.
          </h2>
          <p className={styles.supportingText}>
            An architectural exhibition of Pune&apos;s definitive residential and commercial developments. Explore each mandate as a distinct spatial destination.
          </p>
        </div>
      </div>

      {/* DESKTOP SPATIAL EXHIBITION STAGE (Perspective, Depth, Scale) */}
      <div className={styles.spatialViewport}>
        <div 
          className={styles.spatialStage}
          style={{
            transform: `perspective(1600px) rotateY(${mouseOffset.x * 3.5}deg) rotateX(${-mouseOffset.y * 2.5}deg)`
          }}
        >
          {/* PRR Red Thread SVG connecting the exhibition nodes across 3D space */}
          <svg className={styles.spatialThreadSvg} viewBox="0 0 1000 650" fill="none">
            <path
              d="M 320 280 C 450 160, 600 200, 780 230 S 680 480, 520 540 S 260 520, 180 500"
              stroke="rgba(179, 19, 27, 0.45)"
              strokeWidth="2"
              strokeDasharray="6 6"
              className={styles.animatedThreadPath}
            />
          </svg>

          {/* Upper Spatial Tier: Dominant Featured Anchor (Left) + Floating Monoliths (Right) */}
          <div className={styles.spatialRowTop}>
            {/* 1. Dominant Featured Anchor (Dream Glorious - Foreground Tier) */}
            <div
              className={`${styles.monolithPanel} ${styles.tierForeground} ${hoveredProjectId === featured.id ? styles.isFocused : hoveredProjectId ? styles.isDistant : ''}`}
              onMouseEnter={() => setHoveredProjectId(featured.id)}
              onClick={() => onProjectSelect(featured.id)}
            >
              <ProjectMedia
                project={featured}
                isActive={activeVideoId === featured.id}
                isSectionVisible={isSectionVisible}
                sizes="(max-width: 1200px) 65vw, 60vw"
                priority
              />

              <div className={styles.panelOverlay}>
                <div className={styles.locationPill}>
                  <span className="red-thread-marker" />
                  <span>{featured.location} · {featured.zone}</span>
                </div>
                <h3 className={styles.panelTitle}>{featured.name}</h3>
                <p className={styles.panelTagline}>{featured.tagline}</p>
                <div className={styles.panelSpecs}>
                  <span>{featured.configuration}</span>
                  <span className={styles.specDivider}>·</span>
                  <span>{featured.carpetArea}</span>
                  <span className={styles.specDivider}>·</span>
                  <span className={styles.priceTag}>{featured.price}</span>
                </div>
                <div className={styles.actionPrompt}>
                  <span>ENTER DESTINATION</span>
                  <span className={styles.arrowIcon}>→</span>
                </div>
              </div>
            </div>

            {/* 2 & 3. Midground Elevating Wings (The Quill & Arkaa Galaxy) */}
            <div className={styles.wingColumn}>
              {wingProjects.map((p) => {
                const isHovered = hoveredProjectId === p.id;
                const isDistant = hoveredProjectId && !isHovered;

                return (
                  <div
                    key={p.id}
                    className={`${styles.monolithPanel} ${styles.tierMidground} ${isHovered ? styles.isFocused : isDistant ? styles.isDistant : ''}`}
                    onMouseEnter={() => setHoveredProjectId(p.id)}
                    onClick={() => onProjectSelect(p.id)}
                  >
                    <ProjectMedia
                      project={p}
                      isActive={activeVideoId === p.id}
                      isSectionVisible={isSectionVisible}
                      sizes="(max-width: 1200px) 35vw, 30vw"
                    />

                    <div className={styles.panelOverlay}>
                      <div className={styles.locationPill}>
                        <span className="red-thread-marker" />
                        <span>{p.location}</span>
                      </div>
                      <h4 className={styles.wingTitle}>{p.name}</h4>
                      <p className={styles.wingTagline}>{p.tagline}</p>
                      <div className={styles.wingSpecs}>
                        <span>{p.configuration}</span>
                        <span className={styles.specDivider}>·</span>
                        <span className={styles.priceTag}>{p.price}</span>
                      </div>
                      <div className={styles.actionPromptCompact}>
                        <span>EXPLORE</span>
                        <span>→</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Lower Spatial Tier: Deep Perspective Horizon (VTP, Revanta, White Water House) */}
          <div className={styles.spatialRowBottom}>
            {deepProjects.map((p) => {
              const isHovered = hoveredProjectId === p.id;
              const isDistant = hoveredProjectId && !isHovered;

              return (
                <div
                  key={p.id}
                  className={`${styles.monolithPanel} ${styles.tierDeep} ${isHovered ? styles.isFocused : isDistant ? styles.isDistant : ''}`}
                  onMouseEnter={() => setHoveredProjectId(p.id)}
                  onClick={() => onProjectSelect(p.id)}
                >
                  <ProjectMedia
                    project={p}
                    isActive={activeVideoId === p.id}
                    isSectionVisible={isSectionVisible}
                    sizes="(max-width: 1200px) 33vw, 28vw"
                  />

                  <div className={styles.panelOverlay}>
                    <div className={styles.locationPill}>
                      <span className="red-thread-marker" />
                      <span>{p.location}</span>
                    </div>
                    <h4 className={styles.deepTitle}>{p.name}</h4>
                    <p className={styles.deepTagline}>{p.tagline}</p>
                    <div className={styles.deepSpecs}>
                      <span>{p.configuration}</span>
                      <span className={styles.specDivider}>·</span>
                      <span className={styles.priceTag}>{p.price}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* MOBILE HORIZONTAL SWIPE EXHIBITION (Requirement #20 & #25) */}
      <div className={styles.mobileExhibition}>
        <div
          ref={mobileRailRef}
          className={styles.mobileRail}
          onScroll={handleMobileScroll}
        >
          {projects.map((proj) => (
            <div
              key={proj.id}
              className={styles.mobileCard}
              onClick={() => onProjectSelect(proj.id)}
            >
              <div className={styles.mobileMedia}>
                {proj.image ? (
                  <Image
                    src={proj.image}
                    alt={proj.name}
                    fill
                    className={styles.mobileImg}
                    sizes="88vw"
                  />
                ) : null}
                <div className={styles.mobileVignette} />
                <span className={styles.mobilePriceBadge}>{proj.price}</span>
              </div>

              <div className={styles.mobileDetails}>
                <div className={styles.mobileLoc}>
                  <span className="red-thread-marker" />
                  <span>{proj.location} · {proj.zone}</span>
                </div>
                <h3 className={styles.mobileTitle}>{proj.name}</h3>
                <p className={styles.mobileTagline}>{proj.tagline}</p>
                <div className={styles.mobileSpecs}>
                  <span>{proj.configuration}</span>
                  <span className={styles.specDivider}>·</span>
                  <span>{proj.carpetArea}</span>
                </div>
                <div className={styles.mobileAction}>
                  <span>ENTER DESTINATION</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Swipe Indicators */}
        <div className={styles.mobileIndicators}>
          {projects.map((p, idx) => (
            <span
              key={p.id}
              className={`${styles.indicatorDot} ${idx === activeMobileIndex ? styles.indicatorActive : ''}`}
            />
          ))}
        </div>
      </div>

      {/* Red Thread Connector into Deal Engine */}
      <div className="red-thread-connector">
        <div className="thread-node" />
        <div className="thread-stem" />
      </div>
    </section>
  );
}
