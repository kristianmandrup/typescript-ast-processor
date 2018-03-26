import * as ts from 'typescript'
import {
  ParametersTester
} from '../function/parameters';
import {
  TypeNodeTester
} from '../type';
import {
  isEmpty
} from '../../../util'
import { FunctionTester } from '../../details';
import { IndentifierNodeTester } from '../identifier';

export {
  ParametersTester
}

export function isFunctionLike(node: any) {
  return ts.isFunctionLike(node)
}

export function createFunctionTester(node: any, options: any = {}) {
  if (!isFunctionLike(node)) return
  return new FunctionLikeNodeTester(node, options)
}

/**
 * For function, arrow function or method
 */
export class FunctionLikeNodeTester extends IndentifierNodeTester {
  parametersTester: ParametersTester
  functionTester: FunctionTester
  typeTester: TypeNodeTester

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
      this.typeTester = new TypeNodeTester(node.type, options)
    } else {
      // this.log('FunctionLikeTester: no type', {
      //   node
      // })
    }
  }

  info() {
    return {
      name: this.name,
      parameters: this.parameters.info(),
      returnType: this.returnType,
      exported: this.isExported
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

  get parameters() {
    return this.parametersTester
  }

  get returnType() {
    return this.typeTester ? this.typeTester.typeName : 'any'
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
