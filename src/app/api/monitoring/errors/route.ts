import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth-middleware';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, stack, name, level, context, timestamp, environment } = body;

    // Log to console for immediate visibility
    if (level === 'error' || stack) {
      console.error('Error logged:', { message, stack, context, timestamp });
    } else {
      console.log('Message logged:', { message, level, context, timestamp });
    }

    // Store in database for audit trail using Analytics table
    try {
      await db.analytics.create({
        data: {
          event: 'error_logged',
          page: context?.url || null,
          data: {
            message,
            stack,
            name,
            level: level || 'error',
            context,
            environment: environment || 'unknown',
            timestamp,
          },
          userAgent: context?.userAgent || null,
          ipAddress: request.headers.get('x-forwarded-for')?.split(',')[0] || 
                     request.headers.get('x-real-ip') || null,
          userId: context?.userId || null,
        },
      });
    } catch (dbError) {
      console.error('Failed to store error in database:', dbError);
      // Don't fail the request if database write fails
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log error' },
      { status: 500 }
    );
  }
}

// Get error logs (admin only)
export async function GET(request: NextRequest) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const severity = searchParams.get('severity');

    const where: any = {
      event: 'error_logged',
    };

    if (severity) {
      where.data = {
        path: ['level'],
        equals: severity,
      };
    }

    const errors = await db.analytics.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    const total = await db.analytics.count({ where });

    return NextResponse.json({
      success: true,
      data: {
        errors,
        total,
        limit,
        offset,
      },
    });
  } catch (error) {
    console.error('Failed to fetch errors:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch errors' },
      { status: 500 }
    );
  }
}
