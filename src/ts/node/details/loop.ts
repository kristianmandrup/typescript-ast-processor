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

  for(node: any) {
    node = this.nodeOf({ node })
    return ts.isForStatement(node) || ts.isForInStatement(node) || ts.isForOfStatement(node)
  }

  while(node?: any) {
    node = this.nodeOf({ node })
    return ts.isDoStatement(node) || ts.isWhileStatement(node)
  }

  loop(node: any) {
    return this.for(node) || this.while(node)
  }
}
