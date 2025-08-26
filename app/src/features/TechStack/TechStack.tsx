'use client';

import { FC } from 'react';

import { ITechCard } from '@/shared/types/typesStrapi';

import TechLogos from './TechLogos/TechLogos';
import styles from './TechStack.module.scss';

export interface ITechItem {
	name: string;
	logoUrl: string;
}

interface ITechStack {
	techItems: ITechCard[];
}

const TechStack: FC<ITechStack> = ({ techItems = [] }) => {
	return (
		<div className={styles.section} aria-label="Наш стек технологий">
			<h2 className={styles.title}>Наш стек технологий</h2>
			<p className={styles.subtitle}>
				Мы используем проверенные временем и инновационные инструменты для создания ваших продуктов.
			</p>
			<TechLogos techItems={techItems} />
		</div>
	);
};

export default TechStack;
