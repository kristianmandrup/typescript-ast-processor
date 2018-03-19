import {
  parse,
  config
} from '../_imports'

describe('ESLint parser', () => {
  describe('parse', () => {
    const code: any = {
      static: {}
    }
    code.getter = `export class A {
      get myGetter() {
      }
    }`
    code.setter = `export class A {
      set mySetter(value: any) {
      }}`

    code.static.setter = `export class A {
        static set myStaticSetter(value: any) {
        }}`
    code.static.getter = `export class A {
          static set myStaticSetter(value: any) {
          }}`


    describe('getter', () => {
      it('parses it', () => {
        const parsed = parse(code.getter, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })
    // {
    //   "type": "ExportNamedDeclaration",
    //   "declaration": {
    //     "type": "ClassDeclaration",
    //     "id": {
    //       "type": "Identifier",
    //       "name": "A"
    //     },
    // "body": {
    //   "type": "ClassBody",
    //   "body": [
    //     {
    //       "type": "MethodDefinition",
    // "key": {
    //   "type": "Identifier",
    // "name": "mySetter"
    // "value": {
    //   "type": "FunctionExpression",
    //   "id": null,
    //   "generator": false,
    //   "expression": false,
    //   "async": false,
    // "computed": false,
    // "static": false,
    //   "kind": "get"   <------

    describe('setter', () => {

      // {
      //   "type": "ExportNamedDeclaration",
      //   "declaration": {
      //     "type": "ClassDeclaration",
      //     "id": {
      //       "type": "Identifier",
      //       "name": "A"
      //     },
      // "body": {
      //   "type": "ClassBody",
      //   "body": [
      //     {
      //       "type": "MethodDefinition",
      // "key": {
      //   "type": "Identifier",
      // "name": "mySetter"
      // "value": {
      //   "type": "FunctionExpression",
      //   "id": null,
      //   "generator": false,
      //   "expression": false,
      //   "async": false,
      //   "computed": false,
      //   "static": false,
      //   "kind": "set"
      //       "superClass": null,
      it('parses it', () => {
        const parsed = parse(code.static.setter, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })

      describe('static', () => {
        describe('getter', () => {
          it('parses it', () => {
            const parsed = parse(code.static.getter, config)
            console.log(parsed.json)
            expect(parsed.raw).toBeDefined()
          })

        })
        describe('setter', () => {
          it('parses it', () => {
            const parsed = parse(code.setter, config)
            console.log(parsed.json)
            expect(parsed.raw).toBeDefined()
          })
        })
      })
    })
  })
})
