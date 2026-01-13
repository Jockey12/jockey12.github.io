
import Link from "next/link";
import { Star, GitFork, Calendar } from "lucide-react";
import { GitHubRepo } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface ProjectCardProps {
  repo: GitHubRepo;
}

export function ProjectCard({ repo }: ProjectCardProps) {
  return (
    <div className="group relative flex flex-col justify-between rounded-lg border p-6 hover:bg-accent hover:text-accent-foreground transition-colors">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-semibold leading-none tracking-tight">
            <Link href={`/projects/${repo.name}`} className="hover:underline">
              {repo.name}
            </Link>
          </h3>
          {repo.language && (
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground">
              {repo.language}
            </span>
          )}
        </div>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
          {repo.description || "No description available."}
        </p>
      </div>
      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Star className="h-3 w-3" />
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <GitFork className="h-3 w-3" />
          <span>{repo.forks_count}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(repo.updated_at)}</span>
        </div>
      </div>
    </div>
  );
}
