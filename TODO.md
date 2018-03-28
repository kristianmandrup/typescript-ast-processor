# TODO

- Add proper instrumentation

## Remove

- Remove `ts/eslint` folder

## Refactor

- Refactor `__tests__/eslint` tests for use with `ts` engine

## Extract libs

- Extract node tester query engine as separate lib
- (Perhaps) extract node "info" (ie. from node tester) as separate lib
- Extract `visitor` as separate lib
- Extract `collector` as separate lib
- Extract `instrumenter` as separate lib
- Extract `language-service` as separate lib
- Extract `node-details` as separate lib (see possible overlaps with `ts-utils`)

## Instrumentation

- use [ts-simple-ast](https://github.com/dsherret/ts-simple-ast) to do AST instrumentation/refactoring
- use [ts-emitter](https://github.com/KnisterPeter/ts-emitter) to emit refactored AST back to source code

## WIP

- Created basic Instrumentation skeleton, needs much more work

### Tests

- Started writing full test suite (much work and cleanup/refactor left to do...)

## ASTNodeTraverser include, exclude and count

Add exclude and inclusion list of types to ignore (or exlusively include).
This is useful f.ex to only visit `ReturnStatement` nodes within a `statements` container where each such `ReturnStatement` is not inside any new declaration.

```js
count: ['ReturnStatement'],
exclude: {
  list: categories.declaration
  expressions: [/Declaration$/]
}
```

This way we can easily count how many "valid" return statements are within a certain scope.
We should have a specialized visitor/collector for these count cases.

## Node testers (query engine)

Write test suite for all Node testers, fix all bugs.
Add a way to pass down custom NodeTester factories all the way down:

```js
export class ClassNodeProcessor extends IndentifierNodeProcessor {
  constructor(node: any, options: any = {}) {
    nodeTester = options.factories.nodeProcessor
    createFunctionLikeNodeProcessor = this.nodeTester.createFunctionLikeNodeProcessor || this.createFunctionLikeNodeProcessor
}
```

## BinaryExpression testers

We need to finish testers for `BinaryExpression` used for assignment

## Literal testers (Object, Array)

We need to finish testers for `Literals` such as Object and Array literals (typically used for assignment or in initializers for variable declarations)
