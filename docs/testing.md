# Testing

Open [http://ts-ast-viewer.com/](ts-ast-viewer) in a browser.
This lets you investigate the AST for TypeScript code.

Copy paste the fixture file in `__tests__/fixtures` that you are testing to see AST node structure (far right window pane)

```js
import { logObj, testerFor, context } from '../_imports'

describe('for loop', () => {
  describe('classic for', () => {
    context('for file', () => {
      const tester = testerFor({
        fileName: 'for/for',
        type: 'loops',
        category: 'statements',
        factoryName: 'loop.for',
        statementIndex: 1,
      })

      describe('info()', () => {
        it('collects correct info', () => {
          const info = tester.info()
          logObj('info', info)
          expect(info).toEqual({
            // ...
          })
        })
      })
    })
  })
})
```

Here we first create a (node) `tester` to use for testing.

`factoryName` is looked up in factory map, see factories/map.ts

```js
export const factories = {
  // generic
  list: generic.createNodesTester,
  nodes: generic.createNodesTester, // alias

  // class
  'decl.class': classes.createClassTester,
  'class.heritage': heritage.createClassHeritageTester,

  // ...
}
```

`category`, `type` and `fileName` are used to tell where to find the fixture file, ie. the above would resolve to:

`__tests__/fixtures/statements/loops/for/for.ts`

## Resolving tester node

The following properties are currently available for defining which node to use to initialize a given node tester using `testerFor`.

* `statementIndex` index number
* `traverse(statements: any[])` function

### Statement index

`statementIndex` is used to tell which statement node (index) to use from the file. The root AST node always has a statements property with list of statements (to execute), the index defined which of these statements to be used for the tester.

### Traverse

You can also use a `traverse(statements: any[])` function to traverse down the AST to the AST node to be used as the main node in the tester.

```js
const tester = testerFor({
  fileName: 'block/block',
  type: 'statements',
  factoryName: 'block',
  traverse: (statements: any[]) => {
    return statements[0].thenStatement
  },
})
```

## Essential testing

The most essential (bse) classes to test are:

* Node Details tester
* Node tester
* Occurrence node tester
* ASTTraverser

### Node Details tester

* `BaseDetailsTester` node details base class

Make sure base class for details node testers works

`$ jest __tests__/ts/node/details/base.test.ts`

### Node tester

NodeTester is composed of:

* `TesterRegistry`
* `QueryEngine`
* `NodeCounter`
* `TesterFactory`

We need to test these classes first! Then we can move on to:

* `NodeTester` node tester base class
* `BaseNodeTester` node tester base class

First make sure tests pass for `NodeTester`

`$ jest __tests__/ts/node/tester/base/node-tester.test.ts`

Then make tests pass for `BaseNodeTester`

`$ jest __tests__/ts/node/tester/base/base.test.ts`

### Occurrence node tester

Make sure tests pass for occurrence node tester

`$ jest __tests__/ts/node/tester/occurrence.test.ts`

### Traverser

Finally work on testing main traverser classes:

### Base AST traverser

`$ jest __tests__/ts/traverser/base-traverser.test.ts`

### AST Traverser with Node type counter

This traverser is (and should) be used for the occurrence node tester (see above)

`jest __tests__/ts/traverser/counter/count-traverser.test.ts`
