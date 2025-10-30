import {
	IAboutUs,
	IApiData,
	ICTA1,
	ICTA2,
	IDigits,
	IEndHero,
	IHeadHunterSection,
	IHero,
	IModalHh,
	IModalKp,
	IModalOutstaff,
	IOutstaff,
	IPartners,
	IProblems,
	IProdDemos,
	IReviews,
	IService,
	ISlideshow,
	ISocialLink,
} from '../types/typesStrapi';

const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337';
const baseURL = strapiUrl + '/api';
const isBuild = process.env.SKIP_STRAPI_FETCH === 'true';

function normalizeImages<T>(data: T): T {
	if (!data) return data;

	const replacer = (obj: any): any => {
		if (!obj || typeof obj !== 'object') return obj;

		if ('url' in obj && typeof obj.url === 'string') {
			obj.url = '/api/asset' + obj.url;
		}

		for (const key of Object.keys(obj)) {
			obj[key] = replacer(obj[key]);
		}
		return obj;
	};

	return replacer(structuredClone(data));
}

async function fetchCMS<T>(endpoint: string): Promise<T | null> {
	if (isBuild) return null;

	try {
		const res = await fetch(`${baseURL}${endpoint}`, {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
			},
			next: { revalidate: 60 },
		});

		if (!res.ok) {
			console.warn(`❌ Failed to fetch ${endpoint}: ${res.status}`);
			return null;
		}

		const data = await res.json();
		return normalizeImages(data);
	} catch (err) {
		console.warn(`❌ Error fetching ${endpoint}`, err);
		return null;
	}
}

/**
 * Главная функция: получить все данные из Strapi
 */
export async function getCMS(): Promise<IApiData> {
	const endpoints = [
		fetchCMS<IHero>('/hero?populate=*').then((res) => res?.data),
		fetchCMS<IAboutUs>('/about-us?populate=*').then((res) => res?.data),
		fetchCMS<IDigits>('/digit?populate=*').then((res) => res?.data.digits),
		fetchCMS<ICTA1>('/call-to-action1?populate=*').then((res) => res?.data),
		fetchCMS<ICTA2>('/call-to-action2?populate=*').then((res) => res?.data),
		fetchCMS<IEndHero>('/end-hero?populate=*').then((res) => res?.data),
		fetchCMS<IProblems>('/problem?populate=*').then((res) => res?.data),
		fetchCMS<IPartners>('/partner-logo?populate=*').then((res) => res?.data),
		fetchCMS<IProdDemos>('/production-demos?populate=*').then((res) => res?.data),
		fetchCMS<IReviews>('/reviews?populate=*').then((res) => res?.data),
		fetchCMS<IModalHh>('/modal-head-hunter?populate=*').then((res) => res?.data),
		fetchCMS<IModalKp>('/modal-kp?populate=*').then((res) => res?.data),
		fetchCMS<IModalOutstaff>('/modal-outstaff?populate=*').then((res) => res?.data),
		fetchCMS<IOutstaff>(
			'/outstaff?populate[outstaffCards][populate][image]=true&populate[outstaffCards][populate][techCards][populate][image]=true',
		).then((res) => res?.data),
		fetchCMS<IService>('/service?populate[card][populate]=*').then((res) => res?.data),
		fetchCMS<ISlideshow>('/demo-slideshow?populate=*').then((res) => res?.data),
		fetchCMS<IHeadHunterSection>('/head-hunter-section?populate=*').then((res) => res?.data),
	];

	const results = await Promise.allSettled(endpoints);

	// Преобразуем результаты: ошибки -> null
	const safe = results.map((r) =>
		r.status === 'fulfilled' ? r.value : (console.warn('❌ Failed CMS request', r.reason), null),
	);

	const [
		hero,
		aboutUs,
		digits,
		cta1,
		cta2,
		endHero,
		problems,
		partners,
		prodDemos,
		reviews,
		modalHh,
		modalKp,
		modalOutstaff,
		outstaff,
		service,
		slideshow,
		hhText,
	] = safe;

	return {
		hero,
		aboutUs,
		digits,
		cta1,
		cta2,
		endHero,
		problems,
		partners,
		prodDemos,
		reviews,
		modalHh,
		modalKp,
		modalOutstaff,
		outstaff,
		service,
		slideshow,
		hhText,
	} as IApiData;
}

export async function getSocialLinkCMS() {
	try {
		const [links] = await Promise.allSettled([
			fetchCMS<ISocialLink>('/social-link?populate=*').then((res) => res?.data),
		]);

		if (links.status === 'fulfilled') {
			return links.value;
		}

		console.error('Ошибка при загрузке соц. ссылок из CMS:', links.reason);
		return undefined;
	} catch (error) {
		console.error('Критическая ошибка getSocialLinkCMS:', error);
		return undefined;
	}
}
