import { FC } from 'react';

import { IReview } from '@/shared/types/typesStrapi';
import MarqueeReviews from '@/features/Marquee/ui/MarqueeReviews';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './ReviewsSection.module.scss';

interface IReviewsSection {
	data?: IReview[];
}
const ReviewsSection: FC<IReviewsSection> = ({ data }) => {
	return (
		<AnimatedSectionPage className={styles.section}>
			<MarqueeReviews reviewsArray={data} />
		</AnimatedSectionPage>
	);
};

export default ReviewsSection;
