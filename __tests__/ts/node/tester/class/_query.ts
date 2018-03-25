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
    anyOf: {
      anyOf: ['A']
    },
    named: 'A'
  },
  heritage: {
    none: {},
    orNotExtends: {
      extends: {
        or: {
          anyOf: ['A', /C/],
          allOf: ['B']
        },
        not: {
          anyOf: ['D']
        }
      }
    },
    notExtends: {
      extends: {
        not: {
          anyOf: ['A']
        }
      }
    },
    onlyExtends: {
      extends: {
        anyOf: ['A']
      }
    },
    onlyImplements: {
      implements: {
        anyOf: ['Ix', 'Iy'],
      },
    },
    extendsAndImplements: {
      implements: {
        anyOf: ['Ix', 'Iy'],
      },
      extends: {
        anyOf: ['A']
      }
    }
  }
}
