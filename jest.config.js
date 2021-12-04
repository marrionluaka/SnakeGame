const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
  preset: '@vue/cli-plugin-unit-jest/presets/typescript',
  modulePaths: ['<rootDir>/src', '<rootDir>/node_modules'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],

  transform: {
    '^.+\\.vue$': 'vue-jest'
  },
  transformIgnorePatterns: ['/src/plugins/*', '/node_modules'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'vue', 'pug'],
  globals: {
    'ts-jest': {
      compiler: 'typescript'
    },
    'vue-jest': {
      pug: {
        filename: 'pug',
        doctype: 'html',
        basedir: './'
      }
    }
  }
}
