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

export function literalTypeName(node: any): string {
  const kind = node.kind || node
  return enumKey(ts.SyntaxKind, kind) || 'any'
}

export function nameMatch(nodeName: string, nameExpr: string | RegExp | Function) {
  if (isStr(nameExpr)) return String(nameExpr) === nodeName
  if (isRegExp(nameExpr)) return (nameExpr as RegExp).test(nodeName)
  if (isFunction(nameExpr)) (nameExpr as Function)(nodeName)
  return false
}

export function createNameTest(nameQuery: any) {
  return (nodeName: string) => {
    const nameMatchers = nameQuery.anyOf || []
    return nameMatchers.find((match: string | RegExp) => {
      return nameMatch(nodeName, match)
    })
  }
}

export function decoratorName(node: any) {
  return 'unknown'
}
