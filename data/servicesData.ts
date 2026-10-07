export interface ServicePillar {
  title: string;
  description: string;
}

export interface ServiceItem {
  id: number;
  slug: string;
  number: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  width: number;
  height: number;
  pillars: ServicePillar[];
  stakeholders: string[];
  summaryHighlight: string;
}

export const servicesData: ServiceItem[] = [
  {
    id: 1,
    slug: "consulting-and-valuation",
    number: "01",
    category: "Strategic Advisory",
    title: "Consulting and Valuation",
    description: "Empower your real estate decisions with our expert consulting and valuation services. We provide in-depth market analysis to ensure highly accurate property valuations for both promoters and clients. Step into your next big transaction backed by data and complete confidence.",
    image: "/services_images/services-visual-1.png",
    imageAlt: "Consulting and Valuation process diagram illustrating market analysis and accurate valuation for informed property decisions",
    width: 1944,
    height: 1701,
    pillars: [
      {
        title: "Market Analysis",
        description: "In-depth property market research and micro-market trend evaluation"
      },
      {
        title: "Accurate Valuation",
        description: "Precise data-backed property valuation services for maximum transaction confidence"
      }
    ],
    stakeholders: ["Promoters", "Clients", "Investors"],
    summaryHighlight: "Data-driven valuation and micro-market intelligence for promoters and buyers."
  },
  {
    id: 2,
    slug: "project-planning",
    number: "02",
    category: "Project Execution",
    title: "Project Planning",
    description: "Turn your vision into reality with our end-to-end project planning solutions. From initial conception through final execution, we deliver a meticulously structured approach designed to guarantee seamless project delivery for promoters, clients, and channel partners.",
    image: "/services_images/services-visual-2.png",
    imageAlt: "Project Planning workflow diagram detailing meticulous planning and structured delivery approach",
    width: 1944,
    height: 1701,
    pillars: [
      {
        title: "Meticulous Planning",
        description: "Tailored strategic solutions aligned with stakeholder objectives"
      },
      {
        title: "Structured Approach",
        description: "End-to-end milestone management ensuring seamless on-time project delivery"
      }
    ],
    stakeholders: ["Promoters", "Clients", "Channel Partners"],
    summaryHighlight: "End-to-end planning roadmap from conception through milestone sales delivery."
  },
  {
    id: 3,
    slug: "strategic-alliances",
    number: "03",
    category: "Growth & Network",
    title: "Strategic Alliances",
    description: "Unlock unparalleled growth through our strategic alliances with industry leaders. We build robust, powerful networks that foster success and deliver innovative real estate solutions tailored to benefit our clients, promoters, and partners.",
    image: "/services_images/services-visual-3.png",
    imageAlt: "Strategic Alliances diagram highlighting partnerships, service enhancements, and network growth",
    width: 2520,
    height: 1701,
    pillars: [
      {
        title: "Form Strategic Alliances",
        description: "Collaborate directly with top-tier industry leaders and ecosystem partners"
      },
      {
        title: "Enhance Service Offerings",
        description: "Deliver innovative, high-impact real estate solutions"
      },
      {
        title: "Foster Network Growth",
        description: "Build an expansive, high-leverage network for sustained ecosystem success"
      }
    ],
    stakeholders: ["Promoters", "Industry Leaders", "Partners"],
    summaryHighlight: "Ecosystem alliances with premier industry leaders to accelerate distribution."
  },
  {
    id: 4,
    slug: "residential-commercial-plot-transactions",
    number: "04",
    category: "Transaction Excellence",
    title: "Residential, Commercial, and Plot Transactions",
    description: "Maximize the value of your next big move with our specialized real estate transaction services. Whether you are navigating residential, commercial, or plot transactions, our expert team ensures a smooth, efficient, and highly tailored experience for all parties involved.",
    image: "/services_images/services-visual-4.png",
    imageAlt: "Transaction success diagram showcasing tailored services, smooth facilitation, and value maximization",
    width: 2520,
    height: 1701,
    pillars: [
      {
        title: "Tailored Services",
        description: "Customized advisory meeting diverse residential, commercial, and plot needs"
      },
      {
        title: "Smooth Facilitation",
        description: "Ensuring an efficient, frictionless transaction process from inquiry to registry"
      },
      {
        title: "Maximizing Value",
        description: "Data-backed negotiation achieving the best financial outcomes for all parties"
      }
    ],
    stakeholders: ["Buyers", "Promoters", "Institutional Investors"],
    summaryHighlight: "Specialized deal facilitation across residential, commercial, and plot assets."
  },
  {
    id: 5,
    slug: "property-management",
    number: "05",
    category: "Asset Optimization",
    title: "Property Management",
    description: "Protect and elevate your investments with our comprehensive property management services. We maintain your assets to the highest industry standards, ensuring consistent returns and continuously enhancing property value for clients and promoters.",
    image: "/services_images/services-visual-5.png",
    imageAlt: "Property management transformation diagram covering maintenance, rental returns, and asset appreciation",
    width: 2520,
    height: 1701,
    pillars: [
      {
        title: "Maintenance",
        description: "Rigorous, proactive upkeep adhering to the highest industry benchmarks"
      },
      {
        title: "Returns",
        description: "Optimized occupancy and tenant management for steady income generation"
      },
      {
        title: "Enhancement",
        description: "Long-term strategic asset value appreciation and capital preservation"
      }
    ],
    stakeholders: ["Property Owners", "Promoters", "Tenants"],
    summaryHighlight: "Full-lifecycle asset upkeep, steady rental yields, and long-term capital appreciation."
  },
  {
    id: 6,
    slug: "financial-services",
    number: "06",
    category: "Capital & Advisory",
    title: "Financial Services",
    description: "Secure your real estate future with our specialized suite of financial services. Offering customized mortgage assistance and expert investment advisory, we provide the tailored financial solutions needed to drive successful and lucrative real estate investments.",
    image: "/services_images/services-visual-6.png",
    imageAlt: "Financial services diagram showing mortgage assistance and customized investment advisory",
    width: 1944,
    height: 1701,
    pillars: [
      {
        title: "Mortgage Assistance",
        description: "Seamless facilitation of competitive home loans and project funding"
      },
      {
        title: "Investment Advisory",
        description: "Bespoke financial guidance to maximize ROI and protect capital"
      }
    ],
    stakeholders: ["Home Buyers", "Promoters", "Private Investors"],
    summaryHighlight: "Tailored mortgage structures and high-yield real estate investment advisory."
  },
  {
    id: 7,
    slug: "lead-management",
    number: "07",
    category: "Sales Architecture",
    title: "Lead Management",
    description: "Never miss an opportunity with our sophisticated lead management system. We provide dedicated support to seamlessly nurture and convert prospects, guaranteeing a highly streamlined process from initial lead acquisition all the way to successful closure.",
    image: "/services_images/services-visual-7.png",
    imageAlt: "Lead conversion journey diagram outlining prospect nurturing and streamlined closure pipeline",
    width: 1944,
    height: 1701,
    pillars: [
      {
        title: "Lead Nurturing",
        description: "Dedicated omnichannel engagement and timely, personalized touchpoints"
      },
      {
        title: "Streamlined Process",
        description: "Systematic qualification and routing from initial inquiry to sales closure"
      }
    ],
    stakeholders: ["Promoters", "Sales Teams", "Prospects"],
    summaryHighlight: "End-to-end prospect tracking, rigorous follow-up cadence, and accelerated closure rates."
  },
  {
    id: 8,
    slug: "crm-management",
    number: "08",
    category: "Client Intelligence",
    title: "CRM Management",
    description: "Experience real estate service that truly understands you through our advanced CRM management. Prop Range Realty leverages cutting-edge CRM tools to foster strong, personalized relationships, ensuring an exceptional experience throughout the entire engagement.",
    image: "/services_images/services-visual-8.png",
    imageAlt: "CRM management diagram highlighting technology tools, relationship building, and personalized service",
    width: 2520,
    height: 1701,
    pillars: [
      {
        title: "Leverage CRM Tools",
        description: "Enterprise-grade CRM infrastructure for transparent pipeline visibility"
      },
      {
        title: "Foster Relationships",
        description: "Cultivate trust and high customer lifetime value across every interaction"
      },
      {
        title: "Personalize Service",
        description: "Tailor recommendations and communication to individual buyer preferences"
      }
    ],
    stakeholders: ["Clients", "Promoters", "Account Managers"],
    summaryHighlight: "Cutting-edge CRM infrastructure for real-time sales visibility and client relationships."
  },
  {
    id: 9,
    slug: "lead-generation-via-marketing-mix",
    number: "09",
    category: "Omnichannel Growth",
    title: "Lead Generation via Marketing Mix Process",
    description: "Supercharge your outreach with our innovative marketing mix approach to lead generation. By seamlessly integrating digital, traditional, and event marketing, our multi-channel strategy guarantees maximum engagement and delivers high-quality leads for clients and promoters.",
    image: "/services_images/services-visual-9.png",
    imageAlt: "Marketing mix interlocked chain diagram featuring digital, traditional, and event marketing synergies",
    width: 1476,
    height: 1206,
    pillars: [
      {
        title: "Digital Marketing",
        description: "Precision Google Ads, Meta Ads, and performance marketing funnels"
      },
      {
        title: "Traditional Marketing",
        description: "High-visibility outdoor hoardings, print, and local brand activations"
      },
      {
        title: "Event Marketing",
        description: "High-impact experiential showcases and exclusive buyer engagement meets"
      }
    ],
    stakeholders: ["Promoters", "Marketing Directors", "Buyers"],
    summaryHighlight: "Integrated digital, traditional, and on-ground marketing synergy for maximum qualified leads."
  },
  {
    id: 10,
    slug: "events",
    number: "10",
    category: "Industry Platforms",
    title: "Events",
    description: "Connect with the best in the business through Prop Range Realty's industry events. We actively organize and participate in premier networking platforms, creating valuable opportunities to showcase projects and forge meaningful, long-lasting connections.",
    image: "/services_images/services-visual-10.png",
    imageAlt: "Industry event outcomes diagram illustrating networking, project showcasing, and professional connections",
    width: 1908,
    height: 2034,
    pillars: [
      {
        title: "Networking Opportunities",
        description: "Facilitate direct connections between promoters, discerning buyers, and top CPs"
      },
      {
        title: "Project Showcasing",
        description: "Curated launch stages that position developments with architectural prestige"
      },
      {
        title: "Meaningful Connections",
        description: "Nurture long-lasting strategic relationships across the real estate sector"
      }
    ],
    stakeholders: ["Promoters", "Channel Partners", "HNIs & Buyers"],
    summaryHighlight: "Premier industry networking, launch galas, and project showcase platforms."
  },
  {
    id: 11,
    slug: "cp-acquisition-and-management",
    number: "11",
    category: "Channel Ecosystem",
    title: "CP Acquisition and Management",
    description: "Expand your reach with our elite CP acquisition and management strategies. We focus on acquiring and managing top-tier channel partners to extend our service offerings, creating successful collaborations that amplify market presence and operational efficiency.",
    image: "/services_images/services-visual-11.png",
    imageAlt: "Channel partner management balance diagram detailing mutual benefits for promoters and clients",
    width: 2088,
    height: 1422,
    pillars: [
      {
        title: "Enhanced Market Presence",
        description: "Rapidly scale reach across Pune's most active channel partner networks"
      },
      {
        title: "Increased Operational Efficiency",
        description: "Streamlined CP onboarding, payout transparency, and project briefings"
      },
      {
        title: "Successful Collaborations",
        description: "Long-term win-win partnerships that consistently drive sales momentum"
      }
    ],
    stakeholders: ["Promoters", "Channel Partners", "Institutional Clients"],
    summaryHighlight: "Top-tier channel partner onboarding, network activation, and payout governance."
  }
];

export function getServiceByNumber(num: number): ServiceItem | undefined {
  return servicesData.find((s) => s.id === num);
}

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return servicesData.find((s) => s.slug === slug);
}
