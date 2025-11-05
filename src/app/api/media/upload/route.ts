import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-middleware";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import { validateFileUpload, scanFileForMalware, sanitizePath } from "@/lib/security";
import { monitoring } from "@/lib/monitoring";
import { uploadRateLimiter } from "@/lib/rate-limit";

const MAX_FILES_PER_REQUEST = 10;
const MAX_TOTAL_SIZE = 50 * 1024 * 1024; // 50MB total

export async function POST(request: NextRequest) {
  const { error } = await requireAuth();
  if (error) return error;

  // Apply rate limiting
  const rateLimitResult = uploadRateLimiter.check(request);
  if (!rateLimitResult.success) {
    monitoring.trackSecurityEvent({
      type: 'rate_limit',
      severity: 'medium',
      details: {
        endpoint: '/api/media/upload',
        limit: rateLimitResult.limit,
      },
      ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "RATE_LIMIT_EXCEEDED",
          message: "Too many upload requests. Please try again later.",
        },
      },
      { status: 429 }
    );
  }

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (files.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: { code: "NO_FILES", message: "No files provided" },
        },
        { status: 400 }
      );
    }

    // Check file count limit
    if (files.length > MAX_FILES_PER_REQUEST) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "TOO_MANY_FILES",
            message: `Maximum ${MAX_FILES_PER_REQUEST} files allowed per request`,
          },
        },
        { status: 400 }
      );
    }

    // Check total size
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_TOTAL_SIZE) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "TOTAL_SIZE_EXCEEDED",
            message: `Total file size exceeds ${MAX_TOTAL_SIZE / 1024 / 1024}MB limit`,
          },
        },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    }

    const uploadedFiles = [];
    const errors = [];

    for (const file of files) {
      try {
        // Validate file
        const validation = validateFileUpload(file);
        if (!validation.valid) {
          errors.push({
            filename: file.name,
            error: validation.error,
          });
          continue;
        }

        // Scan for malware
        const scanResult = await scanFileForMalware(file);
        if (!scanResult.safe) {
          monitoring.trackSecurityEvent({
            type: 'file_upload_blocked',
            severity: 'high',
            details: {
              filename: file.name,
              reason: scanResult.reason,
              fileType: file.type,
              fileSize: file.size,
            },
            ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || undefined,
          });

          errors.push({
            filename: file.name,
            error: scanResult.reason || 'File failed security scan',
          });
          continue;
        }

        // Sanitize filename
        const sanitizedName = sanitizePath(file.name);
        const timestamp = Date.now();
        const randomString = Math.random().toString(36).substring(2, 8);
        const extension = sanitizedName.split(".").pop()?.toLowerCase() || 'bin';
        const filename = `${timestamp}-${randomString}.${extension}`;

        // Save file
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filepath = join(uploadsDir, filename);
        await writeFile(filepath, buffer);

        uploadedFiles.push({
          name: file.name,
          url: `/uploads/${filename}`,
          size: file.size,
          type: file.type,
        });

        // Track successful upload
        monitoring.trackEvent('file_uploaded', {
          filename: file.name,
          size: file.size,
          type: file.type,
        });
      } catch (fileError) {
        console.error(`Error processing file ${file.name}:`, fileError);
        errors.push({
          filename: file.name,
          error: 'Failed to process file',
        });
      }
    }

    return NextResponse.json({
      success: true,
      files: uploadedFiles,
      errors: errors.length > 0 ? errors : undefined,
    });
  } catch (error) {
    console.error("Upload error:", error);
    monitoring.captureException(error as Error, {
      url: request.url,
      additionalData: { endpoint: '/api/media/upload' },
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          code: "UPLOAD_FAILED",
          message: "Failed to upload files",
        },
      },
      { status: 500 }
    );
  }
}
