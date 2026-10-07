import Link from "next/link";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { PRR_CONTACT } from "@/data/contact";

export function Footer() {
  return (
    <footer className="bg-prr-primary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold tracking-tight text-white">
              PROP RANGE <span className="text-prr-accent">REALTY</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Strategic Real Estate Sales & Mandate Partner. Accelerating real estate sales through strategy, marketing & channel partnerships.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-prr-accent transition-colors">
                LinkedIn
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-prr-accent transition-colors">
                Instagram
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-prr-accent transition-colors">
                Facebook
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/for-builders" className="text-gray-400 hover:text-white transition-colors">For Builders</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
              <li><Link href="/mandates" className="text-gray-400 hover:text-white transition-colors">Mandates</Link></li>
            </ul>
          </div>

          {/* Quick Links 2 */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-2">
              <li><Link href="/projects" className="text-gray-400 hover:text-white transition-colors">Projects</Link></li>
              <li><Link href="/how-we-work" className="text-gray-400 hover:text-white transition-colors">How We Work</Link></li>
              <li><Link href="/insights" className="text-gray-400 hover:text-white transition-colors">Insights</Link></li>
              <li><Link href="/pitch-your-project" className="text-prr-accent hover:text-white transition-colors">Pitch Your Project</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-prr-accent shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  {PRR_CONTACT.addressLines[0]}<br />
                  {PRR_CONTACT.addressLines[1]}, {PRR_CONTACT.addressLines[2]}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-prr-accent shrink-0" />
                <a href={PRR_CONTACT.phoneTel} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {PRR_CONTACT.phone}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-prr-accent shrink-0" />
                <a href={PRR_CONTACT.emailMailto} className="text-gray-400 hover:text-white text-sm transition-colors">
                  {PRR_CONTACT.email}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MessageSquare className="w-5 h-5 text-prr-accent shrink-0" />
                <a 
                  href={PRR_CONTACT.getWhatsAppUrl()} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-400 hover:text-white text-sm transition-colors"
                >
                  {PRR_CONTACT.whatsappFormatted}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Prop Range Realty. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <Link href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
