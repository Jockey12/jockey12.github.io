
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { getProfile, getRepos } from "@/lib/github";
import Link from "next/link";

export const revalidate = 3600;

export default async function Home() {
  const user = await getProfile();
  const repos = await getRepos();

  // Sort by stars and take top 3
  const topRepos = repos
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 3);

  return (
    <div className="flex flex-col gap-16 pb-16 animate-fade-in-up">
      <Hero user={user} />
      
      <section className="container">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
          <Link href="/projects" className="text-sm font-medium text-muted-foreground hover:text-primary">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topRepos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
      </section>
    </div>
  );
}

