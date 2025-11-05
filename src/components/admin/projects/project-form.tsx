"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Project, ProjectImage, ProjectTag, ProjectCategory, Status } from "@prisma/client";
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
import { X, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/projects/image-upload";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase with hyphens"),
  description: z.string().optional(),
  content: z.string().optional(),
  status: z.enum(["DRAFT", "PUBLISHED", "ARCHIVED"]),
  featured: z.boolean(),
  sortOrder: z.number().int().min(0),
});

type ProjectFormData = z.infer<typeof projectSchema>;

type ProjectWithRelations = Project & {
  images: ProjectImage[];
  tags: ProjectTag[];
  categories: ProjectCategory[];
};

interface ProjectFormProps {
  project?: ProjectWithRelations;
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tags, setTags] = useState<string[]>(project?.tags.map(t => t.name) || []);
  const [tagInput, setTagInput] = useState("");
  const [categories, setCategories] = useState<string[]>(project?.categories.map(c => c.name) || []);
  const [categoryInput, setCategoryInput] = useState("");
  const [images, setImages] = useState<ProjectImage[]>(project?.images || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title || "",
      slug: project?.slug || "",
      description: project?.description || "",
      content: project?.content || "",
      status: project?.status || "DRAFT",
      featured: project?.featured || false,
      sortOrder: project?.sortOrder || 0,
    },
  });

  const status = watch("status");
  const featured = watch("featured");

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    if (!project) {
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

  const onSubmit = async (data: ProjectFormData) => {
    setIsSubmitting(true);
    try {
      const payload = {
        ...data,
        tags,
        categories,
        images: images.map((img, index) => ({
          url: img.url,
          alt: img.alt,
          sortOrder: index,
        })),
      };

      const url = project ? `/api/projects/${project.id}` : "/api/projects";
      const method = project ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || "Failed to save project");
      }

      toast.success(project ? "Project updated successfully" : "Project created successfully");
      router.push("/admin/projects");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to save project");
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
            Enter the basic details for your project
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
              placeholder="My Awesome Project"
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
              placeholder="my-awesome-project"
              disabled={!!project}
            />
            {errors.slug && (
              <p className="text-sm text-destructive">{errors.slug.message}</p>
            )}
            <p className="text-xs text-muted-foreground">
              URL-friendly identifier (cannot be changed after creation)
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="A brief description of your project"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              {...register("content")}
              placeholder="Detailed project content (supports Markdown)"
              rows={10}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
          <CardDescription>
            Upload and manage project images
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ImageUpload images={images} onChange={setImages} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories & Tags</CardTitle>
          <CardDescription>
            Organize your project with categories and tags
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
                  {tag}
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
            Control the visibility and status of your project
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
              <Label htmlFor="featured">Featured Project</Label>
              <p className="text-sm text-muted-foreground">
                Display this project prominently on your portfolio
              </p>
            </div>
            <Switch
              id="featured"
              checked={featured}
              onCheckedChange={(checked) => setValue("featured", checked)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sortOrder">Sort Order</Label>
            <Input
              id="sortOrder"
              type="number"
              {...register("sortOrder", { valueAsNumber: true })}
              placeholder="0"
            />
            <p className="text-xs text-muted-foreground">
              Lower numbers appear first
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="size-4 mr-2 animate-spin" />}
          {project ? "Update Project" : "Create Project"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/projects")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
