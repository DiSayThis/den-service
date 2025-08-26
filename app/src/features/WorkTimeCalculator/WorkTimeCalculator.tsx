'use client';

import { useEffect, useMemo, useState } from 'react';

import { ICalculatorProps } from '@/shared/text';
import ButtonCustom from '@/shared/ui/ButtonCustom';

import styles from './WorkTimeCalculator.module.scss';

export default function WorkTimeCalculator({
	minHours = 50,
	maxHours = 250,
	defaultRate,
	thresholds = [],
	onChangeHours,
	onChangeTotal,
	buttonClick,
	onClick,
}: ICalculatorProps) {
	const [hours, setHours] = useState(minHours);

	useEffect(() => {
		setHours(minHours);
	}, [minHours]);

	const currentRate = useMemo(() => {
		const applicable = thresholds.filter((t) => hours >= t.hours).sort((a, b) => b.hours - a.hours);
		return applicable[0]?.rate ?? defaultRate;
	}, [hours, thresholds, defaultRate]);

	const totalPrice = hours * currentRate;

	useEffect(() => {
		if (onChangeTotal) onChangeTotal(totalPrice);
	}, [totalPrice, onChangeTotal]);

	useEffect(() => {
		if (onChangeHours) onChangeHours(hours);
	}, [hours, onChangeHours]);

	return (
		<div className={styles.calculator}>
			<h2 className={styles.calculator__title}>Калькулятор стоимости</h2>

			<p>
				Часы: <span className={styles.value}>{hours}</span>
			</p>

			<div className={styles.calculator__sliderWrapper}>
				<input
					type="range"
					min={minHours}
					max={maxHours}
					value={hours}
					onChange={(e) => {
						onClick?.();
						setHours(Number(e.target.value));
					}}
					className={styles.calculator__slider}
				/>
				<div className={styles.calculator__rangeLabels}>
					<span>{minHours} ч</span>
					<span>{maxHours} ч</span>
				</div>
			</div>

			<p className={styles.calculator__total}>Общая стоимость: {totalPrice.toLocaleString()} ₽</p>
			{buttonClick && (
				<ButtonCustom className={styles.button} onClick={buttonClick}>
					Попробовать бесплатно
				</ButtonCustom>
			)}
		</div>
	);
}
