import { db } from "@/lib/db";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FolderKanban, FileText, MessageSquare, Eye } from "lucide-react";

export default async function AdminDashboard() {
  // Fetch counts for dashboard stats
  const [projectCount, blogCount, inquiryCount] = await Promise.all([
    db.project.count(),
    db.blogPost.count(),
    db.contactInquiry.count({ where: { status: "NEW" } }),
  ]);

  const stats = [
    {
      title: "Total Projects",
      value: projectCount,
      description: "Published and draft projects",
      icon: FolderKanban,
    },
    {
      title: "Blog Posts",
      value: blogCount,
      description: "Published and draft posts",
      icon: FileText,
    },
    {
      title: "New Inquiries",
      value: inquiryCount,
      description: "Unread contact messages",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your portfolio admin panel
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="size-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/projects"
              className="block p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="font-medium">Create New Project</div>
              <div className="text-sm text-muted-foreground">
                Add a new project to your portfolio
              </div>
            </a>
            <a
              href="/admin/blog"
              className="block p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="font-medium">Write Blog Post</div>
              <div className="text-sm text-muted-foreground">
                Create a new blog article
              </div>
            </a>
            <a
              href="/admin/contact"
              className="block p-3 rounded-lg border hover:bg-accent transition-colors"
            >
              <div className="font-medium">View Inquiries</div>
              <div className="text-sm text-muted-foreground">
                Manage contact form submissions
              </div>
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates to your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Activity tracking will be implemented with the analytics system
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
