import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-middleware";
import { createProjectSchema, projectQuerySchema } from "@/lib/validation";
import { z } from "zod";
import { Status } from "@prisma/client";

export async function POST(request: NextRequest) {
  const { error, session } = await requireAdmin();
  if (error) return error;

  try {
    const body = await request.json();
    const validatedData = createProjectSchema.parse(body);

    // Check if slug already exists
    const existingProject = await db.project.findUnique({
      where: { slug: validatedData.slug },
    });

    if (existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "SLUG_EXISTS",
            message: "A project with this slug already exists",
          },
        },
        { status: 400 }
      );
    }

    const project = await db.project.create({
      data: {
        title: validatedData.title,
        slug: validatedData.slug,
        description: validatedData.description,
        content: validatedData.content,
        status: validatedData.status,
        featured: validatedData.featured,
        sortOrder: validatedData.sortOrder,
        publishedAt: validatedData.publishedAt
          ? new Date(validatedData.publishedAt)
          : validatedData.status === Status.PUBLISHED
          ? new Date()
          : null,
        userId: session!.user.id,
        images: {
          create: validatedData.images.map((img) => ({
            url: img.url,
            alt: img.alt,
            sortOrder: img.sortOrder,
          })),
        },
        tags: {
          create: validatedData.tags.map((tag) => ({ name: tag })),
        },
        categories: {
          create: validatedData.categories.map((cat) => ({ name: cat })),
        },
      },
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        tags: true,
        categories: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: project,
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

    console.error("Project creation error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to create project",
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
    const validatedQuery = projectQuerySchema.parse(queryParams);

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
        { description: { contains: validatedQuery.search, mode: "insensitive" } },
        { content: { contains: validatedQuery.search, mode: "insensitive" } },
      ];
    }

    const skip = (validatedQuery.page - 1) * validatedQuery.limit;

    const [projects, total] = await Promise.all([
      db.project.findMany({
        where,
        skip,
        take: validatedQuery.limit,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        include: {
          images: { orderBy: { sortOrder: "asc" } },
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
      db.project.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: projects,
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

    console.error("Projects fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch projects",
        },
      },
      { status: 500 }
    );
  }
}
