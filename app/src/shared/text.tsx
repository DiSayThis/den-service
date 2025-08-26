import { ReactNode } from 'react';

import { ITechItem } from '@/features/TechStack/TechStack';

import { IDigitItem, IReview } from './types/typesStrapi';
import FlipText from './ui/FlipText';
import { TypeFontAwesomeIconName } from './ui/icons/icons.types';

interface IProblemCard {
	title: string;
	description: string;
	solution?: string;
	iconName?: TypeFontAwesomeIconName;
}

export const logosUrls = [
	'/images/logos/MIREA_Logo.svg',
	'/images/logos/Bauman_Logo.webp',
	'/images/logos/Mai_Logo1.webp',
	'/images/logos/mfti_logo.webp',
	'/images/logos/mgu_Logo.webp',
	'/images/logos/vhse_logo.webp',
	'/images/logos/vk_logo.webp',
	'/images/logos/vtb_logo.webp',
	'/images/logos/softline_logo.webp',
];

export const problemsText = {
	title: <>Расскажем как сэкономить месяцы при выборе платформы!</>,
	subTitle: (
		<>
			Навигатор цифровой трансформации - это комьюнити с общей целью. С многими мы вместе с
			институтской скамьи, с некоторыми - работаем на протяжении многих лет и повседневно решаем
			сложные жизненные задачи. От построения отдела продаж и упаковки продуктов до внедрения BPM
			платформ. Наша цель - помочь российскому бизнесу быстро адаптироваться к отечественным
			решениям.
		</>
	),
};

export const problemCardsContent: IProblemCard[] = [
	{
		iconName: 'FaCubes',
		title: 'Платформ десятки — критериев сотни',
		description:
			'Как выбрать подходящее ПО для бизнеса? Какие лучшие решения? Мы поможем разобраться в этом вопросе.',
		solution:
			'SalesKit агрегирует опыт 35+ внедрений. Мы знаем что было изнутри! Критерии уже отфильтрованы по вашему сценарию',
	},
	{
		iconName: 'FaFileInvoice',
		title: 'У каждого вендора своя терминология',
		description:
			'У вас нет времени досконально разбираться в продуктах? Строить матрицу функциональных/нефункциональных требований?',
		solution:
			'Мы решили вопрос первичного отсева решений и пропустили два этапа встреч-презентаций. Не трать время впустую! SalesKit AI собрал в себе информацию по ключевым платформам РФ. 10 минут, вместо 2 недель беспрерывных встреч.',
	},
	{
		iconName: 'FaDonate',
		title: 'Риски проваленного внедрения = миллионы',
		description:
			'Мы поможем минимизировать риски и сделать процесс внедрения максимально эффективным.',
		solution:
			'У нас 17+ консалтера и проверенные команды внедрения. Поможем достичь бизнес-цели «От проваленного проекта к Результату». Это объединение коллег из нашего тесного мира ИТ. Это авто-тестирование, CI/CD практики, гайдлайны и беспрерывное документирование.',
	},
];

export const callToActionText1 = {
	title: 'Расскажем как сэкономить месяцы ваших денег!',
	subTitle: 'Наш эксперт свяжется и подскажет, с чего начать цифровую трансформацию.',
	placeholder: 'Номер телефона',
	buttonText: (
		<>
			<span style={{ marginRight: '.25rem' }}>🤖</span>
			<FlipText repeat repeatType="mirror">
				Сгенерировать КП
			</FlipText>
		</>
	),
};
export const callToActionText2 = {
	title: 'Подберём специалиста под вашу задачу',
	subTitle: 'Оставьте номер, мы свяжемся с вами и уточним детали',
	placeholder: 'Номер телефона',
	buttonText: (
		<>
			<span style={{ marginRight: '.25rem' }}>📞</span>
			<FlipText repeat repeatType="mirror">
				Подобрать специалиста
			</FlipText>
		</>
	),
};

export const landingDemoScreenshots = [
	'/images/demo/rostfinance.png',
	'/images/demo/etm.png',
	'/images/demo/strizhi.ru_.png',
	'/images/demo/studmart.png',
	'/images/demo/antivor.png',
	'/images/demo/landing-demo1.jpg',
	'/images/demo/landing-demo2.jpg',
	'/images/demo/gracemountain.png',
];

export const defaultDigitsArray: IDigitItem[] = [
	{
		digit: 97,
		addText: '%',
		description: 'клиентов отмечают рост эффективности бизнеса',
	},
	{
		digit: 1200,
		description: 'Компаний успешно сгенерировали для себя КП и остались довольны результатом',
	},
	{
		digit: 15,
		addText: 'B+',
		description:
			'миллиардов рублей экономят ежегодно наши клиенты после пересмотра бизнес-модели закупочных процедур',
	},
];

export const productionDemoText = {
	title: <>Проектный опыт</>,
	description: (
		<>
			За годы работы мы помогли сотням компаний сделать правильный выбор в поиске решения и команды
			внедрения. Наши проекты - это история роста, автоматизации продаж и оптимизации операционных
			процессов СМБ с реальным результатом. Мы внимательно слушаем задачи клиентов и предлагаем
			решения, которые не просто работают, а дают измеримый эффект.
		</>
	),
	images: [
		'/images/demo/нордпак.webp',
		'/images/demo/смородина.webp',
		'/images/demo/стрижи.webp',
		'/images/demo/ЭТМ.webp',
	],
};

export const productionDemoText2 = {
	title: <>UX интерфейс</>,
	description: (
		<>
			Первый шаг к цифровой трансформации - сбор привычных пользователям механик и прототипирование
			интерфейса понятного каждому. Аналитик собирает бизнес-требования, а продукт менеджер -
			описывает интерфейс.
			<br />
			<br />
			<b>
				Мы достигаем результата в 100% случаев.
				<br />
				Разберем пользовательские сценарии, построим правильный портрет ЦА и разработаем новый UX
				прототип - это ПЕРВЫЕ АРТЕФАКТЫ которые получишь.
			</b>
		</>
	),
	images: [
		'/images/demo/present(1).webp',
		'/images/demo/present(2).webp',
		'/images/demo/present(3).webp',
		'/images/demo/present(4).webp',
		'/images/demo/present(5).webp',
	],
};

export const reviews: IReview[] = [
	{
		avatar: { url: '/images/avatars/1.webp' },
		name: 'Иван Петров',
		text: 'Работа команды превзошла все ожидания. Проект был реализован в срок, при этом качество кода и архитектуры системы было на высшем уровне. Особенно впечатлила их способность быстро адаптироваться к изменениям и оперативно решать возникающие задачи.',
		rating: 5,
	},
	{
		avatar: { url: '/images/avatars/3.webp' },
		name: 'Мария Иванова',
		text: 'Профессионализм и ответственность разработчиков заметны во всех деталях. Внедрение прошло гладко, без сбоев. Команда всегда была на связи и оперативно отвечала на все вопросы, что значительно облегчило процесс интеграции в нашу бизнес-среду.',
		rating: 5,
	},
	{
		avatar: { url: '/images/avatars/2.webp' },
		name: 'Алексей Смирнов',
		text: 'Очень доволен сотрудничеством с этой командой. Технические решения были продуманными и масштабируемыми. Команда проявила гибкость, учитывая наши пожелания и быстро внедряя необходимые доработки.',
		rating: 5,
	},
	{
		avatar: { url: '/images/avatars/1.webp' },
		name: 'Елена Кузнецова',
		text: 'Отличное сочетание экспертизы и коммуникации. Разработчики не просто реализовали функционал, а предложили оптимизации, которые повысили производительность нашего продукта. Рекомендую как надёжного партнёра для сложных проектов.',
		rating: 5,
	},
	{
		avatar: { url: '/images/avatars/1.webp' },
		name: 'Дмитрий Волков',
		text: 'Слаженная работа и внимательное отношение к деталям. В процессе внедрения команда обеспечила полноценное тестирование и сопровождение, благодаря чему мы избежали многих потенциальных проблем.',
		rating: 5,
	},
	{
		avatar: { url: '/images/avatars/1.webp' },
		name: 'Ольга Смирнова',
		text: 'Благодарю за качественную реализацию и постоянную поддержку. Особо отмечу прозрачность процессов и своевременную коммуникацию, которые помогли нам вовремя скорректировать планы и достигнуть поставленных целей.',
		rating: 5,
	},
	{
		avatar: { url: '/images/avatars/1.webp' },
		name: 'Сергей Михайлов',
		text: 'Команда показала высокий уровень экспертизы и ответственности. Внедрение сложной системы прошло практически без сбоев, а предоставленные решения существенно оптимизировали наши бизнес-процессы.',
		rating: 5,
	},
	{
		avatar: { url: '/images/avatars/1.webp' },
		name: 'Анна Лебедева',
		text: 'Профессиональный подход к проекту, внимание к деталям и готовность к диалогу — вот что выделяет эту команду среди других. Сотрудничество прошло гладко, а результат превзошёл наши ожидания.',
		rating: 5,
	},
	{
		avatar: { url: '/images/avatars/1.webp' },
		name: 'Николай Орлов',
		text: 'Стабильность и качество кода, грамотная архитектура и прозрачное планирование — все это стало залогом успешного запуска проекта. Рекомендую для тех, кто ценит качество и надёжность.',
		rating: 5,
	},
	{
		avatar: { url: '/images/avatars/1.webp' },
		name: 'Татьяна Васильева',
		text: 'Очень довольна сотрудничеством. Команда не только реализовала проект, но и помогла выстроить процессы поддержки и дальнейшего развития. Коммуникация была на высоте, что немаловажно при комплексных внедрениях.',
		rating: 5,
	},
];

export interface IAboutCards {
	iconName?: TypeFontAwesomeIconName;
	title: string;
	description?: string;
}

export interface IThreshold {
	hours: number;
	rate: number;
}

export interface ICalculatorProps {
	minHours?: number;
	maxHours?: number;
	defaultRate: number;
	thresholds?: IThreshold[];
	onChangeHours?: (v: number) => void;
	onChangeTotal?: (v: number) => void;
	buttonClick?: () => void;
	onClick?: () => void;
}

export const aboutUs = {
	title: 'ПОЧЕМУ НАМ ДОВЕРЯЮТ',
};

export const aboutUsCards: IAboutCards[] = [
	{
		iconName: 'FaUsers',
		title: 'Большая команда экспертов',
		description:
			'35+ специалистов знающих изнутри все подводные камни бизнеса. Найдем решение среди друзей',
	},
	{
		iconName: 'FaLightbulb',
		title: 'Глубокая аналитика',
		description:
			'Проводим оценку ситуации. Системный анализ, бизнес-анализ, конверсионный аудит, инструментальный аудит, архитектурный аудит, аудит бизнес-процессов',
	},
	{
		iconName: 'FaChartLine',
		title: 'Измеримый результат',
		description:
			'Каждое наше подключение к проекту дает ощутимый результат. Наша цель - помочь российскому бизнесу быстро адаптироваться к отечественным решениям.',
	},
	{
		iconName: 'FaHandshake',
		title: 'Проверенные партнёры',
		description:
			'Навигатор цифровой трансформации выступает гарантом надежной связи с интеграторами и вендорами отечественного ПО',
	},
	{
		iconName: 'FaProjectDiagram',
		title: 'От идеи до внедрения',
		description:
			'Мы здраво оцениваем возможности и соизмеримый результат. Сопровождаем проекты и минимизируем риски и задержки проектов.',
	},
	{
		iconName: 'FaComments',
		title: 'Быстро и надежно',
		description: 'Без пустых встреч и бесконечных презентаций — только конкретика.',
	},
];

export interface IOutstaffRoles {
	key: string;
	title: string;
	description: string | ReactNode;
	image: string;
	techCards?: ITechItem[];
	calculation: ICalculatorProps;
}
// outstaffData.ts
export const outstaffRoles: IOutstaffRoles[] = [
	{
		key: 'backend',
		title: 'Backend-разработчик',
		description: (
			<>
				Наши backend-разработчики создают надёжную и масштабируемую архитектуру, обеспечивая
				стабильную работу сервиса под любой нагрузкой. От API до интеграций — всё работает быстро,
				безопасно и без сюрпризов.
			</>
		),
		image: '/images/specialists/backend.webp',
		calculation: {
			defaultRate: 4200,
			minHours: 30,
			maxHours: 250,
			thresholds: [
				{ hours: 50, rate: 4000 },
				{ hours: 200, rate: 3500 },
			],
		},
		techCards: [
			{
				name: 'C#',
				logoUrl: '/images/techLogo/csharp.svg',
			},
			{
				name: '.Net Core',
				logoUrl: '/images/techLogo/dot-net-core.svg',
			},
			{
				name: 'NestJS',
				logoUrl: '/images/techLogo/nestjs.svg',
			},
			{
				name: 'Node.js',
				logoUrl: '/images/techLogo/nodejs-icon.svg',
			},
			{
				name: 'RabbitMQ',
				logoUrl: '/images/techLogo/rabbitmq.svg',
			},
			{
				name: 'Kafka',
				logoUrl: '/images/techLogo/kafka.svg',
			},
			{
				name: 'Redis',
				logoUrl: '/images/techLogo/redis.svg',
			},
			{
				name: 'PostgreSQL',
				logoUrl: '/images/techLogo/postgresql.svg',
			},
			{
				name: 'MongoDb',
				logoUrl: '/images/techLogo/mongodb-icon-1.svg',
			},
			{
				name: 'MySQL',
				logoUrl: '/images/techLogo/mysql-logo-pure.svg',
			},
		],
	},
	{
		key: 'frontend',
		title: 'Frontend-разработчик',
		calculation: {
			defaultRate: 4100,
			minHours: 30,
			maxHours: 250,
			thresholds: [
				{ hours: 50, rate: 4000 },
				{ hours: 200, rate: 3500 },
			],
		},
		description: (
			<>
				Фронтенд-команда превращает сложный функционал в удобный и красивый интерфейс. Мы делаем
				продукты, которыми приятно пользоваться, и которые одинаково хорошо выглядят на всех
				устройствах.
			</>
		),
		image: '/images/specialists/frontend.webp',
		techCards: [
			{
				name: 'React',
				logoUrl: '/images/techLogo/react-2.svg',
			},
			{
				name: 'Next.js',
				logoUrl: '/images/techLogo/next-js.svg',
			},
			{
				name: 'JavaScript',
				logoUrl: '/images/techLogo/javascript.svg',
			},
			{
				name: 'TypeScript',
				logoUrl: '/images/techLogo/typescript.svg',
			},
			{
				name: 'Redux',
				logoUrl: '/images/techLogo/redux.svg',
			},
			{
				name: 'Zustand',
				logoUrl: '/images/techLogo/zustand.svg',
			},
			{
				name: 'Sass',
				logoUrl: '/images/techLogo/sass.svg',
			},
			{
				name: 'Tailwind',
				logoUrl: '/images/techLogo/tailwindcss.svg',
			},
			{
				name: 'Jest',
				logoUrl: '/images/techLogo/Jest.svg',
			},
			{
				name: 'Vite',
				logoUrl: '/images/techLogo/vitejs.svg',
			},
		],
	},
	{
		key: 'devops',
		title: 'DevOps',
		description: (
			<>
				DevOps-инженеры автоматизируют процессы, чтобы ваш продукт обновлялся быстро, стабильно и
				без простоев. Настраиваем CI/CD, мониторинг и инфраструктуру под рост бизнеса.
			</>
		),
		image: '/images/specialists/devops.webp',
		calculation: {
			defaultRate: 5500,
			minHours: 30,
			maxHours: 350,
			thresholds: [
				{ hours: 100, rate: 5000 },
				{ hours: 200, rate: 4500 },
			],
		},
		techCards: [
			{
				name: 'Docker',
				logoUrl: '/images/techLogo/docker.svg',
			},
			{
				name: 'Kubernetes',
				logoUrl: '/images/techLogo/kubernetes.svg',
			},
			{
				name: 'GitLab CI/CD',
				logoUrl: '/images/techLogo/gitlab.svg',
			},
			{
				name: 'GitHub Actions',
				logoUrl: '/images/techLogo/github.svg',
			},
			{
				name: 'Ansible',
				logoUrl: '/images/techLogo/ansible.svg',
			},
			{
				name: 'Grafana',
				logoUrl: '/images/techLogo/grafana.svg',
			},
		],
	},
	{
		key: 'analytics',
		title: 'Аналитик',
		description: (
			<>
				Наши аналитики превращают сложные бизнес-идеи в чёткие и понятные требования для разработки.
				Это экономит время, снижает риски ошибок и обеспечивает полное взаимопонимание в команде.
			</>
		),
		image: '/images/specialists/analytic.webp',
		calculation: {
			defaultRate: 2500,
			minHours: 50,
			maxHours: 250,
			thresholds: [
				{ hours: 100, rate: 2300 },
				{ hours: 200, rate: 2200 },
			],
		},
		techCards: [
			{
				name: 'Jira',
				logoUrl: '/images/techLogo/jira.svg',
			},
			{
				name: 'Confluence',
				logoUrl: '/images/techLogo/confluence.svg',
			},
			{
				name: 'UML',
				logoUrl: '/images/techLogo/UML.svg',
			},
			{
				name: 'Swagger',
				logoUrl: '/images/techLogo/swagger.svg',
			},
			{
				name: 'Figma',
				logoUrl: '/images/techLogo/figma_1.svg',
			},
		],
	},
];
