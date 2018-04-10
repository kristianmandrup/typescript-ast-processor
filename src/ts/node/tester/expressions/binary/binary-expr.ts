import { BaseNodeTester } from '../../base'
import { createBinaryExprTester, BinaryExprTester } from '../../../details/binary-expr'

/**
 * Factory to create a BinaryExpressionNode tester
 * @param node
 * @param options
 */
export function createBinaryExpressionNodeTester(node: any, options: any) {
  // const binaryTester = new BinaryExprTester({ ...options, node })
  // if (binaryTester.matches(node)) return
  return new BinaryExpressionNodeTester(node, options)
}

/**
 * Create a binary operator tester
 * @param operator
 * @param options
 */
export function createBinaryOperatorTester(operator: string, options: any = {}) {
  return (node: any) => {
    const binaryTester = createBinaryExprTester({ ...options, node })
    return binaryTester.test({
      [operator]: true
    })
  }
}

/**
 * Test binary expressin of the form [leftSide, operatorToken, rightSide]
 * Also check use of parenthesis for dev score
 */
export class BinaryExpressionNodeTester extends BaseNodeTester {
  binaryTester: BinaryExprTester // IDetailsTester

  typeMap = {
    '()': 'ParenthesesExpression',
  }

  /**
   * Create a Binary Expression Node Tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(node, options)
    this.binaryTester = this.createDetailsTester('expr.binary', node, options) as BinaryExprTester
  }

  /**
   * Find the operator name used
   */
  get operator(): string {
    return this.binaryTester.matches()
  }

  /**
   * Count occurences of a particular operator
   * @param operator
   */
  countOperatorOccurrence(operator: string): number {
    const tester = createBinaryOperatorTester(operator)
    return this.countOccurrence({ tester })
  }

  /**
   * Get the list of available binary operators
   */
  get operators() {
    return [
      ...Object.keys(this.binaryTester.syntaxMap)
    ]
  }

  /**
   * Get occurences of each type of operator encountered within
   */
  get operatorInfo() {
    return this.operators.reduce((acc: any, operator: string) => {
      acc[operator] = this.countOperatorOccurrence(operator)
      return acc
    }, {})
  }

  /**
   * Collect info on parenthesised expressions and different operators encountered within
   */
  info() {
    return {
      occurences: {
        parenthesised: this.countOccurrence('ParenthesesExpression'),
        ...this.operatorInfo
      }
    }
  }

  /**
   *
   * @param query
   */
  test(query: any): any {
    return this.testOperator(query.operator)
  }

  /**
   * Test if the operator matches the query
   * {
   *   and: false
   *   or: true
   * }
   * @param query
   */
  testOperator(query: any) {
    if (!query) return true
    return query[this.operator] !== undefined ? query[this.operator] : true
  }
}
