# FunctionDeclarationNodeTester

## info

Sample `FunctionDeclarationNodeTester.info()` result:

```js
{
  name: 'createThingy'
  exported: true,
  arrow: false,
  generator: false,
  async: true,
  parameters: {
    count: 2,
    names: [
      'a',
      'b'
    ],
    types: [
      'any',
      'string'
    ],
    items: [
      {
        name: 'a',
        type: 'any'
      },
      {
        name: 'b',
        type: 'string'
      }
    ]
  }
  // ...
}
```

## test/query

Sample `query`:

```js
{
  name: {
    anyOf: [/^say/],
  },
  arrow: false,
  generator: false,
  async: true,
  parameters: {
    names: {
      anyOf: [/a/, 'b']
    },
    types: {
      anyOf: ['string']
    }
  }
}
```

Find a function declaration node:

- where `name` matches `/^say/` (ie. starts with `say`)
- which is not an arrow function (ie. of the form `(...) => { }`)
- which is not a generator function (ie. has `*` token)
- which is an `async` function (ie. of the form `async function (...) {}`)

- where the function parameters must meet the following conditions
  - a parameter matching `/a/` or `b`
  - a parameter with the `string` type

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  name: 'createThingy']
  async: true,
  parameters: {
    names: ['a', 'b'],
    types: ['string']
  }
}
```
