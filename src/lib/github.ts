import { useEffect, useState } from 'react';
import { githubSnapshot, type GitHubSnapshot, type Repo } from '../data/github';

const API = `https://api.github.com/users/${githubSnapshot.login}/repos?per_page=100&sort=pushed`;
const HIDE_LANGUAGES = new Set(['PLpgSQL']);

/** Hand-picked projects shown on the developer route, newest first. */
const FEATURED: { repo: string; title: string; blurb: string; homepage?: string }[] = [
  {
    repo: 'Pyan-Thone',
    title: 'Pyan Thone',
    blurb:
      'Trusted second-hand marketplace with condition evidence on every listing and verified seller trust — built for the Cursor AI Hackathon Myanmar.',
    homepage: 'https://pyan-thone-sigma.vercel.app',
  },
  {
    repo: 'SafeMind',
    title: 'SafeMind',
    blurb: 'A cybersecurity MVP focused on practical, everyday online safety for people who are not security experts.',
  },
  {
    repo: 'Augorithm',
    title: 'Augorithm',
    blurb: 'Visual pseudocode editor, flowchart generator, and algorithm runner that helps students see how code executes.',
  },
];

export type FeaturedRepo = {
  name: string;
  title: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  homepage: string;
};

/**
 * The committed snapshot in src/data/github.ts renders immediately; a live call
 * to the public GitHub API then refreshes the counts on mount. The API allows 60
 * unauthenticated requests per hour per IP — plenty for a portfolio — and any
 * failure just keeps the snapshot. The featured list is curated (FEATURED above);
 * GitHub only supplies its live stars / language / links.
 */
export function useGitHub() {
  const [data, setData] = useState<GitHubSnapshot>(githubSnapshot);
  const [live, setLive] = useState(false);

  useEffect(() => {
    let active = true;
    fetch(API, { headers: { Accept: 'application/vnd.github+json' } })
      .then(res => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((raw: unknown) => {
        if (!active || !Array.isArray(raw)) return;
        const own = raw.filter(r => r && !r.fork);
        const repos: Repo[] = own
          .map(r => ({
            name: r.name,
            description: (r.description ?? '').trim(),
            language: r.language ?? '',
            stars: r.stargazers_count ?? 0,
            url: r.html_url,
            homepage: (r.homepage ?? '').trim(),
            pushedAt: r.pushed_at ?? '',
          }))
          .sort((a, b) => b.stars - a.stars || b.pushedAt.localeCompare(a.pushedAt));
        const languages = [...new Set(repos.map(r => r.language).filter(l => l && !HIDE_LANGUAGES.has(l)))].sort();
        setData({
          ...githubSnapshot,
          publicRepos: own.length,
          languages,
          deployedCount: repos.filter(r => r.homepage).length,
          fetchedAt: new Date().toISOString(),
          repos,
        });
        setLive(true);
      })
      .catch(() => {
        /* keep the committed snapshot */
      });
    return () => {
      active = false;
    };
  }, []);

  const featured: FeaturedRepo[] = FEATURED.map(f => {
    const r = data.repos.find(x => x.name.toLowerCase() === f.repo.toLowerCase());
    return {
      name: f.repo,
      title: f.title,
      description: f.blurb,
      language: r?.language ?? '',
      stars: r?.stars ?? 0,
      url: r?.url ?? `${data.profileUrl}/${f.repo}`,
      homepage: f.homepage ?? r?.homepage ?? '',
    };
  });

  return { ...data, featured, live };
}
