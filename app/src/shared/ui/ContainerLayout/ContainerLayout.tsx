import { FC } from 'react';

import { getSocialLinkCMS } from '@/shared/api/getCms';
import Footer from '@/widgets/Footer';
import Header from '@/widgets/Header';

interface IContainerLayoutProps {
	children: React.ReactNode;
}

const ContainerLayout: FC<IContainerLayoutProps> = async ({ children }) => {
	const links = await getSocialLinkCMS();

	return (
		<>
			<Header />
			<main>{children}</main>
			<Footer data={links} />
		</>
	);
};

export default ContainerLayout;
