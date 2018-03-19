import * as ts from 'typescript'
import { AstDataCollector } from '../base';
import { SrcFile } from '../../src-file';

export class ParamsCollector extends AstDataCollector {
  fileName: string
  constructor(public srcFile: SrcFile) {
    super()
    this.fileName = srcFile.fileName
  }

  collect(param: ts.ParameterDeclaration) {
    const fileName = this.fileName
    const typeInsertionPos = param.name.getEnd() + (param.questionToken ? 1 : 0);
    const opts = {
      arrow: true
    }

    this.data = [
      JSON.stringify(param.name.getText()),
      param.name.getText(),
      typeInsertionPos,
      JSON.stringify(fileName),
      JSON.stringify(opts),
    ];
  }
}

