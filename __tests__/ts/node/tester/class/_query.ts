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
    allOf: {
      allOf: ['Ix'],
      count: {
        eq: 1
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
  },
  heritage: {
    implements: {
      anyOf: ['Ix', 'Iy'],
    },
    extends: {
      anyOf: ['A']
    }
  }
}
