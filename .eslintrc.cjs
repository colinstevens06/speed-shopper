/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
	root: true,
	env: { node: true },
	globals: { defineProps: 'readonly', defineEmits: 'readonly' },
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
		'@vue/eslint-config-prettier'
	],
	rules: {
		'@typescript-eslint/no-var-requires': 'off',
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'vue/max-attrivutes-per-line': 'off',
		'vue/no-v-model-argument': 'off',
		'vue/multi-word-component-names': 'off',
		// allow paren-less arrow functions
		'arrow-parens': 0,
		// allow async-await
		'generator-star-spacing': 0,
		'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
		// Enable vue/scrip-setup-uses-vars rule
		'vue/script-setup-uses-vars': 'error',
		'no-irregular-whitespace': 0,
		semi: [1, 'always'],
		'no-debugger': 'off'
	},
	parserOptions: {
		ecmaVersion: 'latest'
	}
};
