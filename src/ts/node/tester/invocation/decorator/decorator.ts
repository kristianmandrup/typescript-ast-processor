import { FunctionCallNodeTester } from '../function'
// import { INodeTester } from '../base';
// import { IndentifierNodeTester } from '../identifier';

export function createDecoratorTester(
  node: any,
  options: any = {},
): DecoratorNodeTester {
  return new DecoratorNodeTester(node, options)
}

export class DecoratorNodeTester extends FunctionCallNodeTester {
  targetNode: any
  constructor(node: any, options: any) {
    super(node, options)
    this.init(node)
  }

  /**
   * Initialize
   * @param node
   */
  init(node: any) {
    super.init(node)
    this.targetNode = this.options.targetNode
    this.setTester({
      name: 'identifier',
    })
  }

  /**
   * Retrieve registered properties node tester
   */
  get idNodeTester(): any {
    return this.getTester({
      name: 'identifier',
    })
  }

  /**
   * Get name of target node (ie the node decorated)
   */
  get targetId() {
    return this.idNodeTester.nameOf(this.targetNode)
  }

  get type() {
    return 'unknown'
  }

  get target() {
    return {
      id: this.targetId,
      type: this.type,
    }
  }

  info(): any {
    return {
      ...super.info(),
      decorator: true,
      target: this.target,
    }
  }
}
