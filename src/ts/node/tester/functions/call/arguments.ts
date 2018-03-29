import { BaseNodeTester } from '../../base'
import {
  isArgument,
  createArgumentTester
} from './argument';

/**
 * Test if every node in the collection is a parameter node
 * @param nodes nodes to test
 * @param options extra options such as error handler
 */
export function isArguments(nodes: any[], options: any = {}) {
  const {
    error
  } = options
  if (!nodes.every(isArgument)) {
    error && error('All nodes must be parameters', {
      nodes
    })
  }
}

export function createArgumentsTester(node: any, options: any = {}): ArgumentsTester | undefined {
  if (!isArguments(node, options)) return
  return new ArgumentsTester(node, options)
}

export class ArgumentsTester extends BaseNodeTester {
  // argument: ArgumentTester
  nodes: any[]

  constructor(nodes: any, options: any) {
    super(nodes, options)
    this.nodes = nodes
  }

  /**
   * Convenient alias
   */
  get arguments() {
    return this.nodes
  }

  createArgumentTester(argumentNode: any) {
    return createArgumentTester(argumentNode, this.options)
  }

  info() {
    return this.arguments.map(argumentNode => this.createArgumentTester(argumentNode).info())
  }
}
