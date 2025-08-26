'use client';

import { FC, JSX, useEffect, useState } from 'react';

import clsx from 'clsx';
import { motion } from 'motion/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { axiosClassic } from '@/shared/api/axios';
import { useToast } from '@/shared/hooks/useToasts';
import { useTelegramUserStore } from '@/shared/store/tg-user-store';
import { IOutstaffRoles, callToActionText1 } from '@/shared/text';
import { FormSendCallValues } from '@/shared/types/sendForm';
import ButtonCustom from '@/shared/ui/ButtonCustom';
import Card from '@/shared/ui/Card';
import FlipText from '@/shared/ui/FlipText';
import { PhoneInputRHS } from '@/shared/ui/PhoneInput/PhoneInput';
import AnimatedSectionPage from '@/widgets/AnimatedSectionPage';

import WorkTimeCalculator from '../WorkTimeCalculator';
import styles from './OutstaffSpecForm.module.scss';

const OutstaffSpecForm: FC<{
	white?: boolean;
	textObject?: {
		title: string;
		placeholder: string;
		subTitle: string;
		buttonText: JSX.Element;
	};
	outstaffRoles: IOutstaffRoles[];
}> = ({ white, textObject = callToActionText1, outstaffRoles = [] }) => {
	const { user } = useTelegramUserStore();
	const methods = useForm<FormSendCallValues>({
		defaultValues: {
			phone: '',
			file: null,
			username: user?.username,
			type: textObject?.title ?? '',
			specialist: {
				name: outstaffRoles[0]?.title ?? '',
				hours: 0,
				price: 0,
			},
		},
	});

	useEffect(() => {
		if (user?.username) {
			methods.setValue('username', user.username);
		}
	}, [user, methods.setValue, methods]);

	const {
		control,
		handleSubmit,
		formState: { errors },
		reset,
	} = methods;

	const { addToast } = useToast();
	const [isLoading, setIsLoading] = useState(false);
	const [activeIndex, setActiveIndex] = useState(0);

	const onSubmit = async (data: FormSendCallValues) => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append('phone', data.phone);
		formData.append('username', data.username ?? '');
		formData.append('type', data.type);
		formData.append('specialist.name', outstaffRoles[activeIndex]?.title);
		formData.append('specialist.hours', String(data.specialist.hours) ?? '');
		formData.append('specialist.price', String(data.specialist.price) ?? '');

		await axiosClassic
			.post('/kpsend', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(() => {
				addToast('Заявка отправлена!', 'success');
				reset();
				setIsLoading(false);
			})
			.catch(() => {
				addToast('Ошибка при отправке заявки', 'error');
				setIsLoading(false);
			});
	};

	const handleTabClick = (index: number) => {
		setActiveIndex(index);
	};

	const handleChangeHours = (value: number) => {
		methods.setValue('specialist.hours', value);
	};
	const handleChangeTotal = (value: number) => {
		methods.setValue('specialist.price', value);
	};

	return (
		<AnimatedSectionPage className={styles.section}>
			<Card
				customType={white ? 'white' : 'secondary'}
				className={clsx(styles.section__card, { [styles.white]: white })}
			>
				<h2 className={styles.section__title}>
					{textObject?.title ?? (
						<h2>Оставьте номер — расскажем, как сэкономить месяцы внедрения.</h2>
					)}
				</h2>
				<FormProvider {...methods}>
					<form onSubmit={handleSubmit(onSubmit)} className={styles.section__form}>
						<Controller
							name="phone"
							control={control}
							rules={{
								required: 'Введите номер телефона',
								validate: (value) =>
									value.replace(/\D/g, '').length === 11 || 'Введите полный номер',
							}}
							render={({ field }) => (
								<div className={styles.input__container}>
									<PhoneInputRHS {...field} placeholder="Номер телефона" />
									{errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
								</div>
							)}
						/>
						<div className={styles.calculator}>
							<WorkTimeCalculator
								{...outstaffRoles[activeIndex].calculation}
								onChangeHours={handleChangeHours}
								onChangeTotal={handleChangeTotal}
							/>
							<div className={styles.calculator__tabs}>
								{outstaffRoles.map((role, i) => (
									<button
										// customType="secondary"
										type="button"
										key={role.key}
										onClick={() => handleTabClick(i)}
										className={`${styles.calculator__tab} ${
											i === activeIndex ? styles['calculator__tab--active'] : ''
										}`}
									>
										{role?.title}
									</button>
								))}
							</div>
						</div>
						<ButtonCustom disabled={isLoading} type="submit" className={styles.button}>
							{isLoading ? (
								<FlipText repeat repeatType="mirror">
									Загрузка...
								</FlipText>
							) : (
								(textObject.buttonText ?? (
									<>
										📞{' '}
										<FlipText repeat repeatType="mirror">
											Подобрать специалиста
										</FlipText>
									</>
								))
							)}
						</ButtonCustom>
					</form>
				</FormProvider>
				<motion.p className={styles.description}>
					{textObject.subTitle ?? (
						<>Наш эксперт свяжется и подскажет, с чего начать цифровую трансформацию.</>
					)}
				</motion.p>
			</Card>
		</AnimatedSectionPage>
	);
};

export default OutstaffSpecForm;
