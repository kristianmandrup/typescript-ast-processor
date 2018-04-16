import { BaseNodeTester } from '../../base'
import { findParentBlocks } from '../util'

/**
 * Factory to create a Block node tester
 * @param node
 * @param options
 */
export function createBlockNodeTester(
  node: any,
  options: any = {},
): BlockNodeTester {
  // if (!isSwitchStatement(node)) return
  return new BlockNodeTester(node, options)
}

// TODO:
// Not sure if we need this distinction, looks to be the same node,
// ie. an ifStatement thenStatement etc, are all block statement nodes!
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
      nestedLevels: this.nestedLevels,
    }
  }

  /**
   * Query whether on else block on/off and nesting levels
   */
  test(query: any): boolean {
    return this.testNestingLevels(query.nested)
  }

  testNestingLevels(query: any): boolean {
    return this.testCount(query, this.nestedLevels)
  }
}
