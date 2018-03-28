import * as ts from 'typescript'
import {
  literalTypeName,
  nameOf
} from './name'

import {
  enumKey
} from './enum'

interface IInitializerDetails {
  type: string
  value: any
  textValue: string
}

/**
 * Get initializer details for a parameter node (or similar?)
 * @param node parameter node (with initializer)
 * @returns { Object }
 */
export function initializerDetails(node: any): IInitializerDetails | {} {
  const initializer = node.initializer
  if (!initializer) return {}

  const type = normalizeLiteral(literalTypeName(initializer))
  let textValue = initializer.getText()
  let value

  if (type === 'number') {
    value = parseInt(textValue)
  }
  if (type === 'boolean') {
    value = Boolean(textValue)
  }

  return {
    type,
    value,
    textValue
  }
}

const literalMap = {
  numeric: 'number'
}

export function normalizeLiteral(literal: string) {
  const $literal = literal.replace(/Literal/, '').replace(/Expression/, '').toLowerCase()
  return literalMap[$literal] || $literal
}

export function normalizeKeword(keyword: string) {
  return keyword.replace(/Keyword$/, '').toLowerCase()
}

export function typeName(node: any) {
  const type = node.type || node
  const key = enumKey(ts.SyntaxKind, type.kind || type)
  return key ? normalizeKeword(key) : 'any'
}

export function idDetails(node: any) {
  return {
    type: typeName(node),
    name: nameOf(node),
    init: initializerDetails(node)
  }
}


