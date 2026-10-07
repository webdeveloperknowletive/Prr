export interface ProjectConfiguration {
  config: string;
  size: string;
  price?: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  zone: 'WEST PUNE' | 'EAST PUNE' | 'NORTH PUNE';
  projectType: string;
  type: string;
  category: string;
  projectSize?: string;
  floorStructure?: string;
  floors?: string;
  unitsPerFloor?: string;
  lifts?: string;
  wings?: string;
  configurations: ProjectConfiguration[];
  configuration: string;
  carpetArea?: string;
  units?: string;
  status?: string;
  possession?: string;
  price?: string;
  landmark?: string;
  highlights: string[];
  amenities: string[];
  gallery: string[];
  mapEmbedUrl?: string;
  nearbyLocations: { label: string; value: string }[];
  description: string;
  image: string;
  video?: string;
  heroVideo?: string;
  heroImage?: string;
  taxHighlight?: string;
  coordinates: [number, number, number]; // [x, y, z] for 3D Atlas
  universePosition: [number, number, number]; // [x, y, z] for 3D Universe
  scale: number;
}

export interface AtlasLocation {
  id: string;
  name: string;
  zone: 'WEST PUNE' | 'EAST PUNE' | 'NORTH PUNE';
  coordinates: [number, number, number];
  projectCount: number;
  featuredProjectId?: string;
  tagline: string;
}

export const atlasLocations: AtlasLocation[] = [
  // West Pune (High-Velocity Growth Corridor)
  { id: 'balewadi', name: 'Balewadi', zone: 'WEST PUNE', coordinates: [-2.2, 0.1, -0.6], projectCount: 3, featuredProjectId: 'dream-glorious', tagline: 'Metro Corridor & High-Street Retail Hub' },
  { id: 'baner', name: 'Baner', zone: 'WEST PUNE', coordinates: [-1.6, 0.1, 0.2], projectCount: 2, featuredProjectId: 'white-water-house', tagline: 'Exclusive Residential Enclave & Commercial Axis' },
  { id: 'bhavdhan', name: 'Bavdhan', zone: 'WEST PUNE', coordinates: [-2.8, 0.1, 1.4], projectCount: 1, tagline: 'Scenic Foothills & Expressway Link' },
  { id: 'talegaon', name: 'Talegaon', zone: 'WEST PUNE', coordinates: [-4.6, 0.1, 2.5], projectCount: 2, featuredProjectId: 'vtp-urban-life', tagline: 'Industrial Belt & Eco-Smart Living' },
  { id: 'ravet', name: 'Ravet', zone: 'WEST PUNE', coordinates: [-3.2, 0.1, 0.8], projectCount: 4, featuredProjectId: 'arkaa-galaxy', tagline: 'BRTS Gateway of West Pune & Expressway Node' },

  // North Pune (Manufacturing & Infrastructure Hub)
  { id: 'charholi', name: 'Charholi', zone: 'NORTH PUNE', coordinates: [1.2, 0.1, -2.6], projectCount: 2, featuredProjectId: 'the-quill', tagline: 'Prime 90m Ring Road Connectivity' },
  { id: 'moshi', name: 'Moshi', zone: 'NORTH PUNE', coordinates: [0.2, 0.1, -3.2], projectCount: 1, tagline: 'International Convention District' },
  { id: 'chakan', name: 'Chakan', zone: 'NORTH PUNE', coordinates: [-0.8, 0.1, -4.5], projectCount: 1, tagline: 'Automobile & Global Engineering Core' },

  // East Pune (IT Parks & Corporate Hubs)
  { id: 'cbd', name: 'CBD Pune', zone: 'EAST PUNE', coordinates: [0.6, 0.1, 0.4], projectCount: 1, tagline: 'Central Commercial District' },
  { id: 'kharadi', name: 'Kharadi', zone: 'EAST PUNE', coordinates: [2.8, 0.1, 0.6], projectCount: 3, tagline: 'EON IT Park & Financial Tower Hub' },
  { id: 'manjari', name: 'Manjari', zone: 'EAST PUNE', coordinates: [3.8, 0.1, 1.6], projectCount: 1, tagline: 'Emerging Suburban Growth Corridor' },
  { id: 'hadapsar', name: 'Hadapsar', zone: 'EAST PUNE', coordinates: [2.4, 0.1, 2.2], projectCount: 2, tagline: 'Magarpatta SEZ & Commercial Center' },
  { id: 'wagholi', name: 'Wagholi', zone: 'EAST PUNE', coordinates: [3.4, 0.1, -1.2], projectCount: 2, tagline: 'Nagar Road Educational & Tech Axis' },
  { id: 'dhanori', name: 'Dhanori', zone: 'EAST PUNE', coordinates: [1.8, 0.1, -1.8], projectCount: 1, tagline: 'Airport Proximity & Urban Residential Corridor' },
];

export const projects: Project[] = [
  {
    id: "dream-glorious",
    slug: "dream-glorious",
    name: "Dream Glorious",
    tagline: "Witness the Glory of Your Dream Home",
    location: "Balewadi",
    zone: "WEST PUNE",
    projectType: "Residential + Commercial",
    type: "Residential + Commercial",
    category: "Premium Residential",
    projectSize: "0.5 Acre",
    floorStructure: "B3 + B2 + B1 + Commercial + 15 Floors",
    floors: "B3 + B2 + B1 + Commercial + 15 Floors",
    unitsPerFloor: "5 Flats",
    lifts: "2",
    configurations: [
      { config: "2 BHK", size: "890 sq. ft. to 1278 sq. ft.", price: "₹1.15 Cr – ₹1.60 Cr" },
      { config: "3 BHK", size: "890 sq. ft. to 1278 sq. ft." }
    ],
    configuration: "2 & 3 BHK Premium Residences",
    carpetArea: "890 sq. ft. to 1278 sq. ft.",
    units: "68 Residential + 12 Commercial",
    price: "₹1.15 Cr – ₹1.60 Cr*",
    possession: "June 2027 — As Per RERA / Company Profile",
    landmark: "Near NICMAR Metro Station",
    highlights: [
      "Each floor 5 flats with 2 high-speed lifts",
      "Covered parking allotted for each flat",
      "Best-in-class construction with Vaastu-compliant layout",
      "High-street commercial retail on podium floor",
      "Walkable to NICMAR Metro Station & Balewadi High Street"
    ],
    amenities: [
      "Modern Lifestyle Amenities",
      "Common Recreation Facilities",
      "Clubhouse & Fitness Studio",
      "Landscaped Terrace Garden",
      "EV Charging Bays & 24/7 Security"
    ],
    gallery: [
      "/images/projects/dream-glorious.jpg",
      "/images/projects/dream-glorious.png"
    ],
    mapEmbedUrl: "https://www.google.com/maps?q=NICMAR+Metro+Station+Balewadi+Pune&output=embed",
    nearbyLocations: [
      { label: "Nearest Landmark", value: "NICMAR Metro Station" },
      { label: "Nearest Business Hub", value: "Balewadi High Street" },
      { label: "School / Hospital", value: "Details to be updated by PRR" }
    ],
    description: "A premium residential and commercial development offering sophisticated living spaces with modern amenities and high-speed metro connectivity in Balewadi.",
    image: "/images/projects/dream-glorious.jpg",
    video: "/videos/projects/dream-glorious.mp4",
    heroVideo: "/videos/projects/dream-glorious.mp4",
    coordinates: [-2.2, 0.2, -0.6],
    universePosition: [-3.5, 0.2, -1.0],
    scale: 1.15
  },
  {
    id: "the-quill",
    slug: "the-quill",
    name: "The Quill",
    tagline: "Creating Homes, Cultivating Happiness",
    location: "Charholi",
    zone: "NORTH PUNE",
    projectType: "Residential + Commercial",
    type: "Residential + Commercial",
    category: "Modern Living",
    projectSize: "0.5 Acre",
    floorStructure: "B1 + Commercial + 15 Floors",
    floors: "B1 + Commercial + 15 Floors",
    unitsPerFloor: "5 + 4 Flats",
    lifts: "2 Lifts Each Wing",
    configurations: [
      { config: "2 BHK", size: "677 sq. ft. to 1354 sq. ft.", price: "₹50 Lac – ₹1 Cr" },
      { config: "4 BHK", size: "677 sq. ft. to 1354 sq. ft." }
    ],
    configuration: "2 & 4 BHK Premium Residences",
    carpetArea: "677 sq. ft. to 1354 sq. ft.",
    units: "122 Residential + 4 Commercial",
    price: "₹50 Lac – ₹1 Cr*",
    possession: "December 2027 — As Per RERA / Company Profile",
    landmark: "Near 90 Mtrs. Wadmukhwadi",
    highlights: [
      "Each floor 5 + 4 flats with 2 lifts per wing",
      "Covered parking for every apartment",
      "Superior Vaastu compliant design",
      "Prominent frontage on 90m Wadmukhwadi corridor",
      "Multi-tier security infrastructure"
    ],
    amenities: [
      "Designer Entrance Lobby",
      "Children Play Zone & Sandpit",
      "Rooftop Jogging Track",
      "Multipurpose Community Hall",
      "Rainwater Harvesting"
    ],
    gallery: [
      "/images/projects/the-quill.png"
    ],
    mapEmbedUrl: "https://www.google.com/maps?q=Wadmukhwadi+Charholi+Pune&output=embed",
    nearbyLocations: [
      { label: "Nearest Landmark", value: "Near Wadmukhwadi" },
      { label: "Nearest Business Hub", value: "Details to be updated by PRR" }
    ],
    description: "Thoughtfully designed homes that bring together comfort, aesthetics, and convenience on the high-growth 90m Wadmukhwadi corridor in Charholi.",
    image: "/images/projects/the-quill.png",
    video: "/videos/projects/the-quill.mp4",
    heroVideo: "/videos/projects/the-quill.mp4",
    coordinates: [1.2, 0.2, -2.6],
    universePosition: [-0.8, -0.1, -2.5],
    scale: 0.95
  },
  {
    id: "arkaa-galaxy",
    slug: "arkaa-galaxy",
    name: "Arkaa Galaxy",
    tagline: "Elevating Your Living Experience",
    location: "Ravet",
    zone: "WEST PUNE",
    projectType: "Residential",
    type: "Residential",
    category: "Luxury Apartments",
    projectSize: "2.5 Acres",
    floorStructure: "B + G + 14 Floors",
    floors: "B + G + 14 Floors (2 Wings: A & B)",
    unitsPerFloor: "4 Flats",
    lifts: "3",
    wings: "2 — A & B",
    configurations: [
      { config: "2 BHK", size: "745 sq. ft.", price: "₹69.99 Lac" }
    ],
    configuration: "2 BHK Modern Urban Homes",
    carpetArea: "745 sq. ft.",
    units: "110 Units",
    price: "₹69.99 Lac*",
    possession: "December 2025 — As Per RERA / Company Profile",
    landmark: "Near Chandrabhaga Corner",
    highlights: [
      "Solid Red Bricks construction for superior thermal comfort",
      "4 flats per floor served by 3 high-capacity lifts",
      "Vaastu compliant spacious residences",
      "Covered parking structure for all residents",
      "Immediate access to Mumbai-Pune Expressway connector"
    ],
    amenities: [
      "Acupressure Walkway & Zen Garden",
      "Senior Citizen Pavilion",
      "Indoor Games Arena",
      "Fully Equipped Fitness Studio",
      "Solar Lighting in Common Areas"
    ],
    gallery: [
      "/images/projects/arkaa-galaxy.png"
    ],
    mapEmbedUrl: "https://www.google.com/maps?q=Chandrabhaga+Corner+Ravet+Pune&output=embed",
    nearbyLocations: [
      { label: "Nearest Landmark", value: "Chandrabhaga Corner" }
    ],
    description: "An elegant living destination featuring spacious layouts, solid red-brick construction and premium lifestyle amenities in the heart of Ravet.",
    image: "/images/projects/arkaa-galaxy.png",
    video: "/videos/projects/arkaa-galaxy.mp4",
    heroVideo: "/videos/projects/arkaa-galaxy.mp4",
    coordinates: [-3.2, 0.2, 0.8],
    universePosition: [1.8, 0.4, -0.5],
    scale: 1.2
  },
  {
    id: "vtp-urban-life",
    slug: "vtp-urban-life",
    name: "VTP Urban Life",
    tagline: "Eco Friendly Urban Living Experience",
    location: "Talegaon",
    zone: "WEST PUNE",
    projectType: "Residential",
    type: "Residential",
    category: "Township",
    projectSize: "3 Acres",
    floorStructure: "B + G + 12 Floors",
    floors: "B + G + 12 Floors (4 Wings)",
    unitsPerFloor: "6 Flats",
    lifts: "2",
    wings: "4",
    configurations: [
      { config: "1 & 2 BHK Layouts", size: "503 sq. ft. – 766 sq. ft.", price: "₹35 Lac – ₹46 Lac" }
    ],
    configuration: "1 & 2 BHK Eco-Smart Residences",
    carpetArea: "503 sq. ft. – 766 sq. ft.",
    units: "90 Units",
    price: "₹35 Lac – ₹46 Lac*",
    possession: "June 2025 — As per PRR company profile",
    landmark: "Near Talegaon MIDC",
    highlights: [
      "Large 3-acre gated ecosystem with 4 towers",
      "Affordable luxury tailored for engineering & tech professionals",
      "6 flats per floor with 2 lifts per wing",
      "Strategic closeness to Talegaon Industrial Hub & Expressway",
      "Vaastu compliant naturally ventilated homes"
    ],
    amenities: [
      "Swimming Pool & Kids Splash Pool",
      "Tree-lined Jogging Trail",
      "Open Air Amphitheatre",
      "Cricket Pitch & Sports Net",
      "Bio-diversity Landscaping"
    ],
    gallery: [
      "/images/projects/vtp-urban-life.png"
    ],
    mapEmbedUrl: "https://www.google.com/maps?q=Talegaon+MIDC+Pune&output=embed",
    nearbyLocations: [
      { label: "Nearest Landmark", value: "Talegaon MIDC" }
    ],
    description: "A well-planned township development offering an eco-friendly living ecosystem for modern families near Talegaon MIDC.",
    image: "/images/projects/vtp-urban-life.png",
    video: "/videos/projects/vtp-urban-life.mp4",
    heroVideo: "/videos/projects/vtp-urban-life.mp4",
    coordinates: [-4.6, 0.2, 2.5],
    universePosition: [4.2, -0.3, -2.8],
    scale: 0.9
  },
  {
    id: "revanta",
    slug: "revanta",
    name: "Revanta",
    tagline: "Creating Homes, Cultivating Happiness",
    location: "Ravet",
    zone: "WEST PUNE",
    projectType: "Residential (OC Received — Zero GST)",
    type: "Residential (OC Received - NO GST)",
    category: "Premium Residences",
    projectSize: "1.5 Acres",
    floorStructure: "B + G + 11 Floors",
    floors: "B + G + 11 Floors (4 Wings: A, B, C, D)",
    unitsPerFloor: "4 Flats",
    lifts: "2",
    wings: "4 A, B, C, D",
    configurations: [
      { config: "2 BHK Premium", size: "867 sq. ft.", price: "₹88.99 Lac" }
    ],
    configuration: "2 BHK Luxury Residences",
    carpetArea: "867 sq. ft.",
    units: "25 Available Units",
    price: "₹88.99 Lac*",
    status: "Ready Possession / OC Received",
    taxHighlight: "No GST",
    possession: "Ready Possession (OC Received — Zero GST)",
    landmark: "Ravet BRTS Node",
    highlights: [
      "Ready to move in — OC received with zero GST liability",
      "Low density 4 flats per floor with 2 lifts per wing",
      "Covered vehicle parking for each apartment",
      "Immediate registration and key handover",
      "Exceptional rental yield and capital appreciation micro-market"
    ],
    amenities: [
      "Designer Pergola & Party Lawn",
      "State-of-the-Art Fitness Center",
      "Dedicated Children Play Area",
      "Intercom & 24/7 Security Cabin",
      "DG Backup for Lifts & Essential Utilities"
    ],
    gallery: [
      "/images/projects/revanta.png"
    ],
    mapEmbedUrl: "https://www.google.com/maps?q=Ravet+Pune&output=embed",
    nearbyLocations: [
      { label: "Nearest Landmark", value: "Ravet BRTS Node" }
    ],
    description: "Ready-possession luxury residences with OC received and zero GST liability, located along the prime Ravet growth corridor.",
    image: "/images/projects/revanta.png",
    video: "/videos/projects/revanta.mp4",
    heroVideo: "/videos/projects/revanta.mp4",
    coordinates: [-2.8, 0.2, 1.2],
    universePosition: [-1.9, 0.5, 1.2],
    scale: 1.1
  },
  {
    id: "white-water-house",
    slug: "white-water-house",
    name: "White Water House",
    tagline: "Exclusive Luxury Living, The Private Homes",
    location: "Baner",
    zone: "WEST PUNE",
    projectType: "Residential (OC Received — Zero GST)",
    type: "Residential (OC Received - NO GST)",
    category: "Luxury Spaces",
    projectSize: "5,000 sq. ft.",
    floorStructure: "G + 5 Floors",
    floors: "G + 5 Floors (Single Boutique Wing A)",
    unitsPerFloor: "2 Flats",
    lifts: "1",
    wings: "A",
    configurations: [
      { config: "3 BHK Boutique", size: "950 sq. ft.", price: "₹1.44 Cr" }
    ],
    configuration: "3 BHK Boutique Private Homes",
    carpetArea: "950 sq. ft.",
    units: "6 Exclusive Residences (Only 2 per floor)",
    price: "₹1.44 Cr*",
    status: "Ready Possession / OC Received",
    possession: "Ready Possession (OC Received — Zero GST)",
    landmark: "Baner Hills & High Street",
    highlights: [
      "Ultra-exclusive enclave of only 6 private residences",
      "Only 2 homes per floor ensuring absolute privacy & calm",
      "Dedicated private parking slot for every homeowner",
      "Solar water heater system & solar lighting backup",
      "Full DG generator backup with 24x7 water supply"
    ],
    amenities: [
      "Private Terrace Lounge",
      "High-Speed Automated Elevator",
      "Security Access Control",
      "Solar Heating Array",
      "Architectural Facade Lighting",
      "24×7 Water Supply & DG Backup"
    ],
    gallery: [
      "/images/projects/white-water-house.png"
    ],
    mapEmbedUrl: "https://www.google.com/maps?q=Baner+Pune&output=embed",
    nearbyLocations: [
      { label: "Location", value: "Baner Hills & High Street" }
    ],
    description: "An ultra-exclusive private residential development in Baner with only 6 residences, offering bespoke privacy and OC status.",
    image: "/images/projects/white-water-house.png",
    video: "/videos/projects/white-water-house.mp4",
    heroVideo: "/videos/projects/white-water-house.mp4",
    coordinates: [-1.6, 0.2, 0.2],
    universePosition: [2.5, -0.2, 1.0],
    scale: 1.25
  }
];
