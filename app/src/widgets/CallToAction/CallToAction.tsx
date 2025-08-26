'use client';

import { FC, useEffect, useState } from 'react';

import clsx from 'clsx';
import { motion } from 'motion/react';
import { Controller, FormProvider, useForm } from 'react-hook-form';

import { axiosClassic } from '@/shared/api/axios';
import { useIsMobile } from '@/shared/hooks/useIsMobile';
import { useToast } from '@/shared/hooks/useToasts';
import { useTelegramUserStore } from '@/shared/store/tg-user-store';
import { FormSendCallValues } from '@/shared/types/sendForm';
import { ICTAData } from '@/shared/types/typesStrapi';
import ButtonCustom from '@/shared/ui/ButtonCustom';
import Card from '@/shared/ui/Card';
import FlipText from '@/shared/ui/FlipText';
import { PhoneInputRHS } from '@/shared/ui/PhoneInput/PhoneInput';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './CallToAction.module.scss';

const CallToAction: FC<{
	white?: boolean;
	textObject?: ICTAData;
}> = ({ white, textObject }) => {
	const { user } = useTelegramUserStore();
	const methods = useForm<FormSendCallValues>({
		defaultValues: {
			phone: '',
			file: null,
			username: user?.username,
			type: textObject?.title ?? 'Форма отправки КП',
		},
	});
	const isMobile = useIsMobile(415);

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
	const onSubmit = async (data: FormSendCallValues) => {
		setIsLoading(true);
		const formData = new FormData();
		formData.append('phone', data.phone);
		formData.append('username', data.username ?? '');
		formData.append('type', data.type);
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

	return (
		<AnimatedSectionPage className={styles.section}>
			<Card
				customType={white ? 'white' : 'secondary'}
				className={clsx(styles.section__card, { [styles.white]: white })}
			>
				<h2 className={styles.section__title}>
					{textObject?.title
						? textObject?.title
						: 'Оставьте номер — расскажем, как сэкономить месяцы внедрения.'}
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
						<ButtonCustom disabled={isLoading} type="submit" className={styles.button}>
							{isLoading ? (
								<FlipText repeat repeatType="mirror">
									Загрузка...
								</FlipText>
							) : textObject?.buttonText ? (
								<FlipText repeat repeatType="mirror">
									{textObject?.buttonText}
								</FlipText>
							) : isMobile ? (
								<>
									📞
									<FlipText repeat repeatType="mirror">
										Получить консультацию
									</FlipText>
									<FlipText repeat repeatType="mirror">
										эксперта
									</FlipText>
								</>
							) : (
								<>
									📞
									<FlipText repeat repeatType="mirror">
										Получить консультацию эксперта
									</FlipText>
								</>
							)}
						</ButtonCustom>
					</form>
				</FormProvider>
				<motion.p className={styles.description}>
					{textObject?.subTitle
						? textObject?.subTitle
						: 'Наш эксперт свяжется и подскажет, с чего начать цифровую трансформацию.'}
				</motion.p>
			</Card>
		</AnimatedSectionPage>
	);
};

export default CallToAction;
