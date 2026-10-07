import { servicesData, ServiceItem } from "./servicesData";

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  number?: string;
  image?: string;
}

export const services: Service[] = servicesData.map((s) => ({
  id: s.slug,
  title: s.title,
  description: s.description,
  number: s.number,
  image: s.image,
  iconName:
    s.id === 1 ? "LineChart" :
    s.id === 2 ? "Map" :
    s.id === 3 ? "Network" :
    s.id === 4 ? "Building2" :
    s.id === 5 ? "ShieldCheck" :
    s.id === 6 ? "CircleDollarSign" :
    s.id === 7 ? "Users" :
    s.id === 8 ? "Headphones" :
    s.id === 9 ? "Rocket" :
    s.id === 10 ? "Calendar" : "Handshake"
}));

export { servicesData };
export type { ServiceItem };
