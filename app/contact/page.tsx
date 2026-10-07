import { MapPin, Phone, Mail, Clock } from "lucide-react";
import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";
import { PRR_CONTACT } from "@/data/contact";

export const metadata: Metadata = {
  title: "Contact Us | Prop Range Realty",
  description: "Get in touch with Prop Range Realty to discuss real estate project partnerships, mandates, and sales strategy.",
};

export default function ContactPage() {
  return (
    <div className="w-full">
      <section className="py-24 bg-prr-primary text-white text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300">
            Let's discuss how we can accelerate your real estate sales.
          </p>
        </div>
      </section>

      <section className="py-24 bg-[#F5F5F3]">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl font-bold text-prr-primary mb-8">Let's Discuss Your Project</h2>
              <p className="text-gray-600 text-lg mb-12">
                Whether you're looking for a complete mandate partner, need support with a specific project phase, or want to explore channel partner opportunities, our team is ready to assist.
              </p>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-gray-200 mr-6">
                    <MapPin className="w-5 h-5 text-prr-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-prr-primary mb-1">Office Address</h4>
                    <p className="text-gray-600">
                      {PRR_CONTACT.addressLines[0]}<br />
                      {PRR_CONTACT.addressLines[1]}, {PRR_CONTACT.addressLines[2]}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-gray-200 mr-6">
                    <Phone className="w-5 h-5 text-prr-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-prr-primary mb-1">Phone</h4>
                    <p className="text-gray-600">
                      <a href={PRR_CONTACT.phoneTel} className="hover:text-prr-accent transition-colors">
                        {PRR_CONTACT.phone}
                      </a>
                      <span className="block text-sm text-gray-500 mt-0.5">
                        Direct / WhatsApp: <a href={PRR_CONTACT.getWhatsAppUrl()} className="text-emerald-600 hover:underline">{PRR_CONTACT.whatsappFormatted}</a>
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-gray-200 mr-6">
                    <Mail className="w-5 h-5 text-prr-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-prr-primary mb-1">Email</h4>
                    <p className="text-gray-600">
                      <a href={PRR_CONTACT.emailMailto} className="hover:text-prr-accent transition-colors">
                        {PRR_CONTACT.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 border border-gray-200 mr-6">
                    <Clock className="w-5 h-5 text-prr-accent" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-prr-primary mb-1">Working Hours</h4>
                    <p className="text-gray-600">{PRR_CONTACT.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}
