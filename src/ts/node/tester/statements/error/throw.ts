import * as ts from 'typescript'
import { BaseTester } from '../../base';
import { createIndentifierNodeTester } from '../../identifier';

export function createThrowTester(node: any, options: any = {}) {
  // if (!isSwitchStatement(node)) return
  return new ThrowTester(node, options)
}

export class ThrowTester extends BaseTester {
  expression: any

  constructor(node: any, options: any) {
    super(node, options)
    this.expression = node.expression
  }

  get isStringLiteral() {
    return ts.isStringLiteral(this.expression)
  }

  /**
   * Ugly as hell. Please refactor, perhaps using separate ErrorExprTester class
   */
  get isNewError() {
    const errExpr = this.expression
    if (ts.isNewExpression(errExpr)) {
      const newExpr = errExpr
      const classExpr = newExpr.expression
      if (ts.isIdentifier(classExpr)) {
        const idTester = createIndentifierNodeTester(classExpr, this.options)
        const name = idTester.name
        if (name === 'Error') {
          return {
            newError: true
          }
        }
        return {
          newErrorClass: idTester.name
        }
      }
      return {
        newErrorClass: true
      }
    }
    if (ts.isFunctionExpression(errExpr)) return {
      functionCall: true
    }
    if (ts.isIdentifier(errExpr)) return {
      identifier: true
    }

    return false
  }

  get errorType(): string {
    if (this.isStringLiteral) return 'string'
    return 'unknown'
  }

  info() {
    return {
      error: this.errorType
    }
  }
}
