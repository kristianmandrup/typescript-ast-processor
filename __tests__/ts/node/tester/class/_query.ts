export const query = {
  empty: {},
  invalid: {
    anyOf: 32
  },
  members: {
    valid: {
      anyOf: ['hello']
    }
  },
  implements: {
    all: {
      all: ['A'],
      count: {
        eq: 2
      }
    },
    anyOf: {
      anyOf: ['Ix', 'Iy'],
      count: {
        min: 2
      }
    }
  },
  extends: {
    anyOf: ['A']
  }
}
