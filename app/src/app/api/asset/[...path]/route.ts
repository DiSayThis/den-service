import { NextRequest, NextResponse } from 'next/server';

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://strapi:1337';

export async function GET(req: NextRequest, context: { params: Promise<{ path: string[] }> }) {
	try {
		// ждём params
		const { path } = await context.params;

		// собираем путь: /uploads/...svg
		const targetUrl = `${STRAPI_URL}/${path.join('/')}`;

		const response = await fetch(targetUrl);

		if (!response.ok) {
			return NextResponse.json(
				{ error: `Failed to fetch ${targetUrl}` },
				{ status: response.status },
			);
		}

		const contentType = response.headers.get('content-type') || 'application/octet-stream';
		const buffer = Buffer.from(await response.arrayBuffer());

		return new NextResponse(buffer, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=3600',
			},
		});
	} catch (err) {
		console.error('Proxy error:', err);
		return NextResponse.json({ error: 'Proxy failed' }, { status: 500 });
	}
}
