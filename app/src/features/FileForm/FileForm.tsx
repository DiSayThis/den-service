'use client';

import { useState } from 'react';

import { Controller, FormProvider, useForm } from 'react-hook-form';

import { axiosClassic } from '@/shared/api/axios';
import { useToast } from '@/shared/hooks/useToasts';
import { useTelegramUserStore } from '@/shared/store/tg-user-store';
import { FormSendCallValues } from '@/shared/types/sendForm';
import { IModalData } from '@/shared/types/typesStrapi';
import ButtonCustom from '@/shared/ui/ButtonCustom';
import FileUploadInput from '@/shared/ui/FileUploadInput';
import MarkdownRenderer from '@/shared/ui/MarkdownRenderer';
import { PhoneInputRHS } from '@/shared/ui/PhoneInput/PhoneInput';

import styles from './FileForm.module.scss';

export default function FileForm({
	onSubmit: submitFunc,
	text,
}: {
	onSubmit: () => void;
	text?: IModalData;
}) {
	const { user } = useTelegramUserStore();
	const methods = useForm<FormSendCallValues>({
		defaultValues: {
			phone: '',
			file: null,
			username: user?.username,
			type: text?.title ?? 'Получить КП на основе файла',
		},
	});
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

		if (data.file instanceof File) {
			formData.append('file', data.file);
		}

		await axiosClassic
			.post('/kpsend', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.then(() => {
				addToast('Заявка отправлена!', 'success');
				setIsLoading(false);
				reset();
				submitFunc();
			})
			.catch(() => {
				addToast('Ошибка при отправке заявки', 'error');
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<FormProvider {...methods}>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<h2>{text?.title ?? 'Получите КП автоматически!'}</h2>
				<MarkdownRenderer
					content={text?.description ?? 'Оставьте свои контакты и файл для обработки'}
				/>
				<Controller
					name="phone"
					control={control}
					rules={{
						required: 'Введите номер телефона',
						validate: (value) => value.replace(/\D/g, '').length === 11 || 'Введите полный номер',
					}}
					render={({ field }) => (
						<>
							<PhoneInputRHS {...field} placeholder={text?.placeholder ?? 'Номер телефона'} />
							{errors.phone && <span className={styles.error}>{errors.phone.message}</span>}
						</>
					)}
				/>

				<FileUploadInput />

				<ButtonCustom disabled={isLoading} type="submit">
					{isLoading ? 'Загрузка...' : (text?.buttonText ?? 'Отправить')}
				</ButtonCustom>
			</form>
		</FormProvider>
	);
}
