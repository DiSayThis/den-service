import type { Metadata } from 'next';

import { onlyText } from './clearText';

const BASE_URL = `https://${process.env.NEXT_PUBLIC_API_URL}`;
const OG_IMAGE = `${BASE_URL}/favicons/icon-192.png`;
const OG_IMAGE_512 = `${BASE_URL}/favicons/icon-192.png`;

export function generateMetadata(title?: string, description?: string): Metadata {
	const finalTitle = title ?? 'Навигатор цифровой трансформации';
	const finalDescription = description
		? onlyText(description, 197)
		: 'Community экспертов из разных отраслей. Мы поможем вам сориентироваться на рынке отечественных вендоров и интеграторов, расскажем какие есть особенности, посоветуем в выборе подрядчика. Наш основной профит - опыт работы в ключевых компаниях разработки и внедрения Отечественного ПО. Всего 10 минут вашего времени и мы гарантируем 100% погружение. Для создания SalesKit AI мы опросили 35 респондентов из крупного бизнеса. Перейди в SalesKit AI для тестирования механику кроссплатформенной продажи: от первого касания до формирования заявки в CRM.';

	return {
		title: finalTitle,
		description: finalDescription,
		manifest: '/site.webmanifest',
		icons: {
			icon: '/favicons/favicon.ico',
			apple: '/favicons/apple-icon.webp',
			shortcut: '/favicons/favicon.ico',
			other: [
				{ rel: 'apple-touch-icon', sizes: '57x57', url: '/favicons/apple-touch-icon.png' },
				{ rel: 'apple-touch-icon', sizes: '72x72', url: '/favicons/apple-touch-icon.png' },
				{ rel: 'apple-touch-icon', sizes: '76x76', url: '/favicons/apple-touch-icon.png' },
				{ rel: 'apple-touch-icon', sizes: '96x96', url: '/favicons/apple-touch-icon.png' },
			],
		},
		openGraph: {
			title: finalTitle,
			description: finalDescription,
			type: 'website',
			url: BASE_URL,
			images: [
				{
					url: OG_IMAGE_512,
					width: 512,
					height: 512,
					alt: finalTitle,
				},
				{
					url: OG_IMAGE,
					width: 192,
					height: 192,
					alt: finalTitle,
				},
			],
		},
		twitter: {
			title: finalTitle,
			description: finalDescription,
			images: [OG_IMAGE],
			card: 'summary',
		},
		appleWebApp: {
			title: finalTitle,
		},
	};
}
