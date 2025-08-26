import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface IThemeStore {
	theme: Theme;
	setTheme: (theme: Theme) => void;
	toggleTheme: () => void;
}

export const useThemeStore = create<IThemeStore>((set) => ({
	theme: 'light',
	setTheme: (theme) => {
		localStorage.setItem('theme', theme);
		document.documentElement.setAttribute('data-theme', theme);
		set({ theme });
	},
	toggleTheme: () =>
		set((state) => {
			const next = state.theme === 'light' ? 'dark' : 'light';
			localStorage.setItem('theme', next);
			document.documentElement.setAttribute('data-theme', next);
			return { theme: next };
		}),
}));
