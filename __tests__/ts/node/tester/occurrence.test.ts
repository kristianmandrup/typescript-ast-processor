import {
  testerFor,
  context,
  logObj
} from './_imports'

describe('occurrence', () => {
  context('occurrence file', () => {
    const tester: any = testerFor({
      fileName: 'occurrence',
      type: 'occurrences',
      factoryName: 'occurrences',
      statementIndex: 0
      // traverse: (statements: any[]) => {
      //   return statements[0] //.declarationList.declarations[0]
      // }
    })

    const options = {}
    const query = {}

    describe('createNodeTraverser(options)', () => {
      it('creates a node traverser that has a nodeTypeCounter', () => {
        const nodeTraverser = tester.createNodeTraverser(options)
        expect(nodeTraverser.nodeTypeCounter).toBeDefined()
      })
    })

    describe.only('countOccurenceOf(token, options)', () => {
      it('counts occurences', () => {
        const occurrences = tester.countOccurenceOf('continue', {
        })
        expect(occurrences).toBe(2)
      })
    })

    describe('countOccurrence(options)', () => {
      it('counts occurences', () => {
        const occurrences = tester.countOccurrence(options)
        expect(occurrences).toBe(2)
      })
    })

    describe('countInTree(query: any)', () => {
      it('is not exported', () => {
        const counted = tester.countInTree(query)
        expect(counted).toBe(2)
      })
    })
  })
})
