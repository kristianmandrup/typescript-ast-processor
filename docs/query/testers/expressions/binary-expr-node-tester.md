# BinaryExprNodeTester

## info

Sample `BinaryExprNodeTester.info()` result:

```js
{
  parenthesised: 2,
  and: 2,
  or: 1,
  gte: 1
}
```

## test/query

Sample `query`:

```js
{
  parenthesised: {
    max: 2
  },
  and: true
}
```

Find a binary expression node:

- which contains at most 2 parenthesised expressions
- which contains one or more `and` (ie. `&&`) expressions

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  parenthesised: 3
  and: true,
  gt: true
}
```
