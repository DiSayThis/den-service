module.exports = {
	rules: {
		// Tailwind/Flex правила
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'layer',
					'responsive',
					'screen',
					'variants',
					'reference',
					'theme',
				],
			},
		],
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'tailwind',
					'apply',
					'layer',
					'responsive',
					'screen',
					'variants',
					'reference',
					'theme',
				],
			},
		],
		'at-rule-no-deprecated': [
			true,
			{
				ignoreAtRules: [
					'apply',
					'tailwind',
					'layer',
					'screen',
					'responsive',
					'variants',
					'reference',
					'theme',
				],
			},
		],

		'selector-class-pattern': [
			// Пример: block__element--modifier
			'^[a-z]+(?:-[a-z]+)*(?:__(?:[a-z]+(?:-[a-z]+)*))?(?:--(?:[a-z]+(?:-[a-z]+)*))?$',
			{
				message:
					'Классы должны быть в формате БЭМ: block, block__element, block--modifier или block__element--modifier',
			},
		],

		// SCSS & Style
		'no-descending-specificity': [true, { ignore: ['selectors-within-list'] }],
		'no-invalid-double-slash-comments': true,
		'scss/dollar-variable-pattern': '^[a-z].*$',
		'declaration-block-no-redundant-longhand-properties': null,
		'color-function-notation': null,
		'alpha-value-notation': null,
	},
	extends: ['stylelint-config-standard-scss', 'stylelint-config-tailwindcss'],
};
