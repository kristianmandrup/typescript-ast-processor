import { isMemberType } from './types'
import { AccessorTester } from './accessor'

export function createGetAccessorTester(
  node: any,
  options: any = {},
): GetAccessorTester | undefined {
  if (!isMemberType(node, 'getter')) return
  return new GetAccessorTester(node, options)
}

export class GetAccessorTester extends AccessorTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Info
   */
  info() {
    return {
      ...super.info(),
      getter: true,
    }
  }
}
