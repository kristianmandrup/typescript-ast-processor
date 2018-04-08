import { BaseNodeTester, INodeTester } from '../../base';

export function createBlockStatementNodeTester(node: any, options: any = {}): BlockStatementNodeTester {
  return new BlockStatementNodeTester(node, options)
}


// TODO:
// Not sure if we need this distinction, looks to be the same node,
// ie. an ifStatement thenStatement etc, are all block statement nodes!
export class BlockStatementNodeTester extends BaseNodeTester {
  blockNodeTester: INodeTester // BlockNodeTester

  constructor(node: any, options: any) {
    super(node, options)
    this.blockNodeTester = this.createNodeTester('block', this.node, options) // as BlockNodeTester
  }

  /**
   * Determine how many levels deep the if is nested
   */
  get nestedLevels(): number {
    return this.blockNodeTester.nestedLevels || 0
  }

  /**
   * Get basic info including else on/off and nested levels
   */
  info() {
    return {
      nestedLevels: this.nestedLevels
    }
  }

  /**
   * Query whether on else block on/off and nesting levels
   */
  test(query: any) {
    return this.testNestingLevels(query.nested)
  }

  /**
   * Test on number of nesting levels
   * @param query
   */
  testNestingLevels(query: any) {
    this.testCount(query, this.nestedLevels)
  }
}

