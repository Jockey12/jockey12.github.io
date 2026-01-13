
import { getRepo, getRepos } from "@/lib/github";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { notFound } from "next/navigation";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for all repos
export async function generateStaticParams() {
  const repos = await getRepos();
  return repos.map((repo) => ({
    slug: repo.name,
  }));
}

export const revalidate = 3600;

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const repo = await getRepo(slug);

  if (!repo) {
    notFound();
  }

  return (
    <div className="container py-12 md:py-24">
        <Link
          href="/projects"
          className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
        
        <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">{repo.name}</h1>
            <p className="text-xl text-muted-foreground mb-6">{repo.description}</p>
            
            <div className="flex gap-4">
                 <a
                    href={repo.html_url}
                    target="_blank"
                    className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  >
                    <Github className="h-4 w-4" />
                    View Repo
                  </a>
                  {repo.homepage && (
                     <a
                        href={repo.homepage}
                        target="_blank"
                        className="inline-flex items-center gap-2 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live Demo
                      </a>
                  )}
            </div>
        </div>
        
        <hr className="my-8" />
        
        <div className="grid gap-6 md:grid-cols-2">
            <div>
                <h3 className="font-semibold mb-2">Details</h3>
                <dl className="space-y-2 text-sm">
                    <div className="flex justify-between">
                        <dt className="text-muted-foreground">Language</dt>
                        <dd>{repo.language}</dd>
                    </div>
                     <div className="flex justify-between">
                        <dt className="text-muted-foreground">Stars</dt>
                        <dd>{repo.stargazers_count}</dd>
                    </div>
                     <div className="flex justify-between">
                        <dt className="text-muted-foreground">Forks</dt>
                        <dd>{repo.forks_count}</dd>
                    </div>
                     <div className="flex justify-between">
                        <dt className="text-muted-foreground">Created</dt>
                        <dd>{new Date(repo.created_at).toLocaleDateString()}</dd>
                    </div>
                    <div className="flex justify-between">
                        <dt className="text-muted-foreground">Last Updated</dt>
                        <dd>{new Date(repo.updated_at).toLocaleDateString()}</dd>
                    </div>
                </dl>
            </div>
             {repo.topics && repo.topics.length > 0 && (
                <div>
                    <h3 className="font-semibold mb-2">Topics</h3>
                    <div className="flex flex-wrap gap-2">
                        {repo.topics.map(topic => (
                            <span key={topic} className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground">
                                {topic}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}
