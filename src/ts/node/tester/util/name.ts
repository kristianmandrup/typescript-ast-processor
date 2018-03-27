import * as ts from 'typescript'
import {
  enumKey
} from './enum'
import {
  isStr
} from '../../../util'

export function nameOf(node: any) {
  const name = node.name || node
  return name.getText()
}

export function literalTypeName(node: any): string {
  const kind = node.kind || node
  return enumKey(ts.SyntaxKind, kind) || 'any'
}

export function nameMatch(nodeName: string, name: string | RegExp) {
  return name instanceof RegExp ? name.test(nodeName) : name === nodeName
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
