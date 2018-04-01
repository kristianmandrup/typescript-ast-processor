import { BaseNodeTester } from '../../base'
import {
  findParentBlocks
} from '../util'

/**
 * Factory to create a Block node tester
 * @param node
 * @param options
 */
export function createBlockNodeTester(node: any, options: any = {}): BlockNodeTester {
  // if (!isSwitchStatement(node)) return
  return new BlockNodeTester(node, options)
}

export class BlockNodeTester extends BaseNodeTester {
  /**
   * Create a Block node tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Find the list of parent blocks the block is nested within
   */
  get parentBlocks(): any[] {
    return findParentBlocks(this.node) || []
  }

  /**
   * If the block is nested within parent blocks
   */
  get isNested() {
    return Boolean(this.parentBlocks)
  }

  /**
   * How many levels deep the block is nested
   */
  get nestedLevels(): number {
    return this.parentBlocks.length || 0
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

  testNestingLevels(query: any) {
    this.testCount(query, this.nestedLevels)
  }
}
