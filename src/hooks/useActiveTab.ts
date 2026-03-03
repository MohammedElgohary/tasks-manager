import type { TaskStatus } from "@/models";
import { useTasksStore } from "@/stores";
import { useEffect, useState } from "react";

export function useActiveTab() {
  const filters = useTasksStore((store) => store.filters);
  const [activeTab, setActiveTab] = useState<TaskStatus | undefined>(
    filters.status,
  );

  useEffect(() => {
    if (!filters.status) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setActiveTab(filters.status);
  }, [filters.status]);

  return { activeTab, setActiveTab };
}
