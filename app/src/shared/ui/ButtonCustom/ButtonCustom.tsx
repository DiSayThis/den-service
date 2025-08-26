'use client';

import { ButtonHTMLAttributes, FC, useRef } from 'react';

import clsx from 'clsx';

import GlareHover from '../ReactBits/GlareHover';
import styles from './ButtonCustom.module.scss';

export interface IButtonCustomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	customType?: 'primary' | 'secondary' | 'white' | 'warning' | 'error' | 'info';
	glareEffect?: boolean;
}

const ButtonCustom: FC<IButtonCustomProps> = ({
	className,
	children,
	onClick,
	customType = 'primary',
	glareEffect = true,
	...rest
}) => {
	const buttonRef = useRef<HTMLButtonElement>(null);

	const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
		const button = buttonRef.current;
		if (!button) return;

		const circle = document.createElement('span');
		const diameter = Math.max(button.clientWidth, button.clientHeight);
		const radius = diameter / 2;

		circle.classList.add(styles.ripple);
		circle.style.width = circle.style.height = `${diameter}px`;
		circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
		circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;

		button.appendChild(circle);

		setTimeout(() => {
			circle.remove();
		}, 1000);
	};

	return (
		<button
			ref={buttonRef}
			{...rest}
			onClick={(e) => {
				createRipple(e);
				onClick?.(e);
			}}
			className={clsx(
				styles.button,
				{
					[styles.warning]: customType === 'warning',
					[styles.error]: customType === 'error',
					[styles.info]: customType === 'info',
					[styles.white]: customType === 'white',
					[styles.primary]: customType === 'primary',
					[styles.secondary]: customType === 'secondary',
				},
				className,
			)}
		>
			{glareEffect ? (
				<div className={styles.content}>
					{children}
					<GlareHover customType="absolute" />
				</div>
			) : (
				<div className={styles.content}>{children}</div>
			)}
		</button>
	);
};

export default ButtonCustom;
