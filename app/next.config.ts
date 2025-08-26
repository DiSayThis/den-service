import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	output: 'standalone',
	webpack(config) {
		const fileLoaderRule = config.module.rules.find((rule: any) => rule.test?.test?.('.svg'));
		if (fileLoaderRule) {
			fileLoaderRule.exclude = /\.svg$/i;
		}
		config.module.rules.push({
			test: /\.svg$/i,
			issuer: /\.[jt]sx?$/,
			use: ['@svgr/webpack'],
		});
		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: 'http',
				hostname: '**',
			},
			{
				protocol: 'https',
				hostname: '**',
			},
		],
	},
};

export default nextConfig;
