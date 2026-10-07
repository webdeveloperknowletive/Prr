'use client';

import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { atlasLocations, projects, AtlasLocation, Project } from '@/data/projects';

interface PuneAtlasSceneProps {
  activeZone: string;
  selectedLocation: string | null;
  onLocationSelect: (location: AtlasLocation | null) => void;
  onProjectSelect: (id: string) => void;
}

export default function PuneAtlasScene({
  activeZone,
  selectedLocation,
  onLocationSelect,
  onProjectSelect
}: PuneAtlasSceneProps) {
  const { camera, controls } = useThree();
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Target camera position based on active zone or selected location
  const targetCamPos = useMemo(() => {
    if (selectedLocation) {
      const loc = atlasLocations.find(l => l.id === selectedLocation);
      if (loc) {
        // Close architectural vantage point looking down at the micro-market
        return new THREE.Vector3(loc.coordinates[0] - 0.4, 2.2, loc.coordinates[2] + 2.0);
      }
    }
    if (activeZone === 'WEST PUNE') {
      return new THREE.Vector3(-3.2, 4.0, 3.8);
    }
    if (activeZone === 'NORTH PUNE') {
      return new THREE.Vector3(0.6, 4.0, 1.4);
    }
    if (activeZone === 'EAST PUNE') {
      return new THREE.Vector3(3.2, 4.0, 3.6);
    }
    // Overview
    return new THREE.Vector3(0, 6.8, 6.8);
  }, [activeZone, selectedLocation]);

  const targetLookAt = useMemo(() => {
    if (selectedLocation) {
      const loc = atlasLocations.find(l => l.id === selectedLocation);
      if (loc) {
        return new THREE.Vector3(loc.coordinates[0], 0.2, loc.coordinates[2]);
      }
    }
    if (activeZone === 'WEST PUNE') return new THREE.Vector3(-2.6, 0.1, 0.8);
    if (activeZone === 'NORTH PUNE') return new THREE.Vector3(0.8, 0.1, -2.4);
    if (activeZone === 'EAST PUNE') return new THREE.Vector3(2.5, 0.1, 0.8);
    return new THREE.Vector3(0, 0, 0);
  }, [activeZone, selectedLocation]);

  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const projectScales = useRef<{ [key: string]: number }>({});

  useFrame((_, delta) => {
    const lerpFactor = Math.min(delta * 2.8, 0.12);
    camera.position.lerp(targetCamPos, lerpFactor);
    currentLookAt.current.lerp(targetLookAt, lerpFactor);

    // Sync OrbitControls target so user can pan/rotate around the focused micro-market
    if (controls) {
      const ctrl = controls as any;
      if (ctrl.target) {
        ctrl.target.lerp(targetLookAt, lerpFactor);
        ctrl.update();
      }
    } else {
      camera.lookAt(currentLookAt.current);
    }
  });

  // Architectural Model Buildings (Crisp White / Alabaster Plaster Aesthetic)
  const architecturalBlocks = useMemo(() => {
    const blocks: { pos: [number, number, number]; size: [number, number, number]; color: string; id: number }[] = [];
    const seed = 42;
    let s = seed;
    const random = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };

    // West Pune Cluster (Baner / Balewadi architectural towers)
    for (let i = 0; i < 65; i++) {
      const x = -1.2 - random() * 4.0;
      const z = -1.2 + random() * 4.4;
      const h = random() * 1.6 + 0.25;
      blocks.push({
        id: i,
        pos: [x, h / 2, z],
        size: [0.24 + random() * 0.2, h, 0.24 + random() * 0.2],
        color: random() > 0.4 ? '#FFFFFF' : '#F6F3EC'
      });
    }

    // East Pune Cluster (Kharadi / CBD corporate models)
    for (let i = 0; i < 55; i++) {
      const x = 1.0 + random() * 3.8;
      const z = -2.0 + random() * 4.5;
      const h = random() * 1.4 + 0.3;
      blocks.push({
        id: 100 + i,
        pos: [x, h / 2, z],
        size: [0.28 + random() * 0.25, h, 0.28 + random() * 0.25],
        color: random() > 0.3 ? '#FFFFFF' : '#EFEAE0'
      });
    }

    // North Pune Cluster (Charholi / Moshi)
    for (let i = 0; i < 45; i++) {
      const x = -1.0 + random() * 3.2;
      const z = -2.2 - random() * 3.2;
      const h = random() * 1.1 + 0.2;
      blocks.push({
        id: 200 + i,
        pos: [x, h / 2, z],
        size: [0.32 + random() * 0.2, h, 0.32 + random() * 0.2],
        color: '#FFFFFF'
      });
    }

    return blocks;
  }, []);

  // Road curves with the continuous PRR Red Thread traveling along Pune Expressway
  const roadLines = useMemo(() => {
    const expPoints = [
      new THREE.Vector3(-6, 0.02, 3.5),
      new THREE.Vector3(-4.5, 0.02, 2.2),
      new THREE.Vector3(-3.0, 0.02, 0.8),
      new THREE.Vector3(-1.8, 0.02, -0.2),
      new THREE.Vector3(0, 0.02, 0.2),
      new THREE.Vector3(2.5, 0.02, 0.6),
      new THREE.Vector3(5.5, 0.02, 0.9),
    ];
    const ringPoints = [
      new THREE.Vector3(-3.5, 0.02, -1.0),
      new THREE.Vector3(-1.5, 0.02, -2.5),
      new THREE.Vector3(1.2, 0.02, -2.8),
      new THREE.Vector3(3.2, 0.02, -1.5),
      new THREE.Vector3(4.0, 0.02, 1.2),
    ];

    const expCurve = new THREE.CatmullRomCurve3(expPoints);
    const ringCurve = new THREE.CatmullRomCurve3(ringPoints);
    const expGeom = new THREE.TubeGeometry(expCurve, 32, 0.045, 6, false);
    const ringGeom = new THREE.TubeGeometry(ringCurve, 32, 0.025, 6, false);

    // Continuous PRR Red Thread road spine line
    const redThreadGeom = new THREE.TubeGeometry(expCurve, 40, 0.015, 6, false);

    return { expGeom, ringGeom, redThreadGeom };
  }, []);

  // Soft sky blue Mula-Mutha river ribbon
  const riverCurve = useMemo(() => {
    const points = [
      new THREE.Vector3(-5, 0.015, -0.8),
      new THREE.Vector3(-2.8, 0.015, -0.4),
      new THREE.Vector3(-1.2, 0.015, 0.1),
      new THREE.Vector3(0.5, 0.015, -0.2),
      new THREE.Vector3(2.2, 0.015, 0.3),
      new THREE.Vector3(4.8, 0.015, 0.1),
    ];
    const curve = new THREE.CatmullRomCurve3(points);
    return new THREE.TubeGeometry(curve, 32, 0.18, 6, false);
  }, []);

  return (
    <group position={[0, -0.5, 0]}>
      {/* Warm Ivory Terrain Model Base Plate */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[26, 26]} />
        <meshStandardMaterial color="#F4F0E6" roughness={0.9} metalness={0.02} />
      </mesh>

      {/* Natural Green Reserve Hill Plates */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-3.8, 0.01, -1.5]} receiveShadow>
        <circleGeometry args={[2.2, 32]} />
        <meshStandardMaterial color="#D7E0D6" roughness={0.95} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3.5, 0.01, -2.5]} receiveShadow>
        <circleGeometry args={[1.8, 32]} />
        <meshStandardMaterial color="#D7E0D6" roughness={0.95} />
      </mesh>

      {/* Soft Sky Blue Mula-Mutha River Ribbon */}
      <mesh geometry={riverCurve}>
        <meshStandardMaterial color="#9EB8C9" roughness={0.4} metalness={0.15} />
      </mesh>

      {/* Soft Gray Road Infrastructure */}
      <mesh geometry={roadLines.expGeom}>
        <meshStandardMaterial color="#D2CBBC" roughness={0.8} />
      </mesh>
      <mesh geometry={roadLines.ringGeom}>
        <meshStandardMaterial color="#E2DCD0" roughness={0.8} />
      </mesh>

      {/* Signature PRR Red Thread Traveling through Pune Road Network */}
      <mesh geometry={roadLines.redThreadGeom} position={[0, 0.01, 0]}>
        <meshBasicMaterial color="#B3131B" />
      </mesh>

      {/* Architectural White & Alabaster Plaster Model Buildings */}
      {architecturalBlocks.map((b) => (
        <mesh key={b.id} position={b.pos} castShadow receiveShadow>
          <boxGeometry args={b.size} />
          <meshStandardMaterial
            color={b.color}
            roughness={0.55}
            metalness={0.05}
          />
        </mesh>
      ))}

      {/* 14 Source Locations as Controlled Architectural Nodes */}
      {atlasLocations.map((loc) => {
        const isHovered = hoveredLocation === loc.id;
        const isSelected = selectedLocation === loc.id;
        const isZoneActive = activeZone === 'ALL PUNE' || loc.zone === activeZone;
        const opacity = isZoneActive ? 1 : 0.25;

        return (
          <group
            key={loc.id}
            position={loc.coordinates}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredLocation(loc.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredLocation(null);
              document.body.style.cursor = 'auto';
            }}
            onClick={(e) => {
              e.stopPropagation();
              onLocationSelect(isSelected ? null : loc);
            }}
          >
            {/* Soft highlight base ring */}
            <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[0.06, isHovered || isSelected ? 0.28 : 0.12, 24]} />
              <meshBasicMaterial
                color={isSelected ? '#B3131B' : isHovered ? '#B3131B' : '#B8B0A2'}
                transparent
                opacity={opacity}
              />
            </mesh>

            {/* Vertical Architectural Pin */}
            <mesh position={[0, (isHovered || isSelected ? 0.65 : 0.35) / 2, 0]}>
              <cylinderGeometry
                args={[0.022, 0.022, isHovered || isSelected ? 0.65 : 0.35, 12]}
              />
              <meshBasicMaterial
                color={isSelected ? '#B3131B' : isHovered ? '#B3131B' : '#8A8275'}
                transparent
                opacity={opacity}
              />
            </mesh>

            {/* Architectural Tooltip on Hover or Selection */}
            {(isHovered || isSelected) && (
              <Html position={[0, 0.95, 0]} center distanceFactor={10}>
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #E2DFD9',
                    borderLeft: '3px solid #B3131B',
                    color: '#161616',
                    padding: '12px 18px',
                    borderRadius: '2px',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
                    fontFamily: 'var(--font-family-body)',
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                  onClick={() => onLocationSelect(isSelected ? null : loc)}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#B3131B' }} />
                    <span style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {loc.name}
                    </span>
                    <span style={{ fontSize: '10px', color: '#74716A', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      {loc.zone}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#52504C' }}>
                    {loc.tagline}
                  </div>
                  <div style={{ fontSize: '10px', color: '#B3131B', marginTop: '6px', letterSpacing: '0.08em', fontWeight: 600 }}>
                    {isSelected ? 'CORRIDOR ACTIVE · CLICK TO RESET' : `${loc.projectCount} MANDATES · CLICK TO ENTER CORRIDOR →`}
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* 6 Real Source Projects as Emerging Architectural Monoliths */}
      {projects.map((proj) => {
        const isHovered = hoveredProject === proj.id;
        const matchingLoc = atlasLocations.find(l => l.name.toLowerCase() === proj.location.toLowerCase());
        const isParentSelected = selectedLocation && matchingLoc?.id === selectedLocation;
        const isZoneActive = activeZone === 'ALL PUNE' || proj.zone === activeZone;
        
        // Projects emerge when their corridor or zone is selected
        const heightMultiplier = isParentSelected ? 1.8 : isHovered ? 1.4 : isZoneActive ? 1.0 : 0.6;
        const baseHeight = 1.0 * heightMultiplier;

        return (
          <group
            key={proj.id}
            position={proj.coordinates}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredProject(proj.id);
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={(e) => {
              e.stopPropagation();
              setHoveredProject(null);
              document.body.style.cursor = 'auto';
            }}
            onClick={(e) => {
              e.stopPropagation();
              onProjectSelect(proj.id);
            }}
          >
            {/* Emerging Architectural Monolith */}
            <mesh position={[0, baseHeight / 2, 0]} castShadow>
              <boxGeometry args={[0.26, baseHeight, 0.26]} />
              <meshStandardMaterial
                color={isParentSelected || isHovered ? '#FFFFFF' : '#F2ECE1'}
                roughness={0.2}
                metalness={0.1}
              />
            </mesh>

            {/* Crimson Crown Node */}
            <mesh position={[0, baseHeight + 0.08, 0]}>
              <sphereGeometry args={[0.06, 16, 16]} />
              <meshBasicMaterial color="#B3131B" />
            </mesh>

            {/* Connecting line to ground when emerging */}
            {isParentSelected && (
              <mesh position={[0, baseHeight + 0.3, 0]}>
                <ringGeometry args={[0.08, 0.18, 24]} />
                <meshBasicMaterial color="#B3131B" transparent opacity={0.6} side={THREE.DoubleSide} />
              </mesh>
            )}

            {/* Project Callout on Hover or Corridor Selection */}
            {(isHovered || isParentSelected) && (
              <Html position={[0, baseHeight + 0.7, 0]} center distanceFactor={10}>
                <div
                  style={{
                    background: '#FFFFFF',
                    border: '1px solid #161616',
                    borderTop: '3px solid #B3131B',
                    padding: '12px 18px',
                    borderRadius: '2px',
                    color: '#161616',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 16px 45px rgba(0,0,0,0.14)',
                    fontFamily: 'var(--font-family-body)',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                  onClick={() => onProjectSelect(proj.id)}
                >
                  <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {proj.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#B3131B', marginTop: '2px', fontWeight: 500 }}>
                    {proj.location} · {proj.configuration} · {proj.price}
                  </div>
                  <div style={{ fontSize: '10px', color: '#161616', marginTop: '6px', letterSpacing: '0.12em', fontWeight: 600, textTransform: 'uppercase' }}>
                    ENTER PROJECT EXPERIENCE →
                  </div>
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
