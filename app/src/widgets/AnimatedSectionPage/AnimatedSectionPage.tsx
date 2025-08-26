'use client';

import { FC, ReactNode, useRef } from 'react';

import clsx from 'clsx';
import { motion, useScroll, useTransform } from 'framer-motion';

interface IAnimatedSectionPageProps {
	children?: ReactNode;
	className?: string;
	id?: string;
}

const AnimatedSectionPage: FC<IAnimatedSectionPageProps> = ({
	children,
	className,
	id,
	...rest
}) => {
	const ref = useRef<HTMLElement>(null);

	const { scrollYProgress } = useScroll({
		target: ref,
		offset: ['start end', 'end start'],
	});
	const y = useTransform(scrollYProgress, [0, 0.2], [10, 0]);
	const scale = useTransform(scrollYProgress, [0, 0.2, 1], [0.6, 1, 1]);
	const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

	return (
		<motion.section
			ref={ref}
			id={id}
			style={{ y, scale, opacity }}
			className={clsx(className)}
			{...rest}
		>
			{children}
		</motion.section>
	);
};

export default AnimatedSectionPage;
