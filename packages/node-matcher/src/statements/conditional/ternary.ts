import { BaseNodeTester } from '../../base'

/**
 * Factory to create ternary condition node tester
 * condition ? then : else
 * @param node
 * @param options
 */
export function createTernaryNodeTester(
  node: any,
  options: any = {},
): TernaryNodeTester {
  return new TernaryNodeTester(node, options)
}

export class TernaryNodeTester extends BaseNodeTester {
  /**
   * Create If Then Else Tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Get basic info including else on/off and nested levels
   */
  info(): any {
    return {
      ...super.info(),
      conditionalType: 'ternary',
    }
  }

  /**
   * TODO
   * Query whether on else block on/off and nesting levels
   */
  test(query: any) {
    return true
  }
}
