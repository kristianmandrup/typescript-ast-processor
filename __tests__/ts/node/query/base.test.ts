import { node, context } from '../'

const { query } = node
const { createAnyQueryMatcher } = query

describe('node query', () => {
  describe('createAnyQueryMatcher', () => {
    context('value: 42 and node with name: abc', () => {
      const node = {
        name: 'abc',
      }
      const key = 'x'
      const value = 42

      const qm = createAnyQueryMatcher({
        value,
        key,
        node,
      })

      describe('init', () => {
        it('sets value to 42', () => {
          expect(qm.value).toBe(42)
        })

        it('sets node', () => {
          expect(qm.node).toBe(node)
        })

        it('does not set key since value already set', () => {
          expect(qm.key).not.toBe(key)
        })
      })

      context('query any of: 39, 42', () => {
        const query = {
          matches: 'x',
        }

        describe('validateValue(value)', () => {
          context('valid value', () => {
            const validate = () => qm.validateValue('hello')

            it('validates ok', () => {
              expect(validate).not.toThrow()
            })
          })

          context('invalid value', () => {
            const validate = () => qm.validateValue(undefined)

            it('throws', () => {
              expect(validate).toThrow()
            })
          })
        })

        describe('setValue(value)', () => {
          context('valid value', () => {
            const setValue = () => qm.setValue('hello')

            it('sets it', () => {
              expect(setValue).not.toThrow()
            })
          })

          context('invalid value', () => {
            const setValue = () => qm.setValue(undefined)

            it('throws', () => {
              expect(setValue).toThrow()
            })
          })
        })

        describe('setKey(key)', () => {
          context('node has matching property', () => {
            const setKey = () => qm.setKey('name')

            it('sets it', () => {
              expect(setKey).not.toThrow()
            })
          })

          context('node has NO matching property', () => {
            const setKey = () => qm.setKey('unknown')

            it('throws', () => {
              expect(setKey).toThrow()
            })
          })
        })

        describe('selectMatcher(value)', () => {
          context('value with matcher', () => {
            const matcher = qm.selectMatcher('x')

            it('is selected', () => {
              expect(matcher).toBeDefined()
            })
          })

          context('value without matcher', () => {
            const matcher = qm.selectMatcher({})

            it('is selected', () => {
              expect(matcher).toBeUndefined()
            })
          })
        })

        describe('validateMatcher(matcher)', () => {
          context('valid matcher', () => {
            const matcher = {}
            const vm = () => qm.validateMatcher(matcher)

            it('is valid', () => {
              expect(vm).not.toThrow()
            })
          })

          context('value without matcher', () => {
            const vm = () => qm.validateMatcher(null)
            it('throws', () => {
              expect(vm).toThrow()
            })
          })
        })

        describe('queryProp', () => {
          it('is: matches', () => {
            const qprop = qm.queryProp
            expect(qprop).toEqual('matches')
          })
        })

        describe('normalizeQuery(query)', () => {
          it('normalizes query', () => {
            const normalized = qm.normalizeQuery(query)
            expect(normalized).toEqual('x')
          })
        })

        describe('query', () => {
          it('matches', () => {
            const result = qm.query(query)
            expect(result).toBeTruthy()
          })
        })
      })
    })
  })
})
