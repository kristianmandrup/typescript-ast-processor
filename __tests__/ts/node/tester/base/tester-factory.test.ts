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

    describe('createCategoryTester', () => {})
    describe('createNodeTester', () => {})
    describe('createDetailsTester', () => {})

    describe('createListTester', () => {})
    describe('createListTesterFor', () => {})
  })
})
