'use client';

import React, { useRef, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, Sphere, Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { projects } from '@/data/projects';

export default function PuneScene({ onProjectSelect }: { onProjectSelect: (id: string) => void }) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  // Generate a simple stylized city grid
  const buildings = useMemo(() => {
    const b = [];
    for (let i = -10; i < 10; i++) {
      for (let j = -10; j < 10; j++) {
        if (Math.random() > 0.6) continue;
        const height = Math.random() * 0.5 + 0.1;
        b.push(
          <Box 
            key={`${i}-${j}`} 
            position={[i * 0.6, height / 2, j * 0.6]} 
            args={[0.4, height, 0.4]}
          >
            <meshStandardMaterial color="#E5E4E2" />
          </Box>
        );
      }
    }
    return b;
  }, []);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y = Math.sin(performance.now() * 0.00005) * 0.1;
    }
  });

  return (
    <group ref={group} position={[0, -1, 0]}>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#F9F8F6" />
      </mesh>

      {/* Buildings */}
      {buildings}

      {/* Project Markers */}
      {projects.map((project) => {
        const isHovered = hovered === project.id;
        return (
          <group 
            key={project.id} 
            position={project.coordinates}
            onPointerOver={(e) => { e.stopPropagation(); setHovered(project.id); document.body.style.cursor = 'pointer'; }}
            onPointerOut={(e) => { e.stopPropagation(); setHovered(null); document.body.style.cursor = 'auto'; }}
            onClick={(e) => { e.stopPropagation(); onProjectSelect(project.id); }}
          >
            <Box args={[0.3, isHovered ? 1.5 : 1.2, 0.3]} position={[0, (isHovered ? 1.5 : 1.2) / 2, 0]}>
              <meshStandardMaterial color={isHovered ? "#8B0000" : "#4A5D4E"} />
            </Box>
            {isHovered && (
              <Html position={[0, 2, 0]} center>
                <div style={{
                  background: 'white',
                  color: '#1A1A1A',
                  padding: '8px 12px',
                  borderRadius: '2px',
                  fontFamily: 'var(--font-inter)',
                  fontSize: '12px',
                  fontWeight: 500,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  whiteSpace: 'nowrap',
                  textTransform: 'uppercase',
                  border: '1px solid #E5E4E2'
                }}>
                  {project.name}
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </group>
  );
}
