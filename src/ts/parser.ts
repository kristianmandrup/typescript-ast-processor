import {
  SourceFile
} from 'typescript'
import { SrcFile } from './src-file';
import { NodeVisitor } from './visitor'
import { RootDataCollector } from './collector';
import { Instrumentor } from './instrumentor/base';

export class Parser {
  options: any
  srcFile: SrcFile
  visitor: NodeVisitor
  collector: RootDataCollector
  instrumentor: Instrumentor

  constructor(srcFile: SrcFile) {
    this.srcFile = srcFile
    const options = srcFile.options
    this.options = options
    const createCollector = options.createCollector || this.createCollector
    this.collector = createCollector(options)
    this.options.collector = this.collector
    this
      .intializeVisitor()
      .intializeInstrumentor()
  }

  register(label: string, functionMap: any) {
    this.collector.registerOne(label, functionMap.collector)
    this.visitor.registerVisitor(label, functionMap.visitor)
  }

  intializeVisitor() {
    const { options } = this
    const createVisitor = options.createVisitor || this.createVisitor
    this.visitor = createVisitor(options)
    return this
  }

  intializeInstrumentor() {
    const { options } = this
    const createInstrumentor = options.createInstrumentor || this.createInstrumentor
    this.instrumentor = createInstrumentor(options)
    return this
  }


  createInstrumentor(options: any) {
    return new Instrumentor(options || this.options)
  }

  createCollector(options: any) {
    return new RootDataCollector(options || this.options)
  }

  createVisitor(options: any) {
    return new NodeVisitor(options || this.options)
  }

  parse(sourceFile: SourceFile) {
    return this.visitor.visit(sourceFile)
  }
}
