import * as ts from 'typescript'
import { BaseTester } from '../base'
import { ParametersTester } from '../function/parameters';
import { TypeTester } from '../type';
import {
  isEmpty
} from '../../../util'
import { FunctionTester } from '../../details';

/**
 * For function, arrow function or method
 */
export class FunctionLikeTester extends BaseTester {
  parametersTester: ParametersTester
  functionTester: FunctionTester
  typeTester: TypeTester

  constructor(node: any, options: any) {
    super(node, options)
    if (node.parameters) {
      this.parametersTester = new ParametersTester(node.parameters, options)
    } else {
      this.log('FunctionLikeTester: no typeParameters', {
        node
      })
    }
    this.functionTester = new FunctionTester(options)

    if (node.type) {
      this.typeTester = new TypeTester(node.type, options)
    } else {
      this.log('FunctionLikeTester: no type', {
        node
      })
    }
  }

  test(query: any) {
    return this.testName(query.name) &&
      this.testType(query.type) && // async, arrow or normal
      this.testParameters(query.parameters) &&
      this.testReturnType(query.returnType)
  }

  testReturnType(query: any) {
    return this.typeTester.test(query)
  }

  // modifer object true/false
  testType(query: any) {
    if (isEmpty(this.modifiers)) return true
    return this.functionTester.test(this.node, query)
  }

  // modifer object true/false
  testParameters(query: any) {
    this.parametersTester.test(query)
  }
}
