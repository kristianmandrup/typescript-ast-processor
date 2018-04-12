import {
  context,
  loadAstNode,
  traverser,
  log
} from './_imports'

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

describe('traverser: count-traverser', () => {
  context('traverser file', () => {
    const filePath = 'traverser/traverser'
    const astNode: any = loadAstNode(filePath)
    const countTraverser = traverser.createCountingASTNodeTraverser(astNode)

    function typeOf(node: any) {
      return countTraverser['typeOf'](node)
    }


    beforeEach(() => {
      countTraverser.reset()
    })

    // init(options)
    describe('init(options)', () => {
      context('no options', () => {
        const options = {}
        beforeEach(() => {
          countTraverser.init(options)
        })

        it('initializes traverser with categories of nodeTypes', () => {
          const categoriesMap = countTraverser['nodeTypes'].categories
          const catKeys = Object.keys(categoriesMap)
          expect(catKeys.length).toBeGreaterThan(1)
        })
      })
    })


    // parseQuery(query)
    describe('parseQuery(query)', () => {
      context('empty query', () => {
        let ctx: any = {}

        beforeEach(() => {
          ctx.nodeTypes = new Object(countTraverser['nodeTypes'])
          countTraverser.parseQuery({})
        })

        it('nodeTypes unchanged', () => {
          expect(countTraverser['nodeTypes']).toBe(ctx.nodeTypes)
        })
      })

      context('valid query', () => {
        let ctx: any = {}

        beforeEach(() => {
          ctx.nodeTypes = new Object(countTraverser['nodeTypes'])
          countTraverser.parseQuery({
            nodetypes: {
              x: [
                'x'
              ]
            }
          })
        })

        // TODO: improve (refactor?!)
        it('updates _nodeTypes', () => {
          expect(countTraverser['_nodeTypes']).not.toEqual(ctx.nodeTypes)
        })
      })
    })

    // resolveTypeCategory(categoryName)
    // TODO: What should it do!?
    describe.skip('resolveTypeCategory(categoryName)', () => {
      context('category can be resolved', () => {
        it('resolves category', () => {
          const categoryName = 'loop'
          const resolve = () => countTraverser['resolveTypeCategory'](categoryName)
          expect(resolve).not.toThrow()
        })
      })

      context('category can NOT be resolved', () => {
        it('throws', () => {
          const categoryName = 'loop'
          const resolve = () => countTraverser['resolveTypeCategory'](categoryName)
          const expected = [
            'IterationStatement'
          ]

          expect(resolve).not.toThrow()
          expect(resolve()).toEqual(expected)
        })
      })
    })

    // resolveCategoryKey(key)
    describe('resolveCategoryKey(key)', () => {
      context(`simple key 'loop' can be resolved`, () => {
        it('resolves key', () => {
          const key = 'loop'
          const expected = 'IterationStatement'
          const result = countTraverser['resolveCategoryKey'](key)
          expect(result).toContain(expected)
        })
      })

      context('nested path key loop.flow can be resolved', () => {
        it('resolves key', () => {
          const key = 'loop.flow'
          const expected = 'IterationStatement'
          const result = countTraverser['resolveCategoryKey'](key)
          expect(result).toContain(expected)
        })
      })

      context('nested path key loop.for can be resolved', () => {
        it('resolves key', () => {
          const key = 'loop.for'
          const expected = 'ForStatement'
          const result = countTraverser['resolveCategoryKey'](key)
          expect(result).toContain(expected)
        })
      })

      context('key can NOT be resolved', () => {
        it('returns empty list []', () => {
          const key = 'x'
          const result = countTraverser['resolveCategoryKey'](key)
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
          const result = countTraverser['resolveTypeCategories']()
          const expected = {}
          log({
            result
          })
          expect(result).toEqual(expected)
        })
      })
    })

    // counterFor(key)
    describe('counterFor(key)', () => {
      context('valid key', () => {
        it('returns counter for a key', () => {
          const key = 'loop'
          const counter = countTraverser['counterFor'](key)
          expect(counter).toBeGreaterThanOrEqual(0)
        })
      })
    })

    // counterKeyFor(key)
    describe('counterKeyFor(key)', () => {
      context('valid key', () => {
        it('resolves key to lowercase', () => {
          const key = 'Loop'
          const resolveKey = () => countTraverser['counterKeyFor'](key)
          expect(resolveKey).not.toThrow()
          expect(resolveKey()).toEqual('loop')
        })
      })

      context('invalid key', () => {
        it('throws', () => {
          const key = ''
          const resolveKey = () => countTraverser['counterKeyFor'](key)
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
            counter: countTraverser.counterFor(key)
          }

          const increased = () => countTraverser['inc'](key)
          expect(increased).not.toThrow()
          const keyCount = countTraverser.counterFor(key)
          expect(keyCount).toBeGreaterThan(before.counter)
        })
      })

      context('invalid key', () => {
        it('throws', () => {
          // it('not increase counter', () => {
          const key = ''
          const increased = () => countTraverser['inc'](key)
          expect(increased).toThrow()
        })
      })
    })

    // checkIfNodeToBeCounted(node)
    describe('checkIfNodeToBeCounted(node)', () => {
      context('to be counted', () => {
        it('returns true', () => {
          const node = astNode.statements[0]
          const toBeCounted = () => countTraverser['checkIfNodeToBeCounted'](node)
          expect(toBeCounted).toBeTruthy()
        })
      })

      context('NOT to be counted', () => {
        it('returns false', () => {
          const node = astNode.statements[1]
          const toBeCounted = () => countTraverser['checkIfNodeToBeCounted'](node)
          expect(toBeCounted).toBeFalsy()
        })
      })
    })

    // resolveNodeTypesToCheckFor
    describe.only('resolveNodeTypesToCheckFor(node)', () => {
      context('default node types', () => {
        it('returns default node types to check for', () => {
          const toBeCounted = countTraverser['resolveNodeTypesToCheckFor']
          expect(toBeCounted).toContain('x')
        })
      })

      context('with extra node types', () => {
        it('returns default node types and extra types to check for', () => {
          const extraTypes = [
            'loop' // should resolve to list of NodeTypes from category
          ]
          countTraverser.parseQuery({
            nodeTypes: {
              toBeCounted: extraTypes
            }
          })
          const toBeCounted = countTraverser['resolveNodeTypesToCheckFor']
          expect(toBeCounted).toContain('loop')
        })
      })
    })

    // get: nodeTypesToCheckFor
    describe('get: nodeTypesToCheckFor', () => {
      context.only('default node types', () => {
        it('returns default node types to check for', () => {
          const toCheckFor = countTraverser['nodeTypesToCheckFor']
          expect(toCheckFor).toContain('x')
        })
      })

      context.only('NOT to be counted', () => {
        it('returns default and extra node types to check for', () => {
          const extraTypes = [
            'loop'
          ]
          countTraverser.parseQuery({
            nodeTypes: {
              x: extraTypes
            }
          })
          const toCheckFor = countTraverser['nodeTypesToCheckFor']
          expect(toCheckFor).toContain('x')
        })
      })
    })

    // skipped(node: any)
    // typeOf(node)

    // get: nodeTypesToCheckFor
    describe('get: nodeTypesToCheckFor', () => {
      context('default node types', () => {
        it('returns default node types to check for', () => {
          const toCheckFor = () => countTraverser['nodeTypesToCheckFor']
          expect(toCheckFor).toBeTruthy()
        })
      })

      context('NOT to be counted', () => {
        it('returns default and extra node types to check for', () => {
          const extraTypes = [
            'loop'
          ]
          countTraverser.parseQuery({
            nodeTypes: {
              toBeCounted: extraTypes
            }
          })
          const toCheckFor = () => countTraverser['nodeTypesToCheckFor']
          expect(toCheckFor).toBeFalsy()
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
          const result = () => countTraverser['shouldCountNode'](node.toBeCounted)
          expect(result).toBeTruthy()
        })
      })

      context('node that should NOT be counted', () => {
        it('returns true', () => {
          const result = () => countTraverser['shouldCountNode'](node.notToBeCounted)
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
          expect(countTraverser.counter[type]).toBe(1)
        })
      })

      context('node that should NOT be counted', () => {
        beforeAll(() => {
          countTraverser['countVisitedNodeType'](node)
        })

        it('does NOT count node type', () => {
          expect(countTraverser.counter[type]).toBe(0)
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
