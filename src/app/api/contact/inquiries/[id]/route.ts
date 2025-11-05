import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-middleware";
import { updateInquirySchema } from "@/lib/validation";
import { z } from "zod";
import { InquiryStatus } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    
    const inquiry = await db.contactInquiry.findUnique({
      where: { id },
      include: {
        responses: {
          orderBy: { createdAt: "desc" },
        },
      },
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

    return NextResponse.json({
      success: true,
      data: inquiry,
    });
  } catch (error) {
    console.error("Inquiry fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch inquiry",
        },
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;
    const body = await request.json();
    const validatedData = updateInquirySchema.parse(body);

    // Check if inquiry exists
    const existingInquiry = await db.contactInquiry.findUnique({
      where: { id },
    });

    if (!existingInquiry) {
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

    // Update inquiry status
    const updateData: any = {
      status: validatedData.status as InquiryStatus,
      userId: session!.user.id,
    };

    // If response is provided, create a response record
    if (validatedData.response) {
      updateData.responses = {
        create: {
          message: validatedData.response,
        },
      };
    }

    const inquiry = await db.contactInquiry.update({
      where: { id },
      data: updateData,
      include: {
        responses: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: inquiry,
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

    console.error("Inquiry update error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to update inquiry",
        },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { error, session } = await requireAdmin();
  if (error) return error;

  try {
    const { id } = await params;

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

    await db.contactInquiry.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Inquiry deleted successfully",
    });
  } catch (error) {
    console.error("Inquiry deletion error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to delete inquiry",
        },
      },
      { status: 500 }
    );
  }
}
