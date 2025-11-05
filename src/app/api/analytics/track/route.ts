import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { event, page, data } = body;

    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event type is required' },
        { status: 400 }
      );
    }

    // Get user agent and IP address
    const userAgent = request.headers.get('user-agent') || undefined;
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      undefined;

    // Store analytics event
    await prisma.analytics.create({
      data: {
        event,
        page,
        data: data ? JSON.stringify(data) : undefined,
        userAgent,
        ipAddress,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Analytics tracking error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to track event' },
      { status: 500 }
    );
  }
}
