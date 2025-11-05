import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { contactFormSchema } from "@/lib/validation";
import { sendEmail, generateContactNotificationEmail } from "@/lib/email";
import { z } from "zod";

// Simple in-memory rate limiting (for production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit (5 requests per hour)
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: "Too many requests. Please try again later.",
          },
        },
        { status: 429 }
      );
    }

    const body = await request.json();
    const validatedData = contactFormSchema.parse(body);

    // Create contact inquiry
    const inquiry = await db.contactInquiry.create({
      data: {
        name: validatedData.name,
        email: validatedData.email,
        subject: validatedData.subject,
        message: validatedData.message,
      },
    });

    // Send email notification to admin
    const emailOptions = generateContactNotificationEmail(inquiry);
    await sendEmail(emailOptions);

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. We'll get back to you soon!",
        data: {
          id: inquiry.id,
          createdAt: inquiry.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid input data",
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    console.error("Contact form submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to submit contact form. Please try again later.",
        },
      },
      { status: 500 }
    );
  }
}
