import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Market Coverage | Prop Range Realty",
  description: "Deep understanding of Pune's real estate micro-markets including West, North, and East Pune.",
};

const markets = [
  { region: "WEST PUNE", areas: ["Baner", "Balewadi", "Bavdhan", "Ravet", "Talegaon"] },
  { region: "NORTH PUNE", areas: ["Chakan", "Moshi", "Charholi"] },
  { region: "EAST PUNE", areas: ["Kharadi", "Hadapsar", "Wagholi", "Manjari", "Dhanori"] },
];

export default function MarketCoveragePage() {
  return (
    <div className="w-full">
      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Deep Understanding of Pune's Real Estate Micro-Markets</h1>
          <p className="text-xl text-gray-300">
            Localized intelligence that drives successful real estate positioning.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#F5F5F3]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {markets.map((market) => (
              <div key={market.region} className="bg-white p-10 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <h2 className="text-2xl font-bold text-prr-accent mb-6">{market.region}</h2>
                <ul className="space-y-4">
                  {market.areas.map((area) => (
                    <li key={area} className="text-xl font-medium text-gray-800 flex items-center">
                      <span className="w-2 h-2 bg-prr-primary rounded-full mr-4"></span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
