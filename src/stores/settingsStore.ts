import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Theme, Language } from "@/models";
import i18n from "i18next";

interface SettingsState {
  theme: Theme;
  colorPrimary: string;
  language: Language;
}

interface SettingsStore extends SettingsState {
  setTheme: (theme: Theme) => void;
  setColorPrimary: (color: string) => void;
  setLanguage: (language: Language) => void;
  setSettings: (settings: Partial<SettingsState>) => void;
}

const DEFAULT_SETTINGS: SettingsState = {
  theme: Theme.LIGHT,
  colorPrimary: "#bc4749",
  language: Language.ENGLISH,
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      setTheme: (theme) => set({ theme }),
      setColorPrimary: (colorPrimary) => set({ colorPrimary }),
      setLanguage: (language) => {
        i18n.changeLanguage(language);
        set({ language });
      },
      setSettings: (settings) => {
        if (settings.language) {
          i18n.changeLanguage(settings.language);
        }
        set(settings);
      },
    }),
    {
      name: "settings",
    },
  ),
);
