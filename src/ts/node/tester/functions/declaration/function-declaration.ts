import * as ts from 'typescript'
import {
  isEmpty
} from '../../../../util'
import { INodeTester } from '../../base';
import {
  IndentifierNodeTester
} from '../../identifier'
import { IDetailsTester } from '../../../details/base';

export function isFunctionLike(node: any) {
  return ts.isFunctionLike(node)
}

export function createFunctionTester(node: any, options: any = {}) {
  if (!isFunctionLike(node)) return
  return new FunctionLikeNodeTester(node, options)
}

/**
 * For function, arrow function or method
 * TODO: Use BlockStatementTester for adding nesting levels support and testing function block
 */
export class FunctionLikeNodeTester extends IndentifierNodeTester {
  functionTester: IDetailsTester

  parameterNodesTester: INodeTester
  typeNodeTester: any // INodeTester
  blockNodeTester: any // INodeTester

  constructor(node: any, options: any) {
    super(node, options)
    if (node.parameters) {
      this.parameterNodesTester = this.createNodeTester('parameters', node.parameters, options)
    } else {
      this.log('FunctionLikeTester: no typeParameters', {
        node
      })
    }
    this.functionTester = this.createDetailsTester(node, options)

    if (node.type) {
      this.typeNodeTester = this.createNodeTester('type', node.type, options)
    }

    this.blockNodeTester = this.createNodeTester('block', this.node, options)
  }

  /**
   * Determine how many levels deep the if is nested
   */
  get nestedLevels() {
    return this.blockNodeTester.nestedLevels
  }

  /**
   * Determine if the last statement is of the form:
   * - return ...
   */
  get isLastStatementReturn() {
    return false
  }

  /**
   * Find the number of return statements within this function scope
   */
  get returnCount() {
    return 1
  }
  /**
   * Collect all info for function node
   */
  info() {
    return {
      name: this.name,
      parameters: this.parameterNodesTester.info(),
      returnType: this.returnType,
      returnCount: this.returnCount,
      lastStatementReturn: this.isLastStatementReturn,
      exported: this.isExported,
      arrow: this.isArrow,
      generator: this.isGenerator,
      nestedLevels: this.nestedLevels
    }
  }

  /**
   * Determine if function is an arrow function
   */
  get isArrow(): boolean {
    return this.functionTester.is(this.node, 'arrow')
  }

  /**
   * Determine if function is a generator function with asterisk (function*)
   */
  get isGenerator(): boolean {
    return this.functionTester.is(this.node, 'generator')
  }

  /**
   * Perform query on function node
   * @param query
   */
  test(query: any) {
    return this.testName(query.name) &&
      this.testType(query.type) && // async, arrow or normal
      this.testParameters(query.parameters) &&
      this.testReturnType(query.returnType)
  }

  /**
   * Query on the return type of function node
   * @param query
   */
  testReturnType(query: any) {
    return this.typeNodeTester.test(query)
  }

  /**
   * Get the return type. If none specified, return implicit:any
   */
  get returnType() {
    return this.typeNodeTester ? this.typeNodeTester.typeName : 'implicit:any'
  }

  /**
   * Query the return type of function node
   * @param query
   */
  testType(query: any) {
    if (isEmpty(this.modifiers)) return true
    return this.functionTester.test(this.node, query)
  }

  /**
   * Query the parameters of function node
   * @param query
   */
  testParameters(query: any) {
    return this.parameterNodesTester.test(query)
  }
}
