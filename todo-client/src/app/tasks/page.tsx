import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LogoutButton from "@/components/LogoutButton";
import TaskBoard from "@/components/TaskBoard";

export const metadata: Metadata = {
  title: "Tasks",
};

export default function TasksPage() {
  return (
    <>
      <Header>
        <LogoutButton />
      </Header>

      <main className="flex-1 bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto w-full max-w-3xl px-4 py-10">
          <TaskBoard />
        </div>
      </main>

      <Footer />
    </>
  );
}
