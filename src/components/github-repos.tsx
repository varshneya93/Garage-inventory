'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

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

export function GitHubRepos({ limit = 6 }: { limit?: number }) {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/integrations/github?action=repos&limit=${limit}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setRepos(data.data);
        } else {
          setError(data.error);
        }
      })
      .catch((err) => {
        console.error('Error fetching repos:', err);
        setError('Failed to load repositories');
      })
      .finally(() => setLoading(false));
  }, [limit]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: limit }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader>
              <div className="h-6 bg-muted rounded w-3/4" />
              <div className="h-4 bg-muted rounded w-full mt-2" />
            </CardHeader>
            <CardContent>
              <div className="h-4 bg-muted rounded w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (repos.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">No repositories found</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {repos.map((repo) => (
        <Card key={repo.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-start justify-between">
              <span className="text-lg">{repo.name}</span>
              <Button
                variant="ghost"
                size="icon"
                asChild
                className="h-8 w-8"
              >
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${repo.name} on GitHub`}
                >
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {repo.description || 'No description available'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <GitFork className="h-4 w-4" />
                <span>{repo.forks_count}</span>
              </div>
              {repo.language && (
                <Badge variant="secondary" className="text-xs">
                  {repo.language}
                </Badge>
              )}
            </div>
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {repo.topics.slice(0, 3).map((topic) => (
                  <Badge key={topic} variant="outline" className="text-xs">
                    {topic}
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
