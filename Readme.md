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

## More TS utils

- [tsutils](https://github.com/ajafff/tsutils)
- [ts-simple-ast](https://github.com/dsherret/ts-simple-ast) easy AST refactoring and parsing
- [node-typescript-parser](https://buehler.github.io/node-typescript-parser/) and [repo](https://github.com/buehler/node-typescript-parser) - generate human understandable AST
- [ts-emitter](https://github.com/KnisterPeter/ts-emitter) emit AST back to source code
- [typescript-ESTree](https://github.com/RReverser/typescript-estree) convert TypeScript AST to ESTree compatible AST

### TS Lint

- [tslint-consistent-codestyle](https://github.com/ajafff/tslint-consistent-codestyle)

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

A `SrcFile` represents a loaded typescript src file, including filename, compiler options used, source text etc.

```js
// configure loader

// load a source file
loader.loadSourceFile(fileName)

// run visitors on AST of loaded src file
loader.parse()
```

### Parser

A `SrcFile` instance can be parsed, using a parser. This initiates traversal of the TypeScript AST.

```js
const fileName = 'my/srcfile.ts'
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
const { parser } = loader
parser.registerMap(nestedMap)

// run registered visitors on AST
loader.loadSourceFile(fileName).parse()
const { collector, instrumentor } = parser
collector.collectData()
instrumentor.instrument()
```

### Visitor

The main Visitor is `NodeVisitor` which contains the generic functionality to traverse down the TypeScript AST.

You need to pass an array of the types of nodes you will want your visitor to visit.

The node types can be assembled from the categorized types found in `src/ts/visitor/node/types`:

```js
import * as types from 'typescript-ast-traverser/dist/src/ts/visitor/node/types'

const {
  categories as cat
} = types

// can be used for debugging which node type checkers are available in different categories
console.log(JSON.stringify(categories.declarations))

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
  }

  visit(node: any) {
    // add logging to get an output of all the isXYZ tests that the node passes
    this.log(this.whatIs(node))
    // you can also be more specific, by passing a category key as 2nd argument
    this.log(this.whatIs(node, 'categories.declaration'))
    super.visit(node)
  }
}


function createVisitor(options: any) {
  const visitor = new MyVisitor({
    visitors // to register all visitors
  })
  // you can use the typer to list categories of type checkers available in typescript
  const typeMap = visitor.typer.outputTypeCheckers(
    'declaration',
    'statement.conditional'
  ).join('\n')
  console.log({
    typeMap
  })
  return visitor
}

createTSAstTraverser({
  nodeTypes: {
    used
  },
  createVisitor // use custom visitor factory in main traverser factory
})
```

### Visitor factories

It can be rather complex to build your own visitor functions... this is where Visitor factories come in. The factories should make it much easier to build complex visitors!

```js
const { factory } = parser.visitor

const visitorList = [
  // will generate a named function called FunctionDeclaration
  // with visitation logic to only allow nodes pass who are named 'hello'
  // (ie. any FunctionDeclaration that has an Identifier child node with name: 'hello')
  factory.function({name: 'hello'}),

  // more factories... much more complex visitation guard logic is easy to build as well using test object (see below)
  factory.class({name: 'PoliteGreeter', test: {
    extends: 'Greeter',
  }}),
  factory.class({name: /Greeter$/, test: {
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

When figuring out what to test for or what data to collect, use [AST explorer](https://astexplorer.net/) or [ts-ast-viewer](http://ts-ast-viewer.com/)

For more details, see testers in `node/tester/details`

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

A convenient shorthand now available, is to register both with the same label, directly on the `Parser` instance:

```js
parser.register('functionHello', {
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
parser.registerMap(nestedMap)
```

When this is all configurred and working, you can move on to instrumentation!

### Instrumentor

When the visitation of the AST is complete and all data has been collected, the collected state should be sent to an Instrumentor instance to instrument changes or actions to be taken in response. This could be acting on the code or AST directly or even calling micro services to offload the responsibility!

Currently we have included a little "wizardry" from `TypeWiz`.

The instrumentor should only instrument using a single (root) data aggregator or single data source.

The main instrumentor is initialized with reference to the main data collector in `Parser`.

### Replacer

A `Replacer` (as in `TypeWiz`) can be used to replace code in a source file directly in response to the instrumentation.

## Tool integration

We will try to make it easy to integrate other tools, so that this design is intent bases without making assumptions about underlying use or implementation.

A very promising lib is [ts-simple-ast](https://github.com/dsherret/ts-simple-ast) providing easy AST parsing, refactoring and working with source files.

Detailed docs can be found [here](https://dsherret.github.io/ts-simple-ast/)

*ts-simple-ast* looks like a much more convenient way to interact with the TypeScript AST API than using it directly.

```js
import Project from "ts-simple-ast";

// initialize
const project = new Project();

// add source files
project.addExistingSourceFiles("src/**/*.ts");
const myClassFile = project.createSourceFile("src/MyClass.ts", "export class MyClass {}");
const myEnumFile = project.createSourceFile("src/MyEnum.ts", {
    enums: [{
        name: "MyEnum",
        isExported: true,
        members: [{ name: "member" }]
    }]
});

// get information from ast
const myClass = myClassFile.getClassOrThrow("MyClass");
myClass.getName();          // returns: "MyClass"
myClass.hasExportKeyword(); // returns: false
myClass.isDefaultExport();  // returns: true

// manipulate ast
const myInterface = myClassFile.addInterface({
    name: "IMyInterface",
    isExported: true,
    properties: [{
        name: "myProp",
        type: "number"
    }]
});

myClass.rename("NewName");
myClass.addImplements(myInterface.getName());
myClass.addProperty({
    name: "myProp",
    initializer: "5"
});

project.getSourceFileOrThrow("src/ExistingFile.ts").delete();

// asynchronously save all the changes above
project.save();
```

### Customization

We highly advice using the [tsutils](https://github.com/ajafff/tsutils) API to make it easier to gather information and work with the underlying typescript AST.

## ESLint traverser

We intend to extend [astravel](https://github.com/kristianmandrup/astravel) to have a similar API and design if this turns out to be as awesome as we think it could be...

## Author

Kristian Mandrup

## License

MIT
