'use client';

import { FC, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { IImage } from '@/shared/types/typesStrapi';
import Card from '@/shared/ui/Card';
import MarkdownRenderer from '@/shared/ui/MarkdownRenderer';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './ProductDemoSection.module.scss';

interface IProductDemoSectionProps {
	direction?: 'right' | 'left';
	images?: IImage[];
	title?: string;
	description?: string;
}
const ProductDemoSection: FC<IProductDemoSectionProps> = ({
	direction = 'left',
	images = [],
	title = 'Наши проекты',
	description = 'За годы работы мы помогли сотням компаний успешно пройти путь цифровой трансформации. Наши проекты — это истории роста, автоматизации и оптимизации бизнес-процессов с реальным результатом. Мы внимательно слушаем задачи клиентов и предлагаем решения, которые не просто работают, а дают измеримый эффект.',
}) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	// Функция запуска таймера
	const startTimer = () => {
		// Чистим, если есть
		if (intervalRef.current) clearInterval(intervalRef.current);
		// Запускаем заново
		intervalRef.current = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % images.length);
		}, 5000);
	};

	// Запускаем при монтировании
	useEffect(() => {
		startTimer();
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
		};
	}, []);

	return (
		<AnimatedSectionPage className={clsx(styles.card, { [styles.reverse]: direction === 'right' })}>
			<Card className={styles.left}>
				<h2>{title}</h2>
				<MarkdownRenderer content={description} />
			</Card>
			<div className={styles.right}>
				<div className={styles.slideshow}>
					{images.map((image, i) => (
						<motion.div
							key={i}
							initial={{ opacity: 0, x: -20 }}
							animate={{
								opacity: i === activeIndex ? 1 : 0,
								x: i === activeIndex ? 0 : 20,
								zIndex: i === activeIndex ? 1 : 0,
							}}
							exit={{ opacity: 0, scale: 0.95 }}
							transition={{ duration: 0.6, ease: 'easeInOut' }}
							className={styles['image-wrapper']}
							style={{
								width: '100%',
								pointerEvents: i === activeIndex ? 'auto' : 'none',
								position: i === activeIndex ? 'relative' : 'absolute',
								inset: i === activeIndex ? 'unset' : 0,
							}}
						>
							<Image
								src={image.url}
								alt={`Demo ${i + 1}`}
								className={styles.image}
								width={800}
								height={600}
								sizes="600px"
							/>
						</motion.div>
					))}
				</div>
			</div>
		</AnimatedSectionPage>
	);
};

export default ProductDemoSection;
