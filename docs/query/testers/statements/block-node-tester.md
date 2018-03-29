# AssignmentExprNodeTester

## info

Sample `AssignmentExprNodeTester.info()` result:

```js
{
  nestedLevels: 2
}
```

## test/query

Sample `query`:

```js
{
  nestedLevels: {
    max: 3
  }
}
```

Find a block statement node:

- which is not nested more than 3 levels deep (ie. more than 2 containing block parents)

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  nestedLevels: 2
}
```

Which in this particular case is the exact same as the result of `info`
