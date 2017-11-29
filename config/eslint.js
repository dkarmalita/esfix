'use strict'
// Note: List of eslint rules with the fixable rules marked can be found here:
// https://eslint.org/docs/rules/

const jsStandard = require('eslint-config-standard')
const jsxStandard = require('eslint-config-standard-jsx')
const ESfixConfig = require('../lib/ESfixConfig')

const INDEND_SIZE = 4

const update = {
    'files': [ 'src/**/*.js', 'src/**/*.jsx' ],
    'fix': true,
    'formatter': 'codeframe',
    'useEslintrc': false,
    'extends': [ 'eslint:recommended', 'plugin:react/recommended' ],
    'plugins': [
        'class-property',
        'react',
        'promise',
        'standard',
        'node',
        'import',
    ],
    'env': {
        'browser': true,
        'commonjs': true,
        'es6': true,
        'node': true,
        'mocha': true,
    },
    'envs': [
        'browser',
        'commonjs',
        'es6',
        'node',
        'mocha',
    ],
    'parser': 'babel-eslint',
    'parserOptions':
       { ecmaVersion: 2017,
           ecmaFeatures: { experimentalObjectRestSpread: true, jsx: true },
           sourceType: 'module' },
    'rules': {
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: [ 'const', 'let', 'var' ], next: '*' },
            { blankLine: 'any', prev: [ 'const', 'let', 'var' ], next: [ 'const', 'let', 'var' ] },
            { blankLine: 'always', prev: '*', next: 'return' },
        ],
        'no-unreachable': 'warn',
        'react/jsx-no-undef': 'warn',
        'react/prop-types': 'warn',

        'no-unused-vars': 'warn',

        'no-console': [ 'warn', { 'allow': [
            'warn',
            'error',
        ] }],
        'standard/array-bracket-even-spacing': 'allow', // [ 'error', 'either' ],
        'array-bracket-spacing': [ 'error', 'always', {
            'singleValue': false,
            'objectsInArrays': false,
            'arraysInArrays': false,
        }],
        'standard/object-curly-even-spacing': [ 'allow', 'either' ],
        'object-curly-spacing': [ 'error', 'always' ],
        'indent': [ 'error', INDEND_SIZE ], // 2
        'eqeqeq': [ 'warn', 'always', { 'null': 'ignore' }],
        'space-infix-ops': [ 'error', { 'int32Hint': false }],
        'comma-dangle': [ 'error', 'always-multiline' ],
        'padded-blocks': [ 'error', 'always' ],
        'semi': [ 'error', 'never' ], // 'always'
        'react/jsx-indent': [ 'error', INDEND_SIZE ],
        'react/jsx-indent-props': [ 'error', INDEND_SIZE ],
    },
    'globals': [
        '__DEV__',
    ],
}

module.exports = new ESfixConfig(
    jsStandard,
    jsxStandard,
    update
).summarized
