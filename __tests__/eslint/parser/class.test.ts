import {
  parse,
  config
} from './_imports'

describe('ESLint parser', () => {
  describe('parse', () => {
    it('parses AST for class', () => {
      const code: any = {
      }

      code.class = `export class A {
      }`

      // {
      //   "type": "ExportNamedDeclaration",
      //   "declaration": {
      //     "type": "ClassDeclaration",
      //     "id": {
      //       "type": "Identifier",
      //       "name": "A"
      //     },
      //       "body": {
      //         "type": "ClassBody",
      //       },
      //       "superClass": null,


      const parsed = parse(code.class, config)
      console.log(parsed.json)
      expect(parsed.raw).toBeDefined()
    })
  })
})

