import { useEffect, useState } from 'react';
import { githubSnapshot, type GitHubSnapshot, type Repo } from '../data/github';

const API = `https://api.github.com/users/${githubSnapshot.login}/repos?per_page=100&sort=pushed`;
// Repos that shouldn't show up as "featured work" (this site, the profile readme).
const HIDE_FEATURED = new Set(['kaungkhantkoportfolio', 'kaungkhantko26', 'portfolio-kxant']);
const HIDE_LANGUAGES = new Set(['PLpgSQL']);

/**
 * The committed snapshot in src/data/github.ts renders immediately; a live call
 * to the public GitHub API then refreshes counts and the project list on mount.
 * The API allows 60 unauthenticated requests per hour per IP — plenty for a
 * portfolio — and any failure just keeps the snapshot.
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

  const featured = data.repos.filter(r => !HIDE_FEATURED.has(r.name) && (r.description || r.homepage)).slice(0, 6);
  return { ...data, featured, live };
}
