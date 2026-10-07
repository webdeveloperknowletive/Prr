import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Prop Range Realty",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="w-full py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl prose prose-gray">
        <h1 className="text-4xl font-bold text-prr-primary mb-8">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">Last Updated: {new Date().getFullYear()}</p>
        <div className="space-y-6 text-gray-700">
          <p>Prop Range Realty ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Prop Range Realty.</p>
          <h3 className="text-xl font-bold text-gray-900">Information Collection</h3>
          <p>We collect information you provide directly to us when you submit forms on our website, such as your name, company name, email address, phone number, and project details.</p>
          <h3 className="text-xl font-bold text-gray-900">Use of Information</h3>
          <p>We use the information we collect to communicate with you about your project, provide our real estate services, and send you important updates regarding our partnership.</p>
          <h3 className="text-xl font-bold text-gray-900">Contact Us</h3>
          <p>If you have any questions about this Privacy Policy, please contact us.</p>
        </div>
      </div>
    </div>
  );
}
