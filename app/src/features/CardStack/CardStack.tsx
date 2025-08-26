'use client';

import React, { ReactNode, useRef } from 'react';

import { motion } from 'motion/react';

import styles from './CardStack.module.scss';

interface ICardStackProps {
	children: ReactNode;
}

const CardStack = ({ children }: ICardStackProps) => {
	const targetRef = useRef<HTMLDivElement>(null);

	return (
		<div className={styles.container} ref={targetRef}>
			{React.Children.map(children, (child) => {
				return <motion.div className={styles.card}>{child}</motion.div>;
			})}
		</div>
	);
};

export default CardStack;
