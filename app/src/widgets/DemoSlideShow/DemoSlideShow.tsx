'use client';

import { FC } from 'react';

import Image from 'next/image';

import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { landingDemoScreenshots } from '@/shared/text';
import InfiniteScroll from '@/features/InfiniteScroll';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './DemoSlideShow.module.scss';

interface IDemoSlideShowProps {
	speed?: number;
	direction?: 'left' | 'right';
	heightImages?: number;
	widthImages?: number;
	imgPathArray?: string[];
}
const DemoSlideShow: FC<IDemoSlideShowProps> = ({
	direction = 'left',
	heightImages = 600,
	widthImages = 600,
	imgPathArray = landingDemoScreenshots,
}) => {
	const isMobile = useIsMobile();
	return (
		<AnimatedSectionPage className={styles.section}>
			<InfiniteScroll direction={direction} fastDuration={200} slowDuration={800}>
				{[...imgPathArray, ...imgPathArray, ...imgPathArray].map((src, i) => {
					return (
						<div
							key={i}
							className={styles.image__container}
							style={{
								height: isMobile ? heightImages / 2 : heightImages,
								width: isMobile ? widthImages / 3 : widthImages,
							}}
						>
							<Image
								className={styles.image}
								src={src}
								alt={`logo-${i}`}
								height={isMobile ? heightImages / 2 : heightImages}
								width={isMobile ? widthImages / 3 : widthImages}
								draggable={false}
								sizes="600px"
								loading="eager"
							/>
						</div>
					);
				})}
			</InfiniteScroll>
		</AnimatedSectionPage>
	);
};

export default DemoSlideShow;
