import { isDefined } from '../../../util'
import { NodeTester, INodeTester } from './node-tester'

export interface IBaseNodeTester extends INodeTester {
  parentBlocks?: any[]
  isNested?: boolean
  nestedLevels?: number

  test(query: any): boolean
  query(query: any): any
  info(): any
}

export class BaseNodeTester extends NodeTester {
  /**
   * Create Base Node Tester
   * @constructor
   * @param node
   * @param options
   */
  constructor(public node: any, options: any) {
    super(node, options)
  }

  /**
   * Count occurrences of specific types of nodes
   * @param opts
   */
  countOccurrence(opts: any = {}) {
    return this.nodeCounter.countOccurrence(opts)
  }

  /**
   * Test if valid query
   * @param query
   */
  isQuery(query: any) {
    return isDefined(query)
  }

  /**
   * Init info props
   */
  initInfoProps() {
    this.infoProps = {
      ...super.infoPropsMap,
      ...this.infoPropsMap,
    }
  }

  /**
   * Get map of properties to use for node info
   */
  get infoPropsMap() {
    return {}
  }

  /**
   * Return object with node information
   * Subclass should always override or extend
   * @returns { Object } node information
   */
  info(): any {
    const infoProps = this.infoProps
    return this.propKeys.reduce((acc: any, propName: string) => {
      acc[propName] = infoProps[propName] || this[propName]
      return acc
    }, {})
  }

  /**
   * Test node based on query
   * @param query
   * @returns { boolean} result of query (if node matches query)
   */
  test(query: any): boolean {
    return this.queryEngine.test(query)
  }

  /**
   * Query node and return full query result
   * @param query
   */
  query(query: any): boolean {
    return this.queryEngine.query(query)
  }
}
