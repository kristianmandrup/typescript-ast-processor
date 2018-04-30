import { BaseNodeTester } from '../../base'
import { isEmpty } from '../../../../util'
import { testName } from '../../util'

// PropertyAccessExpression

// TODO: For use when testing deep property access into objects

/**
 * Factory to create property access node tester
 * Can be used to test property access
 * @param node
 * @param options
 */
export function createPropertyAccessNodeTester(node: any, options: any = {}) {
  return new PropertyAccessNodeTester(node, options)
}

/**
 * TODO
 */
export class PropertyAccessNodeTester extends BaseNodeTester {
  nested: any
  identifierNodeTester: any
  nestedNodeTester: any

  constructor(node: any, options: any) {
    super(node, options)
    this.init(node)
  }

  init(node: any) {
    super.init(node)
    const nested = node.node
    this.nested = nested
    this.setTester({
      name: 'identifier',
      node,
    })
    this.setTester({
      name: 'nested',
      factory: 'property.access',
      node: nested,
    })
  }

  /**
   * Get name of node
   */
  get name() {
    return this.identifierNodeTester.name
  }

  /**
   * Nested info
   */
  get nestedInfo() {
    return this.nestedNodeTester.info()
  }

  /**
   * Get info
   */
  info() {
    return {
      name: this.name,
      nested: this.nestedInfo,
    }
  }

  /**
   * TODO: perhaps instead slice and dice query.path and
   * call tests w first and remainder of query list
   * @param query
   */
  test(query: any) {
    return this.testName(query.name) && this.testNestedNames(query.path)
  }

  /**
   * Test current-level name of access node
   * @param query
   */
  testName(query: any) {
    return testName(this.name, query)
  }

  /**
   * Test dot path
   * @param dotQuery
   */
  testNestedNames(dotQuery: any) {
    if (!dotQuery) return true
    const dotQueryList = Array.isArray(dotQuery)
      ? dotQuery
      : dotQuery.split('.')
    if (isEmpty(dotQueryList)) return true
    const nameQuery = dotQueryList[0]
    const remainder = dotQueryList.splice(1)
    return (
      testName(this.name, nameQuery) &&
      this.nestedNodeTester.testNestedNames(remainder)
    )
  }
}
