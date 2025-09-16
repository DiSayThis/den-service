'use client';

import React, { FC, Fragment, useEffect, useRef, useState } from 'react';

import { motion } from 'motion/react';

import { IHeroData, IModalData } from '@/shared/types/typesStrapi';
import ButtonCustom from '@/shared/ui/ButtonCustom';
import FlipText from '@/shared/ui/FlipText';
import MarkdownRenderer from '@/shared/ui/MarkdownRenderer';
import Modal from '@/shared/ui/Modal';
import DecryptedText from '@/shared/ui/ReactBits/DecryptedText';
import MagneticWrapper from '@/shared/ui/animations/MagneticWrapper';
import FileForm from '@/features/FileForm/FileForm';
import InfiniteScroll from '@/features/InfiniteScroll';

import styles from './HeroAnimatedSection.module.scss';

interface IHeroAnimatedSectionProps {
	text?: IHeroData;
	modalText?: IModalData;
}
const HeroAnimatedSection: FC<IHeroAnimatedSectionProps> = ({ text, modalText }) => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const handleCloseModal = () => setIsOpenModal(false);
	return (
		<section className={styles.hero}>
			{/* Фон */}
			<div className={styles.background}>
				<BackgroundMarquee text={text?.backgroundText ?? 'Develop and quality'} />
			</div>
			{/* Передний слой */}
			<div className={styles.foreground}>
				<h1 className={styles.title}>
					{text ? (
						text?.title.split(' ').map((word, index) => (
							<Fragment key={'hero-title-' + index}>
								<DecryptedText
									text={word}
									speed={80}
									animateOn="all"
									maxIterations={20}
									sequential
								/>
								<br />
							</Fragment>
						))
					) : (
						<>
							<DecryptedText
								text="Навигатор"
								speed={80}
								animateOn="all"
								maxIterations={20}
								sequential
							/>
							<br />
							<DecryptedText
								text="цифровой"
								speed={80}
								animateOn="all"
								maxIterations={20}
								sequential
							/>
							<br />
							<DecryptedText
								text="трансформации"
								speed={80}
								animateOn="all"
								maxIterations={20}
								sequential
							/>
						</>
					)}
				</h1>
				<div className={styles.description}>
					{text?.description ? (
						<MarkdownRenderer content={text.description} />
					) : (
						<p>
							Ориентир в мире отечественного ПО — выбери подходящую платформу, получи коммерческое
							предложение и рекомендации от экспертов.
						</p>
					)}
				</div>
				<div>
					<MagneticWrapper>
						<ButtonCustom onClick={() => setIsOpenModal(true)} className={styles.button}>
							<FlipText repeat repeatType="mirror">
								{text?.buttonText ? text.buttonText : 'Попробовать SalesKit AI'}
							</FlipText>
						</ButtonCustom>
					</MagneticWrapper>
				</div>
			</div>
			<Modal isOpen={isOpenModal} onClose={handleCloseModal}>
				<FileForm onSubmit={handleCloseModal} text={modalText} />
			</Modal>
			<motion.div
				whileInView={{ opacity: [0, 1] }}
				transition={{ duration: 2, delay: 5 }}
				className={styles.scroll__hint}
			>
				<motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
					↓
				</motion.div>
				<span>скролл</span>
			</motion.div>
		</section>
	);
};

function BackgroundMarquee({ text }: { text: string }) {
	const containerRef = useRef<HTMLDivElement>(null);
	const [rows, setRows] = useState(0);

	useEffect(() => {
		if (!containerRef.current) return;

		const resizeObserver = new ResizeObserver(() => {
			if (!containerRef.current) return;

			const containerHeight = containerRef.current.offsetHeight;
			const lineHeight = parseFloat(getComputedStyle(containerRef.current).fontSize) * 1.2;

			const neededRows = Math.ceil(containerHeight / lineHeight);
			setRows(neededRows);
		});

		resizeObserver.observe(containerRef.current);

		return () => resizeObserver.disconnect();
	}, []);

	const repeatedText = Array(10).fill(text).join(' • ');

	return (
		<div ref={containerRef} className={styles.marquee__container}>
			{Array.from({ length: rows }).map((_, i) => (
				<InfiniteScroll key={i} direction={i % 2 === 0 ? 'left' : 'right'} fastDuration={300}>
					<h2 className={styles.marquee__text}>{repeatedText}</h2>
				</InfiniteScroll>
			))}
		</div>
	);
}

export default HeroAnimatedSection;
