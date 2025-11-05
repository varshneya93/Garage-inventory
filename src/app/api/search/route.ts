import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

const searchQuerySchema = z.object({
  q: z.string().min(1),
  type: z.enum(["all", "projects", "blog"]).optional().default("all"),
  limit: z.coerce.number().min(1).max(50).optional().default(10),
});

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const queryParams = Object.fromEntries(searchParams.entries());
    const validatedQuery = searchQuerySchema.parse(queryParams);

    const searchTerm = validatedQuery.q;
    const results: any = {
      projects: [],
      blog: [],
      total: 0,
    };

    // Search projects
    if (validatedQuery.type === "all" || validatedQuery.type === "projects") {
      const projects = await db.project.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { description: { contains: searchTerm, mode: "insensitive" } },
            { content: { contains: searchTerm, mode: "insensitive" } },
            {
              tags: {
                some: { name: { contains: searchTerm, mode: "insensitive" } },
              },
            },
            {
              categories: {
                some: { name: { contains: searchTerm, mode: "insensitive" } },
              },
            },
          ],
        },
        take: validatedQuery.limit,
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
        include: {
          images: { orderBy: { sortOrder: "asc" }, take: 1 },
          tags: true,
          categories: true,
        },
      });

      results.projects = projects.map((project) => ({
        id: project.id,
        title: project.title,
        slug: project.slug,
        description: project.description,
        type: "project",
        url: `/projects/${project.slug}`,
        image: project.images[0]?.url,
        categories: project.categories.map((c) => c.name),
        publishedAt: project.publishedAt,
      }));
    }

    // Search blog posts
    if (validatedQuery.type === "all" || validatedQuery.type === "blog") {
      const blogPosts = await db.blogPost.findMany({
        where: {
          status: "PUBLISHED",
          OR: [
            { title: { contains: searchTerm, mode: "insensitive" } },
            { excerpt: { contains: searchTerm, mode: "insensitive" } },
            { content: { contains: searchTerm, mode: "insensitive" } },
            {
              tags: {
                some: { name: { contains: searchTerm, mode: "insensitive" } },
              },
            },
            {
              categories: {
                some: { name: { contains: searchTerm, mode: "insensitive" } },
              },
            },
          ],
        },
        take: validatedQuery.limit,
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        include: {
          tags: true,
          categories: true,
        },
      });

      results.blog = blogPosts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        type: "blog",
        url: `/blog/${post.slug}`,
        categories: post.categories.map((c) => c.name),
        publishedAt: post.publishedAt,
      }));
    }

    results.total = results.projects.length + results.blog.length;

    return NextResponse.json({
      success: true,
      data: results,
      query: searchTerm,
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

    console.error("Search error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "Failed to perform search",
        },
      },
      { status: 500 }
    );
  }
}
