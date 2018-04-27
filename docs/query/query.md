# Query

* For code, see `src/node/query` folder
* For usage examples, see tests in `__tests__/node/query` folder

## Boolean query combinators

* `OrQuery`
* `AndQuery`
* `NotQuery`

Currently a `NodeTester` instance has `testNot`, `testAnd` and `testOr` available as instance methods, which uses methods of the same names from `util/test/boolean-logic`

```js
export function testNot(query: any, tester: Function) {
  if (!query) return true
  return query.not ? !Boolean(tester(query.not)) : tester(query)
}
```

The `tester` is the function performing the normal query. It takes the `query.not` as argument, and the wrapper `testNot`, simply inverts the boolean result if a `not` query property is present.

Instead of this "quick and dirty" legacy approach, we should use a proper Query class to compose the query using classes.

## Factories

* `createAnyQueryMatcher`
* `createAllQueryMatcher`
* `createExactQueryMatcher`

## Classes

* `AnyQueryMatcher`
* `AllQueryMatcher`
* `ExactQueryMatcher`

## Usage

For the (rare) case where the node has a property that can be directly used

```js
createAnyQueryMatcher({
  node,
  key: 'name', // will use getter or call function of that name on node
})
```

Passing value to test/query directly

```js
createAnyQueryMatcher({
  value: this.names,
})
```

## Anti-patterns: value functions

Note: In general it is better to leverage a getter like `this.names` above, rather than inlining complex value functions.

Passing function `value` to find value(s) to test from node

```js
createAnyQueryMatcher({
  value: (node) => {
    return node.name ? node.name.getText() : undefined
  },
})
```

More advanced value function example.

```js
createAnyQueryMatcher({
  value: (node) => {
    const { declarations } = node
    if (!declarations) return []
    return declarations.map((decl) =>
      return createTester('identifier', decl, this.options).names,
    )
  },
})
```
