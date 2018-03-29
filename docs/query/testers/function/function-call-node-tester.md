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
  // ...
}
```
