import { create } from "zustand";
import type { Analytics } from "@/models";
import { requestGetAnalytics } from "@/network";

interface AnalyticsStore {
  isLoading: boolean;
  analytics: Analytics | null;
  error: unknown;
  fetchAnalytics: () => Promise<void>;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  isLoading: false,
  analytics: null,
  error: null,

  fetchAnalytics: async () => {
    set({ isLoading: true, error: null });
    try {
      const analytics = await requestGetAnalytics();
      set({ analytics, isLoading: false });
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));
