'use client';

import { FC, ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { PanInfo, animate, motion, useMotionValue } from 'framer-motion';

import styles from './Marquee.module.scss';

interface IMarqueeProps {
	speed?: number;
	direction?: 'left' | 'right';
	children?: ReactNode;
}

const Marquee: FC<IMarqueeProps> = ({ speed = 40, direction = 'left', children }) => {
	const directionRef = useRef(direction);
	const contentRef = useRef<HTMLDivElement>(null);
	const animationRef = useRef<ReturnType<typeof animate> | null>(null);
	const leftStart = 0;

	const [contentWidth, setContentWidth] = useState(0);
	const x = useMotionValue(0);

	useLayoutEffect(() => {
		if (contentRef.current)
			setContentWidth(contentRef.current.scrollWidth - contentRef.current.offsetWidth);
	}, []);

	const stopLoop = useCallback(() => {
		animationRef.current?.stop();
	}, []);

	const wrapPosition = useCallback(
		(val: number, dir: 'left' | 'right' = directionRef.current): number => {
			const leftDir = dir === 'left';
			if (!leftDir && (val > leftStart || val < -contentWidth)) return -contentWidth;
			if (leftDir && (val > leftStart || val < -contentWidth)) return leftStart;
			return val;
		},
		[contentWidth, directionRef],
	);

	const startLoop = useCallback(
		(from = x.get(), dir = directionRef.current) => {
			const to = dir === 'left' ? -contentWidth : leftStart;

			x.set(from);
			const distance = Math.abs(to - from);

			// вычисляем длительность как расстояние / скорость // чтобы не было деления на 0
			const duration = distance / speed;

			animationRef.current = animate(x, to, {
				duration,
				ease: 'linear',
				onComplete: () => {
					const newDir = dir === 'left' ? 'right' : 'left';
					directionRef.current = newDir;
					const wrapped = wrapPosition(x.get());
					startLoop(wrapped);
				},
			});
		},
		[contentWidth, directionRef, speed, wrapPosition, x],
	);

	useEffect(() => {
		if (contentWidth > 0) {
			const initialX = directionRef.current === 'left' ? leftStart : -contentWidth;
			x.set(initialX);
			startLoop(initialX);
		}
		return stopLoop;
	}, [contentWidth, directionRef, startLoop, stopLoop, x]);

	const handleDragEnd = (_: any, info: PanInfo) => {
		const newDir = info.velocity.x > 0 ? 'right' : 'left';
		const wrapped = wrapPosition(x.get(), newDir);
		x.set(wrapped);
		startLoop(wrapped, newDir);
	};

	useEffect(() => {
		let scrollTimeout: NodeJS.Timeout;

		const pauseOnScroll = () => {
			stopLoop();
			clearTimeout(scrollTimeout);
			scrollTimeout = setTimeout(() => {
				const wrapped = wrapPosition(x.get());
				startLoop(wrapped);
			}, 200); // через 300 мс после последнего скролла — стартуем
		};

		window.addEventListener('scroll', pauseOnScroll, { passive: true });
		window.addEventListener('wheel', pauseOnScroll, { passive: true });
		window.addEventListener('touchmove', pauseOnScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', pauseOnScroll);
			window.removeEventListener('wheel', pauseOnScroll);
			window.removeEventListener('touchmove', pauseOnScroll);
			clearTimeout(scrollTimeout);
		};
	}, [stopLoop, startLoop, x, wrapPosition]);

	return (
		<div className={styles.container}>
			<motion.div
				className={styles.line}
				style={{ x }}
				ref={contentRef}
				drag="x"
				dragConstraints={{ left: -Infinity, right: Infinity }}
				dragMomentum={false}
				onDragStart={stopLoop}
				onDragEnd={handleDragEnd}
			>
				{children}
			</motion.div>
		</div>
	);
};

export default Marquee;
