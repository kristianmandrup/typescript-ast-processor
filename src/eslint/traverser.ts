// use https://www.npmjs.com/package/eslint-traverser
// import * as traverse from 'eslint-traverser'
// https://www.npmjs.com/package/json-query
import * as jsonQuery from 'json-query'
// https://www.npmjs.com/package/json-operator

// See TSLint: https://github.com/palantir/tslint and https://palantir.github.io/tslint/usage/library/
// And https://github.com/vvakame/typescript-formatter

// https://www.npmjs.com/package/estraverse-fb
// https://www.npmjs.com/package/ast-traverse
// https://www.npmjs.com/package/esprima-walk


// See: https://github.com/davidbonnet/astravel/blob/master/examples/localVariables.js

export class Traverser {
  graph = {}

  constructor() {
  }

  // traverse(code: string) {
  //   traverse(code)
  //     .get('CallExpression', (node: any, context: any) => {
  //       console.log(node.callee.name) // logs `f`
  //       sourceCode = context.getSourceCode()
  //       //...
  //     })
  // }
}
