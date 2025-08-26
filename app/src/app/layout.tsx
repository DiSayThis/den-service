import '@/styles/globals.css';

import { Metadata } from 'next';

import { generateMetadata } from '@/shared/lib/generateMetadata';

import { Providers } from './providers';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = generateMetadata();

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru" suppressHydrationWarning>
			<Providers>{children}</Providers>
		</html>
	);
}
