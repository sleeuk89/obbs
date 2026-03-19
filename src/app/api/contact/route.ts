import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      businessName,
      name,
      email,
      phone,
      transactionVolume,
      servicesNeeded,
      message,
      location,
      businessType,
    } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Name, email and phone are required" },
        { status: 400 }
      );
    }

    const emailSubject = `New Outsourced Bookkeeping Enquiry from ${name} — ${businessName || "Business Not Specified"}`;
    const emailMessage = `
NEW OUTSOURCED BOOKKEEPING SERVICES ENQUIRY
Received: ${new Date().toLocaleString("en-GB", { timeZone: "Europe/London" })}

BUSINESS DETAILS:
Business Name: ${businessName || "Not provided"}
Contact Name: ${name}
Email: ${email}
Phone: ${phone}
Business Type: ${businessType || "Not specified"}

SERVICE DETAILS:
Monthly Transaction Volume: ${transactionVolume || "Not specified"}
Services Required: ${Array.isArray(servicesNeeded) ? servicesNeeded.join(", ") : servicesNeeded || "Not specified"}
Location: ${location || "Not specified"}

MESSAGE:
${message || "No additional message provided"}
    `.trim();

    const formspreeData = new URLSearchParams();
    formspreeData.append("name", name);
    formspreeData.append("email", email);
    formspreeData.append("phone", phone);
    formspreeData.append("message", emailMessage);
    formspreeData.append("_subject", emailSubject);
    formspreeData.append("_replyto", email);

    const formspreeResponse = await fetch("https://formspree.io/f/maqpvbgk", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: formspreeData.toString(),
    });

    if (formspreeResponse.ok) {
      return NextResponse.json({
        success: true,
        message:
          "Thank you! Your enquiry has been submitted. We will be in touch within one working day.",
      });
    }

    console.log("Bookkeeping enquiry submission (fallback):", {
      businessName,
      name,
      email,
      phone,
      transactionVolume,
      message,
      location,
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your enquiry has been received.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit enquiry. Please try again." },
      { status: 500 }
    );
  }
}
