# ExpressionStatementNodeTester

## info

Sample `ExpressionStatementNodeTester.info()` result:

```js
{
  occurences: {
    'typeof': 2,
    'delete': 1
  }
}
```

## test/query

Sample `query`:

```js
{
  occurences: {
    'typeof': {
      max: 2
    }
  }
}
```

Find an expression statement node:

- which contains at most 2 `typeof` keywords

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  occurences: {
    'typeof': true
  }
}
```
