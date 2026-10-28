"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useState } from "react";
import { useAuth } from "@/hooks/auth/auth.hook";
import { getApiErrorMessage } from "@/lib/axios";

type AuthFormType = "login" | "register";

const content = {
  login: {
    title: "Welcome back",
    subtitle: "Sign in to manage your tasks",
    submit: "Sign in",
    pending: "Signing in...",
    switchText: "Don't have an account?",
    switchLink: { href: "/register", label: "Sign up" },
  },
  register: {
    title: "Create an account",
    subtitle: "Start organizing your tasks",
    submit: "Sign up",
    pending: "Creating account...",
    switchText: "Already have an account?",
    switchLink: { href: "/login", label: "Sign in" },
  },
};

const inputClassName =
  "w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/10";

const AuthForm = ({ type }: { type: AuthFormType }) => {
  const router = useRouter();
  const { login, register } = useAuth();
  const mutation = type === "login" ? login : register;
  const text = content[type];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutation.mutate(
      { email, password },
      { onSuccess: () => router.replace("/tasks") },
    );
  };

  return (
    <div className="w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-6 space-y-1 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">{text.title}</h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">{text.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClassName}
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete={type === "login" ? "current-password" : "new-password"}
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={type === "register" ? 6 : undefined}
            className={inputClassName}
          />
          {type === "register" && (
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              At least 6 characters, one uppercase letter and one symbol.
            </p>
          )}
        </div>

        {mutation.isError && (
          <p
            role="alert"
            className="whitespace-pre-line rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400"
          >
            {getApiErrorMessage(mutation.error)}
          </p>
        )}

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {mutation.isPending ? text.pending : text.submit}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
        {text.switchText}{" "}
        <Link
          href={text.switchLink.href}
          className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100"
        >
          {text.switchLink.label}
        </Link>
      </p>
    </div>
  );
};

export default AuthForm;
