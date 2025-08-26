import { FC, ReactNode, useEffect, useRef, useState } from 'react';

import { animate } from 'motion';
import { motion, useMotionValue } from 'motion/react';
import useMeasure from 'react-use-measure';

import styles from './InfiniteScroll.module.scss';

export interface IInfiniteScrollProps {
	children?: ReactNode;
	direction?: 'left' | 'right';
	fastDuration?: number;
	slowDuration?: number;
	scrollReaction?: boolean;
}

const InfiniteScroll: FC<IInfiniteScrollProps> = ({
	children,
	direction: initialDirection = 'left',
	fastDuration = 100,
	slowDuration = 180,
	scrollReaction,
}) => {
	const [ref, { width }] = useMeasure();
	const xTransition = useMotionValue(0);

	const [direction, setDirection] = useState<'left' | 'right'>(initialDirection);
	const [duration, setDuration] = useState(fastDuration);
	const [mustFinish, setMustFinish] = useState(false);
	const [rerender, setRerender] = useState(false);
	const lastScrollTop = useRef(0);

	useEffect(() => {
		const handleScroll = () => {
			if (scrollReaction) {
				const scrollTop = window.scrollY;

				if (scrollTop > lastScrollTop.current) {
					if (direction !== initialDirection) {
						setDirection(initialDirection);
						setMustFinish(true);
					}
				} else if (scrollTop < lastScrollTop.current) {
					const opposite = initialDirection === 'left' ? 'right' : 'left';
					if (direction !== opposite) {
						setDirection(opposite);
						setMustFinish(true);
					}
				}

				lastScrollTop.current = scrollTop;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [direction, initialDirection, scrollReaction]);

	useEffect(() => {
		let controls;
		const finalPosition = -width / 3 - 8;

		const isLeft = direction === 'left';
		const start = isLeft ? 0 : finalPosition;
		const end = isLeft ? finalPosition : 0;

		const x = xTransition.get();

		const remainingDistance = isLeft ? end - x : x - end;

		if (mustFinish) {
			const speed = (width / 3 + 8) / duration;
			const remainingTime = Math.abs(remainingDistance) / speed;

			controls = animate(xTransition, [x, end], {
				ease: 'linear',
				duration: remainingTime,
				onComplete: () => {
					setMustFinish(false);
					setRerender((r) => !r);
				},
			});
		} else {
			controls = animate(xTransition, [start, end], {
				ease: 'linear',
				duration,
				repeat: Infinity,
			});
		}

		return controls?.stop;
	}, [xTransition, width, direction, duration, mustFinish, rerender]);

	const hoverStart = () => {
		setMustFinish(true);
		setDuration(slowDuration);
	};

	const hoverEnd = () => {
		setMustFinish(true);
		setDuration(fastDuration);
	};

	return (
		<div className={styles.infinite__scroll}>
			<motion.div
				ref={ref}
				className={styles.line}
				style={{ x: xTransition }}
				onTapStart={hoverStart}
				onTap={hoverEnd}
				onHoverStart={hoverStart}
				onHoverEnd={hoverEnd}
			>
				{children}
				{children}
				{children}
			</motion.div>
		</div>
	);
};

export default InfiniteScroll;
