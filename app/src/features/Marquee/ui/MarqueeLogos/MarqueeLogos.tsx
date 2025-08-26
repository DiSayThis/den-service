'use client';

import { FC } from 'react';

import Image from 'next/image';

import { logosUrls } from '@/shared/text';
import InfiniteScroll from '@/features/InfiniteScroll';

import styles from './MarqueeLogos.module.scss';

interface IMarqueeLogosProps {
	speed?: number; // px/sec
	direction?: 'left' | 'right';
	heightImages?: number;
	logoPathArray?: string[];
}

const MarqueeLogos: FC<IMarqueeLogosProps> = ({
	direction = 'left',
	heightImages = 80,
	logoPathArray = logosUrls,
}) => {
	return (
		<InfiniteScroll direction={direction}>
			{[...logoPathArray, ...logoPathArray, ...logoPathArray].map((src, i) => {
				return (
					<div key={i} className={styles.logo}>
						<Image
							src={src}
							alt={`logo-${i}`}
							height={heightImages}
							width={heightImages}
							draggable={false}
							className={styles.image}
							sizes="50vw"
							loading="eager"
						/>
					</div>
				);
			})}
		</InfiniteScroll>
	);
};

export default MarqueeLogos;
