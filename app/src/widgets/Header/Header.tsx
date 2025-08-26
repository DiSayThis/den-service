'use client';

import { FC, useEffect, useState } from 'react';

import { useTelegramUserStore } from '@/shared/store/tg-user-store';
import { useThemeStore } from '@/shared/store/theme-store';
import ButtonCustom from '@/shared/ui/ButtonCustom';
import ContainerScreenSize from '@/shared/ui/ContainerScreenSize';
import MaterialIcon from '@/shared/ui/icons/MaterialIcon';

import MainLogo from '@/assets/images/logo_NDT.svg';

import styles from './Header.module.scss';

const Header: FC = () => {
	const { toggleTheme, theme } = useThemeStore();
	const tgUser = useTelegramUserStore((s) => s.user);

	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > window.innerHeight); // > 100vh
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	return (
		<header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
			<ContainerScreenSize className={styles.container__header}>
				<MainLogo className={styles.logo} />
				{tgUser && tgUser.username && '@' + tgUser.username}
				<ButtonCustom customType="white" onClick={toggleTheme} className={styles['button-theme']}>
					<MaterialIcon size={20} name={theme === 'light' ? 'MdNightsStay' : 'MdSunny'} />
				</ButtonCustom>
			</ContainerScreenSize>
		</header>
	);
};

export default Header;
