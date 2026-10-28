"use client";

import { useState } from "react";
import { useTasks } from "@/hooks/task/task.hook";
import { ICreateTask, ITask, TASK_STATUS_LABELS, TaskStatus } from "@/hooks/task/task.type";
import { getApiErrorMessage } from "@/lib/axios";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";

const filters: { value?: TaskStatus; label: string }[] = [
  { label: "All" },
  ...Object.values(TaskStatus).map((value) => ({ value, label: TASK_STATUS_LABELS[value] })),
];

const TaskBoard = () => {
  const [statusFilter, setStatusFilter] = useState<TaskStatus>();
  const { tasks, create, update, remove } = useTasks(statusFilter);

  const handleCreate = async (values: ICreateTask) => {
    try {
      await create.mutateAsync(values);
      return true;
    } catch {
      return false;
    }
  };

  const handleUpdate = async (task: ITask, values: ICreateTask) => {
    try {
      await update.mutateAsync({ id: task.id, body: values });
      return true;
    } catch {
      return false;
    }
  };

  const handleDelete = (task: ITask) => {
    if (window.confirm(`Delete "${task.title}"?`)) {
      remove.mutate(task.id);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h2 className="mb-4 font-semibold">New task</h2>
        <TaskForm          
          isPending={create.isPending}
          error={create.error}
          onSubmit={handleCreate}
          resetOnSuccess
        />
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-semibold">
            My tasks
            {tasks.data && (
              <span className="ml-2 text-sm font-normal text-zinc-500 dark:text-zinc-400">{tasks.data.length}</span>
            )}
          </h2>

          <div className="flex gap-1 overflow-x-auto rounded-lg bg-zinc-100 p-1 dark:bg-zinc-900">
            {filters.map((filter) => (
              <button
                key={filter.label}
                type="button"
                onClick={() => setStatusFilter(filter.value)}
                aria-pressed={statusFilter === filter.value}
                className={`shrink-0 rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  statusFilter === filter.value
                    ? "bg-white shadow-sm dark:bg-zinc-700"
                    : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {remove.isError && (
          <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400">
            {getApiErrorMessage(remove.error)}
          </p>
        )}

        {tasks.isPending ? (
          <p className="py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">Loading tasks...</p>
        ) : tasks.isError ? (
          <div className="space-y-3 py-12 text-center">
            <p className="text-sm text-red-600 dark:text-red-400">{getApiErrorMessage(tasks.error)}</p>
            <button
              type="button"
              onClick={() => tasks.refetch()}
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Try again
            </button>
          </div>
        ) : tasks.data.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-300 py-12 text-center dark:border-zinc-700">
            <p className="font-medium">No tasks here yet</p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {statusFilter ? "Try another filter or create a new task." : "Create your first task above."}
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {tasks.data.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                isUpdating={update.isPending && update.variables?.id === task.id}
                isDeleting={remove.isPending && remove.variables === task.id}
                updateError={update.variables?.id === task.id ? update.error : null}
                onUpdate={(values) => handleUpdate(task, values)}
                onDelete={() => handleDelete(task)}
              />
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default TaskBoard;
