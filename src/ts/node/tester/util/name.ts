import * as ts from 'typescript'
import {
  enumKey
} from './enum'
import {
  isStr,
  isRegExp,
  isFunction
} from '../../../util'

export function nameOf(node: any) {
  const name = node.name || node
  return name.getText()
}

/**
 * Get literal type name (enum key) of node using .kind
 * @param node
 */
export function literalTypeName(node: any): string {
  const kind = node.kind || node
  return enumKey(ts.SyntaxKind, kind) || 'any'
}

type NameMatchExpr = string | RegExp | Function

/**
 * Do a name match for node name against name match expression
 * @param nodeName
 * @param { NameMatchExpr } name matching expression, either a string, RegExp or function
 */
export function nameMatch(nodeName: string, nameExpr: NameMatchExpr) {
  if (isStr(nameExpr)) return String(nameExpr) === nodeName
  if (isRegExp(nameExpr)) return (nameExpr as RegExp).test(nodeName)
  if (isFunction(nameExpr)) (nameExpr as Function)(nodeName)
  return false
}

/**
 * Create a name test from a query
 * @param nameQuery
 */
export function createNameTest(nameQuery: any) {
  return (nodeName: string) => {
    const nameMatchers = nameQuery.anyOf || []
    return nameMatchers.find((match: string | RegExp) => {
      return nameMatch(nodeName, match)
    })
  }
}

/**
 * Determine decorator node name
 * @param node
 */
export function decoratorName(node: any) {
  return nameOf(node)
}
