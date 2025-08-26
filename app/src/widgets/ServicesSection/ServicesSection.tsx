'use client';

import { FC, useCallback, useEffect, useRef, useState } from 'react';

import clsx from 'clsx';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { IServiceCard, IServiceData } from '@/shared/types/typesStrapi';
import ButtonCustom from '@/shared/ui/ButtonCustom';
import Card from '@/shared/ui/Card';
import MarkdownRenderer from '@/shared/ui/MarkdownRenderer';
import GlareHover from '@/shared/ui/ReactBits/GlareHover';
import FontAwesomeIcon from '@/shared/ui/icons/FontAwesomeIcon';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './ServicesSection.module.scss';

interface IServicesSectionProps {
	data?: IServiceData;
}
export const servicesContentConst: IServiceCard[] = [
	{
		image: { url: '/images/services/service (4).jpg' },
		title: 'Командная разработка MLP проекта',
		duration: '8 месяцев',
		price: '1 460 000 ₽',
		features: [
			'Анализ пользовательского опыта',
			'Развитие интерфейса по запросам пользователей',
			'Доработка функциональности и UX/UI (входит в стоимость)',
			'Формирование карты развития проекта',
		],
		artifacts: [
			'Конкурентный анализ лидеров',
			'Сценарии пользователей',
			'Разработка MLP проекта',
			'Поддержка и документация',
			'CI/CD',
		],
	},
	{
		image: { url: '/images/services/service (3).jpg' },
		title: 'Подписка на разработку',
		duration: '1 месяц',
		price: 'от 182 500 ₽',
		features: [
			'Анализ ситуации и поиск решения',
			'Подбор специалиста',
			'Доработка функциональности',
			'UX/UI дизайн (до 50 ч)',
			'Карта развития проекта (бонус от аналитика)',
		],
		extras: ['Возможна модель Time & Materials', 'Реализация задач по минимальной ставке в час'],
		artifacts: [
			'БТ, ФТ',
			'План от бизнес-задачи до конкретных этапов',
			'Поддержка и документация',
			'CI/CD',
		],
	},
	{
		image: { url: '/images/services/service (2).jpg' },
		title: 'Робот продаж Saleskit AI',
		duration: '1 месяц',
		price: 'от 25 500 ₽',
		features: [
			'Исследование алгоритмов продаж и ЦА',
			'Формирование матрицы вопросов',
			'Генерация коммерческих предложений',
			'Настройка таргетинга из соцсетей',
			'API с календарём и CRM',
			'Обучение менеджеров',
		],
		artifacts: [
			'Отказ от холодных звонков и рассылок',
			'Управление продажами через Telegram',
			'Бот самообслуживания',
			'Стимулирование отдела продаж',
			'Поддержка и обучение',
		],
	},
	{
		image: { url: '/images/services/service (1).jpg' },
		title: 'MiniApp «МП за 3 дня»',
		duration: '1 месяц',
		price: 'от 25 500 ₽ (тариф «Профи» — 240 000 ₽ в год)',
		features: [
			'Конструктор дизайна и стилистики',
			'Товарная матрица',
			'Конструктор опросов клиентов',
			'Панель оператора и сканер купонов',
			'Реферальные программы',
			'Логистика и самовывоз',
			'Открытое API',
		],
		extras: [
			'Подходит для тестирования гипотез',
			'Быстрый выход с приложением',
			'Создание нового канала продаж',
		],
		artifacts: [
			'Интеграции: 1С, МойСклад, iiko, R-Keeper, СБИС, FrontPad, Poster, Yclients, ELMA и др.',
		],
	},
];

const ServicesSection: FC<IServicesSectionProps> = ({ data = { card: servicesContentConst } }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	const startTimer = useCallback(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
		intervalRef.current = setInterval(() => {
			setActiveIndex((prev) => (prev + 1) % data.card.length);
		}, 5000);
	}, [data.card.length]);

	const stopTimer = useCallback(() => {
		if (intervalRef.current) clearInterval(intervalRef.current);
	}, []);

	useEffect(() => {
		startTimer();
		return () => {
			stopTimer();
		};
	}, []);

	const handleTabClick = (index: number) => {
		setActiveIndex(index);
		if (intervalRef.current) clearInterval(intervalRef.current);
	};

	return (
		<AnimatedSectionPage className={styles.services}>
			<h2 className={styles.services__title}>{data?.title ?? 'Наши SERVICES'}</h2>
			<div className={styles.services__subtitle}>
				<MarkdownRenderer
					content={
						data.description ??
						'Набор решений для компаний любого масштаба. Мы помогаем запускать продукты, улучшать интерфейсы, развивать функционал и внедрять новые каналы продаж. Выбирайте формат работы под ваши задачи: от быстрых miniApp до комплексных MLP-проектов.'
					}
				/>
			</div>

			{/* Вкладки */}
			<div className={styles.services__tabs}>
				{data.card.map((service, i) => (
					<ButtonCustom
						glareEffect={false}
						customType="secondary"
						key={'service-' + i}
						onClick={() => handleTabClick(i)}
						className={clsx(styles.services__tab, {
							[styles['services__tab--active']]: i === activeIndex,
						})}
					>
						{service?.title}
					</ButtonCustom>
				))}
			</div>
			<div className={styles.services__content}>
				<div className={styles.services__image_container}>
					{data.card.map((service, i) => (
						<motion.div
							key={'service-image-' + i}
							initial={{ opacity: 0, x: -30 }}
							animate={{
								opacity: i === activeIndex ? 1 : 0,
								x: i === activeIndex ? 0 : -30,
								zIndex: i === activeIndex ? 1 : 0,
							}}
							transition={{ duration: 0.6 }}
							style={{
								width: '100%',
								height: '100%',
								pointerEvents: i === activeIndex ? 'auto' : 'none',
								position: i === activeIndex ? 'relative' : 'absolute',
								inset: i === activeIndex ? 'unset' : 0,
							}}
							className={styles.services__imageWrapper}
						>
							<Image
								src={service.image.url}
								alt={service?.title}
								fill
								className={styles.services__image}
								sizes="600px"
								priority={i === 0}
							/>
						</motion.div>
					))}
				</div>
				<div className={styles.services__text_container}>
					{data.card.map((service, i) => (
						<motion.div
							key={'text-service-' + i}
							initial={{ opacity: 0, x: 30 }}
							animate={{
								opacity: i === activeIndex ? 1 : 0,
								x: i === activeIndex ? 0 : 30,
								zIndex: i === activeIndex ? 1 : 0,
							}}
							transition={{ duration: 0.6 }}
							style={{
								width: '100%',
								pointerEvents: i === activeIndex ? 'auto' : 'none',
								// position: i === activeIndex ? 'relative' : 'absolute',
								inset: i === activeIndex ? 'unset' : 0,
							}}
							className={styles.content}
						>
							<h3 className={styles.content__title}>{service?.title}</h3>

							<p className={styles.content__text}>
								<b>Срок:</b> {service.duration}
							</p>
							<p className={styles.content__text}>
								<b>Стоимость:</b> {service.price}
							</p>
							<div className={styles.content__cards}>
								<div className={styles.content__list_wrapper}>
									{service.features && (
										<Card className={styles.card}>
											<h4 className={styles.content__sub}>Что входит:</h4>

											<ul className={styles.content__list}>
												{service.features.map((feature) => (
													<li key={feature} className={styles.feature}>
														<FontAwesomeIcon name="FaCheckCircle" size={20} />
														<span>{feature}</span>
													</li>
												))}
											</ul>
											<GlareHover customType="absolute" />
										</Card>
									)}
									{service.artifacts && (
										<Card className={styles.card}>
											<h4 className={styles.content__sub}>Артефакты:</h4>
											<ul className={styles.content__list}>
												{service.artifacts.map((artifact) => (
													<li key={artifact} className={styles.artifact}>
														<FontAwesomeIcon name="FaChartBar" size={20} />
														<span>{artifact}</span>
													</li>
												))}
											</ul>
											<GlareHover customType="absolute" />
										</Card>
									)}
								</div>
								{service.extras && (
									<Card className={styles.card__extras}>
										<h4 className={styles.content__sub}>Дополнительно:</h4>

										<ul className={styles.content__list}>
											{service.extras.map((extras, i) => (
												<li key={'extras-' + i} className={styles.artifact}>
													<span>{extras}</span>
												</li>
											))}
										</ul>
										<GlareHover customType="absolute" />
									</Card>
								)}
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</AnimatedSectionPage>
	);
};

export default ServicesSection;
