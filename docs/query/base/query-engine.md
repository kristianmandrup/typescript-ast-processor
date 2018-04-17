# Query Engine

* `runTest(opts)` Perform a test using a node tester
* `queryName(name: string, query: any)` queries on a name (string value) for name matches
* `queryNames(names: string[], query: any)` queries on a name (string value) for name matches

## runTest(opts)

```js
{
  query, name, bool, qprop, (type = 'node'), (test = 'test')
}
```

Arguments

* `query` the query object
* `name` the registered name of the tester
* `bool` the bool property to use (instead of using a tester)
* `qprop` the query property
* `type` the type of tester, either `node` (default) or `detail`
* `test` the test method to call on the tester (`test` by default)

Usage examples:

Using `identifier` node tester to test the name of the node via `testName` using `query.name`

```js
runTest({
  query,
  name: 'identifier',
  qprop: 'name', // query property (ie. query.name)
  test = 'testName'
})
```

Using `isExported` bool test to test against `query.exported`

```js
runTest({
  query,
  bool: 'isExported',
  qprop: 'exported',
})
```

## queryName(name: string, query: any): boolean

Utility method to query a string value (name)

```js
queryName(id, query.id) // true or false
```

See `testName` in `util/name.ts`

## queryNames(names: string[], query: any): boolean

Utility method to query a list of string values (names)

```js
queryNames(params, query.paramNames) // true or false
```

See `testNames` in `util/name.ts`

## queryValue(value: any, query: any): boolean

Utility method to query a value, where the query contains either matcher functions or values to be compared with the value directly

```js
query = {
  anyOf: [/x/, 'y'],
}
```

```js
queryValue(param, query.param) // true or false
```

See `testValue` and `createValueTest` in `util/value.ts`

## test(query: any): boolean

Run query and return true if all query results are truthy.
Uses `runTests(query)`

```js
query = {
  name: {
    anyOf: [/Component$/],
  },
  extends: {
    anyOf: [/Component$/],
  },
}
```

Usage

```js
test(query) // true or false
```

## testNot(query: any, tester: Function): boolean

Utility method to make a boolean NOT test, such as:

```js
query = {
  not: {
    name: {
      anyOf: [/Component$/],
    },
  },
}
```

Usage

```js
testNot(query, tester) // true or false
```

## testAnd(query: any, tester: Function): boolean

Utility method to make a boolean AND test, such as:

```js
query = {
  and: {
    name: {
      anyOf: [/Meta/, 'Component'],
    },
    implements: {
      allOf: ['Base'],
    },
  },
}
```

Usage

```js
testAnd(query, tester) // true or false
```

## testOr(query: any, tester: Function): boolean

Utility method to make a boolean OR test, such as:

```js
query = {
  or: {
    name: {
      anyOf: [/Meta/, 'Component'],
    },
    implements: {
      allOf: ['Base'],
    },
  },
}
```

Usage

```js
testOr(query, tester) // true or false
```

## testCount(query: any, count: number): boolean

```js
query = {
  count: {
    min: 2,
    max: 5,
  },
}
```

Usage

```js
testCount(query, paramsCount) // true or false
```

## query(query: any): any

Queries node using query object and returns query result as object

```js
query = {
  name: {
    anyOf: [/Meta/, 'Component'],
  },
  implements: {
    allOf: [/^Base/],
  },
}
```

Usage

```js
query(query) // query result object
```

Result (all matching)

```js
{
  name: 'MetaObject',
  implements: ['BaseObject']
}
```

Result (only name matching)

```js
{
  name: 'MetaObject',
  implements: []
}
```

## runQueries(query): any

Run each registered query on each of the query entries of the query argument

```js
query = {
  name: {
    anyOf: [/Meta/, 'Component'],
  },
  implements: {
    allOf: [/^Base/],
  },
}
```

Assuming registered query map:

```js
queries = {
  name(query) {
    return queryName(query)
  }
  implements(query) {
    return queryImplementes(query)
  },
  // ...
}
```

Usage

```js
runQueries(query) // query result object
```

## runTests(query): boolean

Run each registered query as a test, returning `true` if all pass (ie. truthy result), otherwise returning `false`

```js
query = {
  name: {
    anyOf: [/Meta/, 'Component'],
  },
  implements: {
    allOf: [/^Base/],
  },
}
```

Assuming registered query map:

```js
queries = {
  name(query) {
    return queryName(query)
  }
  implements(query) {
    return queryImplementes(query)
  },
  // ...
}
```

Usage

```js
runTests(query) // query result object
```
