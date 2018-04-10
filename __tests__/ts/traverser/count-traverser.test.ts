import {
  context,
  loadAstNode,
  traverser
} from './_imports'

describe('traverser: count-traverser', () => {
  context('count-traverser file', () => {
    const filePath = 'traverser/count-traverser'
    const astNode: any = loadAstNode(filePath)
    const countTraverser = traverser.createCountingASTNodeTraverser(astNode)

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
        it('throws?', () => {
          const key = 'x'
          const result = countTraverser['resolveCategoryKey'](key)
          expect(result).toEqual({})
        })
      })
    })

    // resolveTypeCategory(categoryName)
    // counterKeyFor(key)
    // inc(key: string, counter?: any)
    // skipped(node: any)
    // resolveNodeTypesToCheckFor
    // nodeTypesToCheckFor
    // typeOf(node)
    // checkIfNodeToBeCounted(node)
    // shouldCountNode(node)
    // countVisitedNodeType(node)
    // wasVisited(node)
    // shouldExcludeNodeFromVisit(node)
    // shouldVisitNode(node)
  })
})
