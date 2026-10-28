"use client";

import { useState } from "react";
import { ICreateTask, ITask } from "@/hooks/task/task.type";
import TaskForm from "./TaskForm";
import TaskStatusBadge from "./TaskStatusBadge";

type TaskItemProps = {
  task: ITask;
  isUpdating: boolean;
  isDeleting: boolean;
  updateError: unknown;
  onUpdate: (values: ICreateTask) => Promise<boolean>;
  onDelete: () => void;
};

const TaskItem = ({ task, isUpdating, isDeleting, updateError, onUpdate, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);

  if (isEditing) {
    return (
      <li className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
        <TaskForm
          initialValues={{ title: task.title, description: task.description ?? "", status: task.status }}
          isPending={isUpdating}
          error={updateError}
          onSubmit={async (values) => {
            const saved = await onUpdate(values);
            if (saved) setIsEditing(false);
            return saved;
          }}
          onCancel={() => setIsEditing(false)}
        />
      </li>
    );
  }

  return (
    <li className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-1">
          <h3 className="wrap-break-words font-medium">{task.title}</h3>
          {task.description && (
            <p className="whitespace-pre-line wrap-break-words text-sm text-zinc-500 dark:text-zinc-400">
              {task.description}
            </p>
          )}
        </div>
        <TaskStatusBadge status={task.status} />
      </div>

      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={() => setIsEditing(true)}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          Edit
        </button>
        <button
          type="button"
          onClick={onDelete}
          disabled={isDeleting}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:text-red-400 dark:hover:bg-red-950/50"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
