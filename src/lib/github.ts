
import { GitHubRepo, GitHubUser } from "./types";
import fs from "fs";
import path from "path";

const GITHUB_USERNAME = "Jockey12";
const BASE_URL = "https://api.github.com";

// Helper to get local mock data if API fails or for SSG fallback
function getLocalData(filename: string) {
  try {
    const filePath = path.join(process.cwd(), "src/data", filename);
    const fileContents = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileContents);
  } catch (error) {
    console.error(`Error reading local data for ${filename}:`, error);
    return null;
  }
}

export async function getProfile(): Promise<GitHubUser> {
  try {
    const res = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch profile: ${res.statusText}`);
    }

    return res.json();
  } catch (error) {
    console.warn("Using local profile data fallback");
    return getLocalData("user.json");
  }
}

export async function getRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`,
      {
        next: { revalidate: 3600 },
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch repos: ${res.statusText}`);
    }

    const repos = await res.json();
    // Filter out forks if desired, or keep them. The prompt says "top starred/forked/most-recent".
    // We already sorted by updated.
    return repos.filter((repo: GitHubRepo) => !repo.fork); // Showing only original works by default
  } catch (error) {
    console.warn("Using local repos data fallback");
    const allRepos = getLocalData("repos.json") || [];
    return allRepos.filter((repo: GitHubRepo) => !repo.fork);
  }
}

export async function getRepo(name: string): Promise<GitHubRepo | null> {
  // Security check: ensure name is a valid repo name (alphanumeric, dots, hyphens, underscores)
  if (!/^[\w.-]+$/.test(name)) {
    console.error(`Invalid repo name: ${name}`);
    return null;
  }

  // Try to fetch specific repo
  try {
    const res = await fetch(`${BASE_URL}/repos/${GITHUB_USERNAME}/${name}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) return res.json();
  } catch (error) {
    // ignore
  }

  // Fallback to searching in the list
  const repos = await getRepos();
  return repos.find((r) => r.name === name) || null;
}

