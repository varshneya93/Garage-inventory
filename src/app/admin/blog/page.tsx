import { db } from "@/lib/db";
import { BlogList } from "@/components/admin/blog/blog-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function BlogPage() {
  const posts = await db.blogPost.findMany({
    include: {
      tags: true,
      categories: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog content
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/blog/new">
            <Plus className="size-4 mr-2" />
            New Post
          </Link>
        </Button>
      </div>

      <BlogList posts={posts} />
    </div>
  );
}
