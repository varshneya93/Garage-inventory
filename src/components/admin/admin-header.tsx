"use client";

import { usePathname } from "next/navigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { LogOut, ExternalLink } from "lucide-react";
import Link from "next/link";

const routeLabels: Record<string, string> = {
  admin: "Dashboard",
  projects: "Projects",
  blog: "Blog Posts",
  media: "Media",
  contact: "Contact Inquiries",
  analytics: "Analytics",
  settings: "Settings",
  theme: "Theme",
  profile: "Profile",
};

export function AdminHeader() {
  const pathname = usePathname();
  
  // Generate breadcrumbs from pathname
  const pathSegments = pathname.split("/").filter(Boolean);
  const breadcrumbs = pathSegments.map((segment, index) => ({
    label: routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
    href: "/" + pathSegments.slice(0, index + 1).join("/"),
    isLast: index === pathSegments.length - 1,
  }));

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
      <SidebarTrigger className="-ml-1" />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.href} className="flex items-center gap-2">
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {crumb.isLast ? (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={crumb.href}>{crumb.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/" target="_blank">
            <ExternalLink className="size-4 mr-2" />
            View Site
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut className="size-4 mr-2" />
          Sign Out
        </Button>
      </div>
    </header>
  );
}
