'use client';

import { FC } from 'react';

import { IPartnersData } from '@/shared/types/typesStrapi';
import MarqueeLogos from '@/features/Marquee/ui/MarqueeLogos';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './PartnersSection.module.scss';

interface IPartnersSectionProps {
	direction?: 'left' | 'right';
	data?: IPartnersData;
}
const PartnersSection: FC<IPartnersSectionProps> = ({ direction = 'left', data }) => {
	const logoUrls = data?.logos.map((logo) => logo.url);
	return (
		<AnimatedSectionPage className={styles.section}>
			<MarqueeLogos direction={direction} logoPathArray={logoUrls} />
		</AnimatedSectionPage>
	);
};

export default PartnersSection;
