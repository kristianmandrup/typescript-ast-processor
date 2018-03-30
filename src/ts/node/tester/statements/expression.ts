import { createExpressionTester, ExpressionTester } from "../../details/expression";
import { BaseNodeTester } from "../base";

function createExprTester(token: string = 'typeof', options: any = {}) {
  return (node: any) => {
    const exprTester = createExpressionTester({ ...options, node })
    return exprTester.is(token, node)
  }
}

/**
 * Factory to create a statement tester
 * @param node
 * @param options
 */
export function createExpressionStatementNodeTester(node: any, options: any) {
  return new ExpressionStatementNodeTester(node, options)
}

/**
 * Test binary expressin of the form [leftSide, operatorToken, rightSide]
 * Also check use of parenthesis for dev score
 */
export class ExpressionStatementNodeTester extends BaseNodeTester {
  exprTester: ExpressionTester

  /**
   * Create a Binary Expression Node Tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(node, options)
    this.exprTester = createExpressionTester({ ...options, node })
  }

  protected countOccurenceOf(token: string): number {
    return this.countOccurrence({
      tester: createExprTester(token)
    })
  }

  get typeofCount() {
    return this.countOccurenceOf('typeOf')
  }

  get deleteCount() {
    return this.countOccurenceOf('delete')
  }

  get notCount() {
    return this.countOccurenceOf('not')
  }

  info() {
    return {
      occurences: {
        typeof: this.typeofCount,
        delete: this.deleteCount,
        not: this.notCount
      }
    }
  }
}
