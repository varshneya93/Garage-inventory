import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth-middleware";
import { updateBlogPostSchema } from "@/lib/validation";
import { z } from "zod";
import { Status } from "@prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const blogPost = await db.blogPost.findUnique({
      where: { id },
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
    });

    if (!blogPost) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BLOG_POST_NOT_FOUND",
            message: "Blog post not found",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: blogPost,
    });
  } catch (error) {
    console.error("Blog post fetch error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to fetch blog post",
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
    const validatedData = updateBlogPostSchema.parse(body);

    // Check if blog post exists
    const existingPost = await db.blogPost.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BLOG_POST_NOT_FOUND",
            message: "Blog post not found",
          },
        },
        { status: 404 }
      );
    }

    // Prepare update data
    const updateData: any = {};
    
    if (validatedData.title !== undefined) updateData.title = validatedData.title;
    if (validatedData.excerpt !== undefined) updateData.excerpt = validatedData.excerpt;
    if (validatedData.content !== undefined) updateData.content = validatedData.content;
    if (validatedData.status !== undefined) {
      updateData.status = validatedData.status;
      // Auto-set publishedAt when publishing
      if (validatedData.status === Status.PUBLISHED && !existingPost.publishedAt) {
        updateData.publishedAt = new Date();
      }
    }
    if (validatedData.featured !== undefined) updateData.featured = validatedData.featured;
    if (validatedData.publishedAt !== undefined) {
      updateData.publishedAt = validatedData.publishedAt ? new Date(validatedData.publishedAt) : null;
    }

    // Handle tags update
    if (validatedData.tags !== undefined) {
      await db.blogTag.deleteMany({
        where: { blogPostId: id },
      });
      updateData.tags = {
        create: validatedData.tags.map((tag) => ({ name: tag })),
      };
    }

    // Handle categories update
    if (validatedData.categories !== undefined) {
      await db.blogCategory.deleteMany({
        where: { blogPostId: id },
      });
      updateData.categories = {
        create: validatedData.categories.map((cat) => ({ name: cat })),
      };
    }

    const blogPost = await db.blogPost.update({
      where: { id },
      data: updateData,
      include: {
        tags: true,
        categories: true,
      },
    });

    return NextResponse.json({
      success: true,
      data: blogPost,
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

    console.error("Blog post update error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to update blog post",
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

    const blogPost = await db.blogPost.findUnique({
      where: { id },
    });

    if (!blogPost) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "BLOG_POST_NOT_FOUND",
            message: "Blog post not found",
          },
        },
        { status: 404 }
      );
    }

    await db.blogPost.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: "Blog post deleted successfully",
    });
  } catch (error) {
    console.error("Blog post deletion error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to delete blog post",
          details: error instanceof Error ? error.message : "Unknown error",
        },
      },
      { status: 500 }
    );
  }
}
