import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import { 
  ProjectHero,
  ProjectSubNav,
  ProjectFacts,
  ConfigurationCards,
  AmenitiesSection,
  ProjectGallery,
  ProjectLocation,
  ProjectCTA
} from "@/components/projects/ProjectComponents";

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);
  if (!project) return { title: "Project Not Found" };
  
  return {
    title: `${project.name} | Prop Range Realty`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="w-full bg-[#F5F5F3] min-h-screen">
      <ProjectHero project={project} />
      <ProjectSubNav project={project} projectsList={projects} />
      
      <div className="bg-white">
        <div className="container mx-auto px-4 max-w-6xl py-20 space-y-32">
          
          {/* OVERVIEW SECTION */}
          <section id="overview" className="scroll-mt-32">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold text-[#0B2748] mb-6">OVERVIEW</h2>
                <p className="text-gray-600 mb-6 leading-relaxed text-lg">{project.description}</p>
                <div className="w-20 h-1 bg-[#00AEEF] rounded"></div>
              </div>
              <div className="bg-[#0B2748] text-white p-8 md:p-10 rounded-[30px] shadow-lg">
                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <span className="text-[#00AEEF] mr-3">|</span> Key Highlights
                </h3>
                <ul className="space-y-4">
                  {(project.highlights || []).map((highlight, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-[#00AEEF] mr-4 mt-1 font-bold">✓</span>
                      <span className="text-lg">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* PROJECT FACTS & CONFIGURATIONS */}
          <section id="project-facts" className="scroll-mt-32">
            <ProjectFacts project={project} />
            <div className="mt-16">
              <ConfigurationCards configurations={project.configurations} />
            </div>
          </section>

          {/* AMENITIES */}
          <section id="amenities" className="scroll-mt-32">
            <AmenitiesSection amenities={project.amenities} image={project.image} projectName={project.name} />
          </section>

          {/* GALLERY */}
          <section id="gallery" className="scroll-mt-32">
            <ProjectGallery gallery={project.gallery} projectName={project.name} fallbackImage={project.image} />
          </section>

          {/* LOCATION */}
          <section id="location" className="scroll-mt-32">
            <ProjectLocation project={project} />
          </section>
          
          <ProjectCTA project={project} />

          <div className="text-center pb-8 border-t border-gray-100 pt-8">
            <p className="text-xs text-gray-500 max-w-4xl mx-auto italic leading-relaxed">
              “Project details, pricing, availability, possession timelines and specifications displayed here are based on information available in the PRR company profile and are subject to verification and change. Please contact Prop Range Realty for current information.”
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
