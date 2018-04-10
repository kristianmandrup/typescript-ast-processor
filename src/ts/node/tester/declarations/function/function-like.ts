import * as ts from 'typescript'
import {
  isEmpty
} from '../../../../util'
import { INodeTester } from '../../base';
import { IDetailsTester } from '../../../details/base';
import { DeclarationNodeTester } from '../declaration';

export function isFunctionLike(node: any) {
  return ts.isFunctionLike(node)
}

export function createFunctionLikeNodeTester(node: any, options: any = {}) {
  if (!isFunctionLike(node)) return
  return new FunctionLikeNodeTester(node, options)
}

/**
 * For function, arrow function or method
 * TODO: Use BlockStatementTester for adding nesting levels support and testing function block
 */
export class FunctionLikeNodeTester extends DeclarationNodeTester {
  functionTester: IDetailsTester
  identifierNodeTester: any

  parameterNodesTester: INodeTester
  typeNodeTester: any // INodeTester
  blockNodeTester: any // INodeTester

  constructor(node: any, options: any) {
    super(node, options)
    const {
      type,
      parameters
    } = node

    // NOTE: anonymous function has no ID
    if (this.hasId(node)) {
      this.identifierNodeTester = this.createNodeTester('identifier', node, options)
    }

    if (parameters) {
      this.parameterNodesTester = this.createNodeTester('function.parameters', parameters, options)
    } else {
      this.log('FunctionLikeTester: no typeParameters', {
        node
      })
    }
    this.functionTester = this.createDetailsTester('function', node, options)

    if (type) {
      this.typeNodeTester = this.createNodeTester('type', type, options)
    }
    this.blockNodeTester = this.createNodeTester('block', this.node, options)
  }

  /**
   * TODO: Really test if this function is anonomous or NOT
  */
  hasId(node: any) {
    return true
  }


  get isExportable() {
    return true
  }

  get name() {
    return this.identifierNodeTester ? this.identifierNodeTester.name : undefined
  }

  get isExported() {
    return this.identifierNodeTester ? this.identifierNodeTester.isExported : undefined
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
    const obj: any = {
      parameters: this.parameters,
      returnType: this.returnType,
      returnCount: this.returnCount,
      lastStatementReturn: this.isLastStatementReturn,
      arrow: this.isArrow,
      generator: this.isGenerator,
      nestedLevels: this.nestedLevels
    }
    if (this.name) {
      obj.name = this.name
      if (this.isExportable) {
        obj.exported = this.isExported
      }
    }
    return obj
  }

  get parameters() {
    return this.parameterNodesTester ? this.parameterNodesTester.info() : {}
  }

  /**
   * Determine if function is an arrow function
   */
  get isArrow(): boolean {
    return this.functionTester.is('arrow')
  }

  /**
   * Determine if function is a generator function with asterisk (function*)
   */
  get isGenerator(): boolean {
    return this.functionTester.is('generator')
  }

  /**
   * Whether function is named
  */
  get isNamed(): boolean {
    return Boolean(this.identifierNodeTester)
  }

  /**
   * Whether function is anonymous
   */
  get isAnonymous(): boolean {
    return !this.isNamed
  }

  testName(query: any) {
    if (!query || !this.isNamed) return true
    return this.identifierNodeTester ? this.identifierNodeTester.testName(query) : false
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
    if (!query) return true
    return this.parameterNodesTester ? this.parameterNodesTester.test(query) : false
  }
}
