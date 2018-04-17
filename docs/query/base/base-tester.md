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
    this.setTesters()
    this.initQueries()
    this.initInfoProps()
    this.initPropTesters()
  }

  /**
   * Override in subclass to initialize props!
   */
  initProps() {
    super.initProps()
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

* add a `testerMap` getter that returns map of tester definitions
* add a `testMethodMap` getter that returns map of test method definitions
* add an `initProps()` method to your node tester
* add a getter (info) method for each property such as `get name()`
* add property query methods for each property, such as:
  * `queryName(query)` or `testName(query)`

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

  /**
   * Get details node tester to test for id
   */
  get idTester() {
    this.getTester({ name: 'identifier', type: 'details' })
  }

  /**
   * Get name of node via node id details tester
   */
  get name() {
    return this.idTester.name
  }

  /**
   * Use utility method to query on name of node
   */
  queryName(query: any) {
    return queryName(this.name, query)
  }
}
```

## Example: Class Node Tester

`ClassNodeTester` is a good example leveraging `BaseNodeTester`

```js
export class ClassNodeTester extends DeclarationNodeTester {
  /**
   * Create class tester
   * @param node
   * @param options
   */
  constructor(node: any, options: any = {}) {
    super(node, options)
    this.init(node)
  }

  /**
   * Query/info properties
   */
  get qprops() {
    return ['name', 'exported', 'abstract', 'implements', 'extends', 'members']
  }

  /**
   * whether class is abstract
   */
  get isAbstract() {
    return this.getProp({
      name: 'details:class',
      is: 'abstract',
    })
  }

  get heritageTester() {
    return this.getTester('heritage')
  }

  /**
   * Heritage of the class
   */
  get heritage() {
    return this.getProp('heritage') // by default will call .info
  }

  /**
   * Testers map
   */
  get testerMap() {
    return {
      heritage: 'heritage',
      members: 'members',
      class: 'details:class',
    }
  }

  /**
   * test map used to create test/query methods
   */
  get testMethodMap() {
    return {
      members: {
        // Query all class members
        name: 'members',
        test: 'testMembers',
      },
      accessors: {
        // query accessors (getters/setters)
        name: 'members',
        test: 'testAccessors',
      },
      implements: {
        // Query what interfaces class implements
        qprop: 'implements',
        name: 'heritage',
      },
      extends: {
        qprop: 'extends',
        name: 'heritage',
      },
      // test if abstract matches query true|false
      // see testAbstract
      abstract: {
        bool: 'isAbstract',
      },
    }
  }
}
```

### Class Heritage example

```js
export class ClassHeritageTester extends BaseNodeTester {
  extendNames: string[]
  implementNames: string[]
  implements: any
  heritage: any[]

  constructor(node: any, options: any) {
    super(node, options)
  }

  /**
   * Init info props
   */
  initInfoProps() {
    this.infoProps = this.infoPropsMap
  }

  /**
   * Properties used to fill info object (see info() method)
   */
  get infoPropsMap() {
    return {
      implementNames: this.resolveImplementNames(),
      implements: this.resolveImplements()
      extendNames: this.resolveExtendNames()
      heritage: this.heritageClauses
    }
  }
  // ...
}
```
