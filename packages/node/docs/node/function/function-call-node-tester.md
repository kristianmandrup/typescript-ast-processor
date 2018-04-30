# FunctionCallNodeTester

## info

Sample `FunctionCallNodeTester.info()` result:

```js
{
  name: 'sayHello',
  args: {
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
  'await': true
  // ...
}
```

TODO: some form of `arguments` testing

Find a function call node:

- where `name` matches `/^say/` (ie. starts with `say`)
- which is calls an `async` function using await (ie. expects function to return a `Promise`)

- where the function arguments must meet the following conditions
  - TODO...

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  name: 'sayhello']
  'await': true,
  'arguments': {
    names: [
      //...
    ],
    types: [
      // ...
    ]
  }
}
```
