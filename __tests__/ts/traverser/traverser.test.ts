import {
  context,
  loadAstNode,
  traverser
} from './_imports'

describe('traverser: count-traverser', () => {
  context('count-traverser file', () => {
    const filePath = 'traverser/traverser.ts'
    const astNode: any = loadAstNode(filePath)
    const $traverser = traverser.createASTNodeTraverser(astNode)

    function typeOf(node: any) {
      return $traverser['typeOf'](node)
    }

    const registries = {
      valid: {
        class: (node: any) => node
      },
      invalid: {
        oops: 32
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
          const categoriesMap = $traverser['nodeTypes'].categories
          const catKeys = Object.keys(categoriesMap)
          expect(catKeys.length).toBeGreaterThan(1)
        })
      })
    })

    // registerVisitors(registry)
    describe('registerVisitors(registry)', () => {
      context('valid registry', () => {
        it('registers', () => {
          const registry = $traverser.registerVisitors(registries.valid)
          expect(registry.class).toEqual(registries.valid.class)
        })
      })

      context('invalid registry', () => {
        it('throws', () => {
          expect(() => $traverser.registerVisitors(registries.invalid)).toThrow()
        })
      })
    })

    // registerVisitor(name: string, visitor: Function)
    describe('registerVisitor(name, visitor)', () => {
      context('valid name/registry', () => {
        it('registers', () => {
          const registry = $traverser.registerVisitor('class', registries.valid.class)
          expect(registry.class).toBe(registries.valid.class)
        })
      })

      context('invalid name', () => {
        it('throws', () => {
          const register = () => $traverser.registerVisitor('', registries.valid.class)
          expect(register).toThrow()
        })
      })

      context('invalid registry', () => {
        it('throws', () => {
          const register = () => $traverser.registerVisitor('x', undefined)
          expect(register).toThrow()
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
        expect($traverser.nodeDisplayInfo(astNode)).toEqual({
          kind: 'SourceFile'
        })
      })
    })

    // typeOf(node)
    describe('typeOf(node)', () => {
      it('gets node type', () => {
        const type = typeOf(astNode) // $traverser['typeOf'](astNode)
        expect(type).toEqual('SourceFile')
      })
    })

    // skipped(node)
    describe('skipped(node)', () => {
      it('does nothing', () => {
        expect($traverser['skipped'](astNode)).toBe($traverser)
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
    describe.skip('wasVisited(node)', () => {
      it('does nothing', () => {
        expect($traverser['wasVisited'](astNode)).toBeDefined()
      })
    })

    // willVisit(node)
    describe.skip('willVisit(node)', () => {
      it('does nothing', () => {
        expect($traverser['willVisit'](astNode)).toBeDefined()
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


    describe('get:visitedNodesCount', () => {
      context('no nodes have been visited', () => {
        it('is 0', () => {
          expect($traverser.visitedNodesCount).toBe(0)
        })
      })

      context('no nodes have been visited', () => {
        // it('is 1', () => {
        it('is still 0', () => {
          $traverser.visit(astNode)
          expect($traverser.visitedNodesCount).toBe(0)
        })
      })
    })

    context('FIX: we do NOT yet keep track of visited nodes in this traverser!!', () => {
      describe('get:lastVisitedNode', () => {
        context('no nodes have been visited', () => {
          it('is none', () => {
            expect($traverser.lastVisitedNode).toBeUndefined()
          })
        })

        context('one node has been visited', () => {
          it('is last node visited', () => {
            // it('is still none', () => {
            $traverser.visit(astNode)
            expect($traverser.lastVisitedNode).toBe(astNode)
          })
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
          $traverser.setMode('ancestor')
          expect($traverser['traverseNextMethod']).toBe('traverseAncestor')
        })
      })
    })

    // traverseNext(node)
    describe('traverseNext(node)', () => {
      const stmt1 = astNode.statements[1]
      const stmt2 = astNode.statements[2]

      context('child traversal mode', () => {
        it(`traverses to next child/sibling node`, () => {
          $traverser['traverseNext'](stmt1)
          const lastNode = $traverser.lastVisitedNode
          const lastType = $traverser['kindOf'](lastNode)
          expect(lastType).toBe('x')
          // expect($traverser.lastVisitedNode).toBe(stmt2)
        })
      })

      context('ancestor traversal mode', () => {
        it(`traverses to ancestor node`, () => {
          $traverser.setMode('ancestor')
          $traverser['traverseNext'](stmt1)
          const lastNode = $traverser.lastVisitedNode
          const lastType = typeOf(lastNode)
          expect(lastType).toBe('SourceFile')
          // expect($traverser.lastVisitedNode).toBe(astNode)
        })
      })
    })

    // traverseChildNodes(node)
    describe('traverseChildNodes(node)', () => {
      const stmt1 = astNode.statements[1]

      context('child traversal mode', () => {
        it(`traverses to next child/sibling node`, () => {
          $traverser['traverseChildNodes'](stmt1)
          const lastNode = $traverser.lastVisitedNode
          const lastType = typeOf(lastNode)
          expect(lastType).toBe('NumericLiteral')
        })
      })
    })

    // traverseAncestor(node: ts.Node)
    describe('traverseAncestor(node)', () => {
      const stmt1 = astNode.statements[1]

      context('ancestor traversal mode', () => {
        it(`traverses to ancestor node`, () => {
          $traverser.setMode('ancestor')
          $traverser['traverseAncestor'](stmt1)

          const lastNode = $traverser.lastVisitedNode
          const lastType = typeOf(lastNode)
          expect(lastType).toBe('SourceFile')
        })
      })
    })
  })
})
