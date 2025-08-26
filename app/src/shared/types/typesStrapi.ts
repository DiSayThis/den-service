// Image related interfaces

import { TypeFontAwesomeIconName } from '../ui/icons/icons.types';

interface IImageFormat {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	path: string | null;
	width: number;
	height: number;
	size: number;
	sizeInBytes: number;
	url: string;
}

interface IFormats {
	thumbnail: IImageFormat;
	small?: IImageFormat;
	medium?: IImageFormat;
	large?: IImageFormat;
	[key: string]: IImageFormat | undefined; // Для дополнительных размеров
}

interface IImage {
	id?: number;
	documentId?: string;
	name?: string;
	alternativeText?: string | null;
	caption?: string | null;
	width?: number;
	height?: number;
	formats?: IFormats | null;
	hash?: string;
	ext?: string;
	mime?: string;
	size?: number;
	url: string;
	previewUrl?: string | null;
	provider?: string;
	provider_metadata?: any | null;
	createdAt?: string; // ISO date string
	updatedAt?: string;
	publishedAt?: string;
}

// Hero Section

interface IHeroData {
	id: number;
	documentId: string;
	title: string;
	description: string;
	buttonText: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	test: string; // Содержит markdown и ссылку на изображение
}

interface IHero {
	data: IHeroData;
}

// About Us Section

interface IAboutUsCard {
	id: number;
	iconName: TypeFontAwesomeIconName;
	title: string;
	description: string;
}

interface IAboutUsData {
	id: number;
	documentId: string;
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	cards: IAboutUsCard[];
}

interface IAboutUs {
	data: IAboutUsData;
}

// Slideshow Section

interface ISlideshowData {
	id: number;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	images: IImage[];
}

interface ISlideshow {
	data: ISlideshowData;
}

// Problems Section

interface IProblemsCard {
	id: number;
	title: string;
	description: string;
	solution: string;
	iconName: TypeFontAwesomeIconName;
}

interface IProblemsData {
	id: number;
	documentId: string;
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	cards: IProblemsCard[];
}

interface IProblems {
	data: IProblemsData;
}

// Partners Section

interface IPartnersData {
	id: number;
	documentId: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	logos: IImage[];
}

interface IPartners {
	data: IPartnersData;
}

// Service Section

interface IServiceCard {
	id?: number;
	title: string;
	duration: string;
	price: string;
	features: string[];
	artifacts: string[];
	extras?: string[] | null;
	image: IImage;
}

interface IServiceData {
	id?: number;
	documentId?: string;
	title?: string;
	description?: string;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
	card: IServiceCard[];
}

interface IService {
	data: IServiceData;
}

// Outstaff Section

interface IOutstaffCalculationThreshold {
	hours: number;
	rate: number;
}

interface IOutstaffCalculation {
	defaultRate: number;
	minHours: number;
	maxHours: number;
	thresholds: IOutstaffCalculationThreshold[];
}

interface ITechCard {
	name: string;
	image: IImage;
}
interface IOutstaffCard {
	id: number;
	title: string;
	description: string;
	calculation: IOutstaffCalculation;
	techCards: ITechCard[];
	image: IImage;
}

interface IOutstaffData {
	id?: number;
	documentId?: string;
	title: string;
	description: string;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
	outstaffCards: IOutstaffCard[];
}

interface IOutstaff {
	data: IOutstaffData;
}

// Digits Section

interface IDigitItem {
	id?: number;
	documentId?: string;
	digit: number;
	addText?: string;
	description: string;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
}

interface IDigits {
	data: {
		digits: IDigitItem[];
	};
}

// CTA Sections

interface ICTAData {
	id: number;
	documentId: string;
	title: string;
	subTitle?: string;
	placeholder: string;
	buttonText: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	image?: IImage; // Только в cta1
}

interface ICTA1 {
	data: ICTAData;
}

interface ICTA2 {
	data: ICTAData;
}

// End Hero Section

interface IEndHeroData {
	title: string;
	buttonText: string;
}

interface IEndHero {
	data: IEndHeroData;
}

// Prod Demos Section

interface IProdDemoItem {
	id: number;
	documentId: string;
	title: string;
	description: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	images: IImage[];
}

interface IProdDemos {
	data: IProdDemoItem[];
}

// Reviews Section

interface IReview {
	id?: number;
	documentId?: string;
	name: string;
	text: string;
	rating: number;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
	avatar: IImage;
}

interface IReviews {
	data: IReview[];
}

// Modal Sections

interface IModalData {
	id?: number;
	documentId?: string;
	title: string;
	description: string;
	placeholder?: string | null;
	fileInputText?: string | null;
	buttonText?: string;
	createdAt?: string;
	updatedAt?: string;
	publishedAt?: string;
}

interface IModalHh {
	data: IModalData;
}

interface IModalKp {
	data: IModalData;
}

interface IModalOutstaff {
	data: IModalData;
}

// Main API Data Interface

interface IApiData {
	hero: IHeroData;
	aboutUs: IAboutUsData;
	slideshow: ISlideshowData;
	problems: IProblemsData;
	partners: IPartnersData;
	service: IServiceData;
	outstaff: IOutstaffData;
	digits: IDigitItem[];
	cta1: ICTAData;
	cta2: ICTAData;
	endHero: IEndHeroData;
	prodDemos: IProdDemoItem[];
	reviews: IReview[];
	modalHh: IModalData;
	modalKp: IModalData;
	modalOutstaff: IModalData;
}

interface ISocialLinkData {
	vk: string;
	tg: string;
}
interface ISocialLink {
	data: ISocialLinkData;
}

export type {
	ISocialLink,
	ISocialLinkData,
	IApiData,
	IHero,
	IAboutUs,
	ISlideshow,
	IProblems,
	IPartners,
	IService,
	IOutstaff,
	IDigits,
	ICTA1,
	ICTA2,
	IEndHero,
	IProdDemos,
	IReviews,
	IModalHh,
	IModalKp,
	IModalOutstaff,
	IImage,
	IImageFormat,
	IFormats,
	IHeroData,
	IAboutUsData,
	IAboutUsCard,
	ISlideshowData,
	IProblemsData,
	IProblemsCard,
	IPartnersData,
	IServiceData,
	IServiceCard,
	IOutstaffData,
	IOutstaffCard,
	ITechCard,
	IOutstaffCalculation,
	IOutstaffCalculationThreshold,
	IDigitItem,
	ICTAData,
	IEndHeroData,
	IProdDemoItem,
	IReview,
	IModalData,
};
