'use client';

import { ChangeEvent, DragEvent, FC, HTMLAttributes, memo, useRef, useState } from 'react';

import { Controller, useFormContext } from 'react-hook-form';

import { errorCatch } from '@/shared/api/api.helper';

import ButtonCustom from '../ButtonCustom';
import { IButtonCustomProps } from '../ButtonCustom/ButtonCustom';
import MaterialIcon from '../icons/MaterialIcon';
import styles from './FileUploadInput.module.scss';

interface IFileUploadInputProps extends HTMLAttributes<HTMLDivElement> {
	name?: string;
	buttonProps?: IButtonCustomProps;
	accept?: string;
	multiple?: boolean;
	disable?: boolean;
	showFileName?: boolean;
	errorFileRequiredMessage?: string;
}

const FileUploadInput: FC<IFileUploadInputProps> = ({
	name = 'file',
	buttonProps,
	accept,
	multiple = false,
	disable,
	errorFileRequiredMessage,
	...rest
}) => {
	const { control, resetField } = useFormContext();
	const inputRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState('');
	const [isDragOver, setIsDragOver] = useState(false);

	const handleFileSelect = (files: FileList | null, onChange: (...event: any[]) => void) => {
		if (!files) return;
		onChange(multiple ? files : files[0]);
		setFileName(multiple ? `${files.length} файлов` : files[0]?.name || '');
	};

	const handleFileChange = (
		event: ChangeEvent<HTMLInputElement>,
		onChange: (...event: any[]) => void,
	) => {
		handleFileSelect(event.target.files, onChange);
	};

	const handleDrop = (event: DragEvent<HTMLDivElement>, onChange: (...event: any[]) => void) => {
		event.preventDefault();
		setIsDragOver(false);
		handleFileSelect(event.dataTransfer.files, onChange);
	};

	const handleClear = (onChange: (...event: any[]) => void) => {
		if (inputRef.current) inputRef.current.value = '';
		onChange(null);
		resetField(name);
		setFileName('');
	};

	return (
		<div className={styles.fileUploadInput} {...rest}>
			<Controller
				name={name}
				control={control}
				rules={{ required: errorFileRequiredMessage }}
				render={({ field: { onChange, value, ...field }, fieldState: { error } }) => (
					<>
						<input
							{...field}
							ref={inputRef}
							type="file"
							className={styles.fileInput}
							accept={accept}
							multiple={multiple}
							onChange={(e) => handleFileChange(e, onChange)}
							disabled={disable}
						/>

						<div
							className={`${styles.buttonBox} ${isDragOver ? styles.dragOver : ''}`}
							onClick={() => inputRef.current?.click()}
							onDragOver={(e) => {
								e.preventDefault();
								setIsDragOver(true);
							}}
							onDragLeave={() => setIsDragOver(false)}
							onDrop={(e) => handleDrop(e, onChange)}
						>
							<ButtonCustom
								{...buttonProps}
								title="Выбрать файл"
								className={styles.fileButton}
								type="button"
								customType="white"
								disabled={disable}
								glareEffect={false}
							>
								<MaterialIcon name="MdOutlineFileDownload" />
								{fileName && value ? fileName : 'Выберите или перетащите файл'}
							</ButtonCustom>

							{value && (
								<ButtonCustom
									title="Удалить файл"
									type="button"
									customType="error"
									className={styles.clearButton}
									onClick={(e) => {
										e.stopPropagation();
										handleClear(onChange);
									}}
									disabled={disable}
								>
									<MaterialIcon name="MdDelete" />
								</ButtonCustom>
							)}
						</div>

						{error && <p className={styles.error}>{errorCatch(error)}</p>}
					</>
				)}
			/>
		</div>
	);
};

export default memo(FileUploadInput);
