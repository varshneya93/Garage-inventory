import { db } from "@/lib/db";
import { BlogForm } from "@/components/admin/blog/blog-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const post = await db.blogPost.findUnique({
    where: { id },
    include: {
      tags: true,
      categories: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Blog Post</h1>
          <p className="text-muted-foreground">
            Update blog post content
          </p>
        </div>
      </div>

      <BlogForm post={post} />
    </div>
  );
}
