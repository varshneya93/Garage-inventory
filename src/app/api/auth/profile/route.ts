import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth-middleware";
import { z } from "zod";

const updateProfileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  settings: z.record(z.any()).optional(),
});

export async function GET() {
  const { error, session } = await requireAuth();
  if (error) return error;

  try {
    const user = await db.user.findUnique({
      where: { id: session!.user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        settings: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "USER_NOT_FOUND", message: "User not found" },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        ...user,
        settings: user.settings ? JSON.parse(user.settings) : null,
      },
    });
  } catch (error) {
    console.error("Profile fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch profile",
        },
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  const { error, session } = await requireAuth();
  if (error) return error;

  try {
    const body = await request.json();
    const validatedData = updateProfileSchema.parse(body);

    const updateData: any = {};
    if (validatedData.name) updateData.name = validatedData.name;
    if (validatedData.settings) {
      updateData.settings = JSON.stringify(validatedData.settings);
    }

    const user = await db.user.update({
      where: { id: session!.user.id },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        settings: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: {
        ...user,
        settings: user.settings ? JSON.parse(user.settings) : null,
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

    console.error("Profile update error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to update profile",
        },
      },
      { status: 500 }
    );
  }
}
