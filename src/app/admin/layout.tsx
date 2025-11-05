import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Role } from "@prisma/client";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AdminHeader } from "@/components/admin/admin-header";
import { SessionProvider } from "@/components/admin/session-provider";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Redirect to sign in if not authenticated
  if (!session || !session.user) {
    redirect("/auth/signin?callbackUrl=/admin");
  }

  // Redirect to home if not admin
  if (session.user.role !== Role.ADMIN) {
    redirect("/");
  }

  return (
    <SessionProvider>
      <SidebarProvider defaultOpen={true}>
        <AdminSidebar />
        <SidebarInset>
          <AdminHeader />
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
