import { ExpressionWithTypeArguments, Identifier } from 'typescript'
import { IndentifierNodeTester } from '../../../identifier';
import {
  queryNode
} from '../../../util'

export function createClassHeritageClauseTester(node: any, options: any = {}) {
  return new HeritageClauseTester(node, options)
}

export class HeritageClauseTester extends IndentifierNodeTester {
  // heritage: HeritageTester

  constructor(node: any, options: any) {
    super(node, options)
    // this.heritage = new HeritageTester(node, options)
  }

  test(query: any) {
    return queryNode(this.node, query)
  }

  get identifiers() {
    return this.identiersFor(this.node.types)
  }

  get names() {
    return this.identifiers.map((id: Identifier) => id.getText())
  }

  identiersFor(types: ExpressionWithTypeArguments[]) {
    return types.filter((type: ExpressionWithTypeArguments) => {
      return type.expression.getText && type.expression.getText()
    }).map(type => type.expression)
  }
}
