'use client';

import { useEffect, useRef, useState } from 'react';

import { motion } from 'framer-motion';
import Image from 'next/image';

import { IModalData, IOutstaffCard, IOutstaffData } from '@/shared/types/typesStrapi';
import Card from '@/shared/ui/Card';
import MarkdownRenderer from '@/shared/ui/MarkdownRenderer';
import Modal from '@/shared/ui/Modal';
import FileForm from '@/features/FileForm/FileForm';
import TechLogos from '@/features/TechStack/TechLogos/TechLogos';
import WorkTimeCalculator from '@/features/WorkTimeCalculator';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './OutstaffSection.module.scss';

export default function OutstaffSection({
	data,
	dataModal,
}: {
	data?: IOutstaffData;
	dataModal?: IModalData;
}) {
	const outstaffRoles: IOutstaffCard[] = data?.outstaffCards ?? [];
	const [activeIndex, setActiveIndex] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const [isOpenModal, setIsOpenModal] = useState(false);
	const handleCloseModal = () => setIsOpenModal(false);
	const handleOpenModal = () => {
		stopTimer();
		setIsOpenModal(true);
	};

	// Функция запуска таймера
	const startTimer = () => {
		// Чистим, если есть
		if (intervalRef.current) clearInterval(intervalRef.current);
		// Запускаем заново
		intervalRef.current = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % outstaffRoles.length);
		}, 3000);
	};

	const stopTimer = () => {
		if (intervalRef.current) clearInterval(intervalRef.current);
	};
	// Запускаем при монтировании
	useEffect(() => {
		startTimer();
		return () => {
			stopTimer();
		};
	}, []);

	// Обработчик клика по вкладке
	const handleTabClick = (index: number) => {
		setActiveIndex(index);
		stopTimer();
	};

	return (
		<AnimatedSectionPage className={styles.outstaff}>
			<div className={styles.outstaff__container}>
				{/* Левая часть */}
				<div className={styles.outstaff__left}>
					<h2 className={styles.outstaff__title}>{data?.title ?? 'OUTSTAFF специалистов'}</h2>
					<div className={styles.outstaff__subtitle}>
						<MarkdownRenderer
							content={
								data?.description ??
								'Подберём опытных экспертов, которые быстро вольются в ваш проект и усилят команду.'
							}
						/>
					</div>

					{/* Вкладки */}
					<div className={styles.outstaff__tabs}>
						{outstaffRoles.map((role, i) => (
							<button
								key={'outstaff-tab-' + i}
								onClick={() => handleTabClick(i)}
								className={`${styles.outstaff__tab} ${
									i === activeIndex ? styles['outstaff__tab--active'] : ''
								}`}
							>
								{role?.title}
							</button>
						))}
					</div>

					{/* Анимированный контент */}
					<div className={styles.outstaff__contentWrapper}>
						<div className={styles.outstaff__contentWrapper}>
							{outstaffRoles.map((role, i) => (
								<motion.div
									key={'outstaff-' + i + '-top'}
									initial={{ opacity: 0, x: 20 }}
									animate={{
										opacity: i === activeIndex ? 1 : 0,
										x: i === activeIndex ? 0 : -20,
									}}
									transition={{ duration: 0.5 }}
									style={{
										width: '100%',
										pointerEvents: i === activeIndex ? 'auto' : 'none',
										gridArea: '1 / 1',
									}}
									className={styles.outstaff__content}
								>
									{/* Верх — описание */}
									<div className={styles.content__description}>
										<p>{role.description}</p>
									</div>
								</motion.div>
							))}
						</div>

						{/* Калькулятор — не анимируется */}
						<Card className={styles.calculator}>
							<WorkTimeCalculator
								{...outstaffRoles[activeIndex]?.calculation}
								buttonClick={handleOpenModal}
								onClick={stopTimer}
							/>
						</Card>

						<div className={styles.outstaff__contentWrapper}>
							{outstaffRoles.map((role, i) => (
								<motion.div
									key={'outstaff-' + i + '-bottom'}
									initial={{ opacity: 0, x: 20 }}
									animate={{
										opacity: i === activeIndex ? 1 : 0,
										x: i === activeIndex ? 0 : -20,
									}}
									transition={{ duration: 0.5 }}
									style={{
										width: '100%',
										pointerEvents: i === activeIndex ? 'auto' : 'none',
										gridArea: '1 / 1',
									}}
									className={styles.outstaff__content}
								>
									{/* Низ — технологии */}
									{role.techCards && role?.techCards?.length > 0 && (
										<div className={styles.outstaff__tech}>
											<h3 className={styles.content__title}>Технологии:</h3>
											<TechLogos techItems={role.techCards} sizeLogo={50} />
										</div>
									)}
								</motion.div>
							))}
						</div>
					</div>
				</div>

				{/* Правая часть */}
				<div className={styles.outstaff__right}>
					{outstaffRoles.map((role, i) => (
						<motion.div
							key={'outstaff-image-' + i}
							initial={{ opacity: 0, x: -20 }}
							animate={{
								opacity: i === activeIndex ? 1 : 0,
								x: i === activeIndex ? 0 : 20,
								zIndex: i === activeIndex ? 1 : 0,
							}}
							transition={{ duration: 0.6 }}
							style={{
								width: '100%',
								pointerEvents: i === activeIndex ? 'auto' : 'none',
								position: i === activeIndex ? 'relative' : 'absolute',
								inset: i === activeIndex ? 'unset' : 0,
							}}
							className={styles.outstaff__imageWrapper}
						>
							<Image
								src={role.image.url}
								alt={role?.title}
								width={800}
								height={600}
								className={styles.outstaff__image}
								sizes="600px"
								priority={i === 0}
							/>
						</motion.div>
					))}
				</div>
			</div>
			<Modal isOpen={isOpenModal} onClose={handleCloseModal}>
				<FileForm
					onSubmit={handleCloseModal}
					text={
						dataModal ?? {
							title: 'Подобрать специалиста: ' + outstaffRoles[activeIndex]?.title,
							description:
								'Профессионалы своего дела уже готовы вам помочь. Можете файлом приложить ТЗ или требования.',
						}
					}
				/>
			</Modal>
		</AnimatedSectionPage>
	);
}
