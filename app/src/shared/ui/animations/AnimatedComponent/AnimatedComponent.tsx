'use client';

import type { ReactNode } from 'react';
import { HTMLMotionProps, Variants, motion } from 'framer-motion';

interface IAnimatedComponentProps extends HTMLMotionProps<'div'> {
	children: ReactNode;
	variants?: Variants;
}

const defaultVariants: Variants = {
	initial: { opacity: 0, y: 30 },
	animate: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6 },
	},
};

const AnimatedComponent = ({
	children,
	variants = defaultVariants,
	...rest
}: IAnimatedComponentProps) => {
	return (
		<motion.div {...rest} variants={variants}>
			{children}
		</motion.div>
	);
};

export default AnimatedComponent;
