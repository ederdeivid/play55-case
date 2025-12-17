// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt({
  ignores: ['server/**/**/*.ts'],
  rules: {
    "no-multiple-empty-lines": ["error", { "max": 1, "maxEOF": 0 }],
    'vue/multi-word-component-names': 'off',
    "max-lines-per-function": ["error", 25]
  },
})
