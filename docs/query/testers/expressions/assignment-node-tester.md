# AssignmentExprNodeTester

## info

Sample `AssignmentExprNodeTester.info()` result:

```js
{
  name: 'obj',
  value: 2
}
```

## test/query

Sample `query`:

```js
{
  name: /^obj/,
  value: (v) => v > 0
}
```

Find an assignment expression node:

- which has a `name` that starts with `obj`
- which has a `value` that is positive

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  name: 'obj'
  value: 2
}
```

Which in this particular case is the exact same as the result of `info`
