'use client';

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { projects, Project } from '@/data/projects';
import styles from './ProjectOverlay.module.css';

interface ProjectOverlayProps {
  projectId: string | null;
  onClose: () => void;
  onSelectProject?: (id: string) => void;
}

type TabType = 'highlights' | 'specifications' | 'amenities';

export default function ProjectOverlay({ projectId, onClose, onSelectProject }: ProjectOverlayProps) {
  const [activeTab, setActiveTab] = useState<TabType>('highlights');
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const project = projects.find(p => p.id === projectId);

  useEffect(() => {
    if (projectId) {
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
  }, [projectId, onClose]);

  useEffect(() => {
    if (videoRef.current && project?.video) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
    setActiveTab('highlights');
  }, [projectId, project]);

  if (!project) return null;

  const currentIndex = projects.findIndex(p => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <div className={`${styles.viewportTakeover} ${projectId ? styles.active : ''}`}>
      {/* Full-Bleed Project Video Media Canvas (Requirement #15 & #16) */}
      <div className={styles.mediaCanvasWrapper}>
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
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
          <span>RETURN TO UNIVERSE</span>
        </button>

        <div className={styles.topRight}>
          {project.video && (
            <button
              type="button"
              className={styles.audioToggle}
              onClick={() => setIsMuted(!isMuted)}
            >
              <span>{isMuted ? 'UNMUTE AUDIO' : 'MUTE AUDIO'}</span>
            </button>
          )}

          <button 
            type="button" 
            className={styles.closeBtn} 
            onClick={onClose} 
            aria-label="Close dossier"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Floating Architectural HUD (Architecture Dominant) */}
      <div className={styles.dossierInterface}>
        <div className={styles.dossierHero}>
          <div className={styles.badgeRow}>
            <span className="editorial-tag">{project.location} · {project.zone}</span>
          </div>

          <h2 className={styles.projectName}>{project.name}</h2>
          <p className={styles.projectTagline}>{project.tagline}</p>

          {/* Key Facts Floating Bar */}
          <div className={styles.keyFactsBar}>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>PROJECT SIZE</span>
              <span className={styles.factValue}>{project.projectSize}</span>
            </div>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>CONFIGURATION</span>
              <span className={styles.factValue}>{project.configuration}</span>
            </div>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>PRICE RANGE</span>
              <span className={styles.factValue}>{project.price}</span>
            </div>
            <div className={styles.factItem}>
              <span className={styles.factLabel}>POSSESSION</span>
              <span className={styles.factValue}>{project.possession}</span>
            </div>
          </div>
        </div>

        {/* Floating Concise Information Card */}
        <div className={styles.dossierDetailsCard}>
          <div className={styles.dossierTabs}>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'highlights' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('highlights')}
            >
              HIGHLIGHTS
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'specifications' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              SPECIFICATIONS
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${activeTab === 'amenities' ? styles.tabBtnActive : ''}`}
              onClick={() => setActiveTab('amenities')}
            >
              AMENITIES
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
                  <span className={styles.specLabel}>TOWER ELEVATION</span>
                  <span className={styles.specValue}>{project.floors}</span>
                </div>
                <div className={styles.specCell}>
                  <span className={styles.specLabel}>AVAILABLE INVENTORY</span>
                  <span className={styles.specValue}>{project.units}</span>
                </div>
                <div className={styles.specCell}>
                  <span className={styles.specLabel}>CARPET AREA</span>
                  <span className={styles.specValue}>{project.carpetArea}</span>
                </div>
                <div className={styles.specCell}>
                  <span className={styles.specLabel}>LANDMARK</span>
                  <span className={styles.specValue}>{project.landmark}</span>
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

          <div className={styles.dossierFooter}>
            <a
              href="#direction"
              className={styles.inquireActionBtn}
              onClick={onClose}
            >
              <span>INQUIRE ON THIS MANDATE</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Immersive Next Project Discovery Footer (Requirement #29) */}
      <div 
        className={styles.nextProjectPreviewBar}
        onClick={() => onSelectProject && onSelectProject(nextProject.id)}
      >
        <div className={styles.nextProjectInfo}>
          <span className={styles.nextKicker}>CONTINUE PORTFOLIO EXPLORATION</span>
          <div className={styles.nextTitleRow}>
            <span className={styles.nextTitle}>NEXT: {nextProject.name}</span>
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
            <div className={styles.thumbPlaceholder} />
          )}
          <span className={styles.thumbArrow}>→</span>
        </div>
      </div>
    </div>
  );
}
