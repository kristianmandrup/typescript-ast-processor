# Node testers

The node testers are the *code* of the AST Query engine.
The node testers qyery/aggregate on all nodes within the sub-tree of the node being queried

The can be used to:

- collect and aggregate data
- query for matches

## Usage

You typically use the testers:

- inside `visitor` functions to `query` or `test` details of the node.
- inside `collector` function to gather `info` about the node

Sample usage: inside `If` node visitor

```js
import tsProcessor from 'typescript-ast-processor'
const {
  factories
} = tsProcessor.node.tester

const tester = factories.createTester('ifThenElse', node, options)
const hasElseBlock = tester.query({
  else: true
})
// ...
```

## Extending or Creating Node testers

- extend a suitable node tester such as `BaseNodeTester`
- call `super(node, options)`
- create testers needed to test node properties
- add required methods for `INodeTester` api
  - `info()` - return info object
  - `test(query)` - run `query`, return `true` if query matches, `false` if not
  - `query(query)` - run query and return query result as an object, with match result for each sub query

### Example

```js
export class ClassNodeProcessor extends IndentifierNodeProcessor {
  memberTester: any

  constructor(node: any, options: any = {}) {
    super(node, options)
    memberTester = this.createNodeTester('class.member', node, options)
  }

  info() {
    return {
      // info obj
    }
  }

  test(query: any) {
    return true
  }

  query(query: any) {
    return {
      // query result
    }
  }
}
```

## TODO

We need to rename node testers so as not to "conflict" with node details testers of similar names and make it clear which is which. We might instead call `ClassTester` for `ClassQuery` and rename the `testXyz` methods to `queryXyz` in the process.

## Info

To collect and aggregate data, all testers have an `info()` method which returns the aggregated data of the subtree as a (nested) object.

Perhaps info should be a getter (`get`) and/or `async`?

### Example: Class info

```js
  info(): any {
    return {
      name: this.name,
      abstract: this.testAbstract(true),
      heritage: this.heritage.info(),
      exported: this.isExported
    }
  }
```

Here we test on the `info` result in a jest test:

```js
  it('collects correct info', () => {
    const info = tester.info()
    expect(info.abstract).toBeFalsy()
    expect(info.exported).toBeTruthy()
    expect(info.name).toBe('X')
    expect(info.heritage.extends).toBe('B')
    expect(info.heritage.implements.names).toEqual(['Ix'])
    expect(info.heritage.implements.number).toBe(1)
  })
```

### Example: Function info

```js
  info() {
    return {
      name: this.name,
      parameters: this.parametersInfo,
      returnType: this.returnType,
      exported: this.isExported,
      declaration: this.isDecl,
      arrow: this.isArrow,
      generator: this.isGenerator
    }
  }
```

A typical `info` result would be:

```js
{
  "name": "minus",
  "parameters": {
    "names": [
      "a",
      "b"
    ],
    "types": [
      "number",
      "number"
    ],
    "items": [
      {
        "type": "number",
        "name": "a",
        "init": {}
      },
      {
        "type": "number",
        "name": "b",
        "init": {
          "type": "number",
          "value": 32,
          "textValue": "32"
        }
      }
    ]
  },
  "returnType": "any",
  "exported": true
}
```

## Query

Currently queries are executed via the `test` method which takes a singular query argument, an object containing the full query to be executed on the node.

```js
test(query: any): any {
  // .. execute query
}
```

Currently a typical implementation might look like this, where each of the queries (or at least the aggregation of all the sub-queries) will be returned as a boolean (`true` or `false`)

```js
  test(query: any): boolean {
    return this.testName(query) &&
      this.testAbstract(query) &&
      this.testImplements(query) &&
      this.testExtends(query) &&
      this.testMembers(query)
  }
```

Each tester must also support a `query` method which returns the query result in a more structured form, where you get the result of each sub-query, such as:

```js
  query(query: any): any {
    return this.result({
      name: this.testName(query) &&
      abstract: this.testAbstract(query) &&
      implements: this.testImplements(query) &&
      extends: this.testExtends(query) &&
      members : this.testMembers(query)
    })
  }
```

In order to avoid duplication, we might well use a clever `reduce` in order to re-use the query logic for both methods and only return sub-query results for queries that return a value. We will also likely further optimize the query, such as caching results and possibly performing sub-queries asynchronously.

Note that in the example, the `result` function would filter and/or format the result for "consumption", such that f.ex keys with `undefined` values are stripped out (will likely instead be done in the reducer mentioned).

## Querying lists

For querying lists, such as `parameters` (ie. `Parameter[]`) in a `FunctionDeclaration` node you can use the generic `ListTester`.

`ParametersTester` serves as a good example. Note that the getters such as `names` and `types` are used both in `info` (ie. data aggregation) and also for the query methods such as `testNames` and `testTypes`.

Clearly we have room for improvement here, to take advantage of common patterns and reduce code bloat and pattern duplication. Please feel free to contribute!

```js
export class ParametersTester extends BaseTester {
  // ...

  get parameters() {
    return this.nodes
  }

  info() {
    return {
      names: this.names,
      types: this.types,
      items: this.items
    }
  }

  get names() {
    return this.parameters.map(nameOf) || []
  }

  get types() {
    return this.parameters.map(typeName) || []
  }

  testNames(query: any) {
    return this.queryItems(this.names, query)
  }

  testTypes(query: any) {
    return this.queryItems(this.types, query)
  }
}
```

Note that `queryItems` currently only queries on the names (of `Identifier` nodes) of the items passed. It works both with `String` and `RegExp` query expressions:

```js
query = {
  names: {
    anyOf: [/Tester$/, 'name']
  },
  types: {
    anyOf: ['string', 'number']
  }
}
```

We now need a good way to test on items, which is a collection of parameter object containing both name and type info

Utility function `idDetails(node)`

```js
function idDetails(node: any) {
  return {
    type: typeName(node),
    name: nameOf(node),
    init: initializerDetails(node)
  }
}
```

Used by `items` getter of `ParametersTester`

```js
get items() {
  return this.parameters.map(idDetails) || []
}
```

Querying on items should match on both name and type of each entry, where both tests must pass for an entry to pass the test.

```js
query = {
  items: {
    anyOf: {
      name: [/Tester$/, 'name'],
      type: ['string', 'number']
    }
  }
}
```

Eventually we might add additional power so that we use implicit `and` but can specify `or` or `not` conditions if needed.

```js
query = {
  items: {
    anyOf: {
      or: {
        name: [/Tester$/, 'name'],
        type: ['string', 'number']
      }
    }
  }
}
```

We will also include support for passing custom tester functions.
For testing/querying each entry.

```js
query = {
  items: {
    anyOf: (entry: any, query: any) => entry.name === query.name && entry.type === query.type
  }
}
```

For testing/querying the list of entries.

```js
query = {
  items: (entries: any, query: any) => {
    return entries.find(query.fn)
  }
}
```
