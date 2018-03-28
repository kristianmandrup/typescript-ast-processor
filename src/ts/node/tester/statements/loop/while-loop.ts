import * as ts from 'typescript'
import { BlockStatementTester } from '../block-statement';

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

