import { createLogger } from './logger'

interface ILogger {
  log: Function
  warn: Function
  error: Function
}

const defaults = {
  logOn: true,
}

export interface ILoggable {
  caption: string
}

export class Loggable implements ILoggable {
  options: any
  logger: ILogger
  logOn: boolean

  /**
   * Create Loggable instance
   * @constructor
   * @param options xtra options, such as optional logger override and logOn option
   */
  constructor(options: any) {
    this.options = options
    this.logOn = options.logOn || defaults.logOn
    this.logger = this.createLogger()
  }

  /**
   * Caption of target instance for logger
   */
  get caption() {
    return this.constructor.name
  }

  /**
   * Default logger factory using Logger factory
   */
  defaultCreateLogger() {
    return createLogger(this, this.options)
  }

  /**
   * create the logger
   */
  createLogger() {
    const { logger, createLogger } = this.options
    if (createLogger) return createLogger(this, this.options)
    if (this.defaultCreateLogger) return this.defaultCreateLogger()
    return logger || console
  }

  /**
   * Log an error message with context data
   * @param msg info message
   * @param data context data
   */
  // protected
  error(msg: string, data?: any): void {
    data ? this.logger.error(msg, data) : this.logger.error(msg)
    throw new Error(msg)
  }

  /**
   * Log an info message with context data
   * @param msg info message
   * @param data context data
   */
  // protected
  warn(msg: string, data?: any): void {
    if (!this.logOn) return
    data ? this.logger.warn(msg, data) : this.logger.warn(msg)
  }

  /**
   * Log an info message with context data
   * @param msg info message
   * @param data context data
   */
  // protected
  log(msg: string, data?: any): void {
    if (!this.logOn) return
    data ? this.logger.log(msg, data) : this.logger.log(msg)
  }
}
