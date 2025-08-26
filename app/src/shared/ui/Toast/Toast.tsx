'use client';

import { FC, useEffect } from 'react';

import clsx from 'clsx';
import { motion } from 'motion/react';

import ButtonCustom from '../ButtonCustom';
import styles from './Toast.module.scss';

interface IToastProps {
	message: string;
	type?: 'success' | 'error' | 'info';
	duration?: number; // мс
	onClose: () => void;
}

const Toast: FC<IToastProps> = ({ message, type = 'info', duration = 3000, onClose }) => {
	useEffect(() => {
		const timer = setTimeout(onClose, duration);
		return () => clearTimeout(timer);
	}, [duration, onClose]);

	return (
		<motion.div
			className={clsx(styles.toast, styles[type])}
			initial={{ opacity: 0, y: -20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: +20 }}
		>
			<span>{message}</span>
			<ButtonCustom customType="secondary" className={styles.close} onClick={onClose}>
				×
			</ButtonCustom>
		</motion.div>
	);
};

export default Toast;
