# Tester factory

Factory methods to create node and node details testers.

## Tester

* `createTester` creates a specific node or details tester, calls `createCategoryTester`
* `createCategoryTester` creates a specific node or details (category) tester
* `createNodeTester` create a node tester
* `createDetailsTester` create a details tester

### createTester(name: string, node?: any, options?: any)

Create a node tester `function` (factory) using current `node` and `options`

```js
createTester('function')
```

Create a node tester `identifier` (factory) using `name` of current node

```js
createTester('identifier', this.node.name)
```

Same, but specifying node tester category (type) via prefix `node:`)

```js
createTester('node:identifier', this.node.name)
```

Note: Many testers can themselves figure out to try to get relevant property node to use, given a node that is not suitable in itself.

### createCategoryTester(category: string, name: string, node?: any, options?: any)

A more specific way to create a specific type of tester

```js
createCategoryTester('node', 'identifier', this.node.name)
```

## createNodeTester(name: string, node?: any, options?: any)

Calls `createCategoryTester` with `node` as category

## createDetailsTester(name: string, node?: any, options?: any)

Calls `createCategoryTester` with `details` as category

## List

* `createListTester` create a tester to generically test a list of nodes
* `createListTesterFor` create a list tester for matching a list of nodes, calls `createListTester`

```js
createListTesterFor()
```

Creates a generic `list` node tester, passing the following names tester factory to test each value in the list

```js
const createNamesTester = (nodes: any[]) => {
  return (queryExpr: any) => testNames(nodes, queryExpr)
}
```

For a `queryExpr` such as `{anyOf: [/x/]}`, it would call `testNames(nodes, queryExpr)` to determine if the nodes matches the query.
