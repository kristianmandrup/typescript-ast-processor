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

## TypeWiz

- [TypeWiz internals blog post](https://medium.com/@urish/diving-into-the-internals-of-typescript-how-i-built-typewiz-d273bbef3565)

## ASTravel

- [astravel](https://github.com/kristianmandrup/astravel) ESTree compatible AST traveser using a visitor pattern

## Design

## Loader

A `Loader` instance can be used to load a source file.

## SrcFile

A `SrcFile` represents a loaded typescript src file, including filename, compiler options used, source text etc.

## Parser

A `SrcFile` instance can be parsed, using a parser. This initiates traversal of the TypeScript AST.

### Visitor

The main Visitor is `NodeVisitor` which contains the generic functionality to traverse down the TypeScript AST.

You need to pass an array of the types of nodes you will want your visitor to visit.

The node types can be assembled from the categorized types found in `src/ts/visitor/node/types`:

```js
import * as types from 'typescript-ast-traverser/dist/src/ts/visitor/node/types'

const {
  categories as cat
} = types

// everything relating to class and function declarations
const used = [].concat(cat.declaration.function).concat(cat.declaration.class)

const visitors = {
  // each function named same as a used type
  FunctionDeclaration(node, state, opts = {}) {
    // do visit stuff!
  },
  // more visitors
}


class MyVisitor extends NodeVisitor {
  // add functions to handle each of the relevant declarations from used list
  constructor(options: any) {
    super(options)

    // bind all functions in visitors object to class instance
    rebind(visitors, this)
  }
}


function createVisitor(options: any) {
  return new MyVisitor(options)
}

createTSAstTraverser({
  nodeTypes: {
    used
  },
  createVisitor
})
```

## Visitor factories

It can be rather complex to build your own visitor functions... this is where Visitor factories come in. The factories should make it much easier to build complex visitors!

```js
const visitorList = [
  // will generate a named function called FunctionDeclaration
  // with visitation logic to only allow nodes pass who are named 'hello'
  // (ie. any FunctionDeclaration that has an Identifier child node with name: 'hello')
  visitorFactories.aFunction({name: 'hello'}),

  // more factories... much more complex visitation guard logic is easy to build as well
]

// In essence:
// [{
//   FunctionDeclaration: factoryBuiltVisitorFunction
// }]

const visitors = Object.assign(visitors, {
  ...visitorList // well you get the idea
})
```

Each visitor function is called with `(node, state, options)`

The core visitor logic:

```js
  visit(node: ts.Node) {
    this.log('visit', { kind: String(node.kind) })
    this.nodeTypes.used.find((type: string) => {
      const testFunName = `is${type}`
      const testFun = this[testFunName]
      if (testFun(node)) {
        const handlerFun = this[type]
        return handlerFun(node, this.state, this.options)
      }
    })
    this.recurseChildNodes(node)
  }

  recurseChildNodes(node: ts.Node) {
    node.forEachChild((child: ts.Node) => this.visit(child))
  }
```

## Collector

As nodes are visited, the visitor functions activated can have access to callbacks that call a collector function with the visited node for data to be collected.

The collectors should have access to a shared object, like a datastore in a typical frontend app. You could use any of the same patterns.

## Instrumentor

When the visitation of the AST is complete and all data has been collected, the collected state should be sent to an Instrumentor instance to instrument changes or actions to be taken in response. This could be acting on the code or AST directly or even calling micro services to offload the responsibility!

### Replacer

A `Replacer` (like in `TypeWiz`) can be used to replace code in a source file directly in response to the instrumentation.

## ESLint traverser

We intend to extend [astravel](https://github.com/kristianmandrup/astravel) to have a similar API and design if this turns out to be as awesome as we think it could be...

## Author

Kristian Mandrup

## License

MIT
