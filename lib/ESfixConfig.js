'use strict'

const _ = require('lodash')
const { _reduceObject } = require('./utils')

const cfgSections = [

    // Valid configuration sections
    // https://eslint.org/docs/2.0.0/user-guide/configuring
    'parserOptions',
    'parser',
    'env', // either object or array (undocumented) https://github.com/eslint/eslint/issues/2846
    'globals',
    'plugins',
    'rules',
    'settings',
    'root',
    'extends',
]

// eslint-disable-next-line no-unused-vars
const techSections = [

    // technical sections
    'fix',
    'formatter',
    'useEslintrc',
    'envs',
]

// eslint-disable-next-line no-unused-vars
const custonSections = [

    // private one (have to be deleted before passing to CLIEngine)
    'files',
]

const getEmptyConfig = () => {

    const result = {}

    cfgSections.forEach(key => {

        result[key] = {}

    })

    return result

}

const ArrayToObject = (arr) => {

    const SUBCONFIG_SEP = ':'

    arr = (arr || []).reduce((globals, def) => {

        const parts = def.split(SUBCONFIG_SEP)

        globals[parts[0]] = (parts.length > 1 && parts[1] === 'true')

        return globals

    }, {})

    // Initialize object reducer with a utility.
    // It's necessary because eslint is going to call it.
    arr.reduce = _reduceObject

    return arr

}

const ObjectToArray = (obj) => {

    if (!obj) return []
    const result = []

    Object.keys(obj).forEach(key => {

        obj[key] && result.push(key)

    })

    return result

}

const mergeDeep = (cfgA, cfgB) => {

    // 1.Copy both operands to ensure their immutability.
    const result = Object.assign({}, cfgA)
    const update = Object.assign({}, cfgB)

    // 2.Convert an array of globals to object by eslint's rules.
    // It's necessary to successfully merge with 'standard'.
    if (Array.isArray(result.globals)) {

        result.globals = ArrayToObject(result.globals)

    }
    if (Array.isArray(update.globals)) {

        update.globals = ArrayToObject(update.globals)

    }

    // 3.Update fields of the result (cfgA) with values of the update.
    // Use different approach in depends on the type or even name of
    // the properties.
    Object.keys(update).forEach(key => {

        if (key === 'parserOptions') {

            result[key] = mergeDeep(result[key], update[key])

            return

        }

        // arrays: 'plugins', 'envs'
        if (Array.isArray(cfgB[key])) {

            result[key] = _.union(result[key] || [], update[key])

            return

        }

        // objects: 'rules', 'gloals', 'env', 'globals', 'settings', 'extends'
        if (_.isObject(update[key])) {

            result[key] = Object.assign(result[key] || {}, update[key])

            return

        }

        // simple values: 'parser', "fix", "formatter", "useEslintrc",
        result[key] = update[key]

    })

    // 4.Convert 'env' object to 'envs' array with only unique values.
    // The summarized array contains only items with true false. Items
    // with false values are ignored. It's necessary because only 'envs'
    // is used by CLIEngine.
    // https://github.com/eslint/eslint/issues/2846
    result.envs = result.envs ? _.union(result.envs, ObjectToArray(result.env)) : ObjectToArray(result.env)

    return result

}

module.exports = class ESfixConfig {

    constructor (...args) {

        this.configs = args

        if (this.configs.length === 0) {

            this.configs.push(getEmptyConfig())

        }

    }

    get summarized () {

        if (this.configs.length < 2) {

            return mergeDeep(this.configs[0])

        }

        let accu = {}

        this.configs.forEach(config => {

            accu = mergeDeep(accu, config)

        })

        return accu

    }

}
