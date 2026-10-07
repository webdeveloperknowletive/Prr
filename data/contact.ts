/**
 * Centralized Contact Configuration for Prop Range Realty (PRR)
 * Source of Truth: Authorized Visiting Card for Ravi Jaiswal, Founder & CEO
 */

export const PRR_CONTACT = {
  name: "Ravi Jaiswal",
  title: "Founder & CEO",
  mobile: "+91 7875040759",
  whatsapp: "917875040759",
  whatsappFormatted: "+91 7875040759",
  phone: "020 41208110",
  phoneRaw: "02041208110",
  phoneTel: "tel:02041208110",
  email: "ravi.jaiswal@proprangerealty.com",
  emailMailto: "mailto:ravi.jaiswal@proprangerealty.com",
  address: "Office No. 238, 2nd Floor, Xion Mall Multiplex, Hinjewadi Phase-1, Pune - 411057",
  addressLines: [
    "Office No. 238, 2nd Floor, Xion Mall Multiplex",
    "Hinjewadi Phase-1",
    "Pune - 411057"
  ],
  workingHours: "Monday - Saturday: 9:30 AM - 6:30 PM",
  
  /**
   * Generates direct WhatsApp URL with pre-filled professional message
   */
  getWhatsAppUrl: (projectName?: string) => {
    const text = projectName
      ? `Hello Ravi, I would like to enquire about ${projectName} at Prop Range Realty.`
      : "Hello Ravi, I would like to know more about the property projects at Prop Range Realty.";
    return `https://wa.me/917875040759?text=${encodeURIComponent(text)}`;
  },
  
  /**
   * Generates email mailto with pre-filled subject
   */
  getMailtoUrl: (projectName?: string) => {
    const subject = projectName
      ? `Project Enquiry: ${projectName} — Prop Range Realty`
      : "Real Estate Enquiry — Prop Range Realty";
    return `mailto:ravi.jaiswal@proprangerealty.com?subject=${encodeURIComponent(subject)}`;
  }
} as const;

export type PRRContact = typeof PRR_CONTACT;
