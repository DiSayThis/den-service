'use client';

import { FC } from 'react';

import { Variants } from 'motion';
import Image from 'next/image';

import { reviews } from '@/shared/text';
import { IReview } from '@/shared/types/typesStrapi';
import Card from '@/shared/ui/Card';
import MagneticWrapper from '@/shared/ui/animations/MagneticWrapper';

import Marquee from '../Marquee/Marquee';
import styles from './MarqueeReviews.module.scss';

export type Review = {
	avatar: string;
	name: string;
	text: string;
	rating: number;
};

interface IMarqueeReviewsProps {
	speed?: number; // px/sec
	direction?: 'left' | 'right';
	reviewsArray?: IReview[];
}

const MarqueeReviews: FC<IMarqueeReviewsProps> = ({
	speed = 40,
	direction = 'left',
	reviewsArray = reviews,
}) => {
	const variant: Variants = {
		hidden: { opacity: 0, scale: 0.75 },
		visible: {
			opacity: 1,
			scale: 1,
			transition: {
				ease: 'easeInOut',
				duration: 0.75,
			},
		},
	};
	return (
		<Marquee speed={speed} direction={direction}>
			{[...reviewsArray, ...reviewsArray].map((review, idx) => (
				<MagneticWrapper key={`${review.name}-${idx}`} className={styles.card}>
					<Card variants={variant} initial="hidden" whileInView="visible">
						<div className={styles.person}>
							<Image
								src={review.avatar.url}
								alt={review.name}
								width={50}
								height={50}
								className={styles.avatar}
							/>
							<div>
								<h4>{review.name}</h4>
								<div className={styles.rating}>
									{'★'.repeat(review.rating)}
									{'☆'.repeat(5 - review.rating)}
								</div>
							</div>
						</div>
						<p>{review.text}</p>
					</Card>
				</MagneticWrapper>
			))}
		</Marquee>
	);
};

export default MarqueeReviews;
