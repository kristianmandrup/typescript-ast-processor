import * as ts from 'typescript'
import { BlockStatementTester } from '../block-statement';

export function createTryCatchFinallyTester(node: any, options: any = {}) {
  // if (!isSwitchStatement(node)) return
  return new TryCatchFinallyTester(node, options)
}

export class TryCatchFinallyTester extends BlockStatementTester {
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

  info() {
    return {
      ...super.info(),
      catch: this.hasCatch,
      finally: this.hasFinally
    }
  }
}
