// Note: List of eslint rules with the fixable rules marked can be found here:
// https://eslint.org/docs/rules/

const { merge } = require('../lib/utils')

const jsStandard = require('eslint-config-standard')

const jsxStandard = require('eslint-config-standard-jsx')

const INDEND_SIZE = 4

const configUpdate = {

    /*
        Custom properties allow to manage CLI
     */

    'files': [ 'src/**/*.js', 'src/**/*.jsx' ],
    'fix': true,
    'formatter': 'codeframe',

    /*
        Eslint documented configuration
     */

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
    },
    'parser': 'babel-eslint',
    'parserOptions':
       { ecmaVersion: 2017,
           ecmaFeatures: { experimentalObjectRestSpread: true, jsx: true },
           sourceType: 'module' },
    'rules': {

        /**
         * Original rules
         */
        // https://eslint.org/docs/rules/padding-line-between-statements
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: [ 'const', 'let', 'var' ], next: '*' },
            { blankLine: 'any', prev: [ 'const', 'let', 'var' ], next: [ 'const', 'let', 'var' ] },
            { blankLine: 'always', prev: '*', next: 'return' },
        ],

        /*
            These rules are changes to standard's set
            ref: https://standardjs.com/rules.html#javascript-standard-style
            js base: https://github.com/standard/eslint-config-standard/blob/master/eslintrc.json
            jsx base: https://github.com/standard/eslint-config-standard-jsx/blob/master/eslintrc.json
         */

        /*
            Rewriting major rules
            ---------------------
         */

        // No unreachable code after return, throw, continue, and break statements.
        // https://eslint.org/docs/rules/no-unreachable
        // "no-unreachable": "error",
        'no-unreachable': 'warn',

        'react/jsx-no-undef': 'warn',
        // "react/jsx-no-undef": "error",
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-no-undef.md

        'react/prop-types': 'warn',

        'no-unused-vars': 'warn',

        'no-console': [ 'warn', { 'allow': [
            'warn',
            'error',
        ] }],

        /*
            Code styling with fixable rules (complete set of fixables)
            ==========================================================
         */

        // Note: array-bracket-even-spacing (not fixable rule) is replaced
        // with with 'array-bracket-spacing' definition which is fixable one.
        'standard/array-bracket-even-spacing': 'allow', // [ 'error', 'either' ],
        'array-bracket-spacing': [ 'error', 'always', {
            'singleValue': false,
            'objectsInArrays': false,
            'arraysInArrays': false,
        }],

        'standard/object-curly-even-spacing': [ 'allow', 'either' ],
        'object-curly-spacing': [ 'error', 'always' ],

        // Use 2 spaces for indentation.
        // https://eslint.org/docs/rules/indent
        // "indent": ["error", 2, { "SwitchCase": 1 }],
        'indent': [ 'error', INDEND_SIZE ], // 2

        // Use single quotes for strings except to avoid escaping.
        // https://eslint.org/docs/rules/quotes
        // 'quotes': [ 'error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],

        // Add a space after keywords.
        // https://eslint.org/docs/rules/keyword-spacing
        // 'keyword-spacing': [ 'error', { 'before': true, 'after': true }],

        // Add a space before a function declaration's parentheses.
        // https://eslint.org/docs/rules/space-before-function-paren
        // 'space-before-function-paren': [ 'error', 'always' ],

        // Always use === instead of ==.
        // https://eslint.org/docs/rules/eqeqeq
        // 'eqeqeq': [ 'error', 'always', { 'null': 'ignore' }],
        'eqeqeq': [ 'warn', 'always', { 'null': 'ignore' }],

        // Infix operators must be spaced.
        // https://eslint.org/docs/rules/space-infix-ops
        // "space-infix-ops": "error"
        'space-infix-ops': [ 'error', { 'int32Hint': false }],

        // Commas should have a space after them.
        // https://eslint.org/docs/rules/comma-spacing
        // 'comma-spacing': [ 'error', { 'before': false, 'after': true }],

        // Keep else statements on the same line as their curly braces.
        // https://eslint.org/docs/rules/brace-style
        // 'brace-style': [ 'error', '1tbs', { 'allowSingleLine': true }],

        // For multi-line if statements, use curly braces.
        // https://eslint.org/docs/rules/curly
        // 'curly': [ 'error', 'multi-line' ],
        // 'curly': [ 'error', 'multi' ],

        // Multiple blank lines not allowed.
        // https://eslint.org/docs/rules/no-multiple-empty-lines
        // 'no-multiple-empty-lines': [ 'error', { 'max': 1, 'maxEOF': 0 }],

        // For the ternary operator in a multi-line setting, place ? and : on their own lines.
        // https://eslint.org/docs/rules/operator-linebreak
        // 'operator-linebreak': [ 'error', 'after', { 'overrides': { '?': 'before', ':': 'before' } }],

        // Add spaces inside single line blocks.
        // https://eslint.org/docs/rules/block-spacing
        // 'block-spacing': [ 'error', 'always' ],

        // Trailing commas not allowed.
        // https://eslint.org/docs/rules/comma-dangle
        // "comma-dangle": ["error", {
        //   "arrays": "never",
        //   "objects": "never",
        //   "imports": "never",
        //   "exports": "never",
        //   "functions": "never"
        // }],
        'comma-dangle': [ 'error', 'always-multiline' ],

        // Commas must be placed at the end of the current line.
        // https://eslint.org/docs/rules/comma-style
        // 'comma-style': [ 'error', 'last' ],

        // Dot should be on the same line as property.
        // https://eslint.org/docs/rules/dot-location
        // 'dot-location': [ 'error', 'property' ],

        // Files must end with a newline.
        // https://eslint.org/docs/rules/eol-last
        // 'eol-last': [ 'error', 'always' ],

        // No space between function identifiers and their invocations.
        // https://eslint.org/docs/rules/func-call-spacing
        // 'func-call-spacing': [ 'error', 'never' ],

        // Add space between colon and value in key value pairs.
        // https://eslint.org/docs/rules/key-spacing
        // 'key-spacing': [ 'error', { 'beforeColon': false, 'afterColon': true }],

        // Constructor with no arguments must be invoked with parentheses.
        // https://eslint.org/docs/rules/new-parens
        // 'new-parens': 'error',

        // No debugger statements.
        // https://eslint.org/docs/rules/no-debugger
        // "no-debugger": "error",

        // Avoid unnecessary function binding.
        // https://eslint.org/docs/rules/no-extra-bind
        // "no-extra-bind": "error",

        // Avoid unnecessary boolean casts.
        // https://eslint.org/docs/rules/no-extra-boolean-cast
        // "no-extra-boolean-cast": "error",

        // No unnecessary parentheses around function expressions.
        // https://eslint.org/docs/rules/no-extra-parens
        // "no-extra-parens": ["error", "functions"],

        // No floating decimals.
        // https://eslint.org/docs/rules/no-floating-decimal
        // "no-floating-decimal": "error",

        // Do not use multiple spaces except for indentation.
        // https://eslint.org/docs/rules/no-multi-spaces
        // "no-multi-spaces": "error",

        // Avoid multiple spaces in regular expression literals.
        // https://eslint.org/docs/rules/no-regex-spaces
        // "no-regex-spaces": "error",

        // Whitespace not allowed at end of line.
        // https://eslint.org/docs/rules/no-trailing-spaces
        // "no-trailing-spaces": "error",

        // Initializing to undefined is not allowed.
        // https://eslint.org/docs/rules/no-undef-init
        // "no-undef-init": "error",

        // No ternary operators when simpler alternatives exist.
        // https://eslint.org/docs/rules/no-unneeded-ternary
        // "no-unneeded-ternary": ["error", { "defaultAssignment": false }],

        // The left operand of relational operators must not be negated.
        // https://eslint.org/docs/rules/no-unsafe-negation
        // "no-unsafe-negation": "error",

        // Avoid using unnecessary computed property keys on objects.
        // https://eslint.org/docs/rules/no-useless-computed-key
        // "no-useless-computed-key": "error",

        // Renaming import, export, and destructured assignments to the same name is not allowed.
        // https://eslint.org/docs/rules/no-useless-rename
        // "no-useless-rename": "error",

        // No whitespace before properties.
        // https://eslint.org/docs/rules/no-whitespace-before-property
        // "no-whitespace-before-property": "error",

        // Maintain consistency of newlines between object properties.
        // https://eslint.org/docs/rules/object-property-newline
        // "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": true }],

        // No padding within blocks.
        // https://eslint.org/docs/rules/padded-blocks
        // "padded-blocks": ["error", { "blocks": "never", "switches": "never", "classes": "never" }],
        'padded-blocks': [ 'error', 'always' ],

        // No whitespace between spread operators and their expressions.
        // https://eslint.org/docs/rules/rest-spread-spacing
        // "rest-spread-spacing": ["error", "never"],

        // Semicolons must have a space after and no space before.
        // https://eslint.org/docs/rules/semi-spacing
        // "semi-spacing": ["error", { "before": false, "after": true }],

        // Must have a space before blocks.
        // https://eslint.org/docs/rules/space-before-blocks
        // "space-before-blocks": ["error", "always"],

        // No spaces inside parentheses.
        // https://eslint.org/docs/rules/space-in-parens
        // "space-in-parens": ["error", "never"],

        // Unary operators must have a space after.
        // https://eslint.org/docs/rules/space-unary-ops
        // "space-unary-ops": ["error", { "words": true, "nonwords": false }],

        // Use spaces inside comments.
        // https://eslint.org/docs/rules/spaced-comment
        // "spaced-comment": ["error", "always", {
        //   "line": { "markers": ["*package", "!", "/", ","] },
        //   "block": { "balanced": true, "markers": ["*package", "!", ",", ":", "::", "flow-include"], "exceptions": ["*"] }
        // }],

        // No spacing in template strings.
        // https://eslint.org/docs/rules/template-curly-spacing
        // "template-curly-spacing": ["error", "never"],

        // Immediately Invoked Function Expressions (IIFEs) must be wrapped.
        // https://eslint.org/docs/rules/wrap-iife
        // "wrap-iife": ["error", "any", { "functionPrototypeMethods": true }],

        // "wrap-iife": ["error", "any", { "functionPrototypeMethods": true }],
        // https://eslint.org/docs/rules/yield-star-spacing
        // "yield-star-spacing": ["error", "both"],

        // Avoid Yoda conditions.
        // https://eslint.org/docs/rules/yoda
        // "yoda": ["error", "never"],

        // No semicolons. (see: 1, 2, 3)
        // (1): http://blog.izs.me/post/2353458699/an-open-letter-to-javascript-leaders-regarding
        // (2): http://inimino.org/~inimino/blog/javascript_semicolons
        // (3): https://www.youtube.com/watch?v=gsfbh17Ax9I
        // "semi": ["error", "never"],
        'semi': [ 'error', 'never' ], // 'always'

        /*
            jsx fixable rules
            =================
         */

        // "jsx-quotes": ["error", "prefer-single"],
        // https://eslint.org/docs/rules/jsx-quotes

        // "react/jsx-boolean-value": "error",
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-boolean-value.md

        // "react/jsx-curly-spacing": ["error", "never"],
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-curly-spacing.md

        // "react/jsx-equals-spacing": ["error", "never"],
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-equals-spacing.md

        'react/jsx-indent': [ 'error', INDEND_SIZE ],
        // "react/jsx-indent": ["error", 2],
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent.md

        'react/jsx-indent-props': [ 'error', INDEND_SIZE ],
        // "react/jsx-indent-props": ["error", 2],
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-indent-props.md

        // "react/jsx-tag-spacing": ["error", { "beforeSelfClosing": "always" }],
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-tag-spacing.md

        // "react/self-closing-comp": "error"
        // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/self-closing-comp.md

    },
    'globals': [
    // note: There is a known bug about eslint 'globals'. https://stackoverflow.com/a/45776151
        '__DEV__',
        'require',
        'console',
        'process',
        'module',
        'document',
        'navigator',
        'window',
        'setTimeout',
        'ArrayBuffer',
    ],
}

module.exports = merge(
    jsStandard,
    jsxStandard,
    configUpdate
)
