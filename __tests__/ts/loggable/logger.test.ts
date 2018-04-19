import { loggable, context } from '../'

const { Logger, createLogger } = loggable

describe('Logger', () => {
  context('logger', () => {
    class Logged {
      get caption() {
        return 'Logged'
      }
    }

    const options = {}

    const logger = createLogger(new Logged(), options)

    describe('log', () => {
      it('logs info', () => {
        const info = () => logger.log('x', {})
        expect(info).not.toThrow()
      })
    })

    describe('warn', () => {
      it('logs warning', () => {
        const warn = () => logger.warn('x', {})
        expect(warn).not.toThrow()
      })
    })

    describe('error', () => {
      it('logs error', () => {
        const error = () => logger.error('x', {})
        expect(error).not.toThrow()
      })
    })
  })
})
