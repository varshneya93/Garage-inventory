import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-middleware";
import { z } from "zod";

const subscriberQuerySchema = z.object({
  status: z.enum(['active', 'unsubscribed']).optional(),
  search: z.string().optional(),
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(20),
});

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validatedQuery = subscriberQuerySchema.parse(queryParams);

    const where: any = {};

    if (validatedQuery.status) {
      where.status = validatedQuery.status;
    }

    if (validatedQuery.search) {
      where.OR = [
        { email: { contains: validatedQuery.search, mode: "insensitive" } },
        { name: { contains: validatedQuery.search, mode: "insensitive" } },
      ];
    }

    const skip = (validatedQuery.page - 1) * validatedQuery.limit;

    const [subscribers, total] = await Promise.all([
      db.subscriber.findMany({
        where,
        skip,
        take: validatedQuery.limit,
        orderBy: { createdAt: "desc" },
      }),
      db.subscriber.count({ where }),
    ]);

    // Parse tags from JSON strings
    const subscribersWithParsedTags = subscribers.map(sub => ({
      ...sub,
      tags: sub.tags ? JSON.parse(sub.tags) : [],
    }));

    return NextResponse.json({
      success: true,
      data: subscribersWithParsedTags,
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

    console.error("Subscribers fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch subscribers",
        },
      },
      { status: 500 }
    );
  }
}
