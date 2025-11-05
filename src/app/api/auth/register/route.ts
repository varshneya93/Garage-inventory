import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";
import { Role } from "@prisma/client";

const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await db.user.findUnique({
      where: { email: validatedData.email },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_EXISTS",
            message: "User with this email already exists",
          },
        },
        { status: 400 }
      );
    }

    // In production, hash the password before storing
    // For now, we'll create the user without storing password
    const user = await db.user.create({
      data: {
        email: validatedData.email,
        name: validatedData.name,
        role: Role.USER,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: user,
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

    console.error("Registration error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "An error occurred during registration",
        },
      },
      { status: 500 }
    );
  }
}
