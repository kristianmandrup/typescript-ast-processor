export const query = {
  name: {
    anyOf: ['x', /a/]
  },
  parameters: {
    names: {
      anyOf: ['x', /a/]
    }
  },
  decorators: {
    names: {
      anyOf: ['x', /a/]
    }
  },
  modifiers: {
    anyOf: ['static', 'protected']
  },
  returnTypes: {
    anyOf: ['void', 'number']
  }
}
