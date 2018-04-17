import { context, testerFor } from '../_imports'
import { TesterFactory } from '../../../../../src/ts/node/tester/base/tester-factory'

describe('TestersRegistry', () => {
  context('identifier file', () => {
    const tester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
    })

    const factory = new TesterFactory(tester.node, tester.options)

    describe('createTester', () => {
      // TODO: include sth in both type of testers to make them easy to distinquish when testing,
      // such as testerCategory or similar
      // also add a caption, such as the constructor.name for error logging and testing

      it('creates a node tester when no prefix specified (default)', () => {
        const funcTester = factory.createTester('decl.function', tester.node)
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeTester')
      })

      it('creates a details tester when details: prefix', () => {
        const funcTester = factory.createTester('details:function', tester.node)
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeDetailsTester')
      })

      it('creates a node tester when node: prefix', () => {
        const typeTester = factory.createTester('node:type', tester.node)
        expect(typeTester).toBeDefined()
        expect(typeTester.category).toBe('NodeTester')
        expect(typeTester.caption).toBe('TypeNodeTester')
      })
    })

    describe('createCategoryTester', () => {
      it('creates a details tester', () => {
        const funcTester = factory.createCategoryTester(
          'details',
          'function',
          tester.node,
        )
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeDetailsTester')
      })

      it('creates a node tester', () => {
        const funcTester = factory.createCategoryTester(
          'node',
          'decl.function',
          tester.node,
        )
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeTester')
      })
    })

    describe('createNodeTester', () => {
      it('creates a node tester', () => {
        const funcTester = factory.createNodeTester(
          'decl.function',
          tester.node,
        )
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeTester')
      })
    })

    describe('createDetailsTester', () => {
      it('creates a details tester', () => {
        const funcTester: any = factory.createDetailsTester(
          'function',
          tester.node,
        )
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeDetailsTester')
      })
    })

    describe('createListTester', () => {
      it('creates a details tester', () => {
        const listTester: any = factory.createListTester(tester.node)
        expect(listTester).toBeDefined()
        expect(listTester.category).toBe('NodeTester')
        expect(listTester.caption).toBe('ListNodeTester')
      })
    })

    describe('createListTesterFor', () => {
      it('creates a list tester', () => {
        const node = tester.node
        const listTester: any = factory.createListTesterFor({
          node,
        })
        expect(listTester).toBeDefined()
        expect(listTester.category).toBe('NodeTester')
        expect(listTester.caption).toBe('ListNodeTester')
        expect(listTester.node).toBe(node)
      })
    })
  })
})
