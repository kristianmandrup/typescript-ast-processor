export const query = {
  empty: {},
  invalid: {
    anyOf: 32
  },
  members: {
    identifiers: {
      noMatch: {
        anyOf: ['unknown']
      },
      anyOf: {
        anyOf: ['hello']
      },
      allOf: {
        allOf: ['hello']
      }
    },
    onlyAccessors: {
      noMatch: {
        anyOf: ['unknown']
      },
      anyOf: {
        anyOf: ['name']
      },
      allOf: {
        allOf: ['name']
      }
    },
    constructor: {
      noMatch: {
        params: {
          names: {
            anyOf: ['unknown']
          }
        }
      },
      anyOf: {
        params: {
          names: {
            anyOf: ['name']
          }
        }
      }
    },
    statics: {
      noMatch: {
        anyOf: ['unknown']
      },
      anyOf: {
        anyOf: ['hello']
      },
      allOf: {
        allOf: ['hello']
      }
    },
    methods: {
      noMatch: {
        anyOf: ['unknown']
      },
      anyOf: {
        anyOf: ['hello']
      },
      allOf: {
        allOf: ['hello']
      }
    },
    getters: {
      noMatch: {
        anyOf: ['unknown']
      },
      anyOf: {
        anyOf: ['name']
      },
      allOf: {
        allOf: ['name']
      },
    },
    setters: {
      noMatch: {
        anyOf: ['unknown']
      },
      anyOf: {
        anyOf: ['name']
      },
      allOf: {
        allOf: ['name']
      },
    },
    accessors: {
      noMatch: {
        anyOf: ['unknown']
      },
      anyOf: {
        anyOf: ['name']
      },
      allOf: {
        allOf: ['name']
      },
    },
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
    }
  }
}

// const classQuery = {
//   implements: {
//     anyOf: ['Ix', /^Iy/],
//   },
//   extends: /^A/,
//   abstract: false,
//   exported: true,
//   id: /^B/
// }

// const classInfo = {
//   implements: ['Ix', 'Iy'],
//   extends: 'A',
//   abstract: false,
//   exported: true,
//   id: 'B'
// }
