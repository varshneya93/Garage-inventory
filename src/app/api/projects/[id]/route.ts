import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-middleware";
import { updateProjectSchema } from "@/lib/validation";
import { z } from "zod";
import { Status } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const project = await db.project.findUnique({
      where: { id },
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
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "PROJECT_NOT_FOUND",
            message: "Project not found",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch (error) {
    console.error("Project fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch project",
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
    const validatedData = updateProjectSchema.parse(body);

    // Check if project exists
    const existingProject = await db.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "PROJECT_NOT_FOUND",
            message: "Project not found",
          },
        },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    
    if (validatedData.title !== undefined) updateData.title = validatedData.title;
    if (validatedData.description !== undefined) updateData.description = validatedData.description;
    if (validatedData.content !== undefined) updateData.content = validatedData.content;
    if (validatedData.status !== undefined) {
      updateData.status = validatedData.status;
      // Auto-set publishedAt when publishing
      if (validatedData.status === Status.PUBLISHED && !existingProject.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    if (validatedData.featured !== undefined) updateData.featured = validatedData.featured;
    if (validatedData.sortOrder !== undefined) updateData.sortOrder = validatedData.sortOrder;
    if (validatedData.publishedAt !== undefined) {
      updateData.publishedAt = validatedData.publishedAt ? new Date(validatedData.publishedAt) : null;
    }

    // Handle images update
    if (validatedData.images !== undefined) {
      // Delete existing images and create new ones
      await db.projectImage.deleteMany({
        where: { projectId: id },
      });
      updateData.images = {
        create: validatedData.images.map((img) => ({
          url: img.url,
          alt: img.alt,
          sortOrder: img.sortOrder,
        })),
      };
    }

    // Handle tags update
    if (validatedData.tags !== undefined) {
      await db.projectTag.deleteMany({
        where: { projectId: id },
      });
      updateData.tags = {
        create: validatedData.tags.map((tag) => ({ name: tag })),
      };
    }

    // Handle categories update
    if (validatedData.categories !== undefined) {
      await db.projectCategory.deleteMany({
        where: { projectId: id },
      });
      updateData.categories = {
        create: validatedData.categories.map((cat) => ({ name: cat })),
      };
    }

    const project = await db.project.update({
      where: { id },
      data: updateData,
      include: {
        images: { orderBy: { sortOrder: "asc" } },
        tags: true,
        categories: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: project,
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

    console.error("Project update error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to update project",
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

    const project = await db.project.findUnique({
      where: { id },
    });

    if (!project) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "PROJECT_NOT_FOUND",
            message: "Project not found",
          },
        },
        { status: 404 }
      );
    }

    await db.project.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Project deletion error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to delete project",
          details: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}
