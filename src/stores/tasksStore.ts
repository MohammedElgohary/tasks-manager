import { create } from 'zustand';
import type { Task, TaskPriority, TaskStatus } from '@/models';
import { requestGetTasks } from '@/network';
import debounce from 'debounce-promise';

const debouncedRequestGetTasks = debounce(requestGetTasks, 500);

export interface TasksFilters {
  search?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  isOverdue?: boolean;
}

interface TasksStore {
  isLoading: boolean;
  tasks: Array<Task>;
  filters: TasksFilters;
  error: unknown;
  fetchTasks: () => Promise<void>;
  changeFilters: (filters: TasksFilters) => Promise<void>;
  changeSearch: (search: string | undefined) => Promise<void>;
  refreshTasks: () => Promise<void>;
}

export const useTasksStore = create<TasksStore>((set, get) => {
  return {
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
        const tasks = await requestGetTasks(filters);
        set({ tasks, isLoading: false });
      } catch (error) {
        set({ error, isLoading: false });
      }
    },

    changeSearch: async (search) => {
      const filters = {
        ...get().filters,
        search,
      };

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
  };
});
