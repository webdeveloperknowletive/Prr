import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Prop Range Realty",
};

export default function TermsPage() {
  return (
    <div className="w-full py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl prose prose-gray">
        <h1 className="text-4xl font-bold text-prr-primary mb-8">Terms & Conditions</h1>
        <p className="text-gray-600 mb-4">Last Updated: {new Date().getFullYear()}</p>
        <div className="space-y-6 text-gray-700">
          <p>Welcome to Prop Range Realty. By accessing or using our website, you agree to be bound by these Terms & Conditions.</p>
          <h3 className="text-xl font-bold text-gray-900">Services</h3>
          <p>Prop Range Realty provides real estate marketing, mandate sales, and advisory services for B2B clients (developers and promoters).</p>
          <h3 className="text-xl font-bold text-gray-900">Intellectual Property</h3>
          <p>The content on this website, including text, graphics, logos, and images, is the property of Prop Range Realty and is protected by copyright laws.</p>
          <h3 className="text-xl font-bold text-gray-900">Limitation of Liability</h3>
          <p>Prop Range Realty shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or website.</p>
        </div>
      </div>
    </div>
  );
}
