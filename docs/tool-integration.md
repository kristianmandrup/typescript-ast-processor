# Tool integration

We will try to make it easy to integrate other tools, so that this design is intent bases without making assumptions about underlying use or implementation.

A very promising lib is [ts-simple-ast](https://github.com/dsherret/ts-simple-ast) providing easy AST parsing, refactoring and working with source files.

Detailed docs can be found [here](https://dsherret.github.io/ts-simple-ast/)

*ts-simple-ast* looks like a much more convenient way to interact with the TypeScript AST API than using it directly.

```js
import Project from 'ts-simple-ast';

// initialize
const project = new Project();

// add source files
project.addExistingSourceFiles('src/**/*.ts');
const myClassFile = project.createSourceFile('src/MyClass.ts', 'export class MyClass {}');
const myEnumFile = project.createSourceFile('src/MyEnum.ts', {
    enums: [{
        name: 'MyEnum',
        isExported: true,
        members: [{ name: 'member' }]
    }]
});

// get information from ast
const myClass = myClassFile.getClassOrThrow('MyClass');
myClass.getName();          // returns: 'MyClass'
myClass.hasExportKeyword(); // returns: false
myClass.isDefaultExport();  // returns: true

// manipulate ast
const myInterface = myClassFile.addInterface({
    name: 'IMyInterface',
    isExported: true,
    properties: [{
        name: 'myProp',
        type: 'number'
    }]
});

myClass.rename('NewName');
myClass.addImplements(myInterface.getName());
myClass.addProperty({
    name: 'myProp',
    initializer: '5'
});

project.getSourceFileOrThrow('src/ExistingFile.ts').delete();

// asynchronously save all the changes above
project.save();
```
