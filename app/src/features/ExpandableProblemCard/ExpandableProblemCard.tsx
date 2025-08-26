'use client';

import { FC } from 'react';

import clsx from 'clsx';
import { HTMLMotionProps, Variants, motion } from 'motion/react';

import { useIsMobile } from '@/shared/hooks/useIsMobile';
import GlareHover from '@/shared/ui/ReactBits/GlareHover';
import FontAwesomeIcon from '@/shared/ui/icons/FontAwesomeIcon';
import { TypeFontAwesomeIconName } from '@/shared/ui/icons/icons.types';

import styles from './ExpandableProblemCard.module.scss';

interface IExpandableProblemCardProps extends HTMLMotionProps<'div'> {
	iconName?: TypeFontAwesomeIconName;
	title: string;
	description: string;
	hiddenText?: string;
	variants?: Variants;
}

const ExpandableProblemCard: FC<IExpandableProblemCardProps> = ({
	iconName,
	title,
	description,
	hiddenText,
	...rest
}) => {
	const isMobile = useIsMobile();
	const cardVariants: Variants = {
		rest: {
			scale: 1,
			zIndex: 1,
			y: 0,
		},
		hover: {
			scale: isMobile ? 1 : 1.1,
			zIndex: 3,
			y: -10,
			transition: {
				type: 'spring',
				stiffness: 200,
				damping: 20,
			},
		},
	};

	const textVariants: Variants = {
		rest: {
			opacity: 0,
			y: 10,
			height: 0,
			transition: {
				duration: 0.3,
				ease: 'easeOut',
			},
		},
		hover: {
			opacity: 1,
			y: 0,
			height: 'fit-content',
			transition: {
				delay: 0.2,
				duration: 0.4,
				ease: 'easeOut',
			},
		},
	};

	return (
		<motion.div
			initial="rest"
			whileHover={!isMobile ? 'hover' : undefined}
			whileInView={isMobile ? 'hover' : undefined}
			viewport={isMobile ? { once: true } : { once: false }}
			variants={cardVariants}
			className={clsx(styles.card, rest.className)}
			{...rest}
		>
			<GlareHover>
				<motion.div className={styles.card__inner}>
					{iconName && <FontAwesomeIcon className={styles.card__icon} size={100} name={iconName} />}
					<motion.h3 className={styles.card__title}>{title}</motion.h3>
					<motion.p className={styles.card__description}>{description}</motion.p>
					{hiddenText && (
						<motion.p variants={textVariants} className={clsx(styles.card__text)}>
							{hiddenText}
						</motion.p>
					)}
				</motion.div>
			</GlareHover>
		</motion.div>
	);
};

export default ExpandableProblemCard;
