# Find exported refs in TypeScript

[![Greenkeeper badge](https://badges.greenkeeper.io/kristianmandrup/typescript-ast-traverser.svg)](https://greenkeeper.io/)

Based on:

- [TypeScript: Using-the-Compiler-API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [TypeScript: Using-the-Language-Service-API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Language-Service-API)
- [TypeWiz internals blog post](https://medium.com/@urish/diving-into-the-internals-of-typescript-how-i-built-typewiz-d273bbef3565)
- [Custom Lint rules](https://flexport.engineering/writing-custom-lint-rules-for-your-picky-developers-67732afa1803)
- [Working with ESLint rules](https://eslint.org/docs/developer-guide/working-with-rules)
- [Writing ESLint rule](https://gist.github.com/sindresorhus/1656c46f23545deff8cc713649dcff26)

```js
const rule = require("../../../lib/rules/no-ugly-buttons");
const RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true,
    },
  }
});

const ERROR_MSG_NOT_STYLED = 'Buttons must be styled with a btn class at least.';

const ruleTester = new RuleTester();

ruleTester.run("no-ugly-buttons", rule, {
    valid: [
      {
          code: '<button className="button"></button>',
      }
    ],
    invalid: [
        {
            code: '<button></button>',
            errors: [{
                message: ERROR_MSG_NOT_STYLED,
                type: 'JSXOpeningElement'
            }]
        }
    ]
});
```
