import type { TaskPriority, TaskStatus } from "@/models";
import { useTasksStore, type TasksFilters } from "@/stores";
import { useEffect } from "react";

export function useTasksUrlFilters() {
  const changeFilters = useTasksStore((state) => state.changeFilters);
  const filters = useTasksStore((state) => state.filters);

  // Initialize filters from URL params on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlFilters: TasksFilters = {};

    const search = params.get("search") as string | undefined;
    const status = params.get("status") as TaskStatus | undefined;
    const priority = params.get("priority") as TaskPriority | undefined;
    const isOverdue = params.get("isOverdue");

    if (search) urlFilters.search = search;
    if (status) urlFilters.status = status;
    if (priority) urlFilters.priority = priority;
    if (isOverdue) urlFilters.isOverdue = isOverdue === "true";

    if (Object.keys(urlFilters).length > 0) {
      changeFilters(urlFilters);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.status) params.set("status", filters.status);
    if (filters.priority) params.set("priority", filters.priority);
    if (filters.isOverdue)
      params.set("isOverdue", filters.isOverdue.toString());

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    window.history.replaceState({}, "", newUrl);
  }, [filters]);
}
