# Base node tester

It is essential you understand the `BaseNodeTester` and use it to great effect.

Note: This is still open to further improvement! The `BaseNodeTester` is currently way too big and needs to be refactored, perhaps using delegate (helper) classes.

```js
export abstract class BaseNodeTester extends Loggable implements INodeTester {
  // properties to test, query and gather info for
  props: any = {}
  queryResult: any // TODO: cache result for query

  // maps of testers used by tester
  testers: any = {
    node: {},
    details: {},
  }

  /**
   * Initialize
   * @param node
   */
  init(node?: any) {
    this.validateInit(node)
    this.node = node
    this.initProps()
  }

  /**
   * Override in subclass to initialize props!
   */
  initProps() {
    this.props = {}
  }


  /**
   * Get property keys
   */
  get propKeys() {
    return Object.keys(this.props)
  }

  /**
   * Return object with node information
   * Subclass should always override or extend
   * @returns { Object } node information
   */
  public info(): any {
    return this.propKeys.reduce((acc: any, propName: string) => {
      acc[propName] = this[propName]
      return acc
    }, {})
  }

  /**
   * Perform query on node and return true if full query (ie. all sub-queries pass) or false otherwise
   * Subclass should always override or extend
   * @param query
   */
  public test(query: any): any {
    const queryResult = this.doQuery(query)
    return Object.keys(queryResult).every((key: string) =>
      Boolean(queryResult[key]),
    )
  }

  /**
   * Perform query, returning reduce name/value result with each sub-query result
   * Subclass should always override or extend
   * @returns { Object } node information
   */
  public query(query: any): any {
    return this.doQuery(query)
  }

  protected resolvePropTester(prop: string) {
    const testFnName = `test${camelize(prop)}`
    const queryFnName = `query${camelize(prop)}`
    return this[testFnName] || this[queryFnName]
  }

  public doQuery(query: any) {
    return this.props.reduce((acc: any, prop: string) => {
      const tester = this.resolvePropTester(prop)
      if (!tester) return acc
      acc[prop] = tester(query)
      return acc
    }, {})
  }
```

You should add an `initProps()` method to your node tester, called by `init()`

* add an getter (info) method for each property such as `get name()`
* add property query methods for each property, such as:
  * `queryName(query)`

It could look something like the following:

```js
import { queryName } from '../../utils'

export class MyNodeTester extends BaseNodeTester {
  // ...
  initProps() {
    this.props = {
      name: this.name,
    }
  }

  get idTester() {
    this.getTester({ name: 'identifier', type: 'details' })
  }

  get name() {
    return this.idTester.name
  }

  queryName(query: any) {
    return queryName(this.name, query)
  }
}
```
