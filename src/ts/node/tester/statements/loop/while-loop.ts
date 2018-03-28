import * as ts from 'typescript'
import { BlockStatementTester } from '../block-statement'

/**
 * Factory to create a While loop tester
 * @param node
 * @param options
 */
export function createWhileLoopTester(node: any, options: any = {}): WhileLoopTester {
  return new WhileLoopTester(node, options)
}

/**
 * While loop query tester and data aggregator
 */
export class WhileLoopTester extends BlockStatementTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  get whileThen() {
    return ts.isWhileStatement(this.node)
  }

  get doWhile() {
    return ts.isDoStatement(this.node)
  }


  info() {
    return {
      ...super.info(),
      loop: true,
      while: true,
      whileThen: this.whileThen,
      doWhile: this.doWhile
    }
  }
}

