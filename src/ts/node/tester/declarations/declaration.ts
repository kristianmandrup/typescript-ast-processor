import { BaseNodeTester } from '../base'

export function createFunctionTester(node: any, options: any = {}) {
  return new DeclarationNodeTester(node, options)
}

/**
 * For function, arrow function or method
 * TODO: Use BlockStatementTester for adding nesting levels support and testing function block
 */
export class DeclarationNodeTester extends BaseNodeTester {
  identifierNodeTester: any

  constructor(node: any, options: any = {}) {
    super(node, options)
    if (!this.node.name) {
      this.log('declaration missing name:', {
        node,
      })
      return
    }
    this.setTester({
      name: 'identifier',
      factory: 'identifier',
    })
  }

  /**
   * Whether function is anonymous
   */
  get isAnonymous(): boolean {
    return !this.isNamed
  }

  /**
   * Whether not anonymous
   */
  hasId(node: any) {
    return !this.isAnonymous
  }

  /**
   * Whether function is named
   */
  get isNamed(): boolean {
    return this.hasTester({ name: 'identifier' })
  }

  /**
   * Test if name matches query
   * @param query
   */
  testName(query: any) {
    if (!this.isNamed) return true
    return this.doTest({
      query,
      qprop: 'name',
      name: 'identifier',
      test: 'testName',
    })
  }

  /**
   * The name of the class (if not anonymous)
   */
  get name() {
    if (!this.isNamed) return undefined
    return this.getProp({
      name: 'identifier',
      property: 'name',
    })
  }

  /**
   * Whether class declaration exported (only possible if named)
   *
   */
  get isExported() {
    if (!this.isNamed) return false
    return this.getProp({
      name: 'identifier',
      property: 'isExported',
    })
  }

  testExported(query: any) {
    if (!this.isQuery(query.exported)) return true
    return this.isExported === query.exported
  }

  info() {
    return {
      ...super.info(),
      name: this.name,
      exported: this.isExported,
    }
  }

  test(query: any): any {
    return super.test(query) && this.testName(query) && this.testExported(query)
  }
}
