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

      // Exported function declaration
      // {
      //   "type": "ExportNamedDeclaration",
      //   "declaration": {
      //     "type": "FunctionDeclaration",

      code.fun = `export function hello(a: any) {}`

      const parsed = parse(code.fun, config)
      console.log(parsed.json)
      expect(parsed.raw).toBeDefined()
    })
  })
})
