import {
  parse,
  config
} from '../_imports'

describe('ESLint parser', () => {
  describe('instance vars', () => {
    const code: any = {
      instanceVar: {
      }
    }
    code.instanceVar.default = `export class A {
      myInstanceVar: any = 42
    }`
    code.instanceVar.private = `export class A {
      private myInstanceVar: any = 42
    }`
    code.instanceVar.protected = `export class A {
      protected myInstanceVar: any = 42
    }`
    code.instanceVar.public = `export class A {
      public myInstanceVar: any = 42
    }`

    describe('default', () => {
      // "body": {
      //   "type": "ClassBody",
      //   "body": [
      //     {
      //       "type": "ClassProperty",
      //       "key": {
      //         "type": "Identifier",
      //         "name": "myInstanceVar"
      //         "value": 42,
      //         "raw": "42"
      //       },
      //       "value": {
      //         "type": "Literal",
      //       "computed": false,
      //       "static": false,

      it('parses it', () => {
        const parsed = parse(code.instanceVar.default, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('private', () => {
      // "body": [
      //   {
      //     "type": "ClassProperty",
      // ---
      // "accessibility": "private"


      it('parses it', () => {
        const parsed = parse(code.instanceVar.private, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('protected', () => {
      // "body": [
      //   {
      //     "type": "ClassProperty",
      // ---
      // "accessibility": "protected"

      it('parses it', () => {
        const parsed = parse(code.instanceVar.protected, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('public', () => {
      // "body": [
      //   {
      //     "type": "ClassProperty",
      // ---
      // "accessibility": "public"

      it('parses it', () => {
        const parsed = parse(code.instanceVar.protected, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('static', () => {
      // TODO
    })
  })
})
