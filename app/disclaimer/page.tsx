import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclaimer | Prop Range Realty",
};

export default function DisclaimerPage() {
  return (
    <div className="w-full py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl prose prose-gray">
        <h1 className="text-4xl font-bold text-prr-primary mb-8">Disclaimer</h1>
        <p className="text-gray-600 mb-4">Last Updated: {new Date().getFullYear()}</p>
        <div className="space-y-6 text-gray-700">
          <p>The information contained on this website is for general informational purposes only. Prop Range Realty assumes no responsibility for errors or omissions in the contents of the website.</p>
          <h3 className="text-xl font-bold text-gray-900">Project Information</h3>
          <p>Project details, images, specifications, and availability shown on this website are subject to change without notice. All project-related information should be independently verified before making any business decisions.</p>
          <h3 className="text-xl font-bold text-gray-900">No Guarantees</h3>
          <p>While Prop Range Realty employs professional sales and marketing strategies, we do not guarantee specific sales volumes, lead numbers, or financial returns as these are subject to market conditions.</p>
        </div>
      </div>
    </div>
  );
}
