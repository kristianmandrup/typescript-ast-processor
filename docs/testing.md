# Testing

Open [http://ts-ast-viewer.com/](ts-ast-viewer) in a browser.
This lets you investigate the AST for TypeScript code.

Copy paste the fixture file in `__tests__/fixtures` that you are testing to see AST node structure (far right window pane)

```js
import {
  logObj,
  testerFor,
  context
} from '../_imports'

describe('for loop', () => {
  describe('classic for', () => {
    context('for file', () => {
      const tester = testerFor({
        fileName: 'for/for',
        type: 'statements/loops',
        factoryName: 'loop.for',
        statementIndex: 1
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
  'list': generic.createNodesTester,
  'nodes': generic.createNodesTester, // alias

  // class
  'decl.class': classes.createClassTester,
  'class.heritage': heritage.createClassHeritageTester,

  // ...
}
```

`type` and `fileName` are used to tell where to find the fixture file, ie. the above would resolve to:

`__tests__/fixtures/statements/loops/for/for.ts`

`statementIndex` is used to tell which statement node (index) to use from the file. The root AST node always has a statements property with list of statements (to execute), the index defined which of these statements to be used for the tester.
