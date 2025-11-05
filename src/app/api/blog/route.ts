import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-middleware";
import { createBlogPostSchema, blogQuerySchema } from "@/lib/validation";
import { z } from "zod";
import { Status } from "@prisma/client";

export async function POST(request: NextRequest) {
  const { error, session } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const validatedData = createBlogPostSchema.parse(body);

    // Check if slug already exists
    const existingPost = await db.blogPost.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingPost) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "SLUG_EXISTS",
            message: "A blog post with this slug already exists",
          },
        },
        { status: 400 }
      );
    }

    const blogPost = await db.blogPost.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        excerpt: validatedData.excerpt,
        content: validatedData.content,
        status: validatedData.status,
        featured: validatedData.featured,
        publishedAt: validatedData.publishedAt
          ? new Date(validatedData.publishedAt)
          : validatedData.status === Status.PUBLISHED
          ? new Date()
          : null,
        userId: session!.user.id,
        tags: {
          create: validatedData.tags.map((tag) => ({ name: tag })),
        },
        categories: {
          create: validatedData.categories.map((cat) => ({ name: cat })),
        },
      },
      include: {
        tags: true,
        categories: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: blogPost,
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

    console.error("Blog post creation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to create blog post",
          details: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validatedQuery = blogQuerySchema.parse(queryParams);

    const where: any = {};

    if (validatedQuery.status) {
      where.status = validatedQuery.status;
    }

    if (validatedQuery.featured !== undefined) {
      where.featured = validatedQuery.featured;
    }

    if (validatedQuery.category) {
      where.categories = {
        some: { name: validatedQuery.category },
      };
    }

    if (validatedQuery.tag) {
      where.tags = {
        some: { name: validatedQuery.tag },
      };
    }

    if (validatedQuery.search) {
      where.OR = [
        { title: { contains: validatedQuery.search, mode: "insensitive" } },
        { excerpt: { contains: validatedQuery.search, mode: "insensitive" } },
        { content: { contains: validatedQuery.search, mode: "insensitive" } },
      ];
    }

    const skip = (validatedQuery.page - 1) * validatedQuery.limit;

    const [blogPosts, total] = await Promise.all([
      db.blogPost.findMany({
        where,
        skip,
        take: validatedQuery.limit,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        include: {
          tags: true,
          categories: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      }),
      db.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: blogPosts,
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

    console.error("Blog posts fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch blog posts",
          details: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}
