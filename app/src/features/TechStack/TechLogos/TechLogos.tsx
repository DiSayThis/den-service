'use client';

import React from 'react';

import { motion } from 'motion/react';
import Image from 'next/image';

import { useThemeStore } from '@/shared/store/theme-store';
import { ITechCard } from '@/shared/types/typesStrapi';

import styles from '../TechStack.module.scss';

function TechLogos({
	techItems = [],
	sizeLogo = 80,
}: {
	techItems: ITechCard[];
	sizeLogo?: number;
}) {
	const { theme } = useThemeStore();
	return (
		<div className={styles.tech__grid}>
			{techItems.map(({ name, image: logoUrl }) => (
				<div key={name} className={styles.tech__item} title={name}>
					<motion.div
						className={styles.image__container}
						style={{ width: sizeLogo, height: sizeLogo }}
						initial={
							theme === 'dark'
								? {
										scale: 0.75,
										filter: 'grayscale(1)',
									}
								: {
										scale: 0.75,
										filter: undefined,
									}
						}
						whileHover={{
							scale: 1.1,
							filter: theme === 'dark' ? 'grayscale(0)' : undefined,
						}}
						whileTap={{
							scale: 1.1,
							filter: theme === 'dark' ? 'grayscale(0)' : undefined,
						}}
						animate={theme === 'dark' ? { filter: 'grayscale(1)' } : { filter: undefined }}
						transition={{ duration: 0.3, ease: 'easeInOut' }}
					>
						<Image
							src={logoUrl.url}
							alt={name}
							width={sizeLogo}
							height={sizeLogo}
							style={{
								objectFit: 'contain',
								width: sizeLogo,
								height: sizeLogo,
							}}
							priority
							sizes="200px"
							className={styles.image}
						/>
					</motion.div>
					<span>{name}</span>
				</div>
			))}
		</div>
	);
}

export default TechLogos;
