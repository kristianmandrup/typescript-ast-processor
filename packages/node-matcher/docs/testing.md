# Testing

`NodeTester` is composed of:

* `TesterRegistry`
* `QueryEngine`
* `NodeCounter`
* `TesterFactory`

The Jest commands:

* `$ jest __tests__/ts/node/tester/base/tester-factory.test.ts`
* `$ jest __tests__/ts/node/tester/base/tester-registry.test.ts`
* `$ jest __tests__/ts/node/tester/base/query-engine.test.ts`
* `$ jest __tests__/ts/node/tester/base/node-counter.test.ts` (later)

We need to test these classes first! Note that `node-counter` relies on the AST counter traverser working (or you can mock a fake traverser).

Then we can move on to:

* `NodeTester` node tester base class
* `BaseNodeTester` node tester base class

First make sure tests pass for `NodeTester`

`$ jest __tests__/ts/node/tester/base/node-tester.test.ts`

Then make tests pass for `BaseNodeTester`

`$ jest __tests__/ts/node/tester/base/base.test.ts`

### Factories

`testerFactoryFor` - finds the node tester factory function to be used
`createTester` - creates/builds a node tester

`$ jest __tests__/ts/node/tester/factories/node-factories.test.ts`

### Generic list of nodes tester

Some nodes contain one or more lists of child nodes that can be matched by a query.
The `NodesTester` is designed to query such node lists with a (generic) query expression

`$ jest __tests__/ts/node/tester/generic/nodes-tester.test.ts`

### Occurrence node tester

Make sure tests pass for occurrence node tester

`$ jest __tests__/ts/node/tester/occurrence.test.ts`
