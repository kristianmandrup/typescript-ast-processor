export function createLogger(target: any, options: any) {
  return new Logger(target, options)
}

export class Logger {
  /**
   * @constructor
   * @param target target instance being logged
   * @param options
   */
  constructor(public target: any, public options: any = {}) {}

  get caption() {
    return this.target.caption
  }

  log(msg: any, data: any) {
    const $msg = ['INFO', this.prefix, msg].join(' ')
    const $data = this.format(data)
    console.log($msg, $data)
  }

  warn(msg: any, data: any) {
    const $msg = ['WARNING', this.prefix, msg].join(' ')
    const $data = this.format(data)
    console.log($msg, $data)
  }

  error(msg: any, data: any) {
    const $msg = ['ERROR', this.prefix, msg].join(' ')
    const $data = this.format(data)
    console.error($msg, $data)
  }

  format(data: any) {
    return data
  }

  get prefix() {
    const caption = this.caption
    return this.caption ? `[${caption}]` : ''
  }
}
