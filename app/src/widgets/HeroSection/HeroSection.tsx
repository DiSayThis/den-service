'use client';

import { FC, useState } from 'react';

import { motion } from 'motion/react';
import Image from 'next/image';

import { useScrollVariants } from '@/shared/hooks/useScrollVariants';
import { IEndHeroData } from '@/shared/types/typesStrapi';
import ButtonCustom from '@/shared/ui/ButtonCustom';
import FlipText from '@/shared/ui/FlipText';
import Modal from '@/shared/ui/Modal';
// import DecryptedText from '@/shared/ui/ReactBits/DecryptedText';
import MagneticWrapper from '@/shared/ui/animations/MagneticWrapper';
import FileForm from '@/features/FileForm/FileForm';

import AnimatedSectionPage from '../AnimatedSectionPage';
import styles from './HeroSection.module.scss';

interface IEndHeroSection {
	data?: IEndHeroData;
}
const EndHeroSection: FC<IEndHeroSection> = ({ data }) => {
	const scrollVariants = useScrollVariants();
	const [isOpenModal, setIsOpenModal] = useState(false);
	const handleCloseModal = () => setIsOpenModal(false);
	return (
		<AnimatedSectionPage className={styles.section}>
			<motion.div
				variants={scrollVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ margin: '-100px', once: true }}
				className={styles['text-block']}
			>
				<motion.h1 className={styles.title}>
					{data?.title ?? 'Готовы к трансформации? Начнём сегодня.'}
				</motion.h1>
				<motion.div>
					<MagneticWrapper>
						<ButtonCustom onClick={() => setIsOpenModal(true)} className={styles.button}>
							<FlipText repeat repeatType="mirror">
								{data?.buttonText ?? 'Попробовать SalesKit AI'}
							</FlipText>
						</ButtonCustom>
					</MagneticWrapper>
				</motion.div>
			</motion.div>

			<motion.div
				className={styles['image-container']}
				initial={{ opacity: 0, filter: 'blur(10px)' }}
				whileInView={{ opacity: 1, filter: 'blur(0px)' }}
				transition={{ duration: 1.2 }}
			>
				<Image
					src="/images/hero (3).webp"
					alt="Hero"
					fill
					className={styles['hero-image']}
					priority
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				/>
			</motion.div>
			<Modal isOpen={isOpenModal} onClose={handleCloseModal}>
				<FileForm onSubmit={handleCloseModal} />
			</Modal>
		</AnimatedSectionPage>
	);
};

export default EndHeroSection;
