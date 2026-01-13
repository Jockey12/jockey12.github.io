
import Link from "next/link";
import Image from "next/image";
import { GitHubUser } from "@/lib/types";

interface HeroProps {
  user: GitHubUser;
}

export function Hero({ user }: HeroProps) {
  return (
    <section className="py-20 md:py-32">
      <div className="container flex flex-col items-center text-center">
        <div className="mb-8 relative h-32 w-32 shrink-0 overflow-hidden rounded-full border border-border">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            fill
            className="object-cover"
            priority
          />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
          Hi, I&apos;m {user.name || user.login}
        </h1>
        <p className="mt-6 max-w-150 text-muted-foreground md:text-xl">
          {user.bio || "A developer building cool things."}
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/projects"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
