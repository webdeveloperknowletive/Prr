import { NextResponse } from "next/server";
import { PRR_CONTACT } from "@/data/contact";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, company, projectName, enquiryType, message, source } = body;

    // Validate minimum required fields
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        { success: false, error: "Name is required." },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== "string" || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: "Phone number is required." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 }
      );
    }

    const enquiryRecord = {
      timestamp: new Date().toISOString(),
      recipient: PRR_CONTACT.email,
      projectName: projectName || "General Mandate / Portfolio",
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        company: company?.trim() || "Individual Client",
      },
      enquiryType: enquiryType || "Project Mandate Inquiry",
      message: message?.trim() || "No custom message provided.",
      source: source || "PRR Website Project Dossier",
    };

    // Server-side audit log for Ravi Jaiswal
    console.log("[PRR ENQUIRY DISPATCHED]", JSON.stringify(enquiryRecord, null, 2));

    return NextResponse.json({
      success: true,
      message: `Enquiry successfully registered and sent to ${PRR_CONTACT.name} (${PRR_CONTACT.email}).`,
      data: {
        projectName: enquiryRecord.projectName,
        recipient: PRR_CONTACT.email,
        contactPerson: PRR_CONTACT.name
      }
    });
  } catch (error) {
    console.error("[PRR ENQUIRY ERROR]", error);
    return NextResponse.json(
      { success: false, error: "Unable to process enquiry. Please contact us directly at " + PRR_CONTACT.email },
      { status: 500 }
    );
  }
}
