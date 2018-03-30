# Loop Node tester

The `LoopNodeTester` will use one of the following specialized node testers depending on the type of loop for the node in question.

- `WhileLoopNodeTester`
- `ForLoopNodeTester`

## WhileLoopNodeTester

### while: info

Sample `WhileLoopNodeTester.info()` result:

```js
{
  nestingLevels: 2,
  loop: true,
  loopType: 'while',
  whileThen: true,
  doWhile: false
}
```

### while: test/query

Sample `query`:

```js
{
  nestingLevels: 1,
  whileType: 'whileDo'
}
```

Find a while loop node:

- where the node is not nested more than 1 level deep (max 1 parent block)
- is a while loop of the type `whileDo` (ie. `while (condition) { }`)

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  nestingLevels: 0,
  whileType: true
}
```

## ForLoopNodeTester

### for: info

Sample `ForLoopNodeTester.info()` result:

```js
{
  nestingLevels: 2,
  loop: true,
  loopType: 'for',
  forOf: true,
  forType: 'of'
}
```

### for: test/query

Sample `query`:

```js
{
  nestingLevels: 1,
  forType: 'of'
}
```

Find a for loop node:

- where the node is not nested more than 1 level deep (max 1 parent block)
- is a for loop of the type `of` (ie. `for (x of xs)`)

Only if all these conditions are met, `test(query)` will return `true`
Calling `query(query)` will return a result of the form:

```js
{
  nestingLevels: 0,
  forType: true
}
```
