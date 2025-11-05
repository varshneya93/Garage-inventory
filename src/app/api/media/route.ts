import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { readdir, stat, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";

export async function GET(request: NextRequest) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const uploadsDir = join(process.cwd(), "public", "uploads");
    
    if (!existsSync(uploadsDir)) {
      return NextResponse.json({
        success: true,
        files: [],
      });
    }

    const fileNames = await readdir(uploadsDir);
    const files = await Promise.all(
      fileNames.map(async (name) => {
        const filePath = join(uploadsDir, name);
        const stats = await stat(filePath);
        
        return {
          name,
          url: `/uploads/${name}`,
          size: stats.size,
          type: getFileType(name),
          uploadedAt: stats.birthtime.toISOString(),
        };
      })
    );

    // Sort by upload date, newest first
    files.sort((a, b) => 
      new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
    );

    return NextResponse.json({
      success: true,
      files,
    });
  } catch (error) {
    console.error("Media list error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "LIST_FAILED",
          message: "Failed to list media files",
        },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const url = request.nextUrl.searchParams.get("url");
    if (!url) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NO_URL", message: "File URL is required" },
        },
        { status: 400 }
      );
    }

    // Extract filename from URL
    const filename = url.split("/").pop();
    if (!filename) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "INVALID_URL", message: "Invalid file URL" },
        },
        { status: 400 }
      );
    }

    const filePath = join(process.cwd(), "public", "uploads", filename);
    
    if (!existsSync(filePath)) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NOT_FOUND", message: "File not found" },
        },
        { status: 404 }
      );
    }

    await unlink(filePath);

    return NextResponse.json({
      success: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error("Media delete error:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DELETE_FAILED",
          message: "Failed to delete file",
        },
      },
      { status: 500 }
    );
  }
}

function getFileType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();
  const imageTypes: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
  };
  return imageTypes[ext || ""] || "application/octet-stream";
}
