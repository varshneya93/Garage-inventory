import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const event = searchParams.get('event');

    // Build date filter
    const dateFilter: any = {};
    if (startDate) {
      dateFilter.gte = new Date(startDate);
    }
    if (endDate) {
      dateFilter.lte = new Date(endDate);
    }

    // Build where clause
    const where: any = {};
    if (Object.keys(dateFilter).length > 0) {
      where.createdAt = dateFilter;
    }
    if (event) {
      where.event = event;
    }

    // Get analytics data
    const [
      totalEvents,
      eventsByType,
      pageViews,
      recentEvents,
    ] = await Promise.all([
      // Total events count
      prisma.analytics.count({ where }),
      
      // Events grouped by type
      prisma.analytics.groupBy({
        by: ['event'],
        where,
        _count: {
          event: true,
        },
        orderBy: {
          _count: {
            event: 'desc',
          },
        },
      }),
      
      // Page views grouped by page
      prisma.analytics.groupBy({
        by: ['page'],
        where: {
          ...where,
          event: 'page_view',
          page: { not: null },
        },
        _count: {
          page: true,
        },
        orderBy: {
          _count: {
            page: 'desc',
          },
        },
        take: 10,
      }),
      
      // Recent events
      prisma.analytics.findMany({
        where,
        orderBy: {
          createdAt: 'desc',
        },
        take: 50,
        select: {
          id: true,
          event: true,
          page: true,
          data: true,
          createdAt: true,
        },
      }),
    ]);

    // Parse data field for recent events
    const parsedRecentEvents = recentEvents.map(event => ({
      ...event,
      data: event.data ? JSON.parse(event.data) : null,
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalEvents,
        eventsByType: eventsByType.map(item => ({
          event: item.event,
          count: item._count.event,
        })),
        topPages: pageViews.map(item => ({
          page: item.page,
          views: item._count.page,
        })),
        recentEvents: parsedRecentEvents,
      },
    });
  } catch (error) {
    console.error('Analytics stats error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics stats' },
      { status: 500 }
    );
  }
}
