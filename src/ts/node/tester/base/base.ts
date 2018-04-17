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
  // properties to test, query and gather info for
  infoProps: any
  _props: string[] = []
  qprops: string[] = []
  queries: any
  queryResult: any
  factory: any
  testerRegistry: any
  queryEngine: any
  nodeCounter: any

  /**
   * Create BaseTester
   * @param node
   * @param options
   */
  constructor(public node: any, options: any) {
    super(node, options)
  }

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

  get testerMap() {
    return {}
  }

  /**
   * Get property keys
   */
  get propKeys() {
    return this.props
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

  test(query: any): boolean {
    return this.queryEngine.test(query)
  }

  query(query: any): boolean {
    return this.queryEngine.query(query)
  }
}
