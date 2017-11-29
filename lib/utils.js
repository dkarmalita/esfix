'use strict'

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

module.exports = {
    _reduceObject,
    argExists,
    extractOption,
}
