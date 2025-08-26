import axios, { CreateAxiosDefaults } from 'axios';

import { getContentType } from './api.helper';

const API_URL = '/api';

const axiosOptions: CreateAxiosDefaults = {
	baseURL: API_URL,
	headers: getContentType(),
	withCredentials: true,
};

export const axiosClassic = axios.create(axiosOptions);

const isServer = typeof window === 'undefined';

const baseURL = isServer
	? (process.env.NEXT_PUBLIC_STRAPI_URL ?? 'http://localhost:1337') + API_URL
	: process.env.NEXT_PUBLIC_STRAPI_ASSETS_URL + API_URL;

export const cms = axios.create({
	baseURL,
	headers: { Accept: 'application/json' },
});

// серверный токен — только на сервере
cms.interceptors.request.use((config) => {
	config.headers.Authorization = `Bearer ${process.env.STRAPI_API_TOKEN}`;
	return config;
});
