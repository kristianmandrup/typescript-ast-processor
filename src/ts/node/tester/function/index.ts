import * as ts from 'typescript'
import { BaseTester } from '../base'
import { ParametersTester } from '../function/parameters';
import { TypeTester } from '../type';

/**
 * For function, arrow function or method
 */
export class FunctionLikeTester extends BaseTester {
  parameters: ParametersTester
  type: TypeTester

  constructor(node: any, options: any) {
    super(node, options)
    this.parameters = new ParametersTester(node.parameters, options)
    this.type = new TypeTester(node.type, options)
  }

  test(details: any) {
    const {
      modifiers,
      name,
      parameters,
      returnType
    } = details
    return this.testName(name) &&
      this.testModifiers(modifiers) &&
      this.testParameters(parameters) &&
      this.testReturnType(returnType)
  }

  testReturnType(returnType: any) {
    return this.type.test('void')
  }

  // modifer object true/false
  testModifiers(modifiers: any) {
    // TODO: use node/details test
  }

  // modifer object true/false
  testParameters(parameters: any) {
    this.parameters.test(parameters)
  }
}
