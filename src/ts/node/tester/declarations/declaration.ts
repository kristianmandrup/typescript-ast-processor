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
    this.init(node)
  }

  init(node: any) {
    super.init(node)
    if (!this.hasId) {
      this.log('declarations missing id', {
        node,
      })
      return
    }
    this.setTester({
      name: 'identifier',
    })
  }

  /**
   * Whether function is anonymous
   */
  get isAnonymous(): boolean {
    return !this.hasId
  }

  /**
   * Whether not anonymous
   */
  hasId(node: any) {
    return this.node.name
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
    return (
      this.isNamed &&
      this.runTest({
        query,
        qprop: 'name',
        name: 'identifier',
        test: 'testName',
      })
    )
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
    return (
      this.isNamed &&
      this.getProp({
        name: 'identifier',
        property: 'isExported',
      })
    )
  }

  /**
   * Test exported (true|false) via query
   * @param query
   */
  testExported(query: any) {
    if (!this.isQuery(query.exported)) return true
    return this.isExported === query.exported
  }

  /**
   * Get declaration node info/data
   */
  info() {
    return {
      ...super.info(),
      name: this.name,
      exported: this.isExported,
    }
  }

  /**
   * Match node via query:
   * - name (name query)
   * - exported (true|false)
   * @param query
   * @returns { boolean }
   */
  test(query: any): any {
    return super.test(query) && this.testName(query) && this.testExported(query)
  }
}
