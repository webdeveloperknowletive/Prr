'use client';

import React, { useState } from 'react';
import { Project } from '@/data/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import ProjectOverlay from '@/components/projects/ProjectOverlay';

export function HomeProjects({ initialProjects }: { initialProjects: Project[] }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  // Requirement #28: Show ONLY Dream Glorious, The Quill, Arkaa Galaxy
  const previewProjects = initialProjects.slice(0, 3);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {previewProjects.map((project, idx) => (
          <ProjectCard
            key={project.slug}
            image={project.image}
            video={project.video}
            title={project.name}
            location={project.location}
            zone={project.zone}
            configuration={project.configuration}
            tagline={project.tagline}
            badge={project.category}
            href={`/projects/${project.slug}`}
            onOpenOverlay={() => setActiveSlug(project.slug)}
            priority={idx === 0}
          />
        ))}
      </div>

      <ProjectOverlay
        projectSlug={activeSlug}
        onClose={() => setActiveSlug(null)}
        onSelectProject={(slug) => setActiveSlug(slug)}
      />
    </>
  );
}
