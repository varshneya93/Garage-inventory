import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { NextResponse } from "next/server";
import { Role } from "@prisma/client";

export async function requireAuth() {
  const session = await getServerSession(authOptions);
  
  if (!session || !session.user) {
    return {
      error: NextResponse.json(
        { success: false, error: { code: "UNAUTHORIZED", message: "Authentication required" } },
        { status: 401 }
      ),
      session: null,
    };
  }
  
  return { error: null, session };
}

export async function requireAdmin() {
  const { error, session } = await requireAuth();
  
  if (error) {
    return { error, session: null };
  }
  
  if (session!.user.role !== Role.ADMIN) {
    return {
      error: NextResponse.json(
        { success: false, error: { code: "FORBIDDEN", message: "Admin access required" } },
        { status: 403 }
      ),
      session: null,
    };
  }
  
  return { error: null, session };
}
