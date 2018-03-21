import * as ts from 'typescript'
import { BaseTester } from '../base'
import { ParametersTester } from '../function/parameters';

/**
 * For function, arrow function or method
 */
export class FunctionLikeTester extends BaseTester {
  parameters: ParametersTester

  constructor(node: any, options: any) {
    super(node, options)
    this.parameters = new ParametersTester(node, options)
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
    return true
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
