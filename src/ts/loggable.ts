interface ILogger {
  log: Function
  error: Function
}


export class Loggable {
  options: any
  logger: ILogger

  constructor(options: any) {
    this.options = options
    this.logger = options.logger || console
  }

  protected error(msg: string, data?: any): void {
    data ? this.logger.error(msg, data) : this.logger.error(msg)
    throw new Error(msg)
  }

  protected log(msg: string, data?: any): void {
    data ? this.logger.log(msg, data) : this.logger.log(msg)
  }
}
