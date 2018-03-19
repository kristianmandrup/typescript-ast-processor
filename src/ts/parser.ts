import {
  SourceFile
} from 'typescript'
import { SrcFile } from './src-file';
import { NodeVisitor } from './visitor'

export class Parser {
  options: any
  srcFile: SrcFile
  visitor: NodeVisitor

  constructor(srcFile: SrcFile) {
    this.srcFile = srcFile
    const options = srcFile.options
    this.options = options
    const createVisitor = options.createVisitor || this.createVisitor
    this.visitor = createVisitor(options)
  }

  createVisitor(options: any) {
    return new NodeVisitor(options || this.options)
  }

  parse(sourceFile: SourceFile) {
    return this.visitor.visit(sourceFile)
  }
}
