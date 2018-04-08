import { BaseNodeTester } from './base'
import { IDetailsTester } from '../details/base';

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
  typeTester: IDetailsTester

  /**
   * Create a TypeNodeTester instance, used to query a type node
   * @param node
   * @param options
   */
  constructor(node: any, options: any) {
    super(node, options)
    this.typeTester = this.createDetailsTester('type', node, options)
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
      complex: this.isComplex //
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
    return this.primitiveTypes.includes(this.typeName)
  }

  /**
   * Type such as union type or generic type that can not be expressed as a simple type name
   */
  get isComplex() {
    return !this.isPrimitive
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
   * List of simple types used to determine if type is a simply/primitive type
   */
  protected get primitiveTypes(): string[] {
    return [
      'string',
      'number',
      'boolean',
      'array',
      'object',
      'symbol',
      'void',
      'any'
    ]
  }

  /**
   * Test node type
   * @param type
   */
  protected testType(type: string): boolean {
    return Boolean(!type || this.validatePrimitiveType(type) && this.typeTester.forNode(this.node).is(type))
  }

  /**
   * Validate if type (to test) is a primitive type
   * @param type
   */
  protected validatePrimitiveType(type: string): boolean {
    return this.primitiveTypes.includes(type)
  }
}
