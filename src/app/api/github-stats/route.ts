import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch GitHub repository data
    const repoResponse = await fetch('https://api.github.com/repos/mehedihassandev/pixel-craft', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'PixelCraft-App',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!repoResponse.ok) {
      throw new Error('Failed to fetch GitHub data');
    }

    const repoData = await repoResponse.json();

    // Fetch GitHub contributors
    const contributorsResponse = await fetch(
      'https://api.github.com/repos/mehedihassandev/pixel-craft/contributors',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'PixelCraft-App',
        },
        next: { revalidate: 300 },
      }
    );

    let contributors = [];
    if (contributorsResponse.ok) {
      contributors = await contributorsResponse.json();
    }

    // Fetch latest releases
    const releasesResponse = await fetch(
      'https://api.github.com/repos/mehedihassandev/pixel-craft/releases',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          'User-Agent': 'PixelCraft-App',
        },
        next: { revalidate: 300 },
      }
    );

    let releases = [];
    if (releasesResponse.ok) {
      releases = await releasesResponse.json();
    }

    const githubStats = {
      stars: repoData.stargazers_count || 0,
      forks: repoData.forks_count || 0,
      issues: repoData.open_issues_count || 0,
      watchers: repoData.watchers_count || 0,
      language: repoData.language || 'TypeScript',
      license: repoData.license?.name || 'MIT License',
      size: repoData.size || 0,
      lastUpdated: repoData.updated_at,
      contributors: contributors.length || 1,
      totalContributions:
        contributors.reduce(
          (sum: number, contributor: any) => sum + contributor.contributions,
          0
        ) || 0,
      latestRelease: releases[0]?.tag_name || 'v1.0.0',
      releaseDate: releases[0]?.published_at || new Date().toISOString(),
      description: repoData.description || '',
      homepage: repoData.homepage || '',
      topics: repoData.topics || [],
    };

    return NextResponse.json(githubStats);
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);

    // Return fallback data if API fails
    return NextResponse.json({
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
  }
}
