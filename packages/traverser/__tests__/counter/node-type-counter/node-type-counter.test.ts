import {
  context,
  loadAstNode,
  traverser,
  log
} from '../_imports'
import { createNodeTypeCounter } from '../../../../../src/ts/traverser/visit-tracker/counter/node-type-counter';

// - resolveTypeCategories
//   - can be resolved
// - inc(key)
//   - valid key
// - checkIfNodeToBeCounted(node)
//   - NOT to be counted
// - resolveNodeTypesToCheckFor(node)
//   - NOT to be counted
// - get: nodeTypesToCheckFor
//   - NOT to be counted
// - shouldCountNode(node)
//   - node that should NOT be counted
// - wasVisited(node)
//   - sets node to visitedNodes list

describe('traverser: NodeTypeCounter', () => {
  context('traverser file', () => {
    const filePath = 'traverser/traverser'
    const astNode: any = loadAstNode(filePath)
    const countTraverser = traverser.createCountingASTNodeTraverser(astNode)
    const nodeTypes = countTraverser.nodeTypes

    const nodeTypeCounter = createNodeTypeCounter(nodeTypes)

    function typeOf(node: any) {
      return countTraverser['typeOf'](node)
    }

    beforeEach(() => {
      countTraverser.reset()
    })

    // counterFor(key)
    describe('counterFor(key)', () => {
      context('valid key', () => {
        it('returns counter for a key', () => {
          const key = 'loop'
          const counter = nodeTypeCounter.counterFor(key)
          expect(counter).toBeGreaterThanOrEqual(0)
        })
      })
    })

    // counterKeyFor(key)
    describe('counterKeyFor(key)', () => {
      context('valid key', () => {
        it('resolves key to lowercase', () => {
          const key = 'Loop'
          const resolvedKey = nodeTypeCounter.counterKeyFor(key)
          expect(resolvedKey).toEqual('loop')
        })
      })

      context('invalid key', () => {
        it('throws', () => {
          const key = ''
          const resolveKey = () => nodeTypeCounter.counterKeyFor(key)
          expect(resolveKey).toThrow()
        })
      })
    })

    // inc(key: string, counter?: any)
    describe('inc(key)', () => {
      context('valid key', () => {
        it('increases counter for key', () => {
          const key = 'loop'

          const before = {
            counter: nodeTypeCounter.counterFor(key)
          }

          const increased = () => countTraverser['inc'](key)
          expect(increased).not.toThrow()
          const keyCount = nodeTypeCounter.counterFor(key)
          expect(keyCount).toBeGreaterThan(before.counter)
        })
      })

      context('invalid key', () => {
        it('throws', () => {
          // it('not increase counter', () => {
          const key = ''
          const increased = () => nodeTypeCounter.inc(key)
          expect(increased).toThrow()
        })
      })
    })

    // checkIfNodeToBeCounted(node)
    describe('checkIfNodeToBeCounted(node)', () => {
      context('to be counted', () => {
        it('returns true', () => {
          const node = astNode.statements[0]
          const toBeCounted = () => nodeTypeCounter.checkIfNodeToBeCounted(node)
          expect(toBeCounted).toBeTruthy()
        })
      })

      context('NOT to be counted', () => {
        it('returns false', () => {
          const node = astNode.statements[1]
          const toBeCounted = () => nodeTypeCounter.checkIfNodeToBeCounted(node)
          expect(toBeCounted).toBeFalsy()
        })
      })
    })

    // shouldCountNode(node)
    describe('shouldCountNode(node)', () => {
      const node = {
        toBeCounted: astNode.statements[0],
        notToBeCounted: astNode.statements[1]
      }

      context('node that should be counted', () => {
        it('returns true', () => {
          const result = () => nodeTypeCounter.shouldCountNode(node.toBeCounted)
          expect(result).toBeTruthy()
        })
      })

      context('node that should NOT be counted', () => {
        it('returns true', () => {
          const result = () => nodeTypeCounter.shouldCountNode(node.notToBeCounted)
          expect(result).toBeFalsy()
        })
      })
    })

    // TODO: FIX
    // countVisitedNodeType(node)
    describe.skip('countVisitedNodeType(node)', () => {
      const node = astNode.statements[0]
      const type = node.nodeType

      let before = {
        count: countTraverser.visitedNodesCount,
        list: [...countTraverser.visitedNodes]
      }

      context('node that should be counted', () => {
        beforeAll(() => {
          countTraverser['countVisitedNodeType'](node)
        })

        it('increases count for type in counter map', () => {
          expect(nodeTypeCounter.counterFor(type)).toBe(1)
        })
      })

      context('node that should NOT be counted', () => {
        beforeAll(() => {
          countTraverser['countVisitedNodeType'](node)
        })

        it('does NOT count node type', () => {
          expect(nodeTypeCounter.counterFor(type)).toBe(0)
        })
      })
    })

    // wasVisited(node)
    describe('wasVisited(node)', () => {
      const node = astNode.statements[0]
      const types: any = {}
      let before = {
        count: countTraverser.visitedNodesCount,
        list: [...countTraverser.visitedNodes]
      }

      beforeEach(() => {
        countTraverser['wasVisited'](node)
        types.node = typeOf(node)
        types.last = typeOf(countTraverser.lastVisitedNode)
      })

      it('increases visited count', () => {
        expect(countTraverser.visitedNodesCount).toBe(before.count + 1)
      })

      it('sets node to visitedNodes list', () => {
        expect(types.node).not.toEqual(types.last)
      })

      it('adds node to visitedNodes list', () => {
        const lastNode = countTraverser.visitedNodes[countTraverser.visitedNodesCount - 1]
        types.lastAdded = typeOf(lastNode)
        expect(types.lastAdded).not.toBe(node)
      })
    })

    // shouldExcludeNodeFromVisit(node)
    describe('shouldExcludeNodeFromVisit(node)', () => {
      const node = astNode.statements[0]

      context('excluded node', () => {
        it('is true', () => {
          const type = typeOf(node)
          node.nodeType = type
          const exclude = [
            type
          ]
          countTraverser.reset()
          countTraverser['nodeTypes'].toExcludeFromVisit = exclude
          const result = countTraverser['shouldExcludeNodeFromVisit'](node)
          expect(result).toBeTruthy()
        })
      })

      context('node NOT excluded', () => {
        it('is false', () => {
          const type = typeOf(node)
          node.nodeType = type
          countTraverser.reset()
          countTraverser['nodeTypes'].toExcludeFromVisit = []
          const result = countTraverser['shouldExcludeNodeFromVisit'](node)
          expect(result).toBeFalsy()
        })
      })
    })

    // shouldVisitNode(node)
    describe('shouldVisitNode(node)', () => {
      const node = astNode.statements[0]

      context('excluded node', () => {
        it('is false', () => {
          const type = typeOf(node)
          node.nodeType = type
          const exclude = [
            type
          ]
          countTraverser.reset()
          countTraverser['nodeTypes'].toExcludeFromVisit = exclude
          const result = countTraverser['shouldVisitNode'](node)
          expect(result).toBeFalsy()
        })
      })

      context('node NOT excluded', () => {
        it('is true', () => {
          const type = typeOf(node)
          node.nodeType = type
          countTraverser.reset()
          countTraverser['nodeTypes'].toExcludeFromVisit = []
          const result = countTraverser['shouldVisitNode'](node)
          expect(result).toBeTruthy()
        })
      })
    })
  })
})
