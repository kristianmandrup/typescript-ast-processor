# LiteralNodeTester

The `LiteralNodeTester` will use one of the following specialized node testers depending on the type of literal for the node in question.

- `ObjectLiteralNodeTester`
- `ArrayLiteralNodeTester`
- ...

## ObjectLiteralNodeTester

### object: info

Sample `LiteralNodeTester.info()` result:

```js
{
  type: 'object',
  value: {
    x: 32
  },
  textValue: '{x: 32}'
}
```

### object: test/query

Sample `query`:

```js
{
  type: 'object'
  value: {
    anyOf: [{
      x: 32
    }, 32]
  }
}
```

## ArrayLiteralNodeTester

### array: info

Sample `ArrayLiteralNodeTester.info()` result:

```js
{
  type: 'array',
  value: [32, 47]
  textValue: '[32, 47]'
}
```

### array: test/query

Sample `query`:

```js
{
  type: 'array'
  value: {
    anyOf: [32, 17]
  }
}
```
