import { Loggable } from '../../../loggable'

export function createTesterIdResolver(options: any = {}) {
  return new TesterIdResolver(options)
}

export class TesterIdResolver extends Loggable {
  parts: string[]

  constructor(options: any = {}) {
    super(options)
  }

  protected hasValidPrefix(prefix: string) {
    return ['node', 'details'].includes(prefix)
  }

  get defaultType() {
    return 'node'
  }

  resolveWithPrefix(prefix: string | undefined, name: string): any {
    if (!prefix) return
    if (this.hasValidPrefix(prefix)) {
      const type = prefix
      return {
        type,
        name,
      }
    }
    this.error('Invalid prefix', {
      prefix,
    })
  }

  resolveNoPrefix(name: string): any {
    return {
      name,
      type: this.defaultType,
    }
  }

  /**
   * Resolve parts of string
   * @param parts
   */
  resolveParts(parts: string[]) {
    return parts.length > 1
      ? { prefix: parts[0], name: parts[1] }
      : { name: parts[0] }
  }

  /**
   * Resolve type and name
   * @param name
   */
  resolve(value: string): any {
    const { prefix, name } = this.resolveParts(value.split(':'))
    return this.resolveWithPrefix(prefix, name) || this.resolveNoPrefix(name)
  }
}
