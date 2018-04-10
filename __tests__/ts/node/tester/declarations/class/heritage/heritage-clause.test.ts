import {
  testerFor,
  query
} from '../_imports'

const { log } = console

describe('class heritage', () => {
  describe('HeritageClauseTester', () => {
    describe('basic', () => {
      const tester = testerFor({
        fileName: 'basic-class',
        type: 'heritage'
      })

      describe('test', () => {
        it('is true when query matches', () => {
          const result = tester.test(query.extends.anyOf)
          expect(result).toBeTruthy()
        })

        it('false true when query fails', () => {
          const result = tester.test(query.extends.anyOf)
          expect(result).toBeTruthy()
        })
      })
    })
  })
})
