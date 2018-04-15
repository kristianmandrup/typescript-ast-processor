import { ExpressionWithTypeArguments, Identifier } from 'typescript'
import { IndentifierNodeTester } from '../../../identifier'
import { queryNode } from '../../../util'

export function createClassHeritageClauseTester(node: any, options: any = {}) {
  return new HeritageClauseTester(node, options)
}

export class HeritageClauseTester extends IndentifierNodeTester {
  identifiers: any[]
  names: any[]

  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Initialize
   * @param node
   */
  init(node: any) {
    this.identifiers = this.resolveIdentifiers()
    this.names = this.resolveNames()
  }

  /**
   * Match node via query
   * @param query
   */
  test(query: any) {
    return queryNode(this.node, query)
  }

  protected resolveIdentifiers() {
    return this.identiersFor(this.node.types)
  }

  /**
   * Get names
   */
  protected resolveNames() {
    return this.identifiers.map((id: Identifier) => id.getText())
  }

  /**
   * Get list of identifiers
   * @param types
   */
  protected identiersFor(types: ExpressionWithTypeArguments[]) {
    return types
      .filter((type: ExpressionWithTypeArguments) => {
        return type.expression.getText && type.expression.getText()
      })
      .map((type) => type.expression)
  }
}
