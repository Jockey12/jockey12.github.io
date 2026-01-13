
import { getRepos } from "@/lib/github";
import { ProjectCard } from "@/components/ProjectCard";

export const revalidate = 3600;

export default async function OpenSourcePage() {
  const repos = await getRepos();
  
  return (
    <div className="container py-12 md:py-24">
      <h1 className="mb-8 font-bold text-4xl tracking-tight">Open Source</h1>
      <p className="mb-8 text-xl text-muted-foreground">
        My contributions to the open source community.
      </p>
       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </div>
    </div>
  );
}
