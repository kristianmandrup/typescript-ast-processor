import { isMemberType } from './types'
import { AccessorTester } from './accessor'

export function createSetAccessorTester(
  node: any,
  options: any = {},
): SetAccessorTester | undefined {
  if (!isMemberType(node, 'setter')) return
  return new SetAccessorTester(node, options)
}

export class SetAccessorTester extends AccessorTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Info
   */
  info() {
    return {
      ...super.info(),
      setter: true,
    }
  }
}
