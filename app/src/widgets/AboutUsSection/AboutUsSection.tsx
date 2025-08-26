'use client';

import { FC, useState } from 'react';

import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { IAboutUsData } from '@/shared/types/typesStrapi';
import ButtonCustom from '@/shared/ui/ButtonCustom';
import Card from '@/shared/ui/Card';
import MarkdownRenderer from '@/shared/ui/MarkdownRenderer';
import GlareHover from '@/shared/ui/ReactBits/GlareHover';
import FontAwesomeIcon from '@/shared/ui/icons/FontAwesomeIcon';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './AboutUsSection.module.scss';

interface IAboutUsProps {
	data?: IAboutUsData;
}

const AboutUsSection: FC<IAboutUsProps> = ({
	data = { title: 'ПОЧЕМУ НАМ ДОВЕРЯЮТ', description: '', cards: [] },
}) => {
	const isMobile = useIsMobile();
	const [showAll, setShowAll] = useState(false);

	const visibleCards = isMobile && !showAll ? data.cards.slice(0, 3) : data.cards;

	return (
		<AnimatedSectionPage className={styles.section}>
			<ButtonCustom className={styles.header} customType="primary">
				<h2>{data?.title}</h2>
			</ButtonCustom>

			<Card customType="secondary" className={styles.content}>
				<div className={styles.description}>
					<MarkdownRenderer content={data.description} />
				</div>

				<div className={styles.cards}>
					{visibleCards.map((item, index) => (
						<Card
							key={index + '-about-card'}
							customType="white"
							className={styles.card}
							initial={{ opacity: 0, scale: 0.75 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
						>
							<GlareHover>
								{item?.iconName && (
									<div className={styles.icon}>
										<FontAwesomeIcon name={item.iconName} size={50} />
									</div>
								)}
								<h3 className={styles.card__title}>{item?.title}</h3>
								<p className={styles.card__description}>{item?.description}</p>
							</GlareHover>
						</Card>
					))}

					{/* Кнопка "Показать ещё" только на мобилке */}
					{isMobile && !showAll && data.cards.length > 3 && (
						<div className={styles.showMoreWrapper}>
							<ButtonCustom
								customType="secondary"
								onClick={() => setShowAll(true)}
								className={styles.showMoreBtn}
							>
								Показать ещё
							</ButtonCustom>
						</div>
					)}
				</div>
			</Card>
		</AnimatedSectionPage>
	);
};

export default AboutUsSection;
