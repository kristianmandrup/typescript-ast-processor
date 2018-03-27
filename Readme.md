# TypeScript AST Traverse

Trying to make it much easier to design tools that work with the TypeScript AST by providing a higher level API, helpers etc.

Traverse the TypeScript AST:

- visit nodes of interest
- collect data via collectors
- perform instrumentation based on collected data
- side effects such as code replacements or calling micro services etc.

## Disclaimer

Still a WIP. Tests not written yet, so purely "dream code" for now.
Please help contribute to make it happen!!!

## Resources

- [TypeScript: Using-the-Compiler-API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Compiler-API)
- [TypeScript: Using-the-Language-Service-API](https://github.com/Microsoft/TypeScript/wiki/Using-the-Language-Service-API)

See [Resources](docs/resources.md) for more

## Design

### Loader

A `Loader` instance can be used to load a source file.

```js
import { createLoader } from 'typescript-ast-traverser`
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

### Visitor

The main Visitor is `NodeVisitor` which contains the generic functionality to traverse down the TypeScript AST.

```js
class NodeVisitor extends Loggable {
  // register a map of visitor functions
  registerVisitors(registry: any) {
    // ...
  }

  // register single visitor function by name
  registerVisitor(name: string, visitor: Function) {
  }

  visit(node: ts.Node) {
    this.visitorIterator(this.createVisitorCaller(node))
    this.recurseChildNodes(node)
  }

  recurseChildNodes(node: ts.Node) {
    node.forEachChild((child: ts.Node) => this.visit(child))
  }
}
```

#### Visitor factories

It can be difficult and messy to build your own visitor functions using the TypeScript AST API directly. This is where *Visitor factories* come in.

The factories make it much easier to build complex visitors.

```js
const { factory } = parser.visitor

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

## Testing node details

When figuring out what to query for or what data to collect, use [AST explorer](https://astexplorer.net/) or [ts-ast-viewer](http://ts-ast-viewer.com/)

For details on how to query nodes and collect data (information) see [AST Query engine](docs/AST-query-engine.md)

## Visitor flow

Each visitor function is called with `(node, state, options)`

The core visitor logic:

- iterate through all registered visitors and call each one
- each visitor will have one or more type checks as guards f.ex `ts.isFunctionDeclaration(node)` and possibly more guards such as name check and more detailed inspection guards (checking for modifiers, flags etc)
- when done iterating, proceed to recurse each child node

```js
class NodeVisitor {
  // ...

  visit(node: ts.Node) {
    this.log('visit', this.nodeDisplayInfo(node))
    // allow creation of custom iterator
    this.visitorIterator(this.createVisitorCaller(node))
    this.recurseChildNodes(node)
  }

  recurseChildNodes(node: ts.Node) {
    node.forEachChild((child: ts.Node) => this.visit(child))
  }
}
```

### Data collection

The visitor factory is passed a collector, with all the registered data collectors.
A visitor created via a factory will try to call a matching collector (ie. matching label) with the node matched by the visitor.

### Collector

As nodes are visited, the visitor functions activated can have access to callbacks that call a collector function with the visited node for data to be collected.

The collectors should have access to a shared object, like a datastore in a typical frontend app. You could use any of the same patterns (`redux` or anything similar comes to mind...).

They should (possibly?) be registered with same names as visitors, so that data flows from visitor -> collector -> instrumentor.

We can have multiple collectors collect data into a data aggregator. For complex cases, this can be setup to aggregate in multiple levels.

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

Now register collector functions with main collector (ie. data aggregator) of parser
on registration, each collector function will become the collect function of a `DataCollector` instance, so that `this.data` will reference the `data` of
the collector instance.

```js
parser.collector.register({
  functionHello
  classPoliteGreeter
  classGreeter
})
```

Notice how the collector names match the visitor labels registered. We recommend starting by defining/creating and registering the data collectors and then create matching visitors as needed.

A convenient shorthand now available, is to register both with the same label, directly on the `Processor` instance:

```js
processor.register('functionHello', {
  visitor: visitors.functionHello,
  collector: collectors.functionHello,
})
```

You could easily generalize this even further to make it more efficient to configure.
This is now possible via `registerMap`:

```js
const nestedMap = {
  functionHello: {
    visitor: (...) => {},
    collector: (...) => {},
  },
  classGreeter: {
    visitor: (...) => {},
    collector: (...) => {},
  }
}
processor.registerMap(nestedMap)
```

When this is all configurred and working, you can move on to instrumentation!

### Instrumentor

When the visitation of the AST is complete and all data has been collected, the collected state should be sent to an Instrumentor instance to instrument changes or actions to be taken in response. This could be acting on the code or AST directly or even calling micro services to offload the responsibility!

Currently we have included a little "wizardry" from `TypeWiz`.

The instrumentor should only instrument using a single (root) data aggregator or single data source.

The main instrumentor is initialized with reference to the main data collector in `Processor`.

### Replacer

A `Replacer` (as in `TypeWiz`) can be used to replace code in a source file directly in response to the instrumentation.

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
