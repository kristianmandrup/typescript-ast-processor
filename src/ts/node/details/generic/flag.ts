import * as ts from 'typescript'
import {
  enumKeys,
  callFun
} from '../../../util'
import { BaseDetailsTester } from '../base';

const excludeFlags = [
  'HasComputedFlags',
  'AccessibilityModifier',
  'ParameterPropertyModifier',
  'NonPublicAccessibilityModifier',
  'TypeScriptModifier',
  // 'ExportDefault'
]

export class CheckFlag extends BaseDetailsTester {
  constructor(options: any) {
    super(options)

    this.checkers = {
      ...this.variable,
      ...this.namespace
    }
  }

  has(node: ts.Node, flag: any): boolean {
    if (!node.flags) return false

    // to test if a const: https://github.com/Microsoft/TypeScript/issues/22681#issuecomment-374002621
    // variableDeclarationList.flags & ts.NodeFlags.Const
    return !!(node.flags & flag)
  }

  is(node: any, name: string) {
    const fun = this[`is${name}`]
    return callFun(fun, node)
  }

  get variable() {
    const has = this.has.bind(this)
    return {
      let(node: any): boolean {
        return has(node, ts.NodeFlags.Let)
      },
      const(node: any) {
        return has(node, ts.NodeFlags.Const)
      }
    }
  }

  get namespace() {
    const has = this.has.bind(this)
    return {
      in(node: any) {
        return has(node, ts.NodeFlags.Namespace)
      },
      nested(node: any) {
        return has(node, ts.NodeFlags.NestedNamespace)
      }
    }
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
