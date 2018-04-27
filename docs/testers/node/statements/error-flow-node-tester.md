# ErrorFlowNodeTester

The `ErrorFlowNodeTester` consists of the following testers:

- `TryCatchFinallyTester`
- `ThrowTester`

## TryCatchFinallyTester

### try/catch: info

Sample `TryCatchFinallyTester.info()` result:

```js
{
  nestingLevels: 2,
  'catch': true,
  'finally': false
}
```

### try/catch: test/query

Sample `query`:

```js
{
  nestingLevels: 2,
  'catch': true
}
```

Find a `catch` node:

- that is not nested more than 2 levels deep (max 2 parent blocks)
- that has a `catch` block (ie. `try { ... } catch (err) { ... }`)

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  nestingLevels: 1,
  'catch': true
}
```

## ThrowTester

TODO
