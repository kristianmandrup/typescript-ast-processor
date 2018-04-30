import { loggable, context } from '../'

const { Loggable } = loggable

describe('Loggable', () => {
  context('logger', () => {
    class Logged extends Loggable {
      get caption() {
        return 'Logged'
      }
    }

    const options = {}
    const logger = new Logged(options)

    describe('log', () => {
      it('logs info', () => {
        const info = () => logger['log']('x', {})
        expect(info).not.toThrow()
      })
    })

    describe('warn', () => {
      it('logs warning', () => {
        const warn = () => logger['warn']('x', {})
        expect(warn).not.toThrow()
      })
    })

    describe('error', () => {
      it('logs error', () => {
        const error = () => logger['error']('x', {})
        expect(error).toThrow()
      })
    })
  })
})
