# AST query engine

The specialized AST query engine is the core of the AST traverser.
It will be extracted as its own library for reuse in other libraries as it is very much general purpose and foundation technology.

## Query engine

Currently the query engine lives in `src/ts/node/`

- `tester` - query and info gathering
- `details` - details on AST nodes, including flags and modifiers

The testers use the details testers,

### Node detail testers

See [Node details](node-details.md)

### Node testers

See [Node testers](node-testers.md)
