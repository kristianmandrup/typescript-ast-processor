export const heritage = {
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
  notImplements: {
    implements: {
      not: {
        anyOf: ['Ix', 'Iy'],
      }
    }
  },
  extendsAndImplements: {
    implements: {
      anyOf: ['Ix', /^Iy/],
    },
    extends: /^A/
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
  }
}
