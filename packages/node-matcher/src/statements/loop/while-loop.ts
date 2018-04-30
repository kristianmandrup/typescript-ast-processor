import * as ts from 'typescript'
import { LoopNodeTester } from './loop'

/**
 * Factory to create a While loop tester
 * @param node
 * @param options
 */
export function createWhileLoopTester(
  node: any,
  options: any = {},
): WhileLoopTester {
  return new WhileLoopTester(node, options)
}

/**
 * While loop query tester and data aggregator
 */
export class WhileLoopTester extends LoopNodeTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * TODO: move to and use details tester for loop
   */
  get isWhileThen(): boolean {
    return ts.isWhileStatement(this.node)
  }

  /**
   * TODO: move to and use details tester for loop
   */
  get isDoWhile(): boolean {
    return ts.isDoStatement(this.node)
  }

  /**
   * Determine and return the for for loop type ('for', 'of' or 'in')
   */
  get whileType(): string {
    if (this.isWhileThen) return 'whileDo'
    if (this.isDoWhile) return 'doWhile'
    this.error('forType: unknown type of for loop', {
      node: this.node,
    })
    return 'unknown'
  }

  info(): any {
    return {
      ...super.info(),
      loopType: 'while',
      whileType: this.whileType,
      whileThen: this.isWhileThen,
      doWhile: this.isDoWhile,
    }
  }
}
