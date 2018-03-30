# AST query engine

The specialized AST query engine is the core of the AST traverser.

It will (in time) be extracted as its own library for reuse in other libraries as it is very much general purpose and foundation technology.

We have designed the Query engine to be portable so it can be used and implemented for other AST models (or libs), such as [ESTree](https://github.com/estree/estree) etc.

## Query engine

Currently the query engine lives in `src/ts/node/`

- `tester` - query and info gathering
- `details` - details on AST nodes, including flags and modifiers

The testers use the details testers,

## Generic implementation

We seek to implement a generic engine implementation, where the reference (default) setup is for use with the TypeScript AST.

We aim to make it easy to wrap any AST with the same engine API.

Here we create the additional testers needed by the Class node tester using a factories map.
You can then pass in your own factory map with testers that work with the AST that best suits you.

You can use the forms:

- `node:xyz` such as `node:heritage` to indicate a node tester
- `details:xyz` such as `details:class` to indicate a node details tester

If you use the simple form `xyz` such as `members`, a node tester will be implied.

For the factory methods such as `createTester` to be available, you must extend `BaseNodeTester` (at some level in your inheritance hierarchy for your node tester class).

```js
export class ClassNodeTester extends BaseNodeTester {
  // ...

  constructor(node: any, options: any = {}) {
    super(node, options)
    this.heritageNodeTester = this.createTester('node:heritage', node, options)
    this.membersNodeTester = this.createTester('members', node, options)
    this.classDetailsTester = this.createTester('details:class', node, options)
  }
}
```

Please let us know if there are parts of the API that need to be made more generic and customizable to suit your needs.

Note: Not all testers have yet been "upgraded" to make use the generic factory mapping.

### Node detail testers

See [Node details](node-details.md)

### Node testers

See [Node testers](node-testers.md)
