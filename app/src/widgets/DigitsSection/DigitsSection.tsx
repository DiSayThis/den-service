'use client';

import { FC, Fragment } from 'react';

import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { defaultDigitsArray } from '@/shared/text';
import { IDigitItem } from '@/shared/types/typesStrapi';
import Divider from '@/shared/ui/Divider';
import FlipDigit from '@/shared/ui/animations/FlipDigit';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './DigitsSection.module.scss';

export type digitViewType = { digit: number; description: string; addText?: string };
interface IDigitsSectionProps {
	valueArray?: IDigitItem[];
}

const DigitsSection: FC<IDigitsSectionProps> = ({ valueArray = defaultDigitsArray }) => {
	const isMobile = useIsMobile();
	return (
		<AnimatedSectionPage className={styles.section}>
			<h2 className={styles.title}>О нас в цифрах</h2>
			<div className={styles.container}>
				{valueArray.map((val, index) => {
					return (
						<Fragment key={'digit-' + index}>
							<div className={styles.values}>
								<h3 className={styles.digit}>
									<FlipDigit to={val.digit} text={val.addText} animationOptions={{ duration: 3 }} />
								</h3>
								<p>{val.description}</p>
							</div>
							{valueArray.length - 1 !== index && (
								<Divider
									orientation={isMobile ? 'horizontal' : 'vertical'}
									className={styles.divider}
								/>
							)}
						</Fragment>
					);
				})}
			</div>
		</AnimatedSectionPage>
	);
};

export default DigitsSection;
