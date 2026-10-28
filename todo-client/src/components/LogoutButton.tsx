"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/auth/auth.hook";

const LogoutButton = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        // Drop the previous user's cached data and re-render server components without the cookie
        queryClient.clear();
        router.refresh();
      },
    });
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={logout.isPending}
      className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 dark:text-zinc-300 dark:hover:bg-zinc-800"
    >
      {logout.isPending ? "Logging out..." : "Log out"}
    </button>
  );
};

export default LogoutButton;
