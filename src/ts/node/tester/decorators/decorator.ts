import { FunctionCallNodeTester } from '../functions/call/function-call'
// import { INodeTester } from '../base';
import { IndentifierNodeTester } from '../identifier';

export function createDecoratorTester(node: any, options: any = {}): DecoratorNodeTester {
  return new DecoratorNodeTester(node, options)
}

export class DecoratorNodeTester extends FunctionCallNodeTester {
  targetNode: any
  identifierTester: IndentifierNodeTester // INodeTester

  constructor(node: any, options: any) {
    super(node, options)
    this.targetNode = options.targetNode
    this.identifierTester = this.createNodeTester('identifier', node, options) as IndentifierNodeTester
  }

  get targetId() {
    return this.identifierTester.nameOf(this.targetNode)
  }

  get type() {
    return 'unknown'
  }

  get target() {
    return {
      id: this.targetId,
      type: this.type
    }
  }

  info(): any {
    return {
      ...super.info(),
      decorator: true,
      target: this.target
    }
  }
}
