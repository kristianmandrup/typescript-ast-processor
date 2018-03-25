import { BaseTester } from '../base'
import { ExpressionWithTypeArguments, Identifier } from 'typescript'

export class HeritageClauseTester extends BaseTester {
  // heritage: HeritageTester

  constructor(node: any, options: any) {
    super(node, options)
    // this.heritage = new HeritageTester(node, options)
  }

  test(heritageQuery: any): boolean {
    const method = this.arrayTestMethod(heritageQuery.for)
    return Boolean(this.names[method]((name: string) => {
      const nameTest = this.createNameTest(heritageQuery)
      return nameTest(name)
    }))
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
