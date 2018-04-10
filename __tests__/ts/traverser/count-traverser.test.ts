import {
  node,
  createSrcFile,
  fixturesPath,
  fixtureFile,
  context,
  loadAstNode,
  traverser
} from './_imports'

describe('traverser: count-traverser', () => {
  context('count-traverser file', () => {
    const filePath = 'traverser/count-traverser'
    const astNode: any = loadAstNode(filePath)
    const countTraverser = traverser.createCountingASTNodeTraverser(astNode)

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
  })
})

// init(options)
// parseQuery(query)
// resolveTypeCategories
// resolveCategoryKey(key)
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

