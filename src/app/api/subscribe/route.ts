import { NextResponse } from "next/server";
import { Resend } from "resend";
import { WelcomeEmail } from "@/emails/welcome";
import * as React from "react";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body" },
      { status: 400 },
    );
  }

  const raw =
    typeof body === "object" && body !== null && "email" in body
      ? (body as { email: unknown }).email
      : null;

  const email = typeof raw === "string" ? raw.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  // Add to Resend Audience (ignore duplicate contact errors)
  const { error: contactError } = await resend.contacts.create({
    email,
    unsubscribed: false,
    audienceId: process.env.RESEND_AUDIENCE_ID!,
  });

  if (contactError) {
    // Ignore validation_error (duplicate contact) and restricted_api_key (key lacks audience permission)
    if (
      contactError.name !== "validation_error" &&
      contactError.name !== "restricted_api_key"
    ) {
      console.error("[subscribe] contacts.create error:", contactError);
      return NextResponse.json(
        { error: "Subscription failed" },
        { status: 500 },
      );
    }
    if (contactError.name === "restricted_api_key") {
      console.warn(
        "[subscribe] API key lacks audience permission — skipping contact creation",
      );
    }
  }

  // Send welcome email
  const { error: emailError } = await resend.emails.send({
    from: process.env.FROM_EMAIL ?? "Field Notes <hello@usman-iqbal.blog>",
    to: email,
    subject: "Welcome to Field Notes",
    react: React.createElement(WelcomeEmail),
  });

  if (emailError) {
    // Log but don't fail — the contact was added successfully
    console.error("[subscribe] emails.send error:", emailError);
  }

  return NextResponse.json({ success: true });
}
