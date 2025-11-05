'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Github, Linkedin, Twitter, Instagram } from 'lucide-react';

interface SocialLink {
  platform: string;
  username: string;
  url: string;
  followers?: number;
}

const platformIcons: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
};

export function SocialLinks({ showFollowers = false }: { showFollowers?: boolean }) {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/integrations/social?action=links')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setLinks(data.data);
        }
      })
      .catch((err) => console.error('Error fetching social links:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading || links.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2">
      {links.map((link) => {
        const Icon = platformIcons[link.platform];
        if (!Icon) return null;

        return (
          <Button
            key={link.platform}
            variant="ghost"
            size="icon"
            asChild
            className="hover:scale-110 transition-transform"
          >
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${link.platform} profile`}
            >
              <Icon className="h-5 w-5" />
            </a>
          </Button>
        );
      })}
    </div>
  );
}
