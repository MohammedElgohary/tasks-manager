import { create } from "zustand";
import type { Task } from "@/models";
import { requestGetTasks } from "@/network";
import debounce from "debounce-promise";

const debouncedRequestGetTasks = debounce(requestGetTasks, 500);

export interface TasksFilters {
  search?: string;
  status?: Task["status"];
  priority?: Task["priority"];
  isOverdue?: boolean;
}

interface TasksStore {
  isLoading: boolean;
  tasks: Array<Task>;
  filters: TasksFilters;
  error: unknown;
  fetchTasks: () => Promise<void>;
  changeFilters: (filters: TasksFilters) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

export const useTasksStore = create<TasksStore>((set, get) => ({
  isLoading: false,
  tasks: [],
  filters: {},
  error: null,

  fetchTasks: async () => {
    set({ isLoading: true, error: null });
    try {
      const tasks = await requestGetTasks(get().filters);
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  changeFilters: async (filters) => {
    set({ filters, isLoading: true, error: null });
    try {
      const tasks = await debouncedRequestGetTasks(filters);
      set({ tasks, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  refreshTasks: async () => {
    await get().fetchTasks();
  },
}));
