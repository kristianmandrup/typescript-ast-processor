import { BaseNodeTester } from '../../base'
import { isArgument } from './argument'

/**
 * Test if every node in the collection is a parameter node
 * @param nodes nodes to test
 * @param options extra options such as error handler
 */
export function isArguments(nodes: any[], options: any = {}) {
  const { error } = options
  if (!nodes.every(isArgument)) {
    error &&
      error('All nodes must be parameters', {
        nodes,
      })
  }
  return true
}

export function createArgumentNodesTester(
  node: any,
  options: any = {},
): ArgumentNodesTester | undefined {
  if (!isArguments(node, options)) {
    console.error('Not an arguments node', {
      node,
    })
    return
  }
  return new ArgumentNodesTester(node, options)
}

export class ArgumentNodesTester extends BaseNodeTester {
  // argument: ArgumentTester
  nodes: any[]
  items: any[]

  constructor(nodes: any, options: any) {
    super(nodes, options)
  }

  init(nodes: any) {
    super.init(nodes)
    this.nodes = nodes
  }

  /**
   * Set info of all arguments in items
   */
  initProps() {
    this.items = this.arguments.map((argumentNode) =>
      this.createArgumentTester(argumentNode).info(),
    )
  }

  /**
   * Get number of items (ie. arguments)
   */
  get itemCount() {
    return this.items.length
  }

  /**
   * Get arguments info
   */
  info() {
    return {
      items: this.items,
      count: this.items.length,
    }
  }

  /**
   * Convenient alias
   */
  get arguments() {
    return this.nodes
  }

  /**
   * Create argument node tester
   * @param argumentNode
   */
  createArgumentTester(argumentNode: any): any {
    return this.createNodeTester(
      'function.argument',
      argumentNode,
      this.options,
    )
  }
}
