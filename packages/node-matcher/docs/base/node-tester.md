# Node Tester

`NodeTester` is the lowest base class of node testers. It contains the main information containers, including delegate class pointers and basic `init` logic (strategy pattern).

`BaseNodeTester` extends `NodeTester` and adds extra functionality such as generic:

* `info()` method using `infoProps` if available
* `query(query)` method, using test methods available
* `test(query)` method, using `query`

Currently, test methods are created or assumed to be available directly on the tester itself. We should instead have them created in a separate container `testMethods` when using `testMethodMap` in `initPropTesters` of the query engine.

```js
export abstract class NodeTester extends Loggable implements INodeTester {
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
    super(options)
    this.init(node)
  }

  /**
   * caption used for error logging, debugging and testing
   */
  get caption() {
    return this.constructor.name
  }

  /**
   * The basic tester category
   */
  get category() {
    return 'NodeTester'
  }


   /**
   * Initialize
   * @param node
   */
  init(node?: any) {
    this.configure()
    this.validateInit(node)

    this.node = node

    this.initProps()
    this.testerRegistry.init()
    this.queryEngine.init()
    this.initInfoProps()
  }
 // ..
}
```
