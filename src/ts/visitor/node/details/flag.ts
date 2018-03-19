import * as ts from 'typescript'
import {
  enumKeys
} from '../util'

const excludeFlags = [
  'HasComputedFlags',
  'AccessibilityModifier',
  'ParameterPropertyModifier',
  'NonPublicAccessibilityModifier',
  'TypeScriptModifier',
  // 'ExportDefault'
]

export class CheckFlag {
  has(node: ts.Node, flag: any) {
    if (!node.flags) return
    return node.flags === flag
  }

  modifierFlagsOf(node: ts.Node): ts.ModifierFlags {
    return ts.getCombinedModifierFlags(node)
  }

  nodeFlagsOf(node: ts.Node): ts.NodeFlags {
    return ts.getCombinedNodeFlags(node)
  }

  get modifierFlags() {
    return enumKeys(ts.ModifierFlags).filter((key: string) => {
      return !excludeFlags.includes(key)
    })
  }

  get nodeFlags() {
    return enumKeys(ts.NodeFlags)
  }
}
