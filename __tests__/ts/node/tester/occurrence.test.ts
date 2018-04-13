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
    const token = 'continue'

    describe('createNodeTraverser(options)', () => {
      it('creates a node traverser that has a nodeTypeCounter', () => {
        const nodeTraverser = tester.createNodeTraverser(options)
        expect(nodeTraverser.nodeTypeCounter).toBeDefined()
      })
    })

    describe('visited(opts)', () => {
      it('returns a traverser where nodes have been visited', () => {
        const visitedTraverser = tester.visited(opts)
        // log({
        //   counter: visitedTraverser.counter
        // })
        expect(visitedTraverser.counter).toBeDefined()
        expect(visitedTraverser.counter.visited).toBeGreaterThan(1)
      })
    })

    describe('counter(opts)', () => {
      it('returns the counter of a traverser where nodes have been visited', () => {
        const counter = tester.counter(opts)
        expect(counter.visited).toBeGreaterThan(1)
      })
    })

    describe('countInTree(query: any)', () => {
      it('is not exported', () => {
        const counted = tester.countInTree(query)
        expect(counted).toBeGreaterThan(1)
      })
    })

    describe('createTokenTester(token, options)', () => {
      const tokenTesterFun = tester.createTokenTester(token, options)

      it('is a function', () => {
        expect(typeof tokenTesterFun).toBe('function')
      })
    })

    describe('createTokenTesterFun(token, options)', () => {
      const tokenTesterFun = tester.createTokenTesterFun(token, options)

      it('is a function', () => {
        expect(typeof tokenTesterFun).toBe('function')
      })

      describe('token tester', () => {
        it('returns true for a continue token node', () => {
          const continueNode = tester.findFirst('continue')
          expect(tokenTesterFun(continueNode)).toBeTruthy()
        })

        it('returns false for a non-continue token node', () => {
          const nonContinueNode = tester.node
          expect(tokenTesterFun(nonContinueNode)).toBeFalsy()
        })
      })
    })

    describe('createTokenTester(token, options)', () => {
      it('creates a token tester function', () => {
        const counted = tester.createTokenTester(token, options)
        expect(counted).toBeGreaterThan(1)
      })
    })

    describe.only('countOccurenceOf(token, options)', () => {
      context('has 2 continue tokens', () => {
        it('counts exactly 2 occurences', () => {
          const occurrences = tester.countOccurenceOf(token, {
          })
          log({
            occurrences
          })
          expect(occurrences).toBe(2)
        })
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
