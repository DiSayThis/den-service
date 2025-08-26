'use client';

import { FC, useState } from 'react';

import { motion } from 'motion/react';

import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { problemCardsContent } from '@/shared/text';
import { IProblemsData } from '@/shared/types/typesStrapi';
import MarkdownRenderer from '@/shared/ui/MarkdownRenderer';
import DecryptedText from '@/shared/ui/ReactBits/DecryptedText';
import GlareHover from '@/shared/ui/ReactBits/GlareHover';
import FontAwesomeIcon from '@/shared/ui/icons/FontAwesomeIcon';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './ProblemsSection.module.scss';

interface IProblemsSection {
	data?: IProblemsData;
}
const ProblemsSection: FC<IProblemsSection> = ({ data }) => {
	const isMobile = useIsMobile();
	const [activeIndex, setActiveIndex] = useState<number | null>(null);

	// const toggleCard = (index: number) => {
	// 	setActiveIndex((prev) => (prev === index ? null : index));
	// };
	return (
		<AnimatedSectionPage className={styles.section}>
			<motion.div className={styles.section__text}>
				<motion.h2 className={styles.title}>
					{data?.title ? (
						data?.title
					) : (
						<>
							Сложно выбрать отечественное ПО?
							<br />
							<u>Мы</u> уже{' '}
							<u>
								<DecryptedText
									text="разобрались"
									speed={80}
									animateOn="all"
									maxIterations={20}
									sequential
									className="underline"
								/>
							</u>{' '}
							за вас!
						</>
					)}
				</motion.h2>
				<div className={styles.description}>
					{data?.description ? (
						<MarkdownRenderer content={data.description} />
					) : (
						<>
							Навигатор — это команда, прошедшая путь от подбора до внедрения во всех ключевых
							отраслях.
						</>
					)}
				</div>
			</motion.div>
			<div className={styles.section__cards}>
				{(data?.cards ?? problemCardsContent).map((problem, index) => {
					const isActive = activeIndex === index;

					return (
						<motion.div
							key={'problem-' + index}
							className={styles.card}
							// onClick={() => isMobile && toggleCard(index)}
							initial="closed"
							animate={isMobile && isActive ? 'open' : 'closed'}
							whileHover={!isMobile ? 'open' : undefined}
							onHoverEnd={() => setActiveIndex(null)}
							variants={{
								closed: !isMobile ? { scale: 1 } : {},
								open: !isMobile ? { scale: 1.05, zIndex: 1 } : {},
							}}
							transition={{ duration: 0.3 }}
						>
							{/* Основное содержимое */}
							{problem.iconName && (
								<FontAwesomeIcon className={styles.card__icon} size={100} name={problem.iconName} />
							)}
							<motion.h3 className={styles.card__title}>{problem?.title}</motion.h3>
							<motion.p className={styles.card__description}>{problem.description}</motion.p>

							{/* Шторка */}
							<motion.div
								className={styles.card__overlay}
								variants={{
									closed: {
										y: '-100%',
										x: 0,
										borderBottomLeftRadius: '50%',
										borderBottomRightRadius: '50%',
									},
									open: {
										y: 0,
										x: 0,
										borderBottomLeftRadius: 0,
										borderBottomRightRadius: 0,
									},
								}}
								transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.2 }}
							>
								<h3>{problem.solution ?? 'Решение проблемы'}</h3>
								<GlareHover customType="absolute" />
							</motion.div>
							{isMobile && (
								<p className={styles.solution__mobile}>{problem.solution ?? 'Решение проблемы'}</p>
							)}
							<GlareHover customType="absolute" />
						</motion.div>
					);
				})}
			</div>
		</AnimatedSectionPage>
	);
};

export default ProblemsSection;
