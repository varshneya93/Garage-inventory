interface SocialMediaPost {
  id: string;
  platform: 'twitter' | 'linkedin' | 'instagram';
  content: string;
  url: string;
  createdAt: string;
  likes?: number;
  shares?: number;
  comments?: number;
}

interface SocialMediaProfile {
  platform: string;
  username: string;
  url: string;
  followers?: number;
  following?: number;
}

export class SocialMediaIntegration {
  private platforms: Map<string, any>;

  constructor() {
    this.platforms = new Map();
  }

  configurePlatform(platform: string, config: any) {
    this.platforms.set(platform, config);
  }

  async getTwitterProfile(username: string): Promise<SocialMediaProfile | null> {
    try {
      const bearerToken = process.env.TWITTER_BEARER_TOKEN;
      if (!bearerToken) {
        console.warn('Twitter API not configured');
        return null;
      }

      const response = await fetch(
        `https://api.twitter.com/2/users/by/username/${username}?user.fields=public_metrics`,
        {
          headers: {
            Authorization: `Bearer ${bearerToken}`,
          },
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error('Twitter API error');
      }

      const data = await response.json();
      return {
        platform: 'twitter',
        username,
        url: `https://twitter.com/${username}`,
        followers: data.data?.public_metrics?.followers_count,
        following: data.data?.public_metrics?.following_count,
      };
    } catch (error) {
      console.error('Error fetching Twitter profile:', error);
      return null;
    }
  }

  async getLinkedInProfile(profileId: string): Promise<SocialMediaProfile | null> {
    try {
      const accessToken = process.env.LINKEDIN_ACCESS_TOKEN;
      if (!accessToken) {
        console.warn('LinkedIn API not configured');
        return null;
      }

      // LinkedIn API requires OAuth 2.0
      // This is a simplified example
      return {
        platform: 'linkedin',
        username: profileId,
        url: `https://linkedin.com/in/${profileId}`,
      };
    } catch (error) {
      console.error('Error fetching LinkedIn profile:', error);
      return null;
    }
  }

  async getRecentPosts(platform: string, limit = 5): Promise<SocialMediaPost[]> {
    // This would integrate with specific platform APIs
    // For now, returning empty array as placeholder
    console.warn(`Social media posts for ${platform} not yet implemented`);
    return [];
  }

  getSocialLinks(): SocialMediaProfile[] {
    const links: SocialMediaProfile[] = [];

    if (process.env.TWITTER_USERNAME) {
      links.push({
        platform: 'twitter',
        username: process.env.TWITTER_USERNAME,
        url: `https://twitter.com/${process.env.TWITTER_USERNAME}`,
      });
    }

    if (process.env.LINKEDIN_PROFILE) {
      links.push({
        platform: 'linkedin',
        username: process.env.LINKEDIN_PROFILE,
        url: `https://linkedin.com/in/${process.env.LINKEDIN_PROFILE}`,
      });
    }

    if (process.env.INSTAGRAM_USERNAME) {
      links.push({
        platform: 'instagram',
        username: process.env.INSTAGRAM_USERNAME,
        url: `https://instagram.com/${process.env.INSTAGRAM_USERNAME}`,
      });
    }

    if (process.env.GITHUB_USERNAME) {
      links.push({
        platform: 'github',
        username: process.env.GITHUB_USERNAME,
        url: `https://github.com/${process.env.GITHUB_USERNAME}`,
      });
    }

    return links;
  }
}

export function createSocialMediaIntegration() {
  return new SocialMediaIntegration();
}
