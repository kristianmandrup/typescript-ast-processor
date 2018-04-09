import * as ts from 'typescript'
import { BlockStatementNodeTester } from '../block';

export function createTryCatchFinallyTester(node: any, options: any = {}): TryCatchFinallyTester {
  return new TryCatchFinallyTester(node, options)
}

export class TryCatchFinallyTester extends BlockStatementNodeTester {
  catchClause: ts.CatchClause
  finallyBlock: ts.Block
  tryBlock: ts.Block

  constructor(node: any, options: any) {
    super(node, options)
    this.tryBlock = node.tryBlock
    this.catchClause = node.catchClause
    this.finallyBlock = node.finallyBlock
  }

  get hasCatch() {
    return Boolean(this.catchClause)
  }

  get hasFinally() {
    return Boolean(this.finallyBlock)
  }

  testCatch(query: any) {
    return this.hasCatch === query
  }

  testFinally(query: any) {
    return this.hasFinally === query
  }

  test(query: any) {
    return super.test(query) &&
      this.testCatch(query.catch) &&
      this.testFinally(query.finally)
  }

  info() {
    return {
      ...super.info(),
      catch: this.hasCatch,
      finally: this.hasFinally
    }
  }
}
