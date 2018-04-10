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
        const registries = {
          valid: {

          },
          invalid: {

          }
        }
        it('initializes traverser with categories of nodeTypes', () => {
          expect($traverser.registerVisitors(registries.valid)).toEqual({
          })
        })
      })

      context('invalid registry', () => {
        const registries = {
          valid: {

          },
          invalid: {

          }
        }

        it('initializes traverser with categories of nodeTypes', () => {
          expect($traverser.registerVisitors(registries.valid)).toEqual({
          })
        })
      })
    })


    // registerVisitor(name: string, visitor: Function)
    // visitorIterator
    // nodeDisplayInfo(node)
    // typeOf(node)
    // skipped(node)
    // typeNameFor(typeName: string, fnName?: string)
    // wasVisited(node: any)
    // willVisit(node: any)
    // wasVisitedBefore(node: any)
    // visit(nextNode?: ts.Node)
    // shouldTraverseChildNodes(node: ts.Node)
    // shouldTraverseAncestor(node: ts.Node)
    // shouldExcludeNodeFromVisit(node: any)
    // shouldVisitNode(node: any)
    // traverseNextMethod
    // traverseNext(node: any)
    // traverseChildNodes(node: ts.Node)
    // traverseAncestor(node: ts.Node)
  })
})
