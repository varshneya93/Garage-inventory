import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/auth-middleware';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, severity, details, ipAddress, userId, timestamp } = body;

    // Log to console for immediate visibility
    console.warn('Security event:', { type, severity, details, ipAddress, userId, timestamp });

    // Store in database for audit trail
    try {
      await db.analytics.create({
        data: {
          event: 'security_event',
          page: details?.path || null,
          data: {
            type,
            severity,
            details,
            timestamp,
          },
          userAgent: details?.userAgent || null,
          ipAddress: ipAddress || null,
          userId: userId || null,
        },
      });
    } catch (dbError) {
      console.error('Failed to store security event in database:', dbError);
      // Don't fail the request if database write fails
    }

    // For critical events, you might want to send alerts
    if (severity === 'critical') {
      // TODO: Send alert to admin (email, Slack, etc.)
      console.error('CRITICAL SECURITY EVENT:', { type, details });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log security event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log security event' },
      { status: 500 }
    );
  }
}

// Get security events (admin only)
export async function GET(request: NextRequest) {
  const { error } = await requireAuth();
  if (error) return error;

  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const severity = searchParams.get('severity');
    const type = searchParams.get('type');

    const where: any = {
      event: 'security_event',
    };

    // Filter by severity or type if provided
    if (severity || type) {
      where.data = {
        path: severity ? ['severity'] : ['type'],
        equals: severity || type,
      };
    }

    const events = await db.analytics.findMany({
      where,
      orderBy: {
        createdAt: 'desc',
      },
      take: limit,
      skip: offset,
    });

    const total = await db.analytics.count({ where });

    // Get summary statistics
    const stats = await db.analytics.groupBy({
      by: ['data'],
      where: {
        event: 'security_event',
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
        },
      },
      _count: true,
    });

    return NextResponse.json({
      success: true,
      data: {
        events,
        total,
        limit,
        offset,
        stats: {
          last24Hours: stats.length,
        },
      },
    });
  } catch (error) {
    console.error('Failed to fetch security events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch security events' },
      { status: 500 }
    );
  }
}
