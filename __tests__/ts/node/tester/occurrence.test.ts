import {
  testerFor,
  context,
  logObj,
  log
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
    const opts = {
      node: tester.node,
      query,
      options
    }

    describe('createNodeTraverser(options)', () => {
      it('creates a node traverser that has a nodeTypeCounter', () => {
        const nodeTraverser = tester.createNodeTraverser(options)
        expect(nodeTraverser.nodeTypeCounter).toBeDefined()
      })
    })

    describe.only('visited(opts)', () => {
      it('returns a traverser where nodes have been visited', () => {
        const visitedTraverser = tester.visited(opts)
        log({
          counter: visitedTraverser.counter
        })
        expect(visitedTraverser.counter).toBeDefined()
      })
    })

    describe('counter(opts)', () => {
      it('returns the counter of a traverser where nodes have been visited', () => {
        const counter = tester.counter(opts)
        expect(counter.visited).toBeGreaterThan(0)
      })
    })

    describe('countInTree(query: any)', () => {
      it('is not exported', () => {
        const counted = tester.countInTree(query)
        expect(counted).toBe(2)
      })
    })

    describe('countOccurenceOf(token, options)', () => {
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
  })
})
