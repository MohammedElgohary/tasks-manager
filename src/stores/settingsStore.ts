import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Theme, Language } from '@/models';
import i18n from 'i18next';

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
  colorPrimary: '#bc4749',
  language: Language.ENGLISH,
};

// Helper to apply theme to DOM
const applyThemeToDom = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme);

  if (theme === Theme.DARK) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...DEFAULT_SETTINGS,
      setTheme: (theme) => {
        applyThemeToDom(theme);
        set({ theme });
      },
      setColorPrimary: (colorPrimary) => set({ colorPrimary }),
      setLanguage: (language) => {
        i18n.changeLanguage(language);

        set({ language });
      },
      setSettings: (settings) => {
        if (settings.theme) {
          applyThemeToDom(settings.theme);
        }

        if (settings.language) {
          i18n.changeLanguage(settings.language);
        }

        set(settings);
      },
    }),
    {
      name: 'settings',
      onRehydrateStorage() {
        return (hydratedState) => {
          setTimeout(() => {
            if (!hydratedState) return;

            applyThemeToDom(hydratedState.theme);
            if (hydratedState.language) i18n.changeLanguage(hydratedState.language);
          }, 0);
        };
      },
    }
  )
);
