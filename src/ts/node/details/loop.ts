import * as ts from 'typescript'
import { BaseDetailsTester } from './base';

export class LoopTester extends BaseDetailsTester {
  constructor(options: any) {
    super(options)
  }

  get checkerNames() {
    return [
      'for',
      'while',
      'loop'
    ]
  }

  /**
   * Test if node is a for, for/in or for/of statement
   * @param node node to test
   */
  for(node: any) {
    node = this.nodeOf({ node })
    return ts.isForStatement(node) || ts.isForInStatement(node) || ts.isForOfStatement(node)
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
