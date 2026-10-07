'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CompanyStory.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function CompanyStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (stageRef.current) {
        gsap.fromTo(
          stageRef.current.querySelectorAll('.story-reveal'),
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: stageRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="story" className={styles.storySection} ref={sectionRef}>
      {/* Red Thread Receiver from Hero */}
      <div className="red-thread-receiver">
        <div className="thread-stem" />
        <div className="thread-node" />
      </div>

      <div className={styles.container}>
        {/* Editorial Header */}
        <div className={styles.header}>
          <div className={styles.kicker}>
            <span className="editorial-tag">Company Positioning</span>
          </div>
          <h2 className={styles.headline}>MORE THAN PROPERTY.</h2>
          <h3 className={styles.subheadline}>A CONNECTED REAL ESTATE EXPERIENCE.</h3>
          <p className={styles.bodyCopy}>
            Prop Range Realty serves as the architectural nexus uniting promoters, homebuyers, and channel partners across Pune’s highest-velocity corridors. We transform fragmented transactions into a disciplined, transparent continuum.
          </p>
        </div>

        {/* ONE Strong Architectural Composition (Requirement #10) */}
        <div className={styles.compositionStage} ref={stageRef}>
          {/* Subtle Connecting Vector Lines */}
          <svg className={styles.connectionCanvas} viewBox="0 0 1000 480" fill="none" preserveAspectRatio="none">
            {/* Left Wing (Promoters) to Core */}
            <path
              d="M 280 240 C 390 240, 420 240, 500 240"
              className={styles.networkLine}
            />
            {/* Right Wing Top (Clients) to Core */}
            <path
              d="M 720 140 C 620 140, 580 220, 500 240"
              className={styles.networkLine}
            />
            {/* Right Wing Bottom (Channel Partners) to Core */}
            <path
              d="M 720 340 C 620 340, 580 260, 500 240"
              className={styles.networkLine}
            />
          </svg>

          <div className={styles.ecosystemGrid}>
            {/* Left Wing: Promoters */}
            <div className={`${styles.leftWing} story-reveal`}>
              <div className={styles.nodeCard}>
                <span className={styles.nodeIndex}>01 · SUPPLY SIDE</span>
                <h4 className={styles.nodeTitle}>PROMOTERS</h4>
                <div className={styles.nodeFocus}>Sole Selling &amp; Mandate Governance</div>
                <p className={styles.nodeText}>
                  Direct sales force structure delivering 60–65% direct channel absorption, pricing calibration, and 3x transaction velocity for premier Pune developers.
                </p>
              </div>
            </div>

            {/* Central PRR Core Hub */}
            <div className={`${styles.centerCore} story-reveal`}>
              <div className={styles.coreBeacon} />
              <h4 className={styles.coreTitle}>PROP RANGE REALTY</h4>
              <span className={styles.coreTagline}>THE CENTRAL NEXUS</span>
              <p className={styles.coreDesc}>
                Calibrated Intelligence · Transaction Transparency · Assured Velocity
              </p>
            </div>

            {/* Right Wing: Clients & Channel Partners */}
            <div className={styles.rightWing}>
              <div className={`${styles.nodeCard} story-reveal`}>
                <span className={styles.nodeIndex}>02 · DEMAND SIDE</span>
                <h4 className={styles.nodeTitle}>CLIENTS</h4>
                <div className={styles.nodeFocus}>Curated Portfolios &amp; Capital Safety</div>
                <p className={styles.nodeText}>
                  Transparent residential acquisition for first-time homebuyers and IT professionals across prime corridors with zero brokerage bias.
                </p>
              </div>

              <div className={`${styles.nodeCard} story-reveal`}>
                <span className={styles.nodeIndex}>03 · NETWORK ALLIANCE</span>
                <h4 className={styles.nodeTitle}>CHANNEL PARTNERS</h4>
                <div className={styles.nodeFocus}>Audited Lead Protection &amp; Milestone Payouts</div>
                <p className={styles.nodeText}>
                  Empowered broker ecosystem with first-mover project access, verified digital lead locking, and punctual milestone commission disbursements.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Editorial Callout */}
          <div className={`${styles.bottomCallout} story-reveal`}>
            <span className={styles.calloutText}>
              A Disciplined Ecosystem Across West, East &amp; North Pune
            </span>
            <a href="#projects" className={styles.calloutLink}>
              <span>EXPLORE THE PROJECT UNIVERSE</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>

      {/* Red Thread Connector into Project Universe */}
      <div className="red-thread-connector">
        <div className="thread-node" />
        <div className="thread-stem" />
      </div>
    </section>
  );
}
