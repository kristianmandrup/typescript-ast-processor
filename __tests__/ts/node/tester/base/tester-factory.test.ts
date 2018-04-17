import { context, testerFor } from '../_imports'

describe('TestersRegistry', () => {
  context('identifier file', () => {
    const tester: any = testerFor({
      fileName: 'identifier',
      type: 'identifier',
      traverse: (statements: any[]) => {
        return statements[0] //.declarationList.declarations[0]
      },
    })

    describe('createTester', () => {})
    describe('createCategoryTester', () => {})
    describe('createNodeTester', () => {})
    describe('createDetailsTester', () => {})

    describe('createListTester', () => {})
    describe('createListTesterFor', () => {})
  })
})
