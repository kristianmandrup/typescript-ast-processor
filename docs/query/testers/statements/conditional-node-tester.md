# ConditionalNodeTester

The `ConditionalNodeTester` will use one of the following specialized node testers depending on the type of conditional for the node in question.

- `IfThenElseNodeTester`
- `SwitchNodeTester`
- `TernaryNodeTester`

## IfThenElseNodeTester

### if/else: info

Sample `LiteralNodeTester.info()` result:

```js
{
  nestingLevels: 2,
  'else': true
}
```

### if/else: test/query

Sample `query`:

```js
{
  nestingLevels: 2,
  'else': true
}
```

Find an `if` node:

- that is not nested more than 2 levels deep (max 2 parent blocks)
- with an `else` block (ie. `if (condition) {} else {}`)

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  nestingLevels: 1,
  'else': true
}
```

## SwitchNodeTester

### switch: info

Sample `SwitchNodeTester.info()` result:

```js
{
  nestingLevels: 1,
  conditionalType: 'switch',
  cases: 3,
  defaultCase: true
}
```

### switch: test/query

Sample `query`:

```js
{
  nestingLevels: 1,
  cases: {
    max: 2
  },
  defaultCase: true
}
```

Find a `switch` node:

- that is not nested more than 1 levels deep (max 1 parent blocks)
- that has at most 2 case blocks (ie. `case negative: return 0`)
- that has a default case block

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  nestingLevels: 1,
  cases: 2,
  defaultCase: true
}
```

## TernaryNodeTester

### ternary: info

Sample `TernaryNodeTester.info()` result:

```js
{
  conditionalType: 'ternary'
}
```

### ternary: test/query

Sample `query`:

```js
{
  conditionalType: 'ternary'
}
```

Find a conditional node of the type `ternary`
