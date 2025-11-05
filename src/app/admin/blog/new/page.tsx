import { BlogForm } from "@/components/admin/blog/blog-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/blog">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">New Blog Post</h1>
          <p className="text-muted-foreground">
            Create a new blog article
          </p>
        </div>
      </div>

      <BlogForm />
    </div>
  );
}
