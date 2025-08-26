'use client';

import { FC, useRef } from 'react';

import { KeyframeOptions, animate, useInView, useIsomorphicLayoutEffect } from 'motion/react';

interface IAnimatedCounterProps {
	from?: number;
	to: number;
	animationOptions?: KeyframeOptions;
	text?: string;
}

const FlipDigit: FC<IAnimatedCounterProps> = ({
	from = 0,
	to = 500,
	animationOptions,
	text = '',
}) => {
	const ref = useRef<HTMLSpanElement>(null);
	const inView = useInView(ref);
	const addText = text && text !== 'null' ? text : '';
	useIsomorphicLayoutEffect(() => {
		const element = ref.current;

		if (!element) return;
		if (!inView) return;

		element.textContent = String(from);

		if (window.matchMedia('(prefers-reduced-motion)').matches) {
			element.textContent = String(to) + text;
			return;
		}

		const controls = animate(from, to, {
			duration: 5,
			ease: 'easeOut',
			...animationOptions,
			onUpdate(value) {
				element.textContent = value.toFixed(0) + addText;
			},
		});

		// Cancel on unmount
		return () => {
			controls.stop();
		};
	}, [ref, inView, from, to]);

	return <span ref={ref} />;
};

export default FlipDigit;
