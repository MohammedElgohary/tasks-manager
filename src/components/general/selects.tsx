import { StatusBadge } from "@/components";
import { TaskPriority, TaskStatus } from "@/models";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { PriorityBadge } from "./badges";

export function PrioritySelect(props: SelectProps) {
  return (
    <Select
      options={Object.values(TaskPriority).map((priority) => ({
        label: <PriorityBadge target={priority} showText />,
        value: priority,
      }))}
      allowClear
      {...props}
    />
  );
}

export function StatusSelect(props: SelectProps) {
  return (
    <Select
      options={Object.values(TaskStatus).map((status) => ({
        label: <StatusBadge target={status} showText />,
        value: status,
      }))}
      allowClear
      {...props}
    />
  );
}
