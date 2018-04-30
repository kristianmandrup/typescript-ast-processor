import * as ts from 'typescript'
import { DataCollector } from '../base'

export class ParamsCollector extends DataCollector {
  /**
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
  }

  /**
   * Collect data from parameter
   * @param param
   */
  collect(param: ts.ParameterDeclaration) {
    const fileName = this.fileName
    const typeInsertionPos = param.name.getEnd() + (param.questionToken ? 1 : 0)
    const opts = {
      arrow: true,
    }

    this.data = [
      JSON.stringify(param.name.getText()),
      param.name.getText(),
      typeInsertionPos,
      JSON.stringify(fileName),
      JSON.stringify(opts),
    ]
  }
}
