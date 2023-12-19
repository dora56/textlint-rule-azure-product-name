# textlint-rule-azure-product-name [![MIT License](http://img.shields.io/badge/license-MIT-blue.svg?style=flat)](LICENSE)

> [!IMPORTANT]
> This rule is not an official rule of Microsoft.

[textlint](https://textlint.github.io/ "textlint official site") rule for [Azure product names](https://azure.microsoft.com/en-us/products/).

This rule inspired by [textlint-rule-aws-service-name](https://github.com/bun913/textlint-rule-aws-service-name).

## Features

- Check Azure product names
  - For examples:
    - `Azure Active Directory` -> `Azure Entra ID`
    - `Microsoft AI Studio` -> `Microsoft AI Studio`
    - `AIStudio` -> `AI Studio`

## Install

Install with [npm](https://www.npmjs.com/):

```bash
npm install textlint-rule-azure-product-name
```

## Usage

Via `.textlintrc.json`(Recommended)

```json
{
    "rules": {
        "azure-product-name": true
    }
}
```

Via CLI

```bash
textlint --rule azure-product-name README.md
```

### Build

Builds source codes for publish to the `lib` folder.
You can write ES2015+ source codes in `src/` folder.

```bash
npm run build
```

### Tests

Run test code in `test` folder.
Test textlint rule by [textlint-tester](https://github.com/textlint/textlint-tester).

```bash
npm test
```

You can also test each test file by running the following.

```bash
# Run only the test files under specs/.
npm run test:jest
# or npm run jest
```

```bash
# run only test files under test/.
npm run test:lint
# or npm run testLint
```

## License

MIT © dora56
