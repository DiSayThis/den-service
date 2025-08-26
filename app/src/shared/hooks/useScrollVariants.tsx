import { useState } from 'react';

import { Variants, stagger, useMotionValueEvent, useScroll } from 'motion/react';

export function useScrollVariants() {
	const { scrollY } = useScroll();
	const [scrollVariants, setScrollVariants] = useState<Variants>({
		hidden: { y: 75, scale: 0.75, transition: { when: 'afterChildren' } },
		visible: (i: number = 1) => ({
			y: 0,
			scale: 1,
			transition: {
				ease: 'easeInOut',
				duration: i * 0.75,
				when: 'beforeChildren',
				delayChildren: stagger(0.5),
			},
		}),
	});

	useMotionValueEvent(scrollY, 'change', (current) => {
		const previous = scrollY.getPrevious() ?? 0;
		const diff = current - previous;
		setScrollVariants((prev) => ({ ...prev, hidden: { ...prev.hidden, y: diff > 0 ? -60 : 60 } }));
	});
	return scrollVariants;
}
