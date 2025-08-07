import { useState, useEffect } from 'react';

export interface GitHubStats {
  stars: number;
  forks: number;
  issues: number;
  watchers: number;
  language: string;
  license: string;
  size: number;
  lastUpdated: string;
  contributors: number;
  totalContributions: number;
  latestRelease: string;
  releaseDate: string;
  description: string;
  homepage: string;
  topics: string[];
}

export const useGitHubStats = () => {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/github-stats');

        if (!response.ok) {
          throw new Error('Failed to fetch GitHub stats');
        }

        const data = await response.json();
        setStats(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        // Set fallback data on error
        setStats({
          stars: 1,
          forks: 0,
          issues: 0,
          watchers: 1,
          language: 'TypeScript',
          license: 'MIT License',
          size: 2048,
          lastUpdated: new Date().toISOString(),
          contributors: 2,
          totalContributions: 47,
          latestRelease: 'v1.0.0',
          releaseDate: new Date().toISOString(),
          description: 'Open-source image processing application powered by AI',
          homepage: 'https://pixel-craft-sigma.vercel.app',
          topics: ['nextjs', 'typescript', 'ai', 'image-processing', 'open-source'],
        });
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return { stats, loading, error };
};

// Utility function to format numbers
export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// Utility function to format dates
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// Utility function to calculate time ago
export const timeAgo = (dateString: string): string => {
  const now = new Date();
  const date = new Date(dateString);
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return 'Today';
  if (diffInDays === 1) return 'Yesterday';
  if (diffInDays < 7) return `${diffInDays} days ago`;
  if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
  if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
  return `${Math.floor(diffInDays / 365)} years ago`;
};
