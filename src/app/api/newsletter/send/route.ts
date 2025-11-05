import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-middleware";
import { sendNewsletterToSubscribers } from "@/lib/email";
import { z } from "zod";

const newsletterSchema = z.object({
  subject: z.string().min(1, "Subject is required"),
  content: z.string().min(1, "Content is required"),
  tags: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const validatedData = newsletterSchema.parse(body);

    // Send newsletter to all active subscribers
    const result = await sendNewsletterToSubscribers(
      validatedData.subject,
      validatedData.content,
      validatedData.tags
    );

    return NextResponse.json({
      success: true,
      message: `Newsletter sent successfully to ${result.success} subscribers`,
      data: {
        sent: result.success,
        failed: result.failed,
        total: result.success + result.failed,
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

    console.error("Newsletter send error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to send newsletter",
        },
      },
      { status: 500 }
    );
  }
}
