'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { projects, Project } from '@/data/projects';
import styles from './ProjectOverlay.module.css';

interface ProjectOverlayProps {
  projectSlug: string | null;
  onClose: () => void;
  onSelectProject?: (slug: string) => void;
}

type TabType = 'highlights' | 'specifications' | 'amenities';

export default function ProjectOverlay({ projectSlug, onClose, onSelectProject }: ProjectOverlayProps) {
  const [activeTab, setActiveTab] = useState<TabType>('highlights');
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const project = projects.find((p) => p.slug === projectSlug);

  useEffect(() => {
    if (projectSlug) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [projectSlug, onClose]);

  useEffect(() => {
    if (videoRef.current && (project?.video || project?.heroVideo)) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    setActiveTab('highlights');
  }, [projectSlug, project]);

  if (!project) return null;

  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const activeVideoSrc = project.video || project.heroVideo;

  return (
    <div 
      className={`${styles.viewportTakeover} ${projectSlug ? styles.active : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} Dossier`}
    >
      {/* Background Media Canvas */}
      <div className={styles.mediaCanvasWrapper}>
        {activeVideoSrc ? (
          <video
            ref={videoRef}
            src={activeVideoSrc}
            className={styles.canvasVideo}
            autoPlay
            muted={isMuted}
            loop
            playsInline
            poster={project.image || undefined}
          />
        ) : project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className={styles.canvasImage}
            priority
          />
        ) : null}
        <div className={styles.canvasVignette} />
      </div>

      {/* Top Floating Navigation Bar */}
      <div className={styles.topBar}>
        <button type="button" className={styles.backButton} onClick={onClose}>
          <span className={styles.backArrow}>←</span>
          <span>Back to Portfolio</span>
        </button>

        <div className={styles.topRight}>
          {activeVideoSrc && (
            <button
              type="button"
              className={styles.audioToggle}
              onClick={() => setIsMuted(!isMuted)}
              aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              <span>{isMuted ? 'Sound Off (Unmute)' : 'Sound On (Mute)'}</span>
            </button>
          )}

          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onClose} 
            aria-label="Close project dossier"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Dossier Interface */}
      <div className={styles.dossierInterface}>
        <div className={styles.dossierHero}>
          <div className={styles.badgeRow}>
            <span className={styles.categoryTag}>{project.category}</span>
            <span className={styles.zoneTag}>{project.location} · {project.zone}</span>
          </div>

          <h2 className={styles.projectName}>{project.name}</h2>
          <p className={styles.projectTagline}>&ldquo;{project.tagline}&rdquo;</p>

          {/* Key Facts Horizontal Strip */}
          <div className={styles.keyFactsBar}>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>Project Size</span>
              <span className={styles.factValue}>{project.projectSize || 'N/A'}</span>
            </div>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>Configuration</span>
              <span className={styles.factValue}>{project.configuration}</span>
            </div>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>Price Guidance</span>
              <span className={styles.factValue}>{project.price || 'Contact PRR'}</span>
            </div>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>Possession</span>
              <span className={styles.factValue}>{project.possession || 'Verified with PRR'}</span>
            </div>
          </div>
        </div>

        {/* Tabbed Information Card */}
        <div className={styles.dossierDetailsCard}>
          <div className={styles.dossierTabs}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'highlights' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('highlights')}
            >
              Highlights
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'specifications' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'amenities' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('amenities')}
            >
              Amenities
            </button>
          </div>

          <div className={styles.tabContent}>
            {activeTab === 'highlights' && (
              <ul className={styles.bulletList}>
                {project.highlights.map((h, i) => (
                  <li key={i} className={styles.bulletItem}>
                    <span className={styles.bulletDot} />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            )}

            {activeTab === 'specifications' && (
              <div className={styles.specGrid}>
                <div className={styles.specCell}>
                  <span className={styles.specLabel}>Elevation / Structure</span>
                  <span className={styles.specValue}>{project.floors || project.floorStructure || 'N/A'}</span>
                </div>
                <div className={styles.specCell}>
                  <span className={styles.specLabel}>Units / Capacity</span>
                  <span className={styles.specValue}>{project.units || 'As per layout'}</span>
                </div>
                <div className={styles.specCell}>
                  <span className={styles.specLabel}>Carpet Area Range</span>
                  <span className={styles.specValue}>{project.carpetArea || 'N/A'}</span>
                </div>
                <div className={styles.specCell}>
                  <span className={styles.specLabel}>Key Corridor Landmark</span>
                  <span className={styles.specValue}>{project.landmark || project.location}</span>
                </div>
              </div>
            )}

            {activeTab === 'amenities' && (
              <div className={styles.amenitiesGrid}>
                {project.amenities.map((item, i) => (
                  <div key={i} className={styles.amenityTag}>
                    <span className={styles.amenityDot}>✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <p className={styles.priceNotice}>
            *Pricing and possession timelines based on PRR company profile; subject to current developer verification.
          </p>

          <div className={styles.dossierActions}>
            <Link 
              href={`/projects/${project.slug}`} 
              className={styles.primaryActionBtn}
              onClick={onClose}
            >
              <span>View Full Project Details</span>
              <span>→</span>
            </Link>
            <Link 
              href="/pitch-your-project" 
              className={styles.secondaryActionBtn}
              onClick={onClose}
            >
              <span>Inquire / Discuss Mandate</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Next Project Discovery Footer */}
      <div 
        className={styles.nextProjectPreviewBar}
        onClick={() => onSelectProject && onSelectProject(nextProject.slug)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && onSelectProject) onSelectProject(nextProject.slug);
        }}
      >
        <div className={styles.nextProjectInfo}>
          <span className={styles.nextKicker}>Next in Portfolio</span>
          <div className={styles.nextTitleRow}>
            <span className={styles.nextTitle}>{nextProject.name}</span>
            <span className={styles.nextLocation}>{nextProject.location} · {nextProject.configuration}</span>
          </div>
        </div>

        <div className={styles.nextMediaThumb}>
          {nextProject.image ? (
            <Image
              src={nextProject.image}
              alt={nextProject.name}
              fill
              className={styles.thumbImg}
            />
          ) : (
            <div className="w-full h-full bg-[#0B1F33]" />
          )}
          <span className={styles.thumbArrow}>→</span>
        </div>
      </div>
    </div>
  );
}
