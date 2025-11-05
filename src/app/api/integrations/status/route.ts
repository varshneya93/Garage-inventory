import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getIntegrationStatus, validateIntegrationConfig, testIntegrations } from '@/lib/integrations';

export async function GET(request: NextRequest) {
  try {
    // Check if user is authenticated and is admin
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'status';

    let data;
    switch (action) {
      case 'status':
        data = getIntegrationStatus();
        break;
      case 'validate':
        data = validateIntegrationConfig();
        break;
      case 'test':
        data = await testIntegrations();
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Integration status error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch integration status' },
      { status: 500 }
    );
  }
}
