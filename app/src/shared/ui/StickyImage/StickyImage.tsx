import { FC, ReactNode, useRef } from 'react';

import { motion, useScroll, useTransform } from 'motion/react';
import Image from 'next/image';

import styles from './StickyImage.module.scss';

interface IStickyImageProps {
	imgUrl: string;
}
const StickyImage: FC<IStickyImageProps> = ({ imgUrl }) => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ['end end', 'end start'],
	});

	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.75]);
	const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

	return (
		<motion.div
			style={{
				scale,
			}}
			ref={targetRef}
			className={styles.container__image}
		>
			<Image
				className="absolute inset-0 bg-neutral-950/70"
				src={imgUrl}
				alt="Hero"
				fill
				priority
				style={{
					objectFit: 'cover',
					objectPosition: 'center',
				}}
			/>
			<motion.div
				className="absolute inset-0 bg-neutral-950/70"
				style={{
					opacity,
				}}
			/>
		</motion.div>
	);
};
interface IOverlayCopyProps {
	children: ReactNode;
}
export const OverlayCopy: FC<IOverlayCopyProps> = ({ children }) => {
	const targetRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ['start end', 'end start'],
	});

	const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
	const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

	return (
		<motion.div
			style={{
				y,
				opacity,
			}}
			ref={targetRef}
			className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center"
		>
			{children}
		</motion.div>
	);
};

export default StickyImage;
