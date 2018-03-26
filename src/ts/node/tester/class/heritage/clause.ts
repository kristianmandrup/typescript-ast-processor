import { BaseTester } from '../../base'
import { ExpressionWithTypeArguments, Identifier } from 'typescript'
import {
  toList
} from '../../../../util'

export function createClassHeritageClauseTester(node: any, options: any = {}) {
  return new HeritageClauseTester(node, options)
}

export class HeritageClauseTester extends BaseTester {
  // heritage: HeritageTester

  constructor(node: any, options: any) {
    super(node, options)
    // this.heritage = new HeritageTester(node, options)
  }

  test(query: any): any {
    const result = this.arrayTestMethod(query)
    if (!result) return false
    const queryPart = query[result.keyName] || query.named
    if (!queryPart) return false
    return toList(queryPart)[result.method]((name: string) => {
      const nameTest = this.createNameTest(query)
      return nameTest ? {
        node: this.node,
        name,
        match: nameTest(name)
      } : false
    })
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
