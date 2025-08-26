import { create } from 'zustand';

interface ITelegramUser {
	id: number;
	first_name: string;
	last_name?: string;
	username?: string;
	language_code?: string;
}

interface ITelegramState {
	user: ITelegramUser | null;
	setUser: (user: ITelegramUser) => void;
}

export const useTelegramUserStore = create<ITelegramState>((set) => ({
	user: null,
	setUser: (user) => set({ user }),
}));
