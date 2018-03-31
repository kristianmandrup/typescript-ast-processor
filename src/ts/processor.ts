import {
  SourceFile
} from 'typescript'
import { SrcFile } from './src-file';
import {
  createASTNodeTraverser,
  ASTNodeTraverser
} from './traverser'
import { RootDataCollector } from './collector';
import { Instrumentor } from './instrumentor/base';

export class Processor {
  options: any
  srcFile: SrcFile
  nodeTraverser: ASTNodeTraverser
  collector: RootDataCollector
  instrumentor: Instrumentor

  /**
   * Create a Processor instance
   * @param srcFile
   */
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

  /**
   * Register a single labeled processing entity
   * Consists of a of visitor and collector function
   * @param label
   * @param functionMap
   */
  register(label: string, functionMap: any) {
    this.collector.registerOne(label, functionMap.collector)
    this.nodeTraverser.registerVisitor(label, functionMap.visitor)
  }

  /**
   * Register a processing map
   * consisting of visitor and collector functions for each labeled entity to monitor
   * @param nestedFunctionMap
   */
  registerMap(nestedFunctionMap: any) {
    Object.keys(nestedFunctionMap).map(label => {
      const functionMap = nestedFunctionMap[label]
      this.register(label, functionMap)
    })
  }

  /**
   * Initializes the visitor that traverses the (full) AST
   */
  intializeVisitor() {
    const { options } = this
    const createNodeTraverser = options.createNodeTraverser || this.createNodeTraverser
    this.nodeTraverser = createNodeTraverser(options)
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

  createNodeTraverser(options: any) {
    return createASTNodeTraverser(options || this.options)
  }

  process(sourceFile: SourceFile) {
    return this.nodeTraverser.visit(sourceFile)
  }
}
