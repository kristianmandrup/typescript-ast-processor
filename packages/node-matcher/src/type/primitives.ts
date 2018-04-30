export class PrimitiveTypes {
  /**
   * List of simple types used to determine if type is a simply/primitive type
   */
  get primitiveTypes(): string[] {
    return [
      'string',
      'number',
      'boolean',
      'array',
      'object',
      'symbol',
      'void',
      'any',
    ]
  }

  /**
   * Validate if type (to test) is a primitive type
   * @param type
   */
  validatePrimitiveType(type: string): boolean {
    return this.primitiveTypes.includes(type)
  }
}
