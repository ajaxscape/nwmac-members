import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginCypress from 'eslint-plugin-cypress/flat'

export default [
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node
      }
    }
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  pluginCypress.configs.recommended,
  {
    rules: {
      'cypress/no-unnecessary-waiting': 'off'
    }
  },
  pluginCypress.configs.globals
]
