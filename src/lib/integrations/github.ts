interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics: string[];
}

interface GitHubContribution {
  date: string;
  count: number;
}

export class GitHubIntegration {
  private token?: string;
  private username: string;

  constructor(username: string, token?: string) {
    this.username = username;
    this.token = token;
  }

  private async fetchGitHub(endpoint: string) {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github.v3+json',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const response = await fetch(`https://api.github.com${endpoint}`, {
      headers,
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getRepositories(limit = 6): Promise<GitHubRepo[]> {
    try {
      const repos = await this.fetchGitHub(
        `/users/${this.username}/repos?sort=updated&per_page=${limit}`
      );
      return repos;
    } catch (error) {
      console.error('Error fetching GitHub repositories:', error);
      return [];
    }
  }

  async getRepository(repoName: string): Promise<GitHubRepo | null> {
    try {
      const repo = await this.fetchGitHub(`/repos/${this.username}/${repoName}`);
      return repo;
    } catch (error) {
      console.error('Error fetching GitHub repository:', error);
      return null;
    }
  }

  async getUserProfile() {
    try {
      const profile = await this.fetchGitHub(`/users/${this.username}`);
      return profile;
    } catch (error) {
      console.error('Error fetching GitHub profile:', error);
      return null;
    }
  }

  async getContributionActivity(): Promise<GitHubContribution[]> {
    try {
      // Note: GitHub's contribution graph requires scraping or GraphQL API
      // This is a simplified version using events
      const events = await this.fetchGitHub(
        `/users/${this.username}/events/public?per_page=100`
      );

      const contributions: Record<string, number> = {};
      events.forEach((event: any) => {
        const date = event.created_at.split('T')[0];
        contributions[date] = (contributions[date] || 0) + 1;
      });

      return Object.entries(contributions).map(([date, count]) => ({
        date,
        count,
      }));
    } catch (error) {
      console.error('Error fetching GitHub contributions:', error);
      return [];
    }
  }
}

export function createGitHubIntegration() {
  const username = process.env.GITHUB_USERNAME;
  const token = process.env.GITHUB_TOKEN;

  if (!username) {
    console.warn('GITHUB_USERNAME not configured');
    return null;
  }

  return new GitHubIntegration(username, token);
}
