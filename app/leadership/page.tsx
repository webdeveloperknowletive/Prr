import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership | Prop Range Realty",
  description: "Meet the leadership team at Prop Range Realty driving strategic real estate sales.",
};

const leaders = [
  {
    name: "Ravi Jaiswal",
    role: "Founder & CEO",
    bio: "Ravi brings deep expertise in real estate project sales, mandate execution, and business strategy. He leads PRR's vision of becoming the most trusted developer sales partner in the industry.",
    linkedin: "https://www.linkedin.com",
    image: "/images/leadership/ravi-jaiswal.png"
  },
  {
    name: "Anamika Prasad",
    role: "Co-Founder & CMO",
    bio: "Anamika drives PRR's marketing strategy, project positioning, and lead generation initiatives. Her data-driven approach ensures high-impact campaigns for developer partners.",
    linkedin: "https://www.linkedin.com",
    image: "/images/leadership/anamika-prasad.png"
  }
];

export default function LeadershipPage() {
  return (
    <div className="w-full">
      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Leadership</h1>
          <p className="text-xl text-gray-300">
            Meet the team driving execution and strategy at Prop Range Realty.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#F5F5F3]">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {leaders.map((leader, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-md transition-shadow">
                <div 
                  className="h-96 w-full relative overflow-hidden flex items-end justify-center pt-6"
                  style={{
                    background: "linear-gradient(135deg, #F5F1E8 0%, #E7EDF4 100%)"
                  }}
                >
                  <img 
                    src={leader.image} 
                    alt={leader.name} 
                    className="w-full h-full object-contain object-bottom transition-transform duration-300 group-hover:scale-[1.02]"
                    style={{
                      filter: "drop-shadow(0 12px 24px rgba(0,0,0,0.12))"
                    }}
                  />
                </div>
                <div className="p-8 text-center flex-grow flex flex-col">
                  <h2 className="text-2xl font-bold text-prr-primary mb-1">{leader.name}</h2>
                  <p className="text-prr-accent font-semibold mb-6">{leader.role}</p>
                  <p className="text-gray-600 leading-relaxed mb-8">{leader.bio}</p>
                  
                  <a href={leader.linkedin} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex items-center justify-center space-x-2 text-gray-500 hover:text-[#0a66c2] transition-colors">
                    <span className="font-medium">Connect on LinkedIn</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
