'use client';

import { FC } from 'react';

import { ISocialLinkData } from '@/shared/types/typesStrapi';
import Card from '@/shared/ui/Card';
import ContainerScreenSize from '@/shared/ui/ContainerScreenSize';

import TelegramIcon from '@/assets/images/telegram.svg';
import VkIcon from '@/assets/images/vk.svg';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './Footer.module.scss';

interface IFooterProps {
	data?: ISocialLinkData;
}
const Footer: FC<IFooterProps> = ({ data }) => {
	return (
		<footer className={`${styles.footer}`}>
			<AnimatedSectionPage>
				<Card className={styles.footer__card}>
					<ContainerScreenSize className={styles.footer__container}>
						<div className={styles['footer__container__top']}>
							<div className={styles['footer__container__column']}>
								<h4 className={styles['footer__container__title']}>Функционал</h4>
								<ul className={styles['footer__container__list']}>
									<li>
										<a href="#">Делопроизводство</a>
									</li>
									<li>
										<a href="#">Договоры и счета</a>
									</li>
									<li>
										<a href="#">Кадровый ЭДО</a>
									</li>
									<li>
										<a href="#">Электронные архивы</a>
									</li>
									<li>
										<a href="#">Прием на работу</a>
									</li>
									<li>
										<a href="#">Мобильные приложения</a>
									</li>
									<li>
										<a href="#">ЭДО с контрагентами</a>
									</li>
									<li>
										<a href="#">Управление проектами</a>
									</li>
									<li>
										<a href="#">Управление документами</a>
									</li>
									<li>
										<a href="#">Управление бизнес-процессами</a>
									</li>
								</ul>
							</div>

							<div className={styles['footer__container__column']}>
								<h4 className={styles['footer__container__title']}>Компания</h4>
								<ul className={styles['footer__container__list']}>
									<li>
										<a href="#">Сертификаты</a>
									</li>
									<li>
										<a href="#">Политика обработки персональных данных</a>
									</li>
									<li>
										<a href="#">Карьера</a>
									</li>
									<li>
										<a href="#">Hi Club</a>
									</li>
								</ul>
							</div>

							<div className={styles['footer__container__column']}>
								<h4 className={styles['footer__container__title']}>Интеграции</h4>
								<ul className={styles['footer__container__list']}>
									<li>
										<a href="#">Tessa</a>
									</li>
									<li>
										<a href="#">ELMA</a>
									</li>
									<li>
										<a href="#">Directum</a>
									</li>
									<li>
										<a href="#">BPMSOFT</a>
									</li>
									<li>
										<a href="#">Bitrix24</a>
									</li>
								</ul>
							</div>

							<div className={styles['footer__container__column']}>
								<h4 className={styles['footer__container__title']}>Разработка под заказ</h4>
								<ul className={styles['footer__container__list']}>
									<li>
										<a href="#">Бесшовная интеграция между известными системами</a>
									</li>
									<li>
										<a href="#">Построение кастомных решений вокруг заявленных систем</a>
									</li>
								</ul>
							</div>
						</div>

						<div className={styles['footer__container__bottom']}>
							<div className={styles['footer__container__logo']}>{/* <Logo /> */}</div>
							<div className={styles['footer__container__copy']}>© 2025 Все права защищены</div>
							<div className={styles['footer__container__social']}>
								<a href={data?.tg ?? '#'}>
									<TelegramIcon />
								</a>
								<a href={data?.vk ?? '#'}>
									<VkIcon />
								</a>
							</div>
						</div>
					</ContainerScreenSize>
				</Card>
			</AnimatedSectionPage>
		</footer>
	);
};

export default Footer;
