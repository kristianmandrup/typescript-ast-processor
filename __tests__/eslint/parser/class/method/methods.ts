import {
  parse,
  config
} from '../../_imports'

describe('ESLint parser', () => {
  describe('parse methods', () => {
    const code: any = {
      const: {},
      method: {
        static: {}
      }
    }

    code.method.default = `export class A {
      isDefault() { }
    }`
    code.method.public = `export class A {
      public isPublic() {}
    }`

    code.method.private = `export class A {
      private isPrivate() {}
    }`

    code.method.protected = `export class A {
      protected isProtected() {}
    }`

    code.method.static.default = `export class A {
      static isDefaultStatic()
    }`

    code.method.static.public = `export class A {
      static isPublicStatic()
    }`

    code.method.static.private = `export class A {
      static isPrivateStatic()
    }`

    code.method.static.protected = `export class A {
      static protected isProtectedStatic()
    }`

    describe.only('default method', () => {
      it('is parsed', () => {
        const parsed = parse(code.method.default, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('public method', () => {
      it('is parsed', () => {
        const parsed = parse(code.method.public, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('private method', () => {
      it('is parsed', () => {
        const parsed = parse(code.method.private, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('protected method', () => {
      it('is parsed', () => {
        const parsed = parse(code.method.protected, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('static default', () => {
      it('is parsed', () => {
        const parsed = parse(code.method.static.default, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('static public', () => {
      it('is parsed', () => {
        const parsed = parse(code.method.static.public, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('static private', () => {
      it('is parsed', () => {
        const parsed = parse(code.method.static.private, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })

    describe('static protected', () => {
      it('is parsed', () => {
        const parsed = parse(code.method.static.protected, config)
        console.log(parsed.json)
        expect(parsed.raw).toBeDefined()
      })
    })
  })
})
