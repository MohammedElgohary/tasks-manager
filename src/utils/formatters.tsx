import dayjs from "dayjs";
import { ClockCircleOutlined, WarningOutlined } from "@ant-design/icons";
import { TaskStatus } from "@/models";

// Due date status
export function formatDueDate(dueDate: string | null, taskStatus: TaskStatus) {
  if (!dueDate || taskStatus === TaskStatus.COMPLETED) return null;

  const now = dayjs();
  const due = dayjs(dueDate);
  const daysUntilDue = due.endOf("day").diff(now.startOf("day"), "day");

  // Overdue
  if (daysUntilDue < 0) {
    return {
      type: "error" as const,
      color: "red",
      icon: <WarningOutlined />,
      text: "task.overdue",
      tooltip: "task.overdueBy",
      tooltipParams: { days: Math.abs(daysUntilDue) },
    };
  }

  // Due today
  if (daysUntilDue === 0) {
    return {
      type: "warning" as const,
      color: "orange",
      icon: <ClockCircleOutlined />,
      text: "task.dueToday",
      tooltip: "task.dueToday",
    };
  }

  // Due soon
  if (daysUntilDue <= 3) {
    return {
      type: "info" as const,
      color: "gold",
      icon: <ClockCircleOutlined />,
      text: "task.dueSoon",
      tooltip: "task.dueInDays",
      tooltipParams: { days: daysUntilDue },
    };
  }

  // No due date
  return null;
}

// Format date to "YYYY-MM-DD"
export function formatDate(date: string) {
  return dayjs(date).format("dddd, DD MMM YYYY");
}

export function formatDateTime(date: string) {
  return dayjs(date).format("dddd, DD MMM YYYY hh:mm A");
}
