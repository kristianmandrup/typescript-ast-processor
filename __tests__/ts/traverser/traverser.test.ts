import {
  context,
  loadAstNode,
  traverser
} from './_imports'

describe('traverser: count-traverser', () => {
  context('count-traverser file', () => {
    const filePath = 'traverser/count-traverser'
    const astNode: any = loadAstNode(filePath)
    const $traverser = traverser.createCountingASTNodeTraverser(astNode)

    const registries = {
      valid: {

      },
      invalid: {

      }
    }

    beforeEach(() => {
      $traverser.reset()
    })

    // init(options)
    describe('init(options)', () => {
      context('no options', () => {
        const options = {}
        beforeEach(() => {
          $traverser.init(options)
        })

        it('initializes traverser with categories of nodeTypes', () => {
          expect($traverser['nodeTypes'].categories).toEqual({

          })
        })
      })
    })

    // registerVisitors(registry)
    describe('registerVisitors(registry)', () => {
      context('valid registry', () => {
        it('registers', () => {
          expect($traverser.registerVisitors(registries.valid)).toEqual({
          })
        })
      })

      context('invalid registry', () => {
        it('throws', () => {
          expect($traverser.registerVisitors(registries.valid)).toEqual({
          })
        })
      })
    })

    // registerVisitor(name: string, visitor: Function)
    describe('registerVisitor(name, visitor)', () => {
      context('valid name/registry', () => {
        it('registers', () => {
          expect($traverser.registerVisitors(registries.valid)).toEqual({
          })
        })
      })

      context('invalid name', () => {
        it('throws', () => {
          expect($traverser.registerVisitors(registries.valid)).toEqual({
          })
        })
      })

      context('invalid registry', () => {
        it('throws', () => {
          expect($traverser.registerVisitors(registries.valid)).toEqual({
          })
        })
      })
    })

    // visitorIterator
    describe('visitorIterator', () => {
      it('is a working visitor iterator function', () => {
        expect(typeof $traverser.visitorIterator).toBe('function')
      })

      // TODO
    })

    // nodeDisplayInfo(node)
    describe('nodeDisplayInfo(node)', () => {
      it('displays node info', () => {
        expect($traverser.nodeDisplayInfo(astNode)).toBeDefined()
      })
    })

    // typeOf(node)
    describe('typeOf(node)', () => {
      it('gets node type', () => {
        expect($traverser['typeOf'](astNode)).toBeDefined()
      })
    })

    // skipped(node)
    describe('skipped(node)', () => {
      it('does nothing', () => {
        expect($traverser['skipped'](astNode)).toBeUndefined()
      })
    })

    // typeNameFor(typeName)
    describe('typeNameFor(typeName)', () => {
      it('returns typeName', () => {
        expect($traverser['typeNameFor']('x')).toEqual('x')
      })
    })

    // typeNameFor(typeName, fnName)
    describe('typeNameFor(typeName, fnName)', () => {
      it('returns fnName', () => {
        expect($traverser['typeNameFor']('x', 'y')).toEqual('y')
      })
    })

    // wasVisited(node)
    describe('wasVisited(node)', () => {
      it('increases visited count', () => {
        const countBefore = $traverser.counter.visited
        $traverser['wasVisited'](astNode)
        expect($traverser.counter.visited).toBe(countBefore + 1)
      })
    })

    // willVisit(node)
    describe('willVisit(node)', () => {
      it.skip('does nothing', () => {
      })
    })

    // wasVisitedBefore(node)
    describe('wasVisitedBefore(node)', () => {
      it('is false', () => {
        const visitedBefore = $traverser['wasVisitedBefore'](astNode)
        expect(visitedBefore).toBeFalsy()
      })

      context('was visited before', () => {
        it('is true', () => {
          $traverser.visitedNodes.push(astNode)
          const visitedBefore = $traverser['wasVisitedBefore'](astNode)
          expect(visitedBefore).toBeTruthy()
        })
      })
    })

    // visit(nextNode)
    describe('visit(node)', () => {
      it('visits', () => {
        $traverser.visit(astNode)
        expect($traverser.lastVisitedNode).toBe(astNode)
      })

      context('can NOT be visited', () => {
        it('does not visit', () => {
          $traverser['shouldVisitNode'] = () => false
          $traverser.visit(astNode)
          expect($traverser.lastVisitedNode).not.toBe(astNode)
        })
      })
    })

    // shouldTraverseChildNodes(node)
    describe('shouldTraverseChildNodes(node)', () => {
      it('is true by default', () => {
        expect($traverser['shouldTraverseChildNodes'](astNode)).toBeTruthy()
      })
    })

    // shouldTraverseAncestor(node)
    describe('shouldTraverseAncestor(node)', () => {
      it('is true by default', () => {
        expect($traverser['shouldTraverseAncestor'](astNode)).toBeTruthy()
      })
    })

    // shouldExcludeNodeFromVisit(node)
    describe('shouldExcludeNodeFromVisit(node)', () => {
      it('is false by default', () => {
        expect($traverser['shouldExcludeNodeFromVisit'](astNode)).toBeFalsy()
      })
    })

    // shouldVisitNode(node)
    describe('shouldVisitNode(node)', () => {
      it('is true by default', () => {
        expect($traverser['shouldVisitNode'](astNode)).toBeTruthy()
      })
    })

    // traverseNextMethod
    describe('traverseNextMethod', () => {
      context('child traversal mode', () => {
        it(`is 'traverseChildNodes'`, () => {
          expect($traverser['traverseNextMethod']).toBe('traverseChildNodes')
        })
      })

      context('ancestor traversal mode', () => {
        it(`is 'traverseAncestor'`, () => {
          expect($traverser['traverseNextMethod']).toBe('traverseAncestor')
        })
      })
    })

    // traverseNext(node)
    describe('traverseNext(node)', () => {
      context('child traversal mode', () => {
        it(`traverses to next child/sibling node`, () => {
          const stmt1 = astNode.statements[1]
          const stmt2 = astNode.statements[2]
          expect($traverser['traverseNext'](stmt1)).toBe(stmt2)
        })
      })

      context('ancestor traversal mode', () => {
        it(`traverses to ancestor node`, () => {
          const stmt1 = astNode.statements[1]
          expect($traverser['traverseNext'](stmt1)).toBe(astNode)
        })
      })
    })

    // traverseChildNodes(node)
    describe('traverseNext(node)', () => {
      context('child traversal mode', () => {
        it(`traverses to next child/sibling node`, () => {
          const stmt1 = astNode.statements[1]
          const stmt2 = astNode.statements[2]
          expect($traverser['traverseChildNodes'](stmt1)).toBe(stmt2)
        })
      })
    })

    // traverseAncestor(node: ts.Node)
    describe('traverseAncestor(node)', () => {
      context('ancestor traversal mode', () => {
        it(`traverses to ancestor node`, () => {
          const stmt1 = astNode.statements[1]
          expect($traverser['traverseAncestor'](stmt1)).toBe(astNode)
        })
      })
    })
  })
})
