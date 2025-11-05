"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BlogPost, BlogTag, BlogCategory, Status } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { MarkdownEditor } from "@/components/admin/blog/markdown-editor";

const blogSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  featured: z.boolean(),
});

type BlogFormData = z.infer<typeof blogSchema>;

type BlogPostWithRelations = BlogPost & {
  tags: BlogTag[];
  categories: BlogCategory[];
};

interface BlogFormProps {
  post?: BlogPostWithRelations;
}

export function BlogForm({ post }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>(post?.tags.map(t => t.name) || []);
  const [tagInput, setTagInput] = useState("");
  const [categories, setCategories] = useState<string[]>(post?.categories.map(c => c.name) || []);
  const [categoryInput, setCategoryInput] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: post?.title || "",
      slug: post?.slug || "",
      excerpt: post?.excerpt || "",
      content: post?.content || "",
      status: post?.status || "DRAFT",
      featured: post?.featured || false,
    },
  });

  const status = watch("status");
  const featured = watch("featured");
  const content = watch("content");

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!post) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      setValue("slug", slug);
    }
  };

  const addTag = () => {
    if (tagInput && !tags.includes(tagInput)) {
      setTags([...tags, tagInput]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const addCategory = () => {
    if (categoryInput && !categories.includes(categoryInput)) {
      setCategories([...categories, categoryInput]);
      setCategoryInput("");
    }
  };

  const removeCategory = (category: string) => {
    setCategories(categories.filter(c => c !== category));
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        tags,
        categories,
      };

      const url = post ? `/api/blog/${post.id}` : "/api/blog";
      const method = post ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Failed to save blog post");
      }

      toast.success(post ? "Blog post updated successfully" : "Blog post created successfully");
      router.push("/admin/blog");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save blog post");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Enter the basic details for your blog post
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              {...register("title")}
              onChange={(e) => {
                register("title").onChange(e);
                handleTitleChange(e);
              }}
              placeholder="My Awesome Blog Post"
            />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug *</Label>
            <Input
              id="slug"
              {...register("slug")}
              placeholder="my-awesome-blog-post"
              disabled={!!post}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              URL-friendly identifier (cannot be changed after creation)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              {...register("excerpt")}
              placeholder="A brief summary of your post"
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Short description shown in post listings
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
          <CardDescription>
            Write your blog post content using Markdown
          </CardDescription>
        </CardHeader>
        <CardContent>
          <MarkdownEditor
            value={content}
            onChange={(value) => setValue("content", value)}
          />
          {errors.content && (
            <p className="text-sm text-destructive mt-2">{errors.content.message}</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories & Tags</CardTitle>
          <CardDescription>
            Organize your blog post with categories and tags
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Categories</Label>
            <div className="flex gap-2">
              <Input
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addCategory())}
                placeholder="Add category"
              />
              <Button type="button" onClick={addCategory} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Badge key={category} variant="secondary">
                  {category}
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add tag"
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  #{tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 hover:text-destructive"
                  >
                    <X className="size-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publishing</CardTitle>
          <CardDescription>
            Control the visibility and status of your blog post
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              value={status}
              onValueChange={(value) => setValue("status", value as Status)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DRAFT">Draft</SelectItem>
                <SelectItem value="PUBLISHED">Published</SelectItem>
                <SelectItem value="ARCHIVED">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="featured">Featured Post</Label>
              <p className="text-sm text-muted-foreground">
                Display this post prominently on your blog
              </p>
            </div>
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={(checked) => setValue("featured", checked)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
          {post ? "Update Post" : "Create Post"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/blog")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
