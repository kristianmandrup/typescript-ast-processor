# Node testers

The node testers are the *code* of the AST Query engine.
The node testers qyery/aggregate on all nodes within the sub-tree of the node being queried

The can be used to:

- collect and aggregate data
- query for matches


## Info

To collect and aggregate data, all testers have an `info()` method which returns the aggregated data of the subtree as a (nested) object.

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

## Query

Currently queries are executed via the `test` method which takes a singular query argument, an object containing the full query to be executed on the node.

```js
test(query: any): any {
  // .. execute query
}
```

Currently a typical implementation might look like this, but this is likely to be improved and changed.

```js
  test(query: any): any {
    return this.testName(query) &&
      this.testAbstract(query) &&
      this.testImplements(query) &&
      this.testExtends(query) &&
      this.testMembers(query)
  }
```

An improved version might look sth like this:

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

The `result` function would then filter and/or format the result for "consumption", such that f.ex keys with `undefined` values are stripped out.

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

  queryItems(items: any[], query: any) {
    return this.createNamesTesterFor({ items: this.names }).test(query)
  }

  testNames(query: any) {
    return this.queryItems(this.names, query)
  }


  testTypes(query: any) {
    return this.queryItems(this.types, query)
  }
}
```
