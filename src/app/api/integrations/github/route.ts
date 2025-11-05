import { NextRequest, NextResponse } from 'next/server';
import { createGitHubIntegration } from '@/lib/integrations/github';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'repos';
    const limit = parseInt(searchParams.get('limit') || '6');

    const github = createGitHubIntegration();
    if (!github) {
      return NextResponse.json(
        { success: false, error: 'GitHub integration not configured' },
        { status: 503 }
      );
    }

    let data;
    switch (action) {
      case 'repos':
        data = await github.getRepositories(limit);
        break;
      case 'profile':
        data = await github.getUserProfile();
        break;
      case 'contributions':
        data = await github.getContributionActivity();
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('GitHub integration error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
}
