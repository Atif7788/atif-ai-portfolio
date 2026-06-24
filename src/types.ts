export interface SkillItem {
  name: string;
  category: string;
  rating: number;
  description: string;
  color: string;
}

export interface MilestoneItem {
  id: string;
  year: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  features: string[];
  link?: string;
  modelType: string; // for 3D representation
}

export interface BusinessItem {
  id: string;
  title: string;
  category: string;
  description: string;
  details: string[];
  metrics: { label: string; value: string }[];
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  category: string;
  badge: string;
}

export interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
  total_stars: number;
  html_url: string;
  top_languages: { language: string; count: number; percentage: number }[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

export interface GitHubCommit {
  sha: string;
  message: string;
  repo_name: string;
  created_at: string;
}

export interface GitHubActivity {
  id: string;
  type: string;
  repo_name: string;
  created_at: string;
  details: string;
}

