import { context, testerFor } from '../_imports'
import { createTesterFactory } from '../../../../../src/ts/node/tester/base/tester-factory'

describe('TesterFactory', () => {
  context('identifier file', () => {
    const tester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
    })

    const factory = createTesterFactory(tester, tester.node, tester.options)

    describe('createCategoryTester', () => {
      it('creates a details tester', () => {
        const funcTester = factory.createCategoryTester(
          'details',
          'identifier',
          tester.node,
        )
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeDetailsTester')
      })

      it('creates a node tester', () => {
        const funcTester = factory.createCategoryTester(
          'node',
          'identifier',
          tester.node,
        )
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeTester')
      })
    })

    describe('createNodeTester', () => {
      it('creates a node tester', () => {
        const funcTester = factory.createNodeTester('identifier', tester.node)
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeTester')
      })
    })

    describe('createDetailsTester', () => {
      it('creates a details tester', () => {
        const funcTester: any = factory.createDetailsTester(
          'identifier',
          tester.node,
        )
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeDetailsTester')
      })
    })

    describe('createTester', () => {
      // TODO: include sth in both type of testers to make them easy to distinquish when testing,
      // such as testerCategory or similar
      // also add a caption, such as the constructor.name for error logging and testing

      it('creates a node tester when no prefix specified (default)', () => {
        const funcTester = factory.createTester('identifier', tester.node)
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeTester')
      })

      it('creates a details tester when details: prefix', () => {
        const funcTester = factory.createTester(
          'details:identifier',
          tester.node,
        )
        expect(funcTester).toBeDefined()
        expect(funcTester.category).toBe('NodeDetailsTester')
      })

      it('creates a node tester when node: prefix', () => {
        const typeTester = factory.createTester('node:identifier', tester.node)
        expect(typeTester).toBeDefined()
        expect(typeTester.category).toBe('NodeTester')
        expect(typeTester.caption).toBe('IndentifierNodeTester')
      })
    })

    describe.skip('createListTester', () => {
      it('creates a details tester', () => {
        const listTester: any = factory.createListTester(tester.node)
        expect(listTester).toBeDefined()
        expect(listTester.category).toBe('NodeTester')
        expect(listTester.caption).toBe('ListNodeTester')
      })
    })

    describe.skip('createListTesterFor', () => {
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
