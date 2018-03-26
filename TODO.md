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
