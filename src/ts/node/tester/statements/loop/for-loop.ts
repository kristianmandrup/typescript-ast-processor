import * as ts from 'typescript'
import { BlockStatementTester } from '../block-statement';
import {
  testName
} from '../../util'

export class ForLoopTester extends BlockStatementTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  get isFor() {
    return ts.isForStatement(this.node)
  }

  get isForOf() {
    return ts.isForOfStatement(this.node)
  }

  get isForIn() {
    return ts.isForInStatement(this.node)
  }

  get forType(): string {
    if (this.isFor) return 'for'
    if (this.isForIn) return 'in'
    if (this.isForOf) return 'of'
    this.error('forType: unknown type of for loop', {
      node: this.node
    })
    return 'unknown'
  }

  info() {
    return {
      ...super.info(),
      loop: true,
      for: true,
      type: this.forType
    }
  }

  /**
   * Query whether on else block on/off and nesting levels
   */
  test(query: any) {
    return super.test(query) && this.testForType(query.type)
  }

  testForType(query: any) {
    return testName(this.forType, query)
  }
}

