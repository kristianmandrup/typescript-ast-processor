import * as ts from 'typescript'
import { NodeDetailsTester } from '../details/node-tester';
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

  testName(name: string): boolean {
    return this.node.name.getText()
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

