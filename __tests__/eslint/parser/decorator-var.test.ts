import {
  parse,
  config
} from './_imports'

describe('ESLint parser', () => {
  describe('variable declaration', () => {
    const code: any = {
      decorator: {}
    }

    code.decorator.const = `export const $decorator = {}`
    code.decorator.var = `export var $decorator = {}`
    code.decorator.let = `export var $decorator = {}`

    describe('const', () => {
      it('parses it', () => {

        // For exported const
        // {
        //   "type": "ExportNamedDeclaration"
        //   "declaration": {
        //     "type": "VariableDeclaration",
        //       "kind": "const"
        // "id": {
        //   "type": "Identifier"
        // "name": "$decorator"

        const parsed = parse(code.decorator.const, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('let', () => {
      it('parses it', () => {

        // For exported const
        // {
        //   "type": "ExportNamedDeclaration"
        //   "declaration": {
        //     "type": "VariableDeclaration",
        //       "kind": "let"
        // "id": {
        //   "type": "Identifier"
        // "name": "$decorator"

        const parsed = parse(code.decorator.const, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })

      describe('var', () => {
        it('parses it', () => {

          // For exported const
          // {
          //   "type": "ExportNamedDeclaration"
          //   "declaration": {
          //     "type": "VariableDeclaration",
          //       "kind": "var"
          // "id": {
          //   "type": "Identifier"
          // "name": "$decorator"

          const parsed = parse(code.decorator.const, config)
          console.log(parsed.json)
          expect(parsed.raw).toBeDefined()
        })
      })
    })
  })
})
