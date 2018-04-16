import { BaseNodeTester } from '../base'
import { PrimitiveTypes } from './primitives'

/**
 * Factory to create type node tester
 * Can be used to test function return type, parameter types or variable decl types
 * @param node
 * @param options
 */
export function createTypeNodeTester(node: any, options: any = {}) {
  return new TypeNodeTester(node, options)
}

export class TypeNodeTester extends BaseNodeTester {
  primitives: any
  /**
   * Create a TypeNodeTester instance, used to query a type node
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(node.type || node, options)
    this.init(node)
  }

  /**
   * Initialize
   * @param node
   */
  init(node: any) {
    this.setTester({
      factory: 'type',
      type: 'details',
    })
    this.primitives = new PrimitiveTypes()
  }

  /**
   * Return info about type, including type "complexity"
   */
  info() {
    return {
      typeName: this.typeName,
      union: this.isUnionType,
      unionTypes: this.unionTypes,
      primitive: this.isPrimitive,
      complex: this.isComplex,
    }
  }

  /**
   * TODO
   */
  get unionTypes() {
    if (!this.isUnionType) return []
    this.log('unionTypes: Not yet implemented')
    return []
  }

  /**
   * If this is a union type
   */
  get isUnionType() {
    return this.typeName === 'union'
  }

  /**
   * Type can be expressed as a simple type name
   */
  get isPrimitive() {
    return this.primitives.primitiveTypes.includes(this.typeName)
  }

  /**
   * Type such as union type or generic type that can not be expressed as a simple type name
   */
  get isComplex() {
    return !this.isPrimitive
  }

  /**
   * Get the type tester
   */
  get typeTester() {
    return this.getTester({ name: 'type', type: 'details' })
  }

  /**
   * Get the type(s) that match for the node
   * Uses node details tester: TypeTester
   * TODO: can we return multiple types if union type or similar?
   */
  get typeName(): string {
    return this.typeTester.matches()
  }

  /**
   * type match
   * @param type
   */
  isType(type: string) {
    return this.typeTester.forNode(this.node).is(type)
  }

  /**
   * Test node type
   * @param type
   */
  protected testType(type: string): boolean {
    if (!type) return false
    return this.primitives.validatePrimitiveType(type) && this.isType(type)
  }
}
