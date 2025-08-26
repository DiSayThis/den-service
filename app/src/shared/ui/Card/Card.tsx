import { FC, ReactNode } from 'react';

import clsx from 'clsx';
import { HTMLMotionProps, motion } from 'motion/react';

import styles from './Card.module.scss';

interface ICardProps extends HTMLMotionProps<'div'> {
	children?: ReactNode;
	customType?: 'primary' | 'secondary' | 'white';
}

const Card: FC<ICardProps> = ({ children, className, customType, ...rest }) => {
	return (
		<motion.div
			{...rest}
			className={clsx(
				styles.card,
				{
					[styles.primary]: customType === 'primary',
					[styles.secondary]: customType === 'secondary',
					[styles.white]: customType === 'white',
				},
				className,
			)}
		>
			{children}
		</motion.div>
	);
};

export default Card;
