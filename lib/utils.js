'use strict'

const _ = require('lodash')

function immutableMerge () {

    if (arguments.length === 0) return {}
    if (arguments.length === 1) return arguments[0]
    if (arguments.length === 2) {

        return _.merge(_.cloneDeep(arguments[0]), arguments[1])

    } else {

        return immutableMerge(_.first(arguments), immutableMerge(_.rest(arguments)))

    }

}

function _mergeObjects (objA, objB, lvl) {

    const result = {}

    Object.keys(objA).forEach(key => {

        result[key] = (objB[key] === undefined)
            ? objA[key]
            : _merge(objA[key], objB[key], lvl)

    })

    Object.keys(objB).forEach(key => {

        if (objA[key] === undefined) {

            result[key] = objB[key]

        }

    })

    return result

}

function _mergeArrays (arrA, arrB, lvl) {

    const result = []

    arrA.forEach((el) => {

        const lastIndex = _.indexOf(arrB, el)

        if (lastIndex === -1) {

            result.push(el)

        } else {

            result.push(_merge(el, arrB[lastIndex], lvl))

        }

    })

    arrB.forEach(el => {

        const lastIndex = _.indexOf(arrA, el)

        if (lastIndex === -1) {

            result.push(el)

        }

    })

    return result

}

function _merge (ela, elb, lvl = 0) {

    if (lvl < 2) {

        // note: an array is an object too so it has been tested before the object.
        if (_.isArray(ela)) return _mergeArrays(ela, elb, lvl + 1)
        if (_.isObject(ela)) return _mergeObjects(ela, elb, lvl + 1)

    }

    return elb

}

/**
 * ESlint calls reduce for option.globals when it is array and object both. While
 * the call for array converts it to object with all keys listed and assigned
 * 'false', the call for an object must return the object itself without 'reduce'
 * property. This function implements this conversion.
 *
 * @return {object}     - The object itself without `reduce` property
 * @example
 *     anObject.reduce = _reduceObject
 *     const cli = new CLIEngine(anObject)
 */
function _reduceObject () {

    delete this.reduce

    return this

}

/**
 * The `globals` section of an eslint config can be either an object or array of strings
 * (as a simplified version). This function converts the simplified array to an object
 * each property of which contains 'false'.
 *
 * @param  {object} cfg - eslint configuration object
 * @return {object}     - the same object with globals updated if necessary
 */
function _normilizeConfig (cfg) {

    const SUBCONFIG_SEP = ':'

    if (_.isArray(cfg.globals)) {

        cfg.globals = (cfg.globals || []).reduce((globals, def) => {

            const parts = def.split(SUBCONFIG_SEP)

            globals[parts[0]] = (parts.length > 1 && parts[1] === 'true')

            return globals

        }, {})

    }

    if (_.isObject(cfg.globals)) cfg.globals.reduce = _reduceObject

    return cfg

}

/**
 * Merge several config objects in one. Each next object rewrites options existing
 * options and adds new if found. While rewriting, all properties of 1st and 2nd
 * level are merging. Any deeper items are rewritten. It allows to merge properties
 * like 'extends', 'plugins' or rules but rewrites the whole rules or plugin with
 * its configuration.
 *
 * @param  {object} list    - List of objects separated by ','
 * @return {object}         - Summarized object
 * @example
 *     mergeAll()                           // will return {}
 *     mergeAll({a:1})                      // will return {{a:1}}
 *     mergeAll({a:1}, {b:2}, {a:3, c:3})   // will return {{a:3, b:2, c:3}}
 */
function mergeAll () {

    if (arguments.length === 0) return {}
    if (arguments.length === 1) return arguments[0]

    let ctr = 0

    let result = _normilizeConfig(arguments[ctr++])

    do {

        result = _merge(result, _normilizeConfig(arguments[ctr++]))

    } while (ctr < arguments.length)

    return result

}

/**
 * Removes a property from an object.
 *
 * @param  {object} options    - An object that contains the property.
 * @param  {string} optionName - Name of a property to remove.
 * @return {[type]}            - The object without the property inside.
 */
function extractOption (options, optionName) {

    const value = options[optionName]

    delete options[optionName]

    return value

}

/**
 * Test existence of argument 'arnName' in the command line.
 *
 * @param  {srting} argName - A name of argument to test.
 * @return {boolean}        - true if the argument exists or false another case.
 */
function argExists (argName) {

    let result = false

    process.argv.forEach((val) => {

        if (val === argName) result = true

    })

    return result

}

module.exports = {
    immutableMerge,
    merge: mergeAll,
    extractOption,
    argExists,
}
