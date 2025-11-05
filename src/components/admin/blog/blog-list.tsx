"use client";

import { useState } from "react";
import { BlogPost, BlogTag, BlogCategory, User } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, EyeOff, Calendar } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import { format } from "date-fns";

type BlogPostWithRelations = BlogPost & {
  tags: BlogTag[];
  categories: BlogCategory[];
  user: Pick<User, "name" | "email">;
};

export function BlogList({ posts }: { posts: BlogPostWithRelations[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/blog/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete blog post");
      }

      toast.success("Blog post deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete blog post");
      console.error(error);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PUBLISHED":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "DRAFT":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "ARCHIVED":
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20";
      default:
        return "";
    }
  };

  if (posts.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">No blog posts yet</p>
          <Button asChild>
            <Link href="/admin/blog/new">Write your first post</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getStatusColor(post.status)}>
                      {post.status === "PUBLISHED" && <Eye className="size-3 mr-1" />}
                      {post.status === "DRAFT" && <EyeOff className="size-3 mr-1" />}
                      {post.status}
                    </Badge>
                    {post.featured && (
                      <Badge variant="secondary">Featured</Badge>
                    )}
                    {post.publishedAt && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="size-3" />
                        {format(new Date(post.publishedAt), "MMM d, yyyy")}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-1">
                    {post.excerpt || "No excerpt"}
                  </CardDescription>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/blog/${post.id}`}>
                      <Edit className="size-4 mr-2" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setDeleteId(post.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            {(post.categories.length > 0 || post.tags.length > 0) && (
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <Badge key={category.id} variant="outline">
                      {category.name}
                    </Badge>
                  ))}
                  {post.tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary">
                      #{tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the blog post
              and all associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
