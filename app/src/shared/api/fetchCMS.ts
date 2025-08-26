const isServer = typeof window === 'undefined';

const baseURL = isServer
	? (process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337') + '/api'
	: process.env.NEXT_PUBLIC_STRAPI_ASSETS_URL + '/api';
const isBuild = process.env.SKIP_STRAPI_FETCH === 'true';

export async function fetchCMS<T = any>(endpoint: string): Promise<T | null> {
	if (isBuild) {
		console.warn(`⚠️ Skip fetch to ${endpoint} (build mode)`);
		return null;
	}

	try {
		const res = await fetch(`${baseURL}${endpoint}`, {
			headers: {
				Accept: 'application/json',
				Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
			},
			next: { revalidate: 60 }, // ISR
		});

		if (!res.ok) {
			console.warn(`❌ Failed to fetch ${baseURL}${endpoint}: ${res.status}`);
			return null;
		}

		return await res.json();
	} catch (err) {
		console.warn(`❌ Error fetching ${baseURL}${endpoint}`, err);
		return null;
	}
}
