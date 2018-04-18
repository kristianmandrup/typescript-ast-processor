import * as ts from 'typescript'
import { BaseDetailsTester } from './base'

export function createConditionalTester(options: any) {
  return new ConditionalTester(options)
}

export class ConditionalTester extends BaseDetailsTester {
  /**
   * Create conditional details tester
   * @constructor
   * @param options
   */
  constructor(options: any) {
    super(options)
  }

  /**
   * Map of conditionals
   */
  get syntaxMap() {
    return {
      if: ts.SyntaxKind.IfKeyword,
      else: ts.SyntaxKind.ElseKeyword,
      switch: ts.SyntaxKind.SwitchKeyword,
    }
  }

  /**
   * Test if node is an if keyword
   * @param node node to test
   */
  if(node?: any) {
    return this.has('if', { node })
  }

  /**
   * Test if node is an else keyword
   * @param node node to test
   */
  else(node?: any) {
    return this.has('else', { node })
  }

  /**
   * Test if node is a switch keyword
   * @param node node to test
   */
  switch(node?: any) {
    return this.has('switch', { node })
  }
}
