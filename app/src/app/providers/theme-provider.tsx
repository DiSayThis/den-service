'use client';

import { useEffect } from 'react';

import { useThemeStore } from '@/shared/store/theme-store';

const setInitialTheme = `
(function () {
	try {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
			document.documentElement.setAttribute('data-theme', 'dark');
		} else {
			document.documentElement.setAttribute('data-theme', 'light');
		}
	} catch (e) {}
})();
`;

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	const setTheme = useThemeStore((state) => state.setTheme);

	useEffect(() => {
		const localTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
		if (localTheme) {
			setTheme(localTheme);
		} else {
			const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
			setTheme(prefersDark ? 'dark' : 'light');
		}
	}, [setTheme]);

	return (
		<>
			<head>
				<script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
			</head>
			{children}
		</>
	);
};
