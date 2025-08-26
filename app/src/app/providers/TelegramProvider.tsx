'use client';

import { ReactNode, useEffect } from 'react';

import { useTelegramUserStore } from '@/shared/store/tg-user-store';

function parseInitData(initData: string) {
	const params = new URLSearchParams(initData);
	const userParam = params.get('user');
	if (!userParam) return null;
	try {
		return JSON.parse(userParam);
	} catch {
		return null;
	}
}

export function TelegramProvider({ children }: { children: ReactNode }) {
	const setUser = useTelegramUserStore((state) => state.setUser);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		// динамически импортируем SDK только на клиенте
		import('@twa-dev/sdk').then((module) => {
			const WebApp = module.default;

			// Если открыто в Telegram Mini App
			if (WebApp.initData) {
				const user = parseInitData(WebApp.initData);
				if (user) setUser(user);
			} else {
				// На случай, если initData передан через URL
				const urlParams = new URLSearchParams(window.location.search);
				const tgData = urlParams.get('tgWebAppData');
				if (tgData) {
					const user = parseInitData(tgData);
					if (user) setUser(user);
				}
			}
		});
	}, [setUser]);

	return <>{children}</>;
}
