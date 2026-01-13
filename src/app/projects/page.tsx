
import { ProjectCard } from "@/components/ProjectCard";
import { getRepos } from "@/lib/github";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const repos = await getRepos();

  return (
    <div className="container py-12 md:py-24">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-bold text-4xl tracking-tight lg:text-5xl">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of my open source projects.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </div>
  );
}
