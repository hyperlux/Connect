import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

// Get initial theme from system preference
const getInitialTheme = (): Theme => {
  // Check if theme was previously stored
  const storedTheme = localStorage.getItem('app-theme');
  if (storedTheme) {
    return storedTheme as Theme;
  }
  
  // If no stored theme, check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

export const useTheme = create<ThemeState>()(
  persist(
    (set) => ({
      theme: getInitialTheme(),
      setTheme: (theme) => {
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
        localStorage.setItem('app-theme', theme);
        set({ theme });
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(newTheme);
          localStorage.setItem('app-theme', newTheme);
          return { theme: newTheme };
        });
      },
    }),
    {
      name: 'app-theme',
      skipHydration: true // This ensures theme persists independently
    }
  )
);