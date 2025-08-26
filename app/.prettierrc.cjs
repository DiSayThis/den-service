/** @type {import("prettier").Config} */
module.exports = {
	plugins: ['@ianvs/prettier-plugin-sort-imports'],
	importOrder: [
		'',
		'^react$',
		'^react-dom$',
		'',

		'<BUILTIN_MODULES>',
		'<THIRD_PARTY_MODULES>',
		'<TYPES>',
		'^[a-z]', // прочие node-модули
		'',

		// FSD: базовые слои
		'^@/app/(.*)$',
		'^@/pages/(.*)$',
		'',

		'^@/shared/(.*)$',
		'^@/ui/(.*)$',
		'^@/entities/(.*)$',
		'^@/features/(.*)$',
		'^@/widgets/(.*)$',

		// Логика/сервисные
		'^@/store/(.*)$',
		'',

		'^@/assets/(.*)$',
		'^@/images/(.*)$',
		'^@/public/(.*)$',
		'',
		// Остальные
		'^@/(.*)$',
		'',

		// Относительные импорты (в конце)
		'^../(.*)$',
		'^./(.*)$',
		'',

		// CSS / SCSS
		'^@/styles/(.*)$',
		'\\.s?css$',
		'^(?!.*[.]css$)[./].*$',
		'.css$',
	],
	importOrderParserPlugins: ['typescript', 'jsx', 'tsx', 'css', 'scss', 'decorators-legacy'],
	importOrderTypeScriptVersion: '5.0.0',
	importOrderCaseSensitive: true,

	singleQuote: true,
	trailingComma: 'all',
	useTabs: true,
	semi: true,
	bracketSpacing: true,
	printWidth: 100,
	endOfLine: 'auto',
};
