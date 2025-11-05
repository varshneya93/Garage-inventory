import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, value, timestamp, metadata } = body;

    // Log performance metric
    console.log('Performance metric:', {
      name,
      value,
      timestamp,
      metadata,
    });

    // In production, you might want to:
    // 1. Store in a time-series database
    // 2. Send to monitoring service (DataDog, New Relic, etc.)
    // 3. Trigger alerts for performance degradation

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to log performance metric:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to log metric' },
      { status: 500 }
    );
  }
}
