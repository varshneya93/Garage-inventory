"use client";

import { useState } from "react";
import { Project, ProjectImage, ProjectTag, ProjectCategory, User } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Eye, EyeOff } from "lucide-react";
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

type ProjectWithRelations = Project & {
  images: ProjectImage[];
  tags: ProjectTag[];
  categories: ProjectCategory[];
  user: Pick<User, "name" | "email">;
};

export function ProjectList({ projects }: { projects: ProjectWithRelations[] }) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/projects/${deleteId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete project");
      }

      toast.success("Project deleted successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete project");
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

  if (projects.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <p className="text-muted-foreground mb-4">No projects yet</p>
          <Button asChild>
            <Link href="/admin/projects/new">Create your first project</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            {project.images[0] && (
              <div className="aspect-video w-full overflow-hidden bg-muted">
                <img
                  src={project.images[0].url}
                  alt={project.images[0].alt || project.title}
                  className="size-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <CardTitle className="truncate">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {project.description || "No description"}
                  </CardDescription>
                </div>
                {project.featured && (
                  <Badge variant="secondary" className="shrink-0">
                    Featured
                  </Badge>
                )}
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Badge className={getStatusColor(project.status)}>
                  {project.status === "PUBLISHED" && <Eye className="size-3 mr-1" />}
                  {project.status === "DRAFT" && <EyeOff className="size-3 mr-1" />}
                  {project.status}
                </Badge>
                {project.categories.map((category) => (
                  <Badge key={category.id} variant="outline">
                    {category.name}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2">
                <Button asChild variant="outline" size="sm" className="flex-1">
                  <Link href={`/admin/projects/${project.id}`}>
                    <Edit className="size-4 mr-2" />
                    Edit
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDeleteId(project.id)}
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              and all associated images and data.
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
