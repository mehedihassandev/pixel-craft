'use client';

import { useState, useEffect } from 'react';

export interface GitHubContributor {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  contributions: number;
  name?: string;
  bio?: string;
  location?: string;
  company?: string;
  blog?: string;
  twitter_username?: string;
  public_repos?: number;
  followers?: number;
}

export interface ContributorWithDetails extends GitHubContributor {
  name: string;
  bio: string;
  location?: string;
  company?: string;
  blog?: string;
  twitter_username?: string;
}

export function useGitHubContributors() {
  const [contributors, setContributors] = useState<ContributorWithDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributors() {
      try {
        setLoading(true);
        setError(null);

        // Fetch contributors list
        const contributorsResponse = await fetch(
          'https://api.github.com/repos/mehedihassandev/pixel-craft/contributors?per_page=10',
          {
            headers: {
              Accept: 'application/vnd.github.v3+json',
            },
          }
        );

        if (!contributorsResponse.ok) {
          throw new Error('Failed to fetch contributors');
        }

        const contributorsData: GitHubContributor[] = await contributorsResponse.json();

        // Fetch detailed information for each contributor
        const contributorsWithDetails = await Promise.all(
          contributorsData.map(async contributor => {
            try {
              const userResponse = await fetch(
                `https://api.github.com/users/${contributor.login}`,
                {
                  headers: {
                    Accept: 'application/vnd.github.v3+json',
                  },
                }
              );

              if (userResponse.ok) {
                const userData = await userResponse.json();
                return {
                  ...contributor,
                  name: userData.name || contributor.login,
                  bio: userData.bio || 'Contributor to PixelCraft',
                  location: userData.location,
                  company: userData.company,
                  blog: userData.blog,
                  twitter_username: userData.twitter_username,
                  public_repos: userData.public_repos,
                  followers: userData.followers,
                };
              } else {
                // Fallback if user details fetch fails
                return {
                  ...contributor,
                  name: contributor.login,
                  bio: 'Contributor to PixelCraft',
                };
              }
            } catch (error) {
              console.error(`Failed to fetch details for ${contributor.login}:`, error);
              return {
                ...contributor,
                name: contributor.login,
                bio: 'Contributor to PixelCraft',
              };
            }
          })
        );

        setContributors(contributorsWithDetails);
      } catch (error) {
        console.error('Error fetching contributors:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch contributors');

        // Fallback data in case of error
        setContributors([
          {
            login: 'mehedihassandev',
            id: 1,
            avatar_url: '/assets/me.jpg',
            html_url: 'https://github.com/mehedihassandev',
            contributions: 100,
            name: 'Md. Mehedi Hassan',
            bio: 'Full-stack developer passionate about creating tools that solve real problems.',
          },
        ]);
      } finally {
        setLoading(false);
      }
    }

    fetchContributors();
  }, []);

  return { contributors, loading, error };
}

export function formatContributions(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}
