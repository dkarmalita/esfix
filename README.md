# Esfix

[![Build Status](https://travis-ci.org/dkarmalita/esfix.svg?branch=master)](https://travis-ci.org/dkarmalita/esfix)
[![codecov](https://codecov.io/gh/dkarmalita/esfix/branch/master/graph/badge.svg)](https://codecov.io/gh/dkarmalita/esfix)

**Table of Content**

<!-- MarkdownTOC -->

- [Installation](#installation)
- [Configuration exaple](#configuration-exaple)
- [Command line options](#command-line-options)
- [Troubleshooting](#troubleshooting)
  - [Different indent sizes](#different-indent-sizes)

<!-- /MarkdownTOC -->

## Installation

`npm i --dev @kard/esfix`

Or with yarn

`yarn add --dev @kard/esfix`

## Configuration exaple

In the `package.json`:

```
  "scripts": {
    "esfix": "esfix"
  },
  "eslintConfig": {
    "files": [ "src/**/*.js", "src/**/*.jsx" ],
    "fix": true
  }
```

Notes:
* The `eslintConfig` section can be used to rewrite all of the eslint options. Please refer to the [Configuration File Formats](https://eslint.org/docs/user-guide/configuring#configuration-file-formats) and [Rules](https://eslint.org/docs/rules/) pages of eslint documentation.

## Command line options

`--nolocals` - Ignore any local configurations of the analyzed projects. Whet this key is presents, the only internal configuration of the package is using.

`--dryrun` - No fixes are carried out linting is performed and all of its messages are shown. It's like to run eslint without `--fix`.

`--showconfig` - Show summarized config. No checks or fixes are carried out in this case.

## Troubleshooting

### Different indent sizes

It is especially painful when only indent is rewritten in a separate file (for instance: the main configuration is inside `.eslintrc.json` while rewrite is placed inside `package.json`)

**Error pattern**
```
error: Expected indentation of ... space characters but found ... (react/jsx-indent-props) at ...

...

11 errors and 1 warning found.
11 errors potentially fixable with the `--fix` option.
```

**Solution**: make sure that these rules are in sync.
```
  "rules": {
    "indent": ["error", 2],
    "react/jsx-indent": [ "error", 2 ],
    "react/jsx-indent-props": [ "error", 2 ]
  }
```
