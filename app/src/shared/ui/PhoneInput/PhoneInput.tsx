'use client';

import { FC, InputHTMLAttributes } from 'react';

import { useMask } from '@react-input/mask';
import clsx from 'clsx';
import { motion } from 'motion/react';

import styles from './PhoneInput.module.scss';

interface IPhoneInputProps extends InputHTMLAttributes<HTMLInputElement> {
	inputClassName?: string;
}

const PhoneInput: FC<IPhoneInputProps> = ({ className, inputClassName, ...rest }) => {
	const inputRef = useMask({
		mask: '+_ (___) ___-__-__',
		replacement: { _: /\d/ },
	});
	return (
		<motion.div
			className={clsx(styles.wrapper, className)}
			animate={{ fontWeight: 500 }}
			transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
		>
			<input
				ref={inputRef}
				name="phone"
				type="tel"
				{...rest}
				className={clsx(styles.input, inputClassName)}
			/>
		</motion.div>
	);
};

interface IPhoneInputRHSProps {
	value: string;
	onChange: (value: string) => void;
	onBlur?: () => void;
	inputClassName?: string;
	placeholder?: string;
}
export const PhoneInputRHS: FC<IPhoneInputRHSProps> = ({
	value,
	onChange,
	onBlur,
	inputClassName,
	...rest
}) => {
	const inputRef = useMask({
		mask: '+_ (___) ___-__-__',
		replacement: { _: /\d/ },
	});

	return (
		<motion.div className={clsx(styles.wrapper)}>
			<motion.input
				{...rest}
				initial={{
					boxShadow: '0 0 0 0px var(--border-color)',
				}}
				whileHover={{
					boxShadow: '0 0 0 3px var(--border-color)',
				}}
				whileFocus={{
					boxShadow: '0 0 0 3px var(--border-color)',
				}}
				ref={inputRef}
				type="tel"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				onBlur={onBlur}
				className={clsx(styles.input, inputClassName)}
			/>
		</motion.div>
	);
};

export default PhoneInput;
