export interface Project {
  id: string;
  name: string;
  tagline: string;
  location: string;
  zone: 'WEST PUNE' | 'EAST PUNE' | 'NORTH PUNE';
  type: string;
  image: string;
  video: string;
  price: string;
  carpetArea: string;
  projectSize: string;
  floors: string;
  units: string;
  possession: string;
  landmark: string;
  configuration: string;
  highlights: string[];
  amenities: string[];
  coordinates: [number, number, number]; // [x, y, z] for Atlas
  universePosition: [number, number, number]; // [x, y, z] for Spatial Universe
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
  // West Pune (75 - 80% volume)
  { id: 'balewadi', name: 'Balewadi', zone: 'WEST PUNE', coordinates: [-2.2, 0.1, -0.6], projectCount: 3, featuredProjectId: 'dream-glorious', tagline: 'Metro Corridor & High-Street Hub' },
  { id: 'baner', name: 'Baner', zone: 'WEST PUNE', coordinates: [-1.6, 0.1, 0.2], projectCount: 2, featuredProjectId: 'white-water-house', tagline: 'Exclusive Residential Enclave' },
  { id: 'bhavdhan', name: 'Bhavdhan', zone: 'WEST PUNE', coordinates: [-2.8, 0.1, 1.4], projectCount: 1, tagline: 'Scenic Foothills & Expressway Link' },
  { id: 'talegaon', name: 'Talegaon', zone: 'WEST PUNE', coordinates: [-4.6, 0.1, 2.5], projectCount: 2, featuredProjectId: 'vtp-urban-life', tagline: 'Industrial Belt & Eco Living' },
  { id: 'ravet', name: 'Ravet', zone: 'WEST PUNE', coordinates: [-3.2, 0.1, 0.8], projectCount: 4, featuredProjectId: 'arkaa-galaxy', tagline: 'BRTS Gateway of West Pune' },

  // North Pune
  { id: 'charholi', name: 'Charholi', zone: 'NORTH PUNE', coordinates: [1.2, 0.1, -2.6], projectCount: 2, featuredProjectId: 'the-quill', tagline: 'Prime 90m Ring Road Connectivity' },
  { id: 'moshi', name: 'Moshi', zone: 'NORTH PUNE', coordinates: [0.2, 0.1, -3.2], projectCount: 1, tagline: 'International Convention District' },
  { id: 'chakan', name: 'Chakan', zone: 'NORTH PUNE', coordinates: [-0.8, 0.1, -4.5], projectCount: 1, tagline: 'Automobile & Global Engineering Core' },

  // East Pune (30 - 35% volume)
  { id: 'cbd', name: 'CBD', zone: 'EAST PUNE', coordinates: [0.6, 0.1, 0.4], projectCount: 1, tagline: 'Central Commercial District' },
  { id: 'kharadi', name: 'Kharadi', zone: 'EAST PUNE', coordinates: [2.8, 0.1, 0.6], projectCount: 3, tagline: 'EON IT Park & Financial Tower Hub' },
  { id: 'manjari', name: 'Manjari', zone: 'EAST PUNE', coordinates: [3.8, 0.1, 1.6], projectCount: 1, tagline: 'Emerging Suburban Growth Corridor' },
  { id: 'hadapsar', name: 'Hadapsar', zone: 'EAST PUNE', coordinates: [2.4, 0.1, 2.2], projectCount: 2, tagline: 'Magarpatta SEZ & Commercial Center' },
  { id: 'wagholi', name: 'Wagholi', zone: 'EAST PUNE', coordinates: [3.4, 0.1, -1.2], projectCount: 2, tagline: 'Nagar Road Educational & Tech Axis' },
  { id: 'dhanori', name: 'Dhanori', zone: 'EAST PUNE', coordinates: [1.8, 0.1, -1.8], projectCount: 1, tagline: 'Airport Proximity & Urban Residential' },
];

export const projects: Project[] = [
  {
    id: 'dream-glorious',
    name: 'Dream Glorious',
    tagline: 'Witness the glory of your dream home',
    location: 'Balewadi',
    zone: 'WEST PUNE',
    type: 'Residential + Commercial',
    image: '/assets/images/dream_glorious.png_20260928104846.jpg',
    video: '/assets/videos/dream-glorious.mp4',
    price: '1.15 Cr. To 1.60 Cr. (AI)*',
    carpetArea: '890 Sq. Ft. to 1278 Sq. Ft.',
    projectSize: '0.5 Acre',
    floors: 'B3 + B2 + B1 + Commercial + 15 Floors',
    units: '68 (R) + 12 (C)',
    possession: 'June 2027 (As Per RERA)',
    landmark: 'Near Nicmar Metro Station',
    configuration: '2 & 3 BHK Premium Residencies',
    highlights: [
      'Each floor 5 flats with 2 high-speed lifts',
      'Covered parking allotted for each flat',
      'Best in class construction with Vaastu compliant layout',
      'High-street commercial retail on podium floor',
      'Walkable to Nicmar Metro Station & Balewadi High Street'
    ],
    amenities: [
      'Clubhouse & Gymnasium',
      'Landscaped Terrace Garden',
      'EV Charging Bays',
      'Video Door Security & CCTV',
      'Intercom & 24/7 Power Backup'
    ],
    coordinates: [-2.2, 0.2, -0.6],
    universePosition: [-3.5, 0.2, -1.0],
    scale: 1.15
  },
  {
    id: 'the-quill',
    name: 'The Quill',
    tagline: 'Creating Homes, Cultivating Happiness',
    location: 'Charholi',
    zone: 'NORTH PUNE',
    type: 'Residential + Commercial',
    image: '/assets/images/the_quill.png_20260928104840.jpg',
    video: '/assets/videos/the_quill.mp4',
    price: '50 Lac. To 1 Cr. (AI)*',
    carpetArea: '677 Sq. Ft. to 1354 Sq. Ft.',
    projectSize: '0.5 Acre',
    floors: 'B1 + Commercial + 15 Floors',
    units: '122 (R) + 4 (C)',
    possession: 'Dec 2027 (As Per RERA)',
    landmark: 'Near 90 Mtrs. Wadmukhwadi',
    configuration: '2 & 4 BHK Premium Residencies',
    highlights: [
      'Each floor 5 + 4 flats with 2 lifts per wing',
      'Covered parking for every apartment',
      'Superior Vaastu compliant design',
      'Prominent frontage on 90m Wadmukhwadi corridor',
      'Multi-tier security infrastructure'
    ],
    amenities: [
      'Designer Entrance Lobby',
      'Children Play Zone & Sandpit',
      'Rooftop Jogging Track',
      'Multipurpose Community Hall',
      'Rainwater Harvesting'
    ],
    coordinates: [1.2, 0.2, -2.6],
    universePosition: [-0.8, -0.1, -2.5],
    scale: 0.95
  },
  {
    id: 'arkaa-galaxy',
    name: 'Arkaa Galaxy',
    tagline: 'Elevating Your Living Experience',
    location: 'Ravet',
    zone: 'WEST PUNE',
    type: 'Residential',
    image: '/assets/images/arkaa_galaxy.png_20260928104838.jpg',
    video: '/assets/videos/arkaa_galaxy.mp4',
    price: '69.99 Lac (AI)*',
    carpetArea: '745 Sq. Ft.',
    projectSize: '2.5 Acres',
    floors: 'B + G + 14 Floors (2 Wings: A & B)',
    units: '110 Units',
    possession: 'DEC 2025 (As Per RERA)',
    landmark: 'Near Chandrabhaga Corner',
    configuration: '2 BHK Modern Urban Homes',
    highlights: [
      'Solid Red Bricks construction for thermal comfort',
      '4 flats per floor served by 3 high-capacity lifts',
      'Vaastu compliant spacious residences',
      'Covered parking structure for all residents',
      'Immediate access to Mumbai-Pune Expressway connector'
    ],
    amenities: [
      'Acupressure Walkway & Zen Garden',
      'Senior Citizen Pavilion',
      'Indoor Games Arena',
      'Fully Equipped Fitness Studio',
      'Solar Lighting in Common Areas'
    ],
    coordinates: [-3.2, 0.2, 0.8],
    universePosition: [1.8, 0.4, -0.5],
    scale: 1.2
  },
  {
    id: 'vtp-urban-life',
    name: 'VTP Urban Life',
    tagline: 'ECO Friendly Urban Living Experience',
    location: 'Talegaon',
    zone: 'WEST PUNE',
    type: 'Residential',
    image: '/assets/images/arkaa_galaxy.png_20260928104838.jpg', // fall back gracefully to architectural asset
    video: '/assets/videos/vtp_urban_life.mp4',
    price: '35 - 46 Lac (AI)*',
    carpetArea: '503 - 766 Sq. Ft.',
    projectSize: '3.0 Acres',
    floors: 'B + G + 12 Floors (4 Wings)',
    units: '90 Units',
    possession: 'June 2025',
    landmark: 'Near Talegaon MIDC',
    configuration: '1 & 2 BHK Eco-Smart Residences',
    highlights: [
      'Large 3-acre gated ecosystem with 4 towers',
      'Affordable luxury tailored for engineering & tech professionals',
      '6 flats per floor with 2 lifts per wing',
      'Strategic closeness to Talegaon Industrial Hub & Expressway',
      'Vaastu compliant naturally ventilated homes'
    ],
    amenities: [
      'Swimming Pool & Kids Splash Pool',
      'Tree-lined Jogging Trail',
      'Open Air Amphitheatre',
      'Cricket Pitch & Sports Net',
      'Bio-diversity Landscaping'
    ],
    coordinates: [-4.6, 0.2, 2.5],
    universePosition: [4.2, -0.3, -2.8],
    scale: 0.9
  },
  {
    id: 'revanta',
    name: 'Revanta',
    tagline: 'Creating Homes, Cultivating Happiness',
    location: 'Ravet',
    zone: 'WEST PUNE',
    type: 'Residential (OC Received - NO GST)',
    image: '/assets/images/revanta.png_20260928104831.jpg',
    video: '/assets/videos/revanta.mp4',
    price: '88.99 Lac (AI)*',
    carpetArea: '867 Sq. Ft.',
    projectSize: '1.5 Acres',
    floors: 'B + G + 11 Floors (4 Wings: A, B, C, D)',
    units: '25 Available Units',
    possession: 'READY POSSESSION (OC Received, Zero GST)',
    landmark: 'Ravet BRTS Node',
    configuration: '2 BHK Luxury Residences',
    highlights: [
      'Ready to move in — OC received with zero GST liability',
      'Low density 4 flats per floor with 2 lifts per wing',
      'Covered vehicle parking for each apartment',
      'Immediate registration and key handover',
      'Exceptional rental yield and capital appreciation micro-market'
    ],
    amenities: [
      'Designer Pergola & Party Lawn',
      'State-of-the-Art Fitness Center',
      'Dedicated Children Play Area',
      'Intercom & 24/7 Security Cabin',
      'DG Backup for Lifts & Essential Utilities'
    ],
    coordinates: [-2.8, 0.2, 1.2],
    universePosition: [-1.9, 0.5, 1.2],
    scale: 1.1
  },
  {
    id: 'white-water-house',
    name: 'White Water House',
    tagline: 'Exclusive Luxury Living, The Private Homes',
    location: 'Baner',
    zone: 'WEST PUNE',
    type: 'Residential (OC Received - NO GST)',
    image: '/assets/images/white_water_house.png_20260928104835.jpg',
    video: '/assets/videos/white_water_house.mp4',
    price: '1.44 Cr (AI)*',
    carpetArea: '950 Sq. Ft.',
    projectSize: '5,000 Sq. Ft. Private Parcel',
    floors: 'G + 5 Floors (Single Boutique Wing A)',
    units: '6 Exclusive Residences (Only 2 per floor)',
    possession: 'READY POSSESSION (OC Received, Zero GST)',
    landmark: 'Baner Hills & High Street Proximity',
    configuration: '3 BHK Boutique Private Homes',
    highlights: [
      'Ultra-exclusive enclave of only 6 private residences',
      'Only 2 homes per floor ensuring absolute privacy & calm',
      'Dedicated private parking slot for every homeowner',
      'Solar water heater system & solar lighting backup',
      'Full DG generator backup with 24x7 water supply'
    ],
    amenities: [
      'Private Terrace Lounge',
      'High-Speed Automated Elevator',
      'Security Access Control',
      'Solar Heating Array',
      'Architectural Facade Lighting'
    ],
    coordinates: [-1.6, 0.2, 0.2],
    universePosition: [2.5, -0.2, 1.0],
    scale: 1.25
  }
];
