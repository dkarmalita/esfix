#!/usr/bin/env node
/**
 * @fileoverview Eslint CLI default configuration and fix utility.
 * @author Dmitriy Karmalita (dmitriy.karmalita@gmail.com)
 *
 * Note: eslint stacks is required.
 */
/* eslint no-console: 0 */
'use strict'

const fs = require('fs')
const colors = require('colors/safe')
const {
    argExists,
    extractOption,
} = require('../lib/utils')
const ESfixConfig = require('../lib/ESfixConfig')

/**
 * Put a config to console
 *
 * @param  {object} eslintConfig - a configuration to print
 * @return {void}
 */
const showConfig = (eslintConfig) => {

    console.log('*** CONFIG START ***')
    console.log(eslintConfig)
    console.log('*** CONFIG END ***')

}

/**
 * Updates options with a set from file.
 *
 * @param  {object}     options     - configuration object to update
 * @param  {'string'}   filePath    - path to file (js or json)
 * @param  {'string'}   section     - name of section to use ('eslintConfig' for `package.json`)
 * @return {object}                 - updated object
 */
const applyFile = (options, filePath, section) => {

    if (!argExists('--nolocals') && fs.existsSync(filePath)) {

        options = new ESfixConfig(
            options,
            section ? require(filePath)[section] : require(filePath)
        ).summarized

    }

    return options

}

/**
 * Takes an eslint formatter and its report. If there is a case of no unfixed
 * errors, put an ok message to the console, another case outs the formatted
 * report.
 *
 * @param  {function}   formatter   - a formatter returned by eslint cli
 * @param  {object}     report      - an error report returned by eslint cli
 * @return {void}
 * @example
 *      const formatter = cli.getFormatter("checkstyle")
 *      const report = cli.executeOnFiles(...)
 *      reportErrors(formatter,report)
 */
function reportErrors (formatter, report) {

    if (
        !report.errorCount &&
        !report.warningCount &&
        !report.fixableErrorCount &&
        !report.fixableWarningCount) {

        return colors.green('Linter-ESLint: Fix complete.')

    }

    return formatter(report.results)

}

/**
 * Creates summarized config by applying updates to default one.
 * @return {object}   - eslint config file
 */
const loadConfig = () => {

    const rootPath = process.cwd()

    // Take default config (standard is included)
    let options = require('../config/eslint')

    // Rewrite with options of current project's `.eslintrc.json`
    options = applyFile(options, `${rootPath}/.eslintrc.json`)
    // Rewrite with options of current project's `package.json`
    options = applyFile(options, `${rootPath}/package.json`, 'eslintConfig')

    return options

}

const CLIEngine = require('eslint').CLIEngine

const eslintConfig = loadConfig()

if (argExists('--showconfig')) {

    showConfig(eslintConfig)
    process.exit(0)

}

if (argExists('--dryrun')) eslintConfig.fix = false

// Take off file patterns in separate constant
// note: unusual options in config cause eslint errors
const files = extractOption(eslintConfig, 'files')

const cli = new CLIEngine(eslintConfig)
const formatter = cli.getFormatter(eslintConfig.formatter || 'codeframe')
// note: list of formatters : https://eslint.org/docs/developer-guide/nodejs-api#getformatter

// Run linting
const report = cli.executeOnFiles(files || [ 'src/**/*.js', 'src/**/*.jsx' ])

// Apply fixes if configured
CLIEngine.outputFixes(report)

// Print final message or eslint report
console.log(reportErrors(formatter, report))
