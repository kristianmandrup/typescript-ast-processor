import {
  testerFor,
  context,
  query,
  logObj,
  log,
} from '../_imports'

describe('parameters', () => {
  context('basic-function file', () => {
    const tester: any = testerFor({
      fileName: 'parameters',
      type: 'parameters',
      category: 'declaration',
    })

    describe('info()', () => {
      it('collects correct info', () => {
        const info = tester.info()
        logObj('info', info)
        expect(info).toEqual({
        })
      })
    })

    describe('test(query)', () => {
      context('has matching parameter name', () => {
        it('anyOf: name - true ', () => {
          const res = tester.test(query.parameters)
          expect(res).not.toBe(false)
        })
      })
    })
  })
})
