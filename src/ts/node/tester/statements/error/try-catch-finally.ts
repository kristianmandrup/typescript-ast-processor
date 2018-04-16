import * as ts from 'typescript'
import { BlockStatementNodeTester } from '../block'

export function createTryCatchFinallyTester(
  node: any,
  options: any = {},
): TryCatchFinallyTester {
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

  /**
   * Whether try statement has one or more catch blocks
   */
  get hasCatch(): boolean {
    return Boolean(this.catchClause)
  }

  /**
   * Whether try statement has one or more finally blocks
   */
  get hasFinally(): boolean {
    return Boolean(this.finallyBlock)
  }

  /**
   * Whether catch block(s) matches query
   */
  testCatch(query: any): boolean {
    return this.hasCatch === query
  }

  /**
   * Whether finally block(s) matches query
   */
  testFinally(query: any): boolean {
    return this.hasFinally === query
  }

  /**
   * Whether try statement matches query
   */
  test(query: any): boolean {
    return (
      super.test(query) &&
      this.testCatch(query.catch) &&
      this.testFinally(query.finally)
    )
  }

  /**
   * Info of try statement
   * TODO: should collect info on each block
   */
  info() {
    return {
      ...super.info(),
      catch: this.hasCatch,
      finally: this.hasFinally,
    }
  }
}
