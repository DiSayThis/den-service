'use client';

import { FC, useState } from 'react';

import { IHeadHunterText, IModalData } from '@/shared/types/typesStrapi';
import ButtonCustom from '@/shared/ui/ButtonCustom';
import FlipText from '@/shared/ui/FlipText';
import MarkdownRenderer from '@/shared/ui/MarkdownRenderer';
import Modal from '@/shared/ui/Modal';
import FileForm from '@/features/FileForm/FileForm';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './HeadHunterSection.module.scss';

interface IHeadHunterSectionProps {
	text?: IHeadHunterText;
	modalText?: IModalData;
}

const HeadHunterSection: FC<IHeadHunterSectionProps> = ({ text, modalText }) => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const handleModal = () => setIsOpenModal((prev) => !prev);
	return (
		<AnimatedSectionPage className={styles.section}>
			<div className={styles.section__card}>
				<div className={styles.section__content}>
					<h2 className={styles.section__title}>
						{text?.title ?? 'Присоединяйся к нашей команде!'}
					</h2>
					<div className={styles.section__description}>
						{text?.description ? (
							<MarkdownRenderer content={text.description} />
						) : (
							<>
								Если ты хочешь вступить в комьюнити и делиться своим опытом, подгружай резюме и ты
								получишь возможность опубликовать свою кандидатуру для участия в коммерческих
								проектах.
							</>
						)}
					</div>
				</div>
				<ButtonCustom className={styles.section__button} onClick={handleModal}>
					<FlipText repeat repeatType="mirror">
						{text?.buttonText ?? 'Вступить в NDT'}
					</FlipText>
				</ButtonCustom>
			</div>
			<Modal isOpen={isOpenModal} onClose={handleModal}>
				<FileForm onSubmit={handleModal} text={modalText} />
			</Modal>
		</AnimatedSectionPage>
	);
};

export default HeadHunterSection;
