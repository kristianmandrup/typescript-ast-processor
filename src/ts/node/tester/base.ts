import * as ts from 'typescript'
import { NodeDetailsTester } from '../details/generic';
import { Loggable } from '../../loggable';
import { NodeTester } from '.';

export interface INodeTester {
  tester: NodeTester
  details: NodeDetailsTester
}

export class BaseTester extends Loggable {
  $node: INodeTester
  node: any

  constructor(node: any, options: any) {
    super(options)
    this.node = node
    this.$node = {
      tester: new NodeTester(options),
      details: new NodeDetailsTester(options)
    }
  }

  nameOf(node: ts.Node) {
    return node['name'].getText()
  }

  get name() {
    return this.nameOf(this.node)
  }

  arrayTestMethod(name: string) {
    if (['one', 'any'].includes(name)) return 'find'
    if (name === 'all') return 'every'
    if (name === 'some') return 'some'
    throw new Error(`Invalid test name ${name}`)
  }

  testName(name: string): boolean {
    return this.name
  }

  testType(type: string): boolean {
    return !!(!type || this.validatePrimitiveType(type) && this.$node.details.is(this.node, type))
  }

  validatePrimitiveType(type: string): boolean {
    return this.primitiveTypes.includes(type)
  }

  get primitiveTypes() {
    return ['boolean', 'string', 'number', 'array', 'void']
  }
}

