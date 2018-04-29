# TODO

* Add proper instrumentation

## Remove

* Remove `ts/eslint` folder

## Refactor

* Refactor `__tests__/eslint` tests for use with `ts` engine

## Extract libs

* Extract node tester query engine as separate lib
* (Perhaps) extract node "info" (ie. from node tester) as separate lib

Extract as separate libs:

* `visitor`
* `collector`
* `instrumenter`
* `language-service`
* `node`
* `node/tester`
* `node/details`
* `node/query`

## Instrumentation

* use [ts-simple-ast](https://github.com/dsherret/ts-simple-ast) to do AST instrumentation/refactoring
* use [ts-emitter](https://github.com/KnisterPeter/ts-emitter) to emit refactored AST back to source code

## WIP

* Created basic `Instrumentation` skeleton, needs much more work

### Tests

Needs more work:

* occurrence tester
* traverser counter
* node query

## Node testers (query engine)

Node Testers need to fully leverage base classe (NodeTester and BaseNodeTester)
