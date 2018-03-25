import {
  node,
  testerFor,
  query
} from './_imports'

const { log } = console

describe('class heritage', () => {
  describe('HeritageTester', () => {
    const tester = testerFor('basic-class', {
      factory: node.tester.createClassHeritageTester
    })

    describe('info', () => {
      it('collect correct info', () => {
        const info = tester.info()
        expect(info).toEqual({
          implements: {
            names: [],
            number: 0
          },
          isEmpty: true
        })
      })
    })

    describe('isEmpty', () => {
      it('true', () => {
        expect(tester.isEmpty).toBe(true)
      })
    })

    describe('extends', () => {
      it('is undefined', () => {
        expect(tester.extends).toBeUndefined()
      })
    })

    describe('implements', () => {
      it('is empty', () => {
        expect(tester.implements).toEqual({
          names: [],
          number: 0
        })
      })
    })

    describe('implementNames', () => {
      it('is empty', () => {
        expect(tester.implementNames).toEqual([])
      })
    })

    describe('extendNames', () => {
      it('is empty', () => {
        expect(tester.extendNames).toEqual([])
      })
    })

    describe.skip('namesOf', () => {
    })

    describe.skip('heritage', () => {
    })

    describe.skip('clausesOf(kind)', () => {
    })

    describe.skip('extendClauses', () => {
    })

    describe.skip('implementClauses', () => {
    })

    describe.skip('createHeritageClauseTester(clause)', () => {
    })

    describe('testExtends(query)', () => {
    })

    describe('testImplements(query)', () => {
    })

    describe('test(query)', () => {
    })
  })
})

