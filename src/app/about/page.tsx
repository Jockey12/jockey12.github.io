import { getProfile } from "@/lib/github";
import Image from "next/image";

export const revalidate = 3600;

export default async function AboutPage() {
  const user = await getProfile();

  return (
    <div className="container py-12 md:py-24">
      <div className="grid gap-12 md:grid-cols-[1fr_200px]">
        <div>
          <h1 className="mb-8 inline-block font-bold text-4xl tracking-tight lg:text-5xl">
            About Me
          </h1>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-xl text-muted-foreground mb-8">
              {user.bio}
            </p>
            <p>
              I am a computer science student based in {user.location}.
              Always learning and exploring new technologies, I enjoy building personal projects and contributing to the open-source community.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Image
            src={user.avatar_url}
            alt={user.name || user.login}
            width={200}
            height={200}
            className="rounded-xl border bg-muted"
          />

          <div className="flex flex-col gap-2">
            <h3 className="font-semibold">Connect</h3>
            <a href={user.html_url} target="_blank" className="text-sm text-muted-foreground hover:underline">GitHub</a>
            {user.blog && <a href="https://onur-genc.vercel.app" target="_blank" className="text-sm text-muted-foreground hover:underline">Website</a>}
            {user.twitter_username && <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" className="text-sm text-muted-foreground hover:underline">Twitter</a>}
          </div>
        </div>
      </div>
    </div >
  );
}
