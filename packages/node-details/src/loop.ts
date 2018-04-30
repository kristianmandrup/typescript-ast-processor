import * as ts from 'typescript'
import { BaseDetailsTester } from './base'

export function createLoopTester(options: any) {
  return new LoopTester(options)
}

export class LoopTester extends BaseDetailsTester {
  /**
   * Create loop details tester
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
  }

  /**
   * Names of check methods
   */
  get checkerNames() {
    return ['for', 'while', 'loop']
  }

  /**
   * Test if node is a for, for/in or for/of statement
   * @param node node to test
   */
  for(node: any) {
    node = this.nodeOf({ node })
    return (
      ts.isForStatement(node) ||
      ts.isForInStatement(node) ||
      ts.isForOfStatement(node)
    )
  }

  /**
   * Test if node is a while or do/while statement
   * @param node node to test
   */
  while(node?: any) {
    node = this.nodeOf({ node })
    return ts.isDoStatement(node) || ts.isWhileStatement(node)
  }

  /**
   * Test if node is a loop statement, ie. a for or while statement
   * @param node node to test
   */
  loop(node: any) {
    return this.for(node) || this.while(node)
  }
}
