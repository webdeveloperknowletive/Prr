'use client';

import React, { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import ProjectOverlay from '@/components/projects/ProjectOverlay';
import DirectionContact from '@/components/contact/DirectionContact';
import { projects, Project } from '@/data/projects';
import Image from 'next/image';
import styles from './Projects.module.css';

export default function ProjectsPage() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [filterZone, setFilterZone] = useState<string>('ALL');
  const [filterType, setFilterType] = useState<string>('ALL');
  const [filterBudget, setFilterBudget] = useState<string>('ALL');

  const filteredProjects = projects.filter((p) => {
    if (filterZone !== 'ALL' && p.zone !== filterZone) return false;
    if (filterType === 'OC' && !p.type.includes('OC Received')) return false;
    if (filterType === 'RES_COMM' && !p.type.includes('Commercial')) return false;
    if (filterBudget === 'UNDER_75L') {
      const isUnder = p.id === 'arkaa-galaxy' || p.id === 'vtp-urban-life' || p.id === 'the-quill';
      if (!isUnder) return false;
    }
    if (filterBudget === 'OVER_1CR') {
      const isOver = p.id === 'dream-glorious' || p.id === 'white-water-house';
      if (!isOver) return false;
    }
    return true;
  });

  return (
    <main className={styles.projectsMain}>
      <Navbar />

      <section className={styles.heroSection}>
        <div className={styles.container}>
          <div className={styles.kicker}>
            <span className="editorial-tag">Architectural Portfolio</span>
            <span className={styles.kickerText}>CURATED MANDATES · ZERO BROKERAGE BIAS</span>
          </div>

          <h1 className={styles.headline}>
            THE PROJECT<br />
            UNIVERSE.
          </h1>

          <p className={styles.subtext}>
            Explore our curated selection of verified residential and commercial developments across Pune’s premier corridors.
          </p>
        </div>
      </section>

      {/* Compact Floating Filter Bar (Requirement #23) */}
      <section className={styles.filtersSection}>
        <div className={styles.container}>
          <div className={styles.filterBar}>
            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>CORRIDOR</span>
              <div className={styles.filterOptions}>
                {['ALL', 'WEST PUNE', 'NORTH PUNE'].map((zone) => (
                  <button
                    key={zone}
                    type="button"
                    className={`${styles.filterBtn} ${filterZone === zone ? styles.filterBtnActive : ''}`}
                    onClick={() => setFilterZone(zone)}
                  >
                    {zone}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>STATUS &amp; TYPE</span>
              <div className={styles.filterOptions}>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${filterType === 'ALL' ? styles.filterBtnActive : ''}`}
                  onClick={() => setFilterType('ALL')}
                >
                  ALL TYPES
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${filterType === 'OC' ? styles.filterBtnActive : ''}`}
                  onClick={() => setFilterType('OC')}
                >
                  READY OC (NO GST)
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${filterType === 'RES_COMM' ? styles.filterBtnActive : ''}`}
                  onClick={() => setFilterType('RES_COMM')}
                >
                  RESIDENTIAL + COMM
                </button>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <span className={styles.filterLabel}>BUDGET</span>
              <div className={styles.filterOptions}>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${filterBudget === 'ALL' ? styles.filterBtnActive : ''}`}
                  onClick={() => setFilterBudget('ALL')}
                >
                  ALL BRACKETS
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${filterBudget === 'UNDER_75L' ? styles.filterBtnActive : ''}`}
                  onClick={() => setFilterBudget('UNDER_75L')}
                >
                  UPTO 75L
                </button>
                <button
                  type="button"
                  className={`${styles.filterBtn} ${filterBudget === 'OVER_1CR' ? styles.filterBtnActive : ''}`}
                  onClick={() => setFilterBudget('OVER_1CR')}
                >
                  1 CR+
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Spatial Architectural Monolith Gallery */}
      <section className={styles.portfolioSection}>
        <div className={styles.container}>
          <div className={styles.portfolioGrid}>
            {filteredProjects.map((p, idx) => (
              <div
                key={p.id}
                className={styles.projectMonolith}
                onClick={() => setActiveProject(p.id)}
              >
                <div className={styles.monolithMedia}>
                  {p.video ? (
                    <video
                      src={p.video}
                      className={styles.monolithVideo}
                      autoPlay
                      muted
                      loop
                      playsInline
                      poster={p.image || undefined}
                    />
                  ) : p.image ? (
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      className={styles.monolithImage}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : null}
                  <div className={styles.monolithVignette} />
                  <span className={styles.priceTag}>{p.price}</span>
                </div>

                <div className={styles.monolithDetails}>
                  <div className={styles.monolithMeta}>
                    <span className={styles.locBadge}>{p.location} ({p.zone})</span>
                    <span className={styles.configBadge}>{p.configuration}</span>
                  </div>

                  <h3 className={styles.monolithTitle}>{p.name}</h3>
                  <p className={styles.monolithTagline}>{p.tagline}</p>

                  <div className={styles.monolithFooter}>
                    <span className={styles.possession}>{p.possession}</span>
                    <span className={styles.viewAction}>EXPLORE DOSSIER →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <DirectionContact />

      <ProjectOverlay
        projectId={activeProject}
        onClose={() => setActiveProject(null)}
        onSelectProject={setActiveProject}
      />
    </main>
  );
}
