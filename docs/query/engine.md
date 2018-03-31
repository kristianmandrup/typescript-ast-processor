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

- `node:xyz` such as `node:class.heritage` to indicate a node tester
- `details:xyz` such as `details:class` to indicate a node details tester

Alternatively use `createCategoryTester` such as `createCategoryTester('node', 'decl.class', node, options)`

For the factory methods such as `createTester` to be available, you must extend `BaseNodeTester` (at some level in your inheritance hierarchy for your node tester class).

```js
export class ClassNodeTester extends BaseNodeTester {
  // ...

  constructor(node: any, options: any = {}) {
    super(node, options)
    this.heritageNodeTester = this.createTester('node:class.heritage', node, options)
    this.membersNodeTester = this.createCategoryTester('node', 'class.members', node, options)
    this.classDetailsTester = this.createTester('details:class', node, options)
  }
}
```

Please let us know if there are parts of the API that need to be made more generic and customizable to suit your needs.

Note: All testers have now been upgraded to make use the generic factory mapping, but some mapping might be a little off. Please help improve the test suite to uncover which I mapped incorrectly.

### Node tester factories

The current factory mapping for node testers looks as follows:

```js
export const factories = {
  // class
  'decl.class': classes.createClassTester,
  'class.heritage': heritage.createClassHeritageTester,

  'class.member': members.createClassMemberTester,
  'class.property': members.createPropertyTester,
  'class.getter': accessors.createGetAccessorTester,
  'class.setter': accessors.createSetAccessorTester,
  'class.constructor': members.createConstructorTester,
  'class.method': members.createMethodTester,

  // function
  // - call
  'function.call': funCall.createFunctionCallNodeTester,

  // - decl
  'function.decl': funDecl.createFunctionTester,

  // misc
  initializer: initializer.createInitializerNodeTester,
  type: type.createTypeNodeTester,

  // variable decl
  'decl.var': variables.createVariableDeclarationTester,
  'decl.vars': variables.createVariableDeclarationsTester,

  // statements
  statements: statements.statements.createStatementsTester,
  statement: statement.createStatementTester,

  // conditional
  'condition.if': conditional.ifThenElse.createIfThenElseTester,
  'condition.switch': conditional.switchCase.createSwitchStatementTester,
  'condition.ternary': conditional.ternary.createTernaryNodeTester,

  // loops
  'loop.for': loop.createForLoopTester,
  'loop.while': loop.createWhileLoopTester,

  // error
  'error.try': error.createTryCatchFinallyTester,
  'error.throw': error.createThrowTester,

  // block
  block: block.createBlockNodeTester,
  'block.stmt': block.createBlockStatementTester,

  // literals
  'lit.array': literals.createArrayLiteralTester,
  'lit.object': literals.createObjectLiteralTester,

  // expressions
  'expr.binary': expressions.binary.createBinaryExpressionNodeTester,
  'expr.assignment': expressions.binary.createAssignmentNodeTester,

  // decorators
  'decorator.class': decorators.class.createClassDecoratorTester,
  'decorator.member': decorators.member.createMemberDecoratorTester,
  'decorator.param': decorators.parameter.createParameterDecoratorTester,

  occurences: occurrences.createNodeOccurrenceTester
}
```

### Node details factories

The current factory mapping for node details looks as follows:

```js
export const factories = {
  'expr.binary': details.binary.createBinaryExprTester,
  'function.call': details.call.createCallTester,
  identifier: details.identifier.createIdentifierTester,
  variable: details.variable.createVariableTester,
  class: details.class.createClassDetailsTester,
  namespace: details.namespace.createNamespaceTester,
  'function.decl': details.function.createFunctionTester,
  'class.accessor': details.access.createAccessTester
}
```

## Engine Customization

You are free to substitute any or all of these mappings with your own factories to suit your needs. If you are implementing the engine for a different AST, such as ESTree, ts-simple-ast or similar, you need to substitute all of these mappings. You can however still re-use much of the internal logic of the individual node tester (and node details) classes, so it will likely make sense to extend the existing classes and override key methods.

### Node detail testers

See [Node details](node-details.md)

### Node testers

See [Node testers](node-testers.md)
