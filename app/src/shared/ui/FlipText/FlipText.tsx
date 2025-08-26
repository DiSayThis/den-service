'use client';

import { FC } from 'react';

import { motion } from 'motion/react';

const DURATION = 0.25;
const STAGGER = 0.025;
interface IFlipTextProp {
	hovered?: boolean;
	repeat?: boolean;
	repeatType?: 'loop' | 'reverse' | 'mirror';
	children: string;
}
const FlipText: FC<IFlipTextProp> = ({ children, hovered, repeat, repeatType = 'loop' }) => {
	return (
		<motion.span
			initial="initial"
			whileHover={hovered ? 'hovered' : undefined}
			animate={hovered ? undefined : 'hovered'}
			className="relative block overflow-hidden whitespace-nowrap uppercase"
		>
			<div>
				{children.split('').map((l, i) => (
					<motion.span
						variants={{
							initial: {
								y: 0,
							},
							hovered: {
								y: '-100%',
							},
						}}
						transition={{
							duration: DURATION,
							ease: 'easeInOut',
							delay: STAGGER * i,
							repeat: repeat ? Infinity : undefined,
							repeatType: repeatType,
							repeatDelay: 3,
						}}
						className="inline-block"
						key={i}
					>
						{l === ' ' ? '\u00A0' : l}
					</motion.span>
				))}
			</div>
			<div className="absolute inset-0">
				{children.split('').map((l, i) => (
					<motion.span
						variants={{
							initial: {
								y: '100%',
							},
							hovered: {
								y: 0,
							},
						}}
						transition={{
							duration: DURATION,
							ease: 'easeInOut',
							delay: STAGGER * i,
							repeat: repeat ? Infinity : undefined,
							repeatType: repeatType,
							repeatDelay: 3,
						}}
						className="inline-block"
						key={i}
					>
						{l === ' ' ? '\u00A0' : l}
					</motion.span>
				))}
			</div>
		</motion.span>
	);
};
export default FlipText;
