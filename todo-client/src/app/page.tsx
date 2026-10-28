import Link from "next/link";
import { cookies } from "next/headers";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogoutButton from "@/components/LogoutButton";

const features = [
  {
    title: "Create tasks",
    description: "Add a title and an optional description to keep every detail in one place.",
  },
  {
    title: "Track progress",
    description: "Move tasks between Todo, In progress and Done as your work moves forward.",
  },
  {
    title: "Filter by status",
    description: "Focus on what matters right now by showing only the tasks you need.",
  },
];

const previewTasks = [
  { title: "Design the login page", status: "Done", className: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400" },
  { title: "Connect tasks API", status: "In progress", className: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400" },
  { title: "Record a demo video", status: "Todo", className: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300" },
];

const primaryButton =
  "rounded-lg bg-zinc-900 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300";
const secondaryButton =
  "rounded-lg border border-zinc-300 bg-white text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:bg-transparent dark:hover:bg-zinc-800";

const isAuthenticated = async () => (await cookies()).has("access_token");

// Reading cookies is request-time data, so these render inside <Suspense> (cacheComponents)
async function HeaderLinks() {
  if (await isAuthenticated()) {
    return (
      <>
        <LogoutButton />
        <Link href="/tasks" className={`${primaryButton} px-3 py-2`}>
          My tasks
        </Link>
      </>
    );
  }

  return (
    <>
      <Link
        href="/login"
        className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
      >
        Sign in
      </Link>
      <Link href="/register" className={`${primaryButton} px-3 py-2`}>
        Sign up
      </Link>
    </>
  );
}

async function HeroLinks() {
  if (await isAuthenticated()) {
    return (
      <Link href="/tasks" className={`${primaryButton} px-5 py-2.5`}>
        Go to my tasks
      </Link>
    );
  }

  return (
    <>
      <Link href="/register" className={`${primaryButton} px-5 py-2.5`}>
        Get started
      </Link>
      <Link href="/login" className={`${secondaryButton} px-5 py-2.5`}>
        I already have an account
      </Link>
    </>
  );
}

export default function Home() {
  return (
    <>
      <Header>
        <Suspense>
          <HeaderLinks />
        </Suspense>
      </Header>

      <main className="flex-1 bg-zinc-50 dark:bg-zinc-950">
        <section className="mx-auto grid w-full max-w-5xl items-center gap-12 px-4 py-16 sm:py-24 lg:grid-cols-2">
          <div className="space-y-6 text-center lg:text-left">
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Keep your tasks simple and organized
            </h1>
            <p className="text-lg text-zinc-500 dark:text-zinc-400">
              Create tasks, track their status and filter them in seconds. No clutter, just what you need to get
              things done.
            </p>
            <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <Suspense>
                <HeroLinks />
              </Suspense>
            </div>
          </div>

          <div
            aria-hidden
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold">My tasks</p>
              <span className="text-xs text-zinc-500 dark:text-zinc-400">3 tasks</span>
            </div>
            <ul className="space-y-3">
              {previewTasks.map((task) => (
                <li
                  key={task.title}
                  className="flex items-center justify-between gap-4 rounded-lg border border-zinc-200 px-4 py-3 dark:border-zinc-800"
                >
                  <span className="text-sm">{task.title}</span>
                  <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${task.className}`}>
                    {task.status}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mx-auto w-full max-w-5xl px-4 pb-16 sm:pb-24">
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h2 className="font-semibold">{feature.title}</h2>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
