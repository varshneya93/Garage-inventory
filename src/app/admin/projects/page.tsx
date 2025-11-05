import { db } from "@/lib/db";
import { ProjectList } from "@/components/admin/projects/project-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default async function ProjectsPage() {
  const projects = await db.project.findMany({
    include: {
      images: {
        orderBy: { sortOrder: "asc" },
        take: 1,
      },
      tags: true,
      categories: true,
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: [
      { sortOrder: "asc" },
      { createdAt: "desc" },
    ],
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="size-4 mr-2" />
            New Project
          </Link>
        </Button>
      </div>

      <ProjectList projects={projects} />
    </div>
  );
}
