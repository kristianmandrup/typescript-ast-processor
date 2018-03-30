# AST query engine

The specialized AST query engine is the core of the AST traverser.
It will be extracted as its own library for reuse in other libraries as it is very much general purpose and foundation technology.

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

```js
  constructor(node: any, options: any = {}) {
    super(node, options)

    this.factories = this.testerFactories
    this.heritage = this.factories.createTester('heritage', node, options)
    this.members = this.factories.createTester('members', node, options)
    this.classDetails = this.factories.details.createTester('class', options)
  }
```

Please let us know if there are parts of the API that need to be made more generic and customizable to suit your needs.

Note: Not all testers have yet been "upgraded" to make use the generic factory mapping.

### Node detail testers

See [Node details](node-details.md)

### Node testers

See [Node testers](node-testers.md)
