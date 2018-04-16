import * as ts from 'typescript'
import { DeclarationNodeTester } from '../declaration'

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
  constructor(node: any, options: any) {
    super(node, options)
    this.init(node)
  }

  get testerMap() {
    return {
      parameters: 'function.parameters',
      type: 'type',
      block: 'block',
      function: 'details:function',
      id: {
        name: 'identifier',
        when: this.hasId,
      },
    }
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

  /**
   * id Tester
   */
  get idNodeTester() {
    return this.getTester('id')
  }

  /**
   * block node tester
   */
  get blockNodeTester() {
    return this.getTester('block')
  }

  /**
   * block node tester
   */
  get parameterNodesTester() {
    return this.getTester('parameters')
  }

  /**
   * Function details tester
   */
  get functionTester() {
    return this.getTester('details:function')
  }

  /**
   * block node tester
   */
  get typeNodeTester() {
    return this.getTester('type')
  }

  /**
   * Get name of functon if available
   */
  get name(): string | undefined {
    return this.getProp({
      name: 'id',
      prop: 'name',
    })
  }

  get isExported() {
    return this.getProp({
      name: 'id',
      prop: 'isExported',
    })
  }

  /**
   * Determine how many levels deep the if is nested
   */
  get nestedLevels() {
    return this.getProp({
      name: 'block',
      prop: 'nestedLevels',
    })
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
      parameters: this.parametersInfo,
      returnType: this.returnType,
      returnCount: this.returnCount,
      lastStatementReturn: this.isLastStatementReturn,
      arrow: this.isArrow,
      generator: this.isGenerator,
      nestedLevels: this.nestedLevels,
    }

    if (this.name) {
      obj.name = this.name
      if (this.isExportable) {
        obj.exported = this.isExported
      }
    }
    return obj
  }

  /**
   * Get paramters info
   */
  get parametersInfo() {
    return this.getProp({
      name: 'parameter',
      fun: 'info',
    })
  }

  /**
   * Determine if function is an arrow function
   */
  get isArrow(): boolean {
    return this.getProp({
      name: 'function',
      is: 'arrow',
    })
  }

  /**
   * Determine if function is a generator function with asterisk (function*)
   */
  get isGenerator(): boolean {
    return this.getProp({
      name: 'function',
      is: 'generator',
    })
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

  get testMethodMap() {
    return {
      name: {
        name: 'id',
        test: 'testName',
      },
      parameters: 'parameters',
      returnType: 'type',
      functionType: 'details:function',
    }
  }

  /**
   * Get the return type. If none specified, return implicit:any
   */
  get returnType() {
    return this.getProp({
      name: 'type',
      prop: 'typeName',
      default: 'implicit:any',
    })
  }
}
