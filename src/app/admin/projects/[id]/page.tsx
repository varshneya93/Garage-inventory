import { db } from "@/lib/db";
import { ProjectForm } from "@/components/admin/projects/project-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  const project = await db.project.findUnique({
    where: { id },
    include: {
      images: {
        orderBy: { sortOrder: "asc" },
      },
      tags: true,
      categories: true,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin/projects">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Project</h1>
          <p className="text-muted-foreground">
            Update project details and content
          </p>
        </div>
      </div>

      <ProjectForm project={project} />
    </div>
  );
}
