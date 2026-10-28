"use client";

import { SyntheticEvent, useState } from "react";
import { ICreateTask, TASK_STATUS_LABELS, TaskStatus } from "@/hooks/task/task.type";
import { getApiErrorMessage } from "@/lib/axios";

type TaskFormProps = {
  initialValues?: ICreateTask;
  isPending: boolean;
  error: unknown;

  onSubmit: (values: ICreateTask) => Promise<boolean>;
  onCancel?: () => void;
  resetOnSuccess?: boolean;
};

const inputClassName =
  "w-full rounded-lg border border-zinc-300 bg-transparent px-3 py-2 text-sm outline-none transition focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/10 dark:border-zinc-700 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/10";

const TaskForm = ({
  initialValues,
  isPending,
  error,
  onSubmit,
  onCancel,
  resetOnSuccess = false,
}: TaskFormProps) => {
  const [title, setTitle] = useState(initialValues?.title ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [status, setStatus] = useState(initialValues?.status ?? TaskStatus.TODO);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const saved = await onSubmit({ title: title.trim(), description: description.trim(), status });

    if (saved && resetOnSuccess) {
      setTitle("");
      setDescription("");
      setStatus(TaskStatus.TODO);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        aria-label="Title"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        maxLength={255}
        className={inputClassName}
      />

      <textarea
        aria-label="Description"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        maxLength={2000}
        rows={2}
        className={`${inputClassName} resize-y`}
      />

      {error != null && (
        <p
          role="alert"
          className="whitespace-pre-line rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950/50 dark:text-red-400"
        >
          {getApiErrorMessage(error)}
        </p>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <select
          aria-label="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value as TaskStatus)}
          className={`${inputClassName} sm:w-auto`}
        >
          {Object.values(TaskStatus).map((value) => (
            <option key={value} value={value}>
              {TASK_STATUS_LABELS[value]}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium transition hover:bg-zinc-100 sm:flex-none dark:border-zinc-700 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            {isPending ? "Saving..." : "Add task"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
