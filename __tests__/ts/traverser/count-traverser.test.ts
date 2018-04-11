import {
  context,
  loadAstNode,
  traverser
} from './_imports'

describe('traverser: count-traverser', () => {
  context('traverser file', () => {
    const filePath = 'traverser/traverser'
    const astNode: any = loadAstNode(filePath)
    const countTraverser = traverser.createCountingASTNodeTraverser(astNode)

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
          expect(countTraverser['nodeTypes'].categories).toEqual({

          })
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
          countTraverser.parseQuery({})
        })

        it('updates nodeTypes', () => {
          expect(countTraverser['nodeTypes']).not.toBe(ctx.nodeTypes)
        })
      })
    })


    // resolveTypeCategories
    describe('resolveTypeCategories', () => {
      context('can be resolved', () => {
        it('nodeTypes unchanged', () => {
          const result = countTraverser['resolveTypeCategories']()
          expect(result).toEqual({})
        })
      })
    })

    // resolveCategoryKey(key)
    describe('resolveCategoryKey(key)', () => {
      context('key can be resolved', () => {
        it('resolves key', () => {
          const key = 'x'
          const result = countTraverser['resolveCategoryKey'](key)
          expect(result).toEqual({})
        })
      })

      context('key can NOT be resolved', () => {
        it('throws', () => {
          const key = 'x'
          const count = () => countTraverser['resolveCategoryKey'](key)
          expect(count).toThrow()
        })
      })
    })

    // resolveTypeCategory(categoryName)
    describe('resolveTypeCategory(categoryName)', () => {
      context('category can be resolved', () => {
        it('resolves category', () => {
          const categoryName = 'loop'
          const resolve = () => countTraverser['resolveTypeCategory'](categoryName)
          expect(resolve).not.toThrow()
        })
      })

      context('category can NOT be resolved', () => {
        it('throws', () => {
          const categoryName = 'x'
          const resolve = () => countTraverser['resolveTypeCategory'](categoryName)
          expect(resolve).not.toThrow()
          expect(resolve()).toEqual({})
        })
      })
    })

    // counterKeyFor(key)
    describe('counterKeyFor(key)', () => {
      context('valid key', () => {
        it('resolves key', () => {
          const key = 'loop'
          const resolve = () => countTraverser['counterKeyFor'](key)
          expect(resolve).not.toThrow()
        })
      })

      context('invalid key', () => {
        it('throws', () => {
          const key = 'loop'
          const resolve = () => countTraverser['counterKeyFor'](key)
          expect(resolve).toThrow()
        })
      })
    })

    // inc(key: string, counter?: any)
    describe('inc(key)', () => {
      context('valid key', () => {
        it('resolves key', () => {
          const key = 'loop'
          const increased = () => countTraverser['inc'](key)
          expect(increased).toThrow()
        })
      })

      context('invalid key', () => {
        it('throws', () => {
          const key = 'loop'
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
    describe('resolveNodeTypesToCheckFor(node)', () => {
      const node = astNode.statements[0]

      context('default node types', () => {
        it('returns true', () => {
          const toBeCounted = () => countTraverser['resolveNodeTypesToCheckFor'](node)
          expect(toBeCounted).toBeTruthy()
        })
      })

      context('NOT to be counted', () => {
        it('extra types', () => {
          const extraTypes = [
            'loop'
          ]
          countTraverser.parseQuery({
            nodeTypes: {
              toBeCounted: extraTypes
            }
          })
          const toBeCounted = () => countTraverser['resolveNodeTypesToCheckFor'](node)
          expect(toBeCounted).toBeFalsy()
        })
      })
    })

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

    // countVisitedNodeType(node)
    describe('countVisitedNodeType(node)', () => {
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
      let before = {
        count: countTraverser.visitedNodesCount,
        list: [...countTraverser.visitedNodes]
      }

      beforeAll(() => {
        countTraverser['wasVisited'](node)
      })

      it('increases visited count', () => {
        expect(countTraverser.visitedNodesCount).toBe(before.count + 1)
      })

      it('adds node to visitedNodes list', () => {
        expect(countTraverser.lastVisitedNode).toBe(node)
      })
    })
    // shouldExcludeNodeFromVisit(node)
    // shouldVisitNode(node)
  })
})
