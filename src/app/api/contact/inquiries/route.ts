import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-middleware";
import { inquiryQuerySchema } from "@/lib/validation";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const { error, session } = await requireAdmin();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validatedQuery = inquiryQuerySchema.parse(queryParams);

    const where: any = {};

    if (validatedQuery.status) {
      where.status = validatedQuery.status;
    }

    if (validatedQuery.search) {
      where.OR = [
        { name: { contains: validatedQuery.search, mode: "insensitive" } },
        { email: { contains: validatedQuery.search, mode: "insensitive" } },
        { subject: { contains: validatedQuery.search, mode: "insensitive" } },
        { message: { contains: validatedQuery.search, mode: "insensitive" } },
      ];
    }

    const skip = (validatedQuery.page - 1) * validatedQuery.limit;

    const [inquiries, total] = await Promise.all([
      db.contactInquiry.findMany({
        where,
        skip,
        take: validatedQuery.limit,
        orderBy: { createdAt: "desc" },
        include: {
          responses: {
            orderBy: { createdAt: "desc" },
          },
        },
      }),
      db.contactInquiry.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: inquiries,
      pagination: {
        page: validatedQuery.page,
        limit: validatedQuery.limit,
        total,
        totalPages: Math.ceil(total / validatedQuery.limit),
      },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "Invalid query parameters",
            details: error.errors,
          },
        },
        { status: 400 }
      );
    }

    console.error("Inquiries fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch inquiries",
        },
      },
      { status: 500 }
    );
  }
}
