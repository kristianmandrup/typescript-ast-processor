import * as ts from 'typescript'
import { BaseNodeTester } from '../../base'
import { createIndentifierNodeTester } from '../../identifier'

export function createThrowTester(node: any, options: any = {}) {
  // if (!isSwitchStatement(node)) return
  return new ThrowTester(node, options)
}

export class ThrowTester extends BaseNodeTester {
  expression: any

  constructor(node: any, options: any) {
    super(node, options)
    this.expression = node.expression
  }

  /**
   * Test if expression of error is a string literal
   * ie. of the form: throw 'xyz'
   */
  get isStringLiteral() {
    return ts.isStringLiteral(this.expression)
  }

  /**
   * Ugly as hell. Please refactor, perhaps using separate ErrorExprTester class
   */
  get newError() {
    const errExpr = this.expression
    if (ts.isNewExpression(errExpr)) {
      const newExpr = errExpr
      const classExpr = newExpr.expression
      if (ts.isIdentifier(classExpr)) {
        const idTester = createIndentifierNodeTester(classExpr, this.options)
        const name = idTester.name
        if (name === 'Error') {
          return {
            newError: true,
          }
        }
        return {
          newErrorClass: idTester.name,
        }
      }
      return {
        newErrorClass: true,
      }
    }
    if (ts.isFunctionExpression(errExpr))
      return {
        functionCall: true,
      }
    if (ts.isIdentifier(errExpr))
      return {
        identifier: true,
      }

    return false
  }

  /**
   * The error type (if any)
   */
  get errorType(): string {
    if (this.isStringLiteral) return 'string'
    return 'unknown'
  }

  /**
   * Return collected info on throw error statement
   */
  info() {
    return {
      errorType: this.errorType,
      newError: this.newError,
    }
  }
}
