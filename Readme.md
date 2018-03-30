# TypeScript AST Processor

This library is designed as a foundation for writing tools that work with the TypeScript AST. It aims to provide a higher level API, helpers etc. so you avoid the "pain" of working with the AST directly in most cases.

To traverse the TypeScript AST:

- visit nodes of interest
- query nodes and collect node data
- aggregate collected data via collectors
- perform instrumentations based on collected data
- perform any side effects such as code replacements or calling micro services etc.

## Disclaimer

Still a WIP. Mostly "dream code" for now.

Please help contribute to make it happen, see [Contributing](CONTRIBUTING.md)

## Resources

- [TypeScript: Using-the-Compiler-API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [TypeScript: Using-the-Language-Service-API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Language-Service-API)

See [Resources](docs/resources.md) for more

## Design

The design uses the following main concepts:

- [Loader](#Loader)
- [SrcFile](#SrcFile)
- [Processor](#Processor)
- [Visitor](#Visitor)
- [Collector](#Collector)
- [Instrumentor](#Instrumentor)

PS: Would love this lib to integrate better with [ts-simple-ast](https://github.com/dsherret/ts-simple-ast) and work seamlessly with `Project` and `Program` concepts as well.

### Loader

A `Loader` instance can be used to load a source file.

```js
import { createLoader } from 'typescript-ast-traverseræ
const compilerOpts = {
  // ...
}
const languageVersion = ts.ScriptTarget.ES2017
const loader = createLoader({
  compiler: compilerOpts,
  languageVersion
})
```

### SrcFile

A `SrcFile` represents a loaded typescript source file, including:

- filename
- compiler options
- source text
- ...

```js
// load a source file
loader.loadSourceFile(fileName)
```

After loading a source file, you will need to process it using a `Processor`

### Processor

A `SrcFile` instance can be processed, using a `Processor` instance.
The `processor` initiates traversal of the TypeScript AST.

First you must register visitors and collectors to visit AST nodes and collect the information you are intrested in. To do this, build a map as follows:

```js
const fileName = 'my/srcfile.ts'
const processorMap = {
  functionHello: {
    visitor: (...) => {},
    collector: (...) => {},
  },
  classGreeter: {
    visitor: (...) => {},
    collector: (...) => {},
  }
}
```

For details on `visitor` and `collector` functions, see the [Visitor](#Visitor) and [Collector](#Collector) sections.

Register the `processorMap` on the `processor` via `registerMap`

```js
const { processor } = loader
processor.registerMap(processorMap)
```

Now when you process the loaded AST, the visitors will be visited and data collected as defind by your processor map.

```js
// run registered visitors on AST
loader.loadSourceFile(fileName).process()
const { collector, instrumentor } = processor
collector.collectData()
instrumentor.instrument()
```

### AST Node Traverser

The default AST traverser is `ASTNodeTraverser` which contains generic functionality to traverse down the TypeScript AST.

```js
class ASTNodeTraverser extends Loggable {
  // register a map of visitor functions
  registerVisitors(registry: any) {
    // ...
  }

  // register single visitor function by name
  registerVisitor(name: string, visitor: Function) {
  }

  /**
   * Visit an AST node by passing it to each of the registered visitors
   * @param node
   */
  visit(nextNode?: ts.Node) {
    const node = nextNode || this.startNode
    if (!this.shouldVisitNode(node)) {
      this.skipped(node)
      return
    }
    this.willVisit(node)
    this.visitorIterator(this._createVisitorCaller(node))
    this.wasVisited(node)
    this.traverseChildNodes(node)
  }

  /**
   * Traverse child nodes
   * @param node
   */
  traverseChildNodes(node: ts.Node) {
    if (!this.shouldTraverseChildNodes(node)) return
    node.forEachChild((child: ts.Node) => this.visit(child))
  }
}
```

#### Visitor factories

It can be difficult and messy to build your own visitor functions using the TypeScript AST API directly. This is where *Visitor factories* come in.

The factories make it much easier to build complex visitors.

```js
const { factory } = processor.visitor

const visitorList = [
  // will generate a named function called FunctionDeclaration
  // with visitation logic to only allow nodes pass who are named 'hello'
  // (ie. any FunctionDeclaration that has an Identifier child node with name: 'hello')
  factory.function({name: 'hello'}),

  // more factories... much more complex visitation guard logic is easy to build as well using test object (see below)
  factory.class({
    query: {
      name: 'PoliteGreeter'
      extends: 'Greeter',
    }}),
  factory.class({
    query: {
      name: /Greeter$/
      abstract: true
    }}),
  // ...
]

// In essence:
// [{
//   functionHello: factoryBuiltVisitorFunction,
//   classPoliteGreeter: factoryBuiltVisitorFunction,
//   classGreeter: factoryBuiltVisitorFunction
// }]

const visitors = Object.assign(visitors, {
  ...visitorList // well you get the idea
})
```

#### Querying for node details

When figuring out what to query for or what data to collect, use [AST explorer](https://astexplorer.net/) or [ts-ast-viewer](http://ts-ast-viewer.com/)

For details on how to *efficiently* query nodes and collect data (information) see [AST Query engine](docs/query/engine.md)

The query engine can:

- query nodes matching complex nested conditions
- collect nested node data in an easy to work with structure

#### Visitor flow

Each visitor function is called with `(node, state, options)`

The core visitor (traverser) logic:

- iterate through all registered visitors and call each one
- each visitor will have one or more type checks as guards f.ex `ts.isFunctionDeclaration(node)` and possibly more guards such as name check and more detailed inspection guards (checking for modifiers, flags etc)
- when done iterating, proceed to traverse each child node

You can see this logic playing out in the `ASTNodeTraverser` class show above, mainly using the `visit` and `traverseChildNodes` methods.

#### Data collection

The visitor factory is passed a `collector` registry, with all the registered data collectors. A visitor created via a factory will try to call a matching collector (ie. matching label), mainly with the node matched by the visitor and any state collected or maintained by the visitor itself.

```js
const matchingCollector = collector[label]
matchingCollector && matchingCollector(node, state, options)
```

### Collector

As nodes are visited, the `visitor` functions activated can have access to callbacks that call a collector function with the visited node for data to be collected.

The collectors should have access to a shared object, like a datastore in a typical frontend app. You could use any of the same patterns (`redux` or anything similar comes to mind...).

Collectors should be registered with same names as visitors, so that data flows from visitor -> collector -> instrumentor.

You can have multiple collectors collect data into a data aggregator. For complex cases, this can be setup to aggregate in multiple levels.

```js
function functionHello(node, state = {}) {
  this.data = {
    hello: {
      name: node.name.getText()
    }
  }
}

// ... define other collector functions
```

Register collector functions with the main collector (ie. data aggregator) of the processor
on registration. Each collector function will become the collector function of a `DataCollector` instance, so that `this.data` will reference the `data` of
the `collector` instance.

```js
processor.collector.register({
  functionHello
  classPoliteGreeter
  classGreeter
})
```

Notice how the `collector` names match the `visitor` labels registered. We recommend starting by defining/creating and registering the data collectors and then create matching visitors as needed.

You can also register the pair directly on the `Processor` instance using:

```js
processor.register('functionHello', {
  visitor: visitors.functionHello,
  collector: collectors.functionHello,
})
```

You can register a set of pairings (a `processorMap`) via the `registerMap` method:

```js
const processorMap = {
  functionHello: {
    visitor: (...) => {},
    collector: (...) => {},
  },
  classGreeter: {
    visitor: (...) => {},
    collector: (...) => {},
  }
}
processor.registerMap(processorMap)
```

When this is all configurred and working, you can move on to instrumentation!

### Instrumentor

When the visitation of the AST is complete and all data has been collected, the collected state should be sent to an `Instrumentor` instance to instrument changes or actions to be taken in response. This could be acting on the code or AST directly or even calling micro services to offload the responsibility!

Currently we have included a little "wizardry" from `TypeWiz`.

The instrumentor should only instrument using a single (root) data aggregator or single data source.

The main instrumentor is initialized with reference to the main data collector in `Processor`.

#### Replacer

A `Replacer` (as in `TypeWiz`) can be used to replace code in a source file directly in response to the instrumentation.

In the near future we will include support for direct AST modification, using the typescript AST instrumentation/mutation API "under the hood".

## Tool integration

We will try to make it easy to integrate other tools, so that this design is intent bases without making assumptions about underlying use or implementation.

For more see [Tool integration](docs/tool-integration.md)

### Customization

We highly advice using the [tsutils](https://github.com/ajafff/tsutils) API to make it easier to gather information and work with the underlying typescript AST.

## ESLint traverser

We intend to extend [astravel](https://github.com/kristianmandrup/astravel) to have a similar API and design if this turns out to be as awesome as we think it could be...

## Author

Kristian Mandrup

## License

MIT
