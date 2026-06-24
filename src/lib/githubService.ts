import { GitHubProfile, GitHubRepo, GitHubCommit, GitHubActivity } from '../types';

const GITHUB_USERNAME = 'Atif7788';
const CACHE_KEY_PROFILE = 'github_profile_cache';
const CACHE_KEY_REPOS = 'github_repos_cache';
const CACHE_KEY_COMMITS = 'github_commits_cache';
const CACHE_KEY_ACTIVITIES = 'github_activities_cache';
const CACHE_TIME_KEY = 'github_cache_timestamp';
const CACHE_TTL_MS = 1000 * 60 * 60 * 2; // 2 hours cache duration

// Fallback high-quality mock data for Atif7788
export const FALLBACK_PROFILE: GitHubProfile = {
  login: GITHUB_USERNAME,
  name: 'Atif Ali',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80',
  bio: 'Full-Stack Developer & AI Specialist | Building immersive 3D experiences, next-gen web systems, and intelligent agent integrations.',
  followers: 48,
  following: 24,
  public_repos: 12,
  total_stars: 35,
  html_url: `https://github.com/${GITHUB_USERNAME}`,
  top_languages: [
    { language: 'TypeScript', count: 6, percentage: 50 },
    { language: 'Python', count: 3, percentage: 25 },
    { language: 'JavaScript', count: 2, percentage: 17 },
    { language: 'C++', count: 1, percentage: 8 }
  ]
};

export const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 101,
    name: 'ai-neural-command-center',
    description: 'Immersive holographic portfolio and web dashboard incorporating interactive 3D WebGL scenes, sound design, and custom widgets.',
    html_url: `https://github.com/${GITHUB_USERNAME}/ai-neural-command-center`,
    stargazers_count: 14,
    forks_count: 3,
    language: 'TypeScript',
    updated_at: '2026-06-23T18:30:00Z'
  },
  {
    id: 102,
    name: 'gemini-agent-matrix',
    description: 'Highly modular server-side agent orchestrator using the Google GenAI SDK. Supports dynamic tool calling, audio feedback loops, and semantic memory search.',
    html_url: `https://github.com/${GITHUB_USERNAME}/gemini-agent-matrix`,
    stargazers_count: 11,
    forks_count: 2,
    language: 'Python',
    updated_at: '2026-06-22T10:15:00Z'
  },
  {
    id: 103,
    name: 'quantum-key-vault',
    description: 'Post-quantum secure cryptographic storage concept using lattice-based encryption paradigms for standard client-server communication.',
    html_url: `https://github.com/${GITHUB_USERNAME}/quantum-key-vault`,
    stargazers_count: 7,
    forks_count: 1,
    language: 'C++',
    updated_at: '2026-06-18T14:40:00Z'
  },
  {
    id: 104,
    name: 'smart-transit-ml',
    description: 'Predictive modeling engine and GIS routing dashboard visualizing urban transit bottlenecks in Jodhpur using local IoT telemetry stream.',
    html_url: `https://github.com/${GITHUB_USERNAME}/smart-transit-ml`,
    stargazers_count: 3,
    forks_count: 1,
    language: 'Python',
    updated_at: '2026-06-12T09:20:00Z'
  }
];

export const FALLBACK_COMMITS: GitHubCommit[] = [
  {
    sha: 'a5c1d8e3b4f59627',
    message: 'feat: integrate Google GenAI interactions API on server engine',
    repo_name: 'gemini-agent-matrix',
    created_at: '2026-06-23T20:15:00Z'
  },
  {
    sha: 'd9f8e7c6b5a41234',
    message: 'style: enhance 3D WebGL shader attributes and orbit tracking lines',
    repo_name: 'ai-neural-command-center',
    created_at: '2026-06-22T17:45:00Z'
  },
  {
    sha: '3c4b5a6978e21d3a',
    message: 'refactor: isolate crypto keys generation module for performance',
    repo_name: 'quantum-key-vault',
    created_at: '2026-06-18T11:30:00Z'
  },
  {
    sha: 'e9a8b7c6d5f43210',
    message: 'docs: update setup guidelines and configure env.example schema',
    repo_name: 'smart-transit-ml',
    created_at: '2026-06-12T08:10:00Z'
  }
];

export const FALLBACK_ACTIVITIES: GitHubActivity[] = [
  {
    id: 'act_1',
    type: 'PushEvent',
    repo_name: 'gemini-agent-matrix',
    created_at: '2026-06-23T20:15:00Z',
    details: 'Pushed 1 commit to main branch'
  },
  {
    id: 'act_2',
    type: 'CreateEvent',
    repo_name: 'ai-neural-command-center',
    created_at: '2026-06-22T15:00:00Z',
    details: 'Created repository from template'
  },
  {
    id: 'act_3',
    type: 'WatchEvent',
    repo_name: 'google-genai-sdk-ts',
    created_at: '2026-06-20T10:30:00Z',
    details: 'Starred repository'
  },
  {
    id: 'act_4',
    type: 'PushEvent',
    repo_name: 'quantum-key-vault',
    created_at: '2026-06-18T11:30:00Z',
    details: 'Pushed 2 commits to main branch'
  }
];

// Helper to determine if cache is valid
function isCacheValid(): boolean {
  try {
    const timestamp = localStorage.getItem(CACHE_TIME_KEY);
    if (!timestamp) return false;
    const diff = Date.now() - parseInt(timestamp, 10);
    return diff < CACHE_TTL_MS;
  } catch {
    return false;
  }
}

// Fetch GitHub profile, repos, and events with caching and rate limit fallback
export async function getGitHubData(): Promise<{
  profile: GitHubProfile;
  repos: GitHubRepo[];
  commits: GitHubCommit[];
  activities: GitHubActivity[];
  fromCache: boolean;
}> {
  // 1. Try reading from cache first
  const cacheValid = isCacheValid();
  if (cacheValid) {
    try {
      const cachedProf = localStorage.getItem(CACHE_KEY_PROFILE);
      const cachedRepos = localStorage.getItem(CACHE_KEY_REPOS);
      const cachedCommits = localStorage.getItem(CACHE_KEY_COMMITS);
      const cachedActs = localStorage.getItem(CACHE_KEY_ACTIVITIES);

      if (cachedProf && cachedRepos && cachedCommits && cachedActs) {
        return {
          profile: JSON.parse(cachedProf),
          repos: JSON.parse(cachedRepos),
          commits: JSON.parse(cachedCommits),
          activities: JSON.parse(cachedActs),
          fromCache: true
        };
      }
    } catch (e) {
      console.warn('Failed to parse cached GitHub data, fetching fresh...', e);
    }
  }

  // 2. Fetch fresh data from GitHub API
  try {
    const headers: RequestInit = {
      method: 'GET',
      headers: {
        Accept: 'application/vnd.github.v3+json'
      }
    };

    // Parallel fetch profile, repositories, and events
    const [profileRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, headers),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, headers),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=30`, headers)
    ]);

    // Handle rate limiting (403 Status Code) or other network failures
    if (profileRes.status === 403 || reposRes.status === 403) {
      throw new Error('GitHub API rate limit exceeded');
    }
    if (!profileRes.ok || !reposRes.ok) {
      throw new Error(`GitHub API returned error statuses: Profile ${profileRes.status}, Repos ${reposRes.status}`);
    }

    const profileData = await profileRes.json();
    const reposData = await reposRes.json();

    // Sum stargazers counts across all public repos
    const totalStars = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);

    // Calculate language frequencies
    const languageCounts: { [key: string]: number } = {};
    let totalRepoLanguageCount = 0;

    reposData.forEach((repo: any) => {
      if (repo.language) {
        languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        totalRepoLanguageCount++;
      }
    });

    const top_languages = Object.entries(languageCounts)
      .map(([lang, count]) => ({
        language: lang,
        count,
        percentage: totalRepoLanguageCount > 0 ? Math.round((count / totalRepoLanguageCount) * 100) : 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4);

    const profile: GitHubProfile = {
      login: profileData.login || GITHUB_USERNAME,
      name: profileData.name || 'Atif Ali',
      avatar_url: profileData.avatar_url || FALLBACK_PROFILE.avatar_url,
      bio: profileData.bio || FALLBACK_PROFILE.bio,
      followers: profileData.followers ?? FALLBACK_PROFILE.followers,
      following: profileData.following ?? FALLBACK_PROFILE.following,
      public_repos: profileData.public_repos ?? FALLBACK_PROFILE.public_repos,
      total_stars: totalStars,
      html_url: profileData.html_url || `https://github.com/${GITHUB_USERNAME}`,
      top_languages: top_languages.length > 0 ? top_languages : FALLBACK_PROFILE.top_languages
    };

    const repos: GitHubRepo[] = reposData.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description || 'No description provided.',
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count || 0,
      forks_count: repo.forks_count || 0,
      language: repo.language,
      updated_at: repo.updated_at
    }));

    // Process recent commits and activities from events
    let commits: GitHubCommit[] = [];
    let activities: GitHubActivity[] = [];

    if (eventsRes.ok) {
      const eventsData = await eventsRes.json();

      eventsData.forEach((evt: any) => {
        const repoNameOnly = evt.repo.name.split('/').pop() || evt.repo.name;

        // Process commits for PushEvent
        if (evt.type === 'PushEvent' && evt.payload?.commits) {
          evt.payload.commits.forEach((commit: any) => {
            if (commits.length < 5) {
              commits.push({
                sha: commit.sha.substring(0, 16),
                message: commit.message,
                repo_name: repoNameOnly,
                created_at: evt.created_at
              });
            }
          });
        }

        // Process activity feed items
        if (activities.length < 6) {
          let details = 'Interacted with repository';
          if (evt.type === 'PushEvent') {
            details = `Pushed ${evt.payload?.commits?.length || 1} commit(s)`;
          } else if (evt.type === 'CreateEvent') {
            details = `Created ${evt.payload?.ref_type || 'repository'}`;
          } else if (evt.type === 'WatchEvent') {
            details = 'Starred repository';
          } else if (evt.type === 'ForkEvent') {
            details = 'Forked repository';
          } else if (evt.type === 'IssuesEvent') {
            details = `${evt.payload?.action || 'Opened'} an issue`;
          }

          activities.push({
            id: evt.id,
            type: evt.type,
            repo_name: repoNameOnly,
            created_at: evt.created_at,
            details
          });
        }
      });
    }

    // If events fetch failed or was empty, use fallback commits/activities
    if (commits.length === 0) commits = FALLBACK_COMMITS;
    if (activities.length === 0) activities = FALLBACK_ACTIVITIES;

    // Cache the fresh results successfully
    try {
      localStorage.setItem(CACHE_KEY_PROFILE, JSON.stringify(profile));
      localStorage.setItem(CACHE_KEY_REPOS, JSON.stringify(repos));
      localStorage.setItem(CACHE_KEY_COMMITS, JSON.stringify(commits));
      localStorage.setItem(CACHE_KEY_ACTIVITIES, JSON.stringify(activities));
      localStorage.setItem(CACHE_TIME_KEY, Date.now().toString());
    } catch (e) {
      console.warn('LocalStorage quota or storage disabled, caching skipped', e);
    }

    return {
      profile,
      repos,
      commits,
      activities,
      fromCache: false
    };

  } catch (error) {
    console.warn('GitHub API Fetch failed. Reverting to local cache/fallbacks.', error);

    // Try returning cached data even if expired
    try {
      const cachedProf = localStorage.getItem(CACHE_KEY_PROFILE);
      const cachedRepos = localStorage.getItem(CACHE_KEY_REPOS);
      const cachedCommits = localStorage.getItem(CACHE_KEY_COMMITS);
      const cachedActs = localStorage.getItem(CACHE_KEY_ACTIVITIES);

      if (cachedProf && cachedRepos && cachedCommits && cachedActs) {
        return {
          profile: JSON.parse(cachedProf),
          repos: JSON.parse(cachedRepos),
          commits: JSON.parse(cachedCommits),
          activities: JSON.parse(cachedActs),
          fromCache: true
        };
      }
    } catch {}

    // No cache found or error, return fallback constants immediately
    return {
      profile: FALLBACK_PROFILE,
      repos: FALLBACK_REPOS,
      commits: FALLBACK_COMMITS,
      activities: FALLBACK_ACTIVITIES,
      fromCache: true
    };
  }
}
