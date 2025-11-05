import { NextRequest, NextResponse } from 'next/server';
import { createSocialMediaIntegration } from '@/lib/integrations/social-media';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action') || 'links';

    const social = createSocialMediaIntegration();

    let data;
    switch (action) {
      case 'links':
        data = social.getSocialLinks();
        break;
      case 'twitter':
        const twitterUsername = searchParams.get('username');
        if (!twitterUsername) {
          return NextResponse.json(
            { success: false, error: 'Username required' },
            { status: 400 }
          );
        }
        data = await social.getTwitterProfile(twitterUsername);
        break;
      case 'linkedin':
        const linkedinProfile = searchParams.get('profile');
        if (!linkedinProfile) {
          return NextResponse.json(
            { success: false, error: 'Profile ID required' },
            { status: 400 }
          );
        }
        data = await social.getLinkedInProfile(linkedinProfile);
        break;
      default:
        return NextResponse.json(
          { success: false, error: 'Invalid action' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Social media integration error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch social media data' },
      { status: 500 }
    );
  }
}
