import { StatusBadge } from "@/components";
import { TaskPriority, TaskStatus } from "@/models";
import { Select } from "antd";
import type { SelectProps } from "antd";
import { PriorityBadge } from "./badges";
import { useMemo } from "react";

export function PrioritySelect(props: SelectProps) {
  const options = useMemo(
    () =>
      Object.values(TaskPriority).map((priority) => ({
        label: <PriorityBadge target={priority} showText />,
        value: priority,
      })),
    [],
  );

  return <Select options={options} allowClear {...props} />;
}

export function StatusSelect(props: SelectProps) {
  const options = useMemo(
    () =>
      Object.values(TaskStatus).map((status) => ({
        label: <StatusBadge target={status} showText />,
        value: status,
      })),
    [],
  );

  return <Select options={options} allowClear {...props} />;
}
