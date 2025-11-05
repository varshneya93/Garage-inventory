import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-middleware";
import { sendEmail, generateInquiryResponseEmail } from "@/lib/email";
import { z } from "zod";

const respondSchema = z.object({
  response: z.string().min(1, "Response message is required"),
});

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = respondSchema.parse(body);

    // Get the inquiry
    const inquiry = await db.contactInquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INQUIRY_NOT_FOUND",
            message: "Inquiry not found",
          },
        },
        { status: 404 }
      );
    }

    // Create response record
    const response = await db.contactResponse.create({
      data: {
        inquiryId: id,
        message: validatedData.response,
      },
    });

    // Update inquiry status
    await db.contactInquiry.update({
      where: { id },
      data: {
        status: "RESPONDED",
        userId: session!.user.id,
      },
    });

    // Send email to the inquirer
    const emailOptions = generateInquiryResponseEmail(
      {
        name: inquiry.name,
        email: inquiry.email,
        subject: inquiry.subject,
      },
      validatedData.response
    );

    const emailSent = await sendEmail(emailOptions);

    return NextResponse.json({
      success: true,
      message: "Response sent successfully",
      data: {
        response,
        emailSent,
      },
    });
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

    console.error("Inquiry response error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to send response",
        },
      },
      { status: 500 }
    );
  }
}
