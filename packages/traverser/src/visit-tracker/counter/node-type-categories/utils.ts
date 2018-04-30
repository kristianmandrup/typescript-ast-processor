import {
  isArray,
  isObject,
} from '../../../../util'

export const defaults = {
  categoryMap: {
    'switch': [
      'SwitchStatement'
    ],
    'loop': [
      'IterationStatement'
      // 'ForStatement',
      // 'DoStatement',
      // 'WhileStatement'
    ],
    'condition': [
      'ConditionalExpression'
    ],
    'expression': [
      'Expression'
    ],
    'statement': [
      'Statement'
    ],
    'declaration': [
      'Declaration'
      // 'DeclarationStatement'
    ]
  }
}

export function resolveValueToList(val: any): any[] {
  if (isArray(val)) return val
  if (isObject(val)) return flattenObjToList(val)
  return []
}

export function flattenObjToList(value: any): any[] {
  if (Array.isArray(value)) return value
  return Object.keys(value).reduce((acc: any[], key: string) => {
    const val = value[key]
    const list = resolveValueToList(val)
    acc = acc.concat(list)
    return acc
  }, [])
}
