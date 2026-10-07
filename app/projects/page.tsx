import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import { ProjectsDirectory } from '@/components/projects/ProjectsDirectory';

export const metadata: Metadata = {
  title: 'Architectural Portfolio & Projects | Prop Range Realty',
  description:
    'Explore selected mandates, residential developments, and commercial properties represented and marketed by Prop Range Realty across Pune’s key growth corridors.',
};

export default function ProjectsPage() {
  return <ProjectsDirectory projects={projects} />;
}
