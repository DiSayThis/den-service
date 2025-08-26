import { FC } from 'react';

import { getCMS } from '@/shared/api/getCms';
import ContainerScreenSize from '@/shared/ui/ContainerScreenSize';
import StickyCard from '@/features/CardStack';
import AboutUsSection from '@/widgets/AboutUsSection';
import CallToAction from '@/widgets/CallToAction';
import DemoSlideShow from '@/widgets/DemoSlideShow';
import DigitsSection from '@/widgets/DigitsSection';
import HeroAnimatedSection from '@/widgets/HeroAnimatedSection';
import HeroSection from '@/widgets/HeroSection';
import OutstaffSection from '@/widgets/OutstaffSection';
import PartnersSection from '@/widgets/PartnersSection';
import ProblemsSection from '@/widgets/ProblemsSection';
import ProductDemoSection from '@/widgets/ProductDemoSection';
import ReviewsSection from '@/widgets/ReviewsSection';
import ServicesSection from '@/widgets/ServicesSection';

import styles from './HomeScreen.module.scss';

const HomeScreen: FC = async () => {
	const data = await getCMS();

	return (
		<div className={styles.screen}>
			<StickyCard>
				<HeroAnimatedSection text={data?.hero} modalText={data?.modalKp} />
				<ContainerScreenSize className={styles.screen}>
					<PartnersSection direction="right" data={data?.partners} />
					<ProblemsSection data={data?.problems} />
					<ServicesSection data={data?.service} />
					<OutstaffSection data={data?.outstaff} />
					<CallToAction textObject={data?.cta1} />
					{Array.isArray(data?.prodDemos) &&
						data.prodDemos.map((card, i) => (
							<ProductDemoSection
								key={i}
								direction={i % 2 === 0 ? 'right' : 'left'}
								title={card?.title}
								description={card?.description}
								images={card?.images}
							/>
						))}
					<DigitsSection valueArray={data?.digits} />
					<CallToAction textObject={data?.cta2} />
					<DemoSlideShow
						imgPathArray={
							Array.isArray(data?.slideshow.images)
								? data?.slideshow.images.map((img) => img.url)
								: []
						}
					/>
					<AboutUsSection data={data?.aboutUs} />
					<ReviewsSection data={data?.reviews} />
					<PartnersSection direction="right" data={data?.partners} />
					<HeroSection data={data?.endHero} />
				</ContainerScreenSize>
			</StickyCard>
		</div>
	);
};

export default HomeScreen;
