import { BaseTester } from '../../base';
import {
  createBlockNodeTester,
  BlockNodeTester
} from './block'

export function createBlockStatementTester(node: any, options: any = {}): BlockStatementTester {
  return new BlockStatementTester(node, options)
}

export class BlockStatementTester extends BaseTester {
  blockNodeTester: BlockNodeTester

  constructor(node: any, options: any) {
    super(node, options)
    this.blockNodeTester = createBlockNodeTester(this.node, options)
  }

  /**
   * Determine how many levels deep the if is nested
   */
  get nestedLevels() {
    return this.blockNodeTester.nestedLevels
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

