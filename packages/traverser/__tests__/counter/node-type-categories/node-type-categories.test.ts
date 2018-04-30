import {
  context,
  loadAstNode,
  traverser,
  log
} from '../_imports'
import { createNodeTypeCategories } from '../../../../../src/ts/traverser/visit-tracker/counter/node-type-categories';

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
    const categories = nodeTypes.categories

    const nodeTypeCat = createNodeTypeCategories(categories)

    function typeOf(node: any) {
      return countTraverser['typeOf'](node)
    }

    beforeEach(() => {
      countTraverser.reset()
    })

    // resolveTypeCategory(categoryName)
    // TODO: Look up in categoryMap!?
    // describe.skip('resolveTypeCategory(categoryName)', () => {
    //   context('category can be resolved', () => {
    //     it('resolves category', () => {
    //       const categoryName = 'loop'
    //       const resolve = () => nodeTypeCat.resolveTypeCategory(categoryName)
    //       expect(resolve).not.toThrow()
    //     })
    //   })

    //   context('category can NOT be resolved', () => {
    //     it('throws', () => {
    //       const categoryName = 'loop'
    //       const resolve = () => countTraverser['resolveTypeCategory'](categoryName)
    //       const expected = [
    //         'IterationStatement'
    //       ]

    //       expect(resolve).not.toThrow()
    //       expect(resolve()).toEqual(expected)
    //     })
    //   })
    // })

    // resolveCategoryKey(key)
    describe('resolveCategoryKey(key)', () => {
      context(`simple key 'loop' can be resolved`, () => {
        it('resolves key', () => {
          const key = 'loop'
          const expected = 'IterationStatement'
          const result = nodeTypeCat.resolveCategoryKey(key)
          expect(result).toContain(expected)
        })
      })

      context('nested path key loop.flow can be resolved', () => {
        it('resolves key', () => {
          const key = 'loop.flow'
          const expected = 'IterationStatement'
          const result = nodeTypeCat.resolveCategoryKey(key)
          expect(result).toContain(expected)
        })
      })

      context('nested path key loop.for can be resolved', () => {
        it('resolves key', () => {
          const key = 'loop.for'
          const expected = 'ForStatement'
          const result = nodeTypeCat.resolveCategoryKey(key)
          expect(result).toContain(expected)
        })
      })

      context('key can NOT be resolved', () => {
        it('returns empty list []', () => {
          const key = 'x'
          const result = nodeTypeCat.resolveCategoryKey(key)
          expect(result).toEqual([])
        })
      })
    })

    // resolveTypeCategories
    // TODO: FIX - what should it even do!?
    describe.skip('resolveTypeCategories', () => {
      // TODO: make pass
      context('can be resolved', () => {
        it('nodeTypes unchanged', () => {
          const result = nodeTypeCat.resolveTypeCategories(nodeTypes)
          const expected = {}
          log({
            result
          })
          expect(result).toEqual(expected)
        })
      })
    })
  })
})
