import { Logger } from './logger'

interface ILogger {
  log: Function
  error: Function
}

const defaults = {
  logOn: true,
}

export class Loggable {
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

  get defaultCreateLogger() {
    return new Logger(this, this.options)
  }

  createLogger() {
    const { logger, createLogger } = this.options
    if (createLogger) return createLogger(this, this.options)
    if (this.defaultCreateLogger) return this.defaultCreateLogger
    return logger || console
  }

  /**
   * Log an error message with context data
   * @param msg info message
   * @param data context data
   */
  protected error(msg: string, data?: any): void {
    data ? this.logger.error(msg, data) : this.logger.error(msg)
    throw new Error(msg)
  }

  /**
   * Log an info message with context data
   * @param msg info message
   * @param data context data
   */
  protected log(msg: string, data?: any): void {
    if (!this.logOn) return
    data ? this.logger.log(msg, data) : this.logger.log(msg)
  }
}
