/**
 * GitHub profile snapshot for the Developer route — committed fallback.
 * Refreshed live in the browser by src/lib/github.ts; regenerate with
 * scripts/sync-github.mjs (or just let the live fetch update it on load).
 */
export type Repo = {
  name: string;
  description: string;
  language: string;
  stars: number;
  url: string;
  homepage: string;
  pushedAt: string;
};

export type GitHubSnapshot = {
  login: string;
  profileUrl: string;
  publicRepos: number;
  languages: string[];
  deployedCount: number;
  fetchedAt: string;
  repos: Repo[];
};

export const githubSnapshot: GitHubSnapshot = {
  "login": "kaungkhantko26",
  "profileUrl": "https://github.com/kaungkhantko26",
  "publicRepos": 32,
  "languages": [
    "CSS",
    "HTML",
    "JavaScript",
    "Python",
    "TypeScript"
  ],
  "deployedCount": 18,
  "fetchedAt": "2026-09-01T03:27:39Z",
  "repos": [
    {
      "name": "kaungkhantkoportfolio",
      "description": "Kaung Khant Ko — Personal Portfolio Website Welcome! This repository contains the source files for my personal portfolio website — a resume and showcase site highlighting my skills, experience, and contact information.",
      "language": "TypeScript",
      "stars": 2,
      "url": "https://github.com/kaungkhantko26/kaungkhantkoportfolio",
      "homepage": "https://kaungkhantko.top/",
      "pushedAt": "2026-08-31T15:11:14Z"
    },
    {
      "name": "Ktool",
      "description": "Ktool is a lightweight, Python-based ethical cybersecurity toolkit designed for learning, testing, and demonstrating fundamental security concepts in a controlled environment. The tool provides a collection of essential reconnaissance and analysis features to help developers and students understand how systems can be assessed and secured.",
      "language": "Python",
      "stars": 2,
      "url": "https://github.com/kaungkhantko26/Ktool",
      "homepage": "",
      "pushedAt": "2026-08-31T04:27:24Z"
    },
    {
      "name": "climate-risk-prototype",
      "description": "Climate Risk PrototypeA prototype application designed to assess and visualize climate risks. This project leverages modern JavaScript tools and technologies to provide an intuitive platform for modeling, analyzing, and presenting data on climate-related risks.",
      "language": "JavaScript",
      "stars": 2,
      "url": "https://github.com/kaungkhantko26/climate-risk-prototype",
      "homepage": "http://climate-risk-prototype.kaungkhantko.top/",
      "pushedAt": "2026-03-28T08:47:48Z"
    },
    {
      "name": "hexora",
      "description": "Hexora is a lightweight lyrics website focused on making songs easier to discover, organize, and read in one place.",
      "language": "TypeScript",
      "stars": 2,
      "url": "https://github.com/kaungkhantko26/hexora",
      "homepage": "https://hexora.kaungkhantko.top/",
      "pushedAt": "2026-03-19T13:09:28Z"
    },
    {
      "name": "Augorithm",
      "description": "Visual pseudocode editor, flowchart generator, and algorithm runner for macOS, Windows, and iPad—with English and Burmese support.",
      "language": "TypeScript",
      "stars": 1,
      "url": "https://github.com/kaungkhantko26/Augorithm",
      "homepage": "https://augorithm-for-students.vercel.app",
      "pushedAt": "2026-08-04T20:23:33Z"
    },
    {
      "name": "kaungkhantko26",
      "description": "profile.md",
      "language": "",
      "stars": 1,
      "url": "https://github.com/kaungkhantko26/kaungkhantko26",
      "homepage": "",
      "pushedAt": "2026-08-03T19:26:26Z"
    },
    {
      "name": "nexspace-edu",
      "description": "",
      "language": "TypeScript",
      "stars": 1,
      "url": "https://github.com/kaungkhantko26/nexspace-edu",
      "homepage": "https://nexspace-edu.vercel.app",
      "pushedAt": "2026-05-07T09:00:17Z"
    },
    {
      "name": "CookaiWeb",
      "description": "",
      "language": "Python",
      "stars": 1,
      "url": "https://github.com/kaungkhantko26/CookaiWeb",
      "homepage": "http://kaungkhantko.studio/",
      "pushedAt": "2026-05-01T15:01:13Z"
    },
    {
      "name": "LuminaBooks",
      "description": "",
      "language": "TypeScript",
      "stars": 1,
      "url": "https://github.com/kaungkhantko26/LuminaBooks",
      "homepage": "https://luminabook.kaungkhantko.top/",
      "pushedAt": "2026-03-31T18:45:31Z"
    },
    {
      "name": "Habit-tracker",
      "description": "",
      "language": "TypeScript",
      "stars": 1,
      "url": "https://github.com/kaungkhantko26/Habit-tracker",
      "homepage": "http://habittracker.kaungkhantko.top/",
      "pushedAt": "2026-03-31T02:17:42Z"
    },
    {
      "name": "Bee",
      "description": "Home service booking platform connecting customers with service providers through a simple web interface.",
      "language": "TypeScript",
      "stars": 1,
      "url": "https://github.com/kaungkhantko26/Bee",
      "homepage": "https://bee.kaungkhantko.top/",
      "pushedAt": "2026-03-21T19:38:06Z"
    },
    {
      "name": "KaungKhantKo",
      "description": "",
      "language": "CSS",
      "stars": 1,
      "url": "https://github.com/kaungkhantko26/KaungKhantKo",
      "homepage": "https://kaungkhantkocontents.site/",
      "pushedAt": "2025-12-15T03:11:45Z"
    }
  ]
};
