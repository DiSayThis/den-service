'use client';

import { useRef } from 'react';

import { HTMLMotionProps, motion, useMotionValue, useSpring } from 'framer-motion';

interface IMagneticWrapperProps extends HTMLMotionProps<'div'> {
	children: React.ReactNode;
	strength?: number; // Сила магнитного притяжения
}

export default function MagneticWrapper({
	children,
	strength = 30,
	...rest
}: IMagneticWrapperProps) {
	const ref = useRef<HTMLDivElement>(null);

	// Motion values с плавностью
	const x = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });
	const y = useSpring(useMotionValue(0), { stiffness: 300, damping: 20 });

	const handleMouseMove = (e: React.MouseEvent) => {
		const rect = ref.current?.getBoundingClientRect();
		if (!rect) return;

		const offsetX = e.clientX - rect.left - rect.width / 2;
		const offsetY = e.clientY - rect.top - rect.height / 2;

		// Пропорционально size и strength
		x.set((offsetX / rect.width) * strength);
		y.set((offsetY / rect.height) * strength);
	};

	const handleMouseLeave = () => {
		x.set(0);
		y.set(0);
	};

	return (
		<motion.div
			{...rest}
			ref={ref}
			style={{
				...rest.style,
				width: '100%',
				display: 'inline-block',
				x,
				y,
			}}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			{children}
		</motion.div>
	);
}
