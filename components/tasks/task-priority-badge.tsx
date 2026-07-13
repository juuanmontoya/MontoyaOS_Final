import { TaskPriority } from "@/types/task";
import { Badge } from "@/components/ui/badge";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
}

const PRIORITY_CONFIG = {
  low: {
    label: "Baja",
    className:
      "bg-slate-100 text-slate-700 border-slate-200",
  },
  medium: {
    label: "Media",
    className:
      "bg-blue-100 text-blue-700 border-blue-200",
  },
  high: {
    label: "Alta",
    className:
      "bg-orange-100 text-orange-700 border-orange-200",
  },
  urgent: {
    label: "Urgente",
    className:
      "bg-red-100 text-red-700 border-red-200",
  },
} satisfies Record<
  TaskPriority,
  {
    label: string;
    className: string;
  }
>;

export function TaskPriorityBadge({
  priority,
}: TaskPriorityBadgeProps) {
  const config = PRIORITY_CONFIG[priority];

  return (
    <Badge
      variant="outline"
      className={config.className}
    >
      {config.label}
    </Badge>
  );
}