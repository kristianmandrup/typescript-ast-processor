import { isMemberType } from './types'
import { MemberTester } from './member'

export function createPropertyTester(
  node: any,
  options: any = {},
): PropertyTester | undefined {
  if (!isMemberType(node, 'property')) return
  return new PropertyTester(node, options)
}

export class PropertyTester extends MemberTester {
  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Info
   */
  info() {
    return {
      ...super.info(),
      property: true,
    }
  }
}
