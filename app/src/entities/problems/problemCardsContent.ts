import { TypeFontAwesomeIconName } from '@/shared/ui/icons/icons.types';

interface IProblemCard {
	title: string;
	description: string;
	solution?: string;
	iconName?: TypeFontAwesomeIconName;
}
export const problemCardsContent: IProblemCard[] = [
	{
		iconName: 'FaCubes',
		title: 'Платформ десятки — критериев сотни',
		description:
			'Как выбрать подходящее ПО для бизнеса? Какие лучшие решения? Мы поможем разобраться в этом вопросе.',
		solution:
			'Навигатор агрегирует опыт 35+ внедрений. Критерии уже отфильтрованы по вашему сценарию.',
	},
	{
		iconName: 'FaFileInvoice',
		title: 'У каждого вендора — своя терминология',
		description:
			'Мы собрали все термины и понятия, чтобы вам было проще ориентироваться в мире отечественного ПО.',
		solution:
			'SalesKit AI нормализует термины — все предложения в одном формате, без маркетингового тумана.',
	},
	{
		iconName: 'FaDonate',
		title: 'Риски проваленного внедрения = миллионы',
		description:
			'Мы поможем минимизировать риски и сделать процесс внедрения максимально эффективным.',
		solution: 'Показываем подводные камни до старта — на основе реальных кейсов.',
	},
];
