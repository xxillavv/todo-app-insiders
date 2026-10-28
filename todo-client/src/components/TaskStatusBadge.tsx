import { TASK_STATUS_LABELS, TaskStatus } from "@/hooks/task/task.type";

const badgeClassNames: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: "bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300",
  [TaskStatus.IN_PROGRESS]: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400",
  [TaskStatus.DONE]: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400",
};

const TaskStatusBadge = ({ status }: { status: TaskStatus }) => {
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${badgeClassNames[status]}`}>
      {TASK_STATUS_LABELS[status]}
    </span>
  );
};

export default TaskStatusBadge;
