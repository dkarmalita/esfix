/* eslint-disable no-unused-expressions, no-unused-vars, no-console */
const expect = require('chai').expect

const jsStandard = require('eslint-config-standard')
const jsxStandard = require('eslint-config-standard-jsx')
const fixConfig = require('../config/eslint.js')

const ESfixConfig = require('../lib/ESfixConfig.js')

// Valid sections
// https://eslint.org/docs/2.0.0/user-guide/configuring
// const sections = [
//     'parser',
//     'env', // either object or array (undocumented)
//     'globals',
//     'plugins',
//     'rules',
//     'settings',
//     'root',
//     'extends',

//     // additional sections
//     'files', // private one
//     'fix',
//     'formatter',
//     'useEslintrc',
//     'envs',
//     'parserOptions', // jsStandard
// ]

// Technical sections
// -----------------
// files // private one
// fix
// formatter
// useEslintrc
// envs
// parserOptions // jsStandard

// Configs priority
// https://eslint.org/docs/2.0.0/user-guide/configuring#configuration-file-formats
// 1 .eslintrc.js
// 2 .eslintrc.yaml
// 3 .eslintrc.yml
// 4 .eslintrc.json
// 5 .eslintrc
// 6 package.json

process.env.NODE_ENV = 'test'

const {
    _reduceObject,
    argExists,
    extractOption,
    merge,
} = require('../lib/utils')

describe('ESfixConfig', function () {

    describe('Creation of simple config', function () {

        const emptyConfig = {
            // Valid configuration sections
            // https://eslint.org/docs/2.0.0/user-guide/configuring
            'env': {},
            'extends': {},
            'globals': {},
            'parser': {},
            'parserOptions': {},
            'plugins': {},
            'root': {},
            'rules': {},
            'settings': {},
        }

        const primaryConfig = {
            'env': { browser: false },
            'extends': {},
            'globals': { 'var1': false },
            'parser': { parser: 'babel' },
            'parserOptions': { 'ecmaVersion': 6, 'sourceType': 'module', 'ecmaFeatures': { 'jsx': true } },
            'plugins': [ 'plugin3', 'eslint-plugin-plugin2' ],
            'root': true,
            'rules': {},
            'settings': {},
        }

        it('create an empty config while no arguments given', function () {

            const result = new ESfixConfig()

            expect(result.configs[0]).to.deep.equal(emptyConfig)

        })

        it('summarize only empty config', function () {

            const result = new ESfixConfig().summarized

            expect(result).to.deep.equal({ ...emptyConfig, 'envs': [] })

        })

        it('create only config from only arguments', function () {

            const result = new ESfixConfig(primaryConfig)

            expect(result.configs[0]).to.deep.equal(primaryConfig)

        })

        it('summarize only config', function () {

            const result = new ESfixConfig(primaryConfig).summarized

            expect(result).to.deep.equal({ ...primaryConfig, 'envs': [] })

        })

        const secondaryConfig = {
            'env': { 'browser': true, 'node': true, 'some': false },
            'globals': { 'var2': true },
            'parser': { 'parser': 'esprima' },
            'parserOptions': { 'ecmaVersion': 8, 'ecmaFeatures': { 'jsx': false, 'es6': true } },
            'plugins': [ 'plugin1', 'eslint-plugin-plugin2' ],
        }

        const summarizedTwo = {
            env: { browser: true, node: true, some: false },
            extends: {},
            globals: { var1: false, var2: true },
            parser: { parser: 'esprima' },
            parserOptions:
               { ecmaVersion: 8,
                   sourceType: 'module',
                   ecmaFeatures: { jsx: false, es6: true },
                   envs: [] },
            plugins: [ 'plugin3', 'eslint-plugin-plugin2', 'plugin1' ],
            root: true,
            rules: {},
            settings: {},
            envs: [ 'browser', 'node' ],
        }

        it('summarize two configs', function () {

            const result = new ESfixConfig(primaryConfig, secondaryConfig).summarized

            expect(result).to.deep.equal(summarizedTwo)

        })

        const thirdConfig = {
            'env': { 'browser': true, 'node': true, 'some': false },
            'globals': ['globA'],
            'parser': { 'parser': 'esprima' },
            'parserOptions': { 'ecmaVersion': 8, 'ecmaFeatures': { 'jsx': false, 'es6': true } },
            'plugins': [ 'plugin1', 'eslint-plugin-plugin2' ],
        }

        const summarizedThird = { env: { browser: true, node: true, some: false },
            globals: { globA: false },
            parser: { parser: 'esprima' },
            parserOptions: { ecmaVersion: 8, ecmaFeatures: { jsx: false, es6: true } },
            plugins: [ 'plugin1', 'eslint-plugin-plugin2' ],
            envs: [ 'browser', 'node' ],
        }

        it('summarize one (with array of globals) configs', function () {

            const result = new ESfixConfig(thirdConfig).summarized

            expect(typeof result.globals.reduce === 'function').to.be.true
            delete result.globals.reduce
            expect(result).to.deep.equal(summarizedThird)

        })

    })

    describe('Creation of simple config', function () {

        const configSet = new ESfixConfig(jsStandard, jsxStandard, fixConfig)

        it('create inner array of configs', function () {

            expect(configSet.configs.length).to.deep.equal(3)

        })

    })

})
