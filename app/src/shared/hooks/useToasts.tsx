'use client';

import { FC, ReactNode, createContext, useContext, useState } from 'react';

import Toast from '../ui/Toast';

interface IToastItem {
	id: number;
	message: string;
	type?: 'success' | 'error' | 'info';
	duration?: number;
}

interface IToastContextType {
	addToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => void;
}

const ToastContext = createContext<IToastContextType | undefined>(undefined);

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
	const [toasts, setToasts] = useState<IToastItem[]>([]);

	const addToast = (
		message: string,
		type: 'success' | 'error' | 'info' = 'info',
		duration = 3000,
	) => {
		const id = Date.now();
		setToasts((prev) => [...prev, { id, message, type, duration }]);
	};

	const removeToast = (id: number) => {
		setToasts((prev) => prev.filter((t) => t.id !== id));
	};

	return (
		<ToastContext.Provider value={{ addToast }}>
			{children}
			<div style={{ position: 'fixed', right: 20, bottom: 20, zIndex: 9999 }}>
				{toasts.map((t) => (
					<Toast
						key={t.id}
						message={t.message}
						type={t.type}
						duration={t.duration}
						onClose={() => removeToast(t.id)}
					/>
				))}
			</div>
		</ToastContext.Provider>
	);
};

export const useToast = (): IToastContextType => {
	const context = useContext(ToastContext);
	if (!context) throw new Error('useToast must be used within a ToastProvider');
	return context;
};
