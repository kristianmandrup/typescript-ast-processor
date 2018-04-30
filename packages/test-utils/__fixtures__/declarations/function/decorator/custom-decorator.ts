export const $decorator = {
  hello: {
    examples: {
      valid: {
        args: ['kris']
      },
      invalid: {
        args: [''],
        result: '!throws'
      }
    }
  }
}

export function hello(name: string): string {
  if (name === '') throw new Error('invalid name')
  return 'hi ' + name
}
