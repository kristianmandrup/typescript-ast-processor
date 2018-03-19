import {
  parse,
  config
} from './_imports'

describe('ESLint parser', () => {
  describe('parse', () => {
    it('parses AST', () => {
      const code: any = {
        const: {},
        method: {
          static: {}
        }
      }

      // Exported arrow function
      // {
      //   "type": "ExportNamedDeclaration",
      //   "declaration": {
      //     "type": "VariableDeclaration",
      // "declarations": [
      //   {
      //     "type": "VariableDeclarator",
      // "id": {
      //   "type": "Identifier",
      // "name": "a"
      // "init": {
      //   "type": "ArrowFunctionExpression",
      //   "generator": false,
      // "params": [
      // "async": false,
      // "kind": "const"

      code.arrowFun = `export const a = (c: string) => {}`

      const parsed = parse(code.arrowFun, config)
      console.log(parsed.json)
      expect(parsed.raw).toBeDefined()
    })
  })
})
